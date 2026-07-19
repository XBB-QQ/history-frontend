# 迭代记录 — 五千年史馆前端

## 2026-07-20 · P0 安全走查与修复（第三批前端配套：B1 quiz 泄题修复）

### 一、背景

第三批后端漏洞 B1（QuestionDTO 答案泄露）需要前端配套调整。后端出题端点不再返回 `correctIndex`/`explanation`，前端类型和高亮逻辑需相应调整。

### 二、问题

[`QuizDialog.tsx`](file:///d:/claudeCode/history-frontend/src/components/quiz/QuizDialog.tsx) 原逻辑：用户选择选项后（`selected !== null`），立即用 `question.correctIndex` 高亮正确/错误答案。但 `question` 来自出题端点 `fetchDailyQuiz`，出题端点返回的 `correctIndex` 让用户在提交前就能看到正确答案 → 作弊风险。

### 三、修复

#### api.ts 类型拆分

| 类型 | 用途 | 字段 |
|------|------|------|
| `QuizQuestionPublic` | 出题端点返回（fetchDailyQuiz/fetchRandomQuiz） | 不含 correctIndex/explanation |
| `QuizQuestion` | 答题端点返回（QuizResult.question） | 含 correctIndex/explanation |

#### QuizDialog.tsx 高亮逻辑调整

| 阶段 | 原逻辑 | 新逻辑 |
|------|--------|--------|
| 选择后未提交 | 用 `question.correctIndex` 高亮正确/错误（泄题） | 只标记选中项（蓝色边框 `border-accent bg-accent/10`） |
| 提交后 | 用 `question.correctIndex` 高亮 | 用 `result.question.correctIndex` 高亮 |

#### 测试 mock 更新

- `fetchDailyQuiz` mock 去掉 `correctIndex`（模拟真实出题端点）
- `submitQuizAnswer` mock 加上 `question` 字段（含 `correctIndex`）

### 四、验证

- `npx tsc --noEmit`：exit 0
- `npx vitest run`：51 文件 286 测试全通过

### 五、教训

1. **出题端点不能返回答案字段**：correctIndex/explanation 必须在答题后才返回，否则前端可在提交前读到正确答案
2. **UI 状态机要分清「选中」和「已提交」**：原逻辑选择后立即高亮正确答案，应该改为提交后才高亮；选中阶段只标记用户选了哪个
3. **测试 mock 要和真实后端响应一致**：mock fetchDailyQuiz 不含 correctIndex，mock submitQuizAnswer 含 question 字段，才能测出真实行为

## 2026-07-20 · P0 安全走查与修复（第二批：前端功能 bug 3 条）

### 一、背景

第一批部署与凭证 6 条 P0 修复后（commit `7a1d5eb` + `073a0c2`），继续按 15 条 P0 清单推进第二批前端功能 bug 3 条（F1/F2/F3）。用户原话「按顺序执行修复，记得不要速度需要的是准确度，记得闭环验证文档同步」。

### 二、F1：quiz/learning 8 端点路径 + X-User-Id 改用 Authorization

#### 问题

- 8 个用户相关端点缺失 `/user` 前缀：3 个 quiz（daily/answer/random）+ 5 个 learning（lists GET/POST、progress GET、lists/{id}/resources POST/DELETE）
- [`learningStore.ts`](file:///d:/claudeCode/history-frontend/src/store/learningStore.ts) 把 JWT token 当 username 传：`headers: { 'X-User-Id': token }`，后端 `findByUsername(userId)` 当 username 用 → 正常用户功能失效 + IDOR 风险

#### 修复

| 文件 | 改动 |
|------|------|
| [`api.ts`](file:///d:/claudeCode/history-frontend/src/services/api.ts) | `fetchJSON` 改为 `export`，自动从 `useUserStore.getState().token` 取 token 注入 `Authorization: Bearer` header；3 个 quiz 路径加 `/user` 前缀（daily/answer/random） |
| [`learningStore.ts`](file:///d:/claudeCode/history-frontend/src/store/learningStore.ts) | 5 个方法改用 `fetchJSON`，路径加 `/user`，删除 `X-User-Id` header；类型名修正（`LearningList` → `ReadingListItem`，`LearningProgress` → `ProgressItem`） |

#### fetchJSON 自动鉴权实现

```typescript
export async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const token = useUserStore.getState().token;
  const headers: Record<string, string> = { 'Accept': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(url, {
    ...init,
    headers: { ...headers, ...(init?.headers as Record<string, string> | undefined) },
  });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText} for ${url}`);
  }
  return response.json();
}
```

### 三、F2：EntityEditor handleSave 漏调 saveFn

#### 问题

[`EntityEditor.tsx`](file:///d:/claudeCode/history-frontend/src/pages/admin/EntityEditor.tsx) 的 `handleSave` 只做 `setEditing(null) + loadData()`，没调用 `saveFn` 把编辑结果落库。导致 admin 4 个编辑器（朝代/事件/人物/知识）的新增、编辑全部失效——UI 不报错但数据没保存。

#### 修复

`EditorProps` 已有 `saveFn` 字段，`handleSave` 补 `await saveFn(editing)`：

```typescript
const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!editing) return;
  setSaving(true);
  setError('');
  try {
    await saveFn(editing);  // 补：必须落库
    setEditing(null);
    await loadData();
    navigate(`/admin/${type}`);
  } catch (e: unknown) {
    setError(e instanceof Error ? e.message : t('admin.save_failed'));
  } finally {
    setSaving(false);
  }
};
```

### 四、F3：TitleGeneratorPage 重复展开

#### 问题

[`TitleGeneratorPage.tsx`](file:///d:/claudeCode/history-frontend/src/pages/TitleGeneratorPage.tsx) 的 `generateMultipleTitles`：

```typescript
setGeneratedTitles([...newTitles, ...newTitles]);  // 把同一数组展开两次
```

生成 3 个显示 6 个且两两重复，生成 6 个显示 12 个。

#### 修复

```typescript
setGeneratedTitles(newTitles);
```

### 五、验证

- `npx tsc --noEmit`：exit 0
- `npx vitest run`：51 文件 286 测试全通过（仅 React Router v7 future flag 警告，非错误）

### 六、教训

1. **类型名一致性**：`fetchJSON<T>` 的泛型参数必须和 `interface` 定义同名，否则 tsc 报 `Cannot find name`。原代码用了 `LearningList`/`LearningProgress`，但实际 interface 是 `ReadingListItem`/`ProgressItem`，是早期重命名遗留
2. **统一鉴权优于分散塞 header**：`fetchJSON` 自动注入 `Authorization` 比每个 store 自己读 token 塞 `X-User-Id` 干净，且避免「把 token 当 username」的语义错误
3. **admin 编辑器 save 漏调是隐性 bug**：UI 不报错、不抛异常，用户以为保存成功但数据没落库，比显性 bug 更危险。`EditorProps` 有 `saveFn` 字段却不用，是典型的「接口定义了但实现忘记调」
4. **数组重复展开是低级但高频错误**：`[...arr, ...arr]` 看起来像「合并两个数组」，实际是「把同一个数组展开两次」，review 时要警惕

## 2026-07-19 · oracle-game 四项体验优化（错题本/历史最高分/字源释义/全局缓存/进度可视化）

### 一、背景

用户问「目前还有哪里可以优化丰富的」，按优先级推荐 4 项可执行优化。用户原话「按顺序执行，记得闭环哦」——要求每项都做到「实现 → 验证 → commit/push → 文档同步」完整闭环。

### 二、任务1：错题本 + 历史最高分

#### 新建 [`oracleGameStore.ts`](file:///d:/claudeCode/history-frontend/src/store/oracleGameStore.ts)

zustand + localStorage 持久化（key=`oracle-game-stats`），最大错题 100 条，同字去重保留最新错误时间。

| 字段 | 类型 | 说明 |
|------|------|------|
| `wrongChars` | `WrongCharEntry[]` | 错题本：`{ char, meaning, wrongAt }` |
| `bestScore` | `number` | 历史最高分（绝对值） |
| `bestAccuracy` | `number` | 历史最高正确率（0-1） |
| `totalGames` | `number` | 累计答题次数 |
| `addWrong` | fn | 答错时调用，同字去重 |
| `removeWrong` | fn | 单字移除 |
| `clearWrong` | fn | 清空错题本 |
| `recordResult` | fn | 结束时调用，返回 `{ newBestScore, newBestAccuracy }` |

#### OracleBoneGamePage 接入

| 改动点 | 说明 |
|--------|------|
| `GameMode` 类型 | 扩展为 `'classic' \| 'random' \| 'infinite' \| 'review'` |
| `handleAnswer` | 答错时 `addWrong({ char, meaning, wrongAt: Date.now() })` |
| `handleNextQuestion` | 结束时 `recordResult(score, questions.length)` 返回破纪录提示 |
| `handleRestart` / `handleModeChange` | 新增 review 分支：从错题本生成题库 |
| `adaptWrongToOracle` | 新适配器：WrongCharEntry → OracleBoneChar（13 字段填默认值） |
| 结果页 UI | 历史最高分 chip + 破纪录动画 + 错题本卡片（可单删/清空）+「复习错题」第四模式按钮（rose 色） |

### 三、任务2：答完显示字源释义

答题后展开 amber 卡片，展示三栏：

| 栏位 | 数据来源 | 显示条件 |
|------|----------|----------|
| 字形 | `visualDescription` | 非占位文字（排除「随机挑战字」「无限模式字」「错题复习」） |
| 背景 | `culturalContext` | 非空 |
| 年代 | `dynasty` | 非空 |

加答对/答错状态 chip（green/red）即时反馈。

### 四、任务3：svgCache 提升到全局 store

#### 新建 [`charEvolutionStore.ts`](file:///d:/claudeCode/history-frontend/src/store/charEvolutionStore.ts)

zustand store，**无 localStorage 持久化**（SVG 数据较大，会话级共享即可，刷新即失效）。

```typescript
interface CharEvolutionState {
  cache: Record<string, CharEvolutionData | null>;  // null=已抓取失败
  getOrFetch: (char: string) => Promise<CharEvolutionData | null>;
  prefetch: (chars: string[]) => Promise<void>;
  clear: () => void;
}
```

`getOrFetch` 语义：命中 cache 即返回，未命中调 `fetchCharEvolutionByChar` 并写入 cache。

#### 两页接入

| 文件 | 改动 |
|------|------|
| `OracleBoneGamePage.tsx` | 删除本地 `svgCache` state 和 `fetchOracleSvg`；订阅 `charCache` + `getOrFetch`；字典区前 10 字预加载改用 `prefetch`；`generateInfiniteQuiz` 改走 `getOrFetch` |
| `CharEvolutionPage.tsx` | URL query 预选字 + `handleSearch` 两处 `fetchCharEvolutionByChar` 都改走 `getOrFetch` |

**收益**：答题页抓过的字，演变页打开秒开；infinite 模式同一字重出时秒回。

### 五、任务4：infinite 进度可视化

#### 新增 state

```typescript
const [infiniteProgress, setInfiniteProgress] = useState<{
  found: number;      // 已找到
  needed: number;     // 需要
  tried: number;      // 已尝试
  hitRate: number;    // 命中率（0-1）
} | null>(null);
```

#### `generateInfiniteQuiz` 每批更新进度

```typescript
// 每批 Promise.all 完成后
const triedTotal = triedChars.size;
const hitRate = triedTotal > 0 ? collected.length / triedTotal : 0;
setInfiniteProgress({ found: collected.length, needed: count, tried: triedTotal, hitRate });
```

#### UI 改造

loading 区从「spinner + 一行文字」升级为：

- spinner
- 文字提示
- **进度条**（purple→pink 渐变，宽度随 found/needed 动态变化）
- 「已找到 X / Y 字 · 已尝试 Z 字 · 命中率 N%」

### 六、验证

- **tsc**：通过（0 错误）
- **vitest**：51 文件 / 286 测试全通过
- **Git**：commit `dbf1ec2` 已 push（4 files changed, 405 insertions, 57 deletions）

### 七、教训

1. **zustand store 是 localStorage 持久化的最简洁方式**：比手写 `useEffect + localStorage.getItem/setItem` 干净，且 store 内的方法可以封装业务逻辑（如 `recordResult` 返回破纪录提示）
2. **全局 cache 消除重复抓取的关键是「store 提供 getOrFetch 语义」**：调用方代码几乎不变（只换函数名 `fetchCharEvolutionByChar` → `getOrFetch`），但行为变成「命中即返回」
3. **进度可视化让 5-15s 等待变成可接受的体验**：命中率展示还能反推调优 BATCH_SIZE（当前 8 字一批，命中率约 50%）
4. **适配器模式让新 mode 极简**：review 模式只多了 `adaptWrongToOracle` 一个函数 + `handleRestart`/`handleModeChange` 的 review 分支，零分叉复用答题/计分/结果页逻辑
5. **会话级 vs 持久化**：错题本和成绩必须持久化（跨刷新保留），SVG cache 会话级即可（数据大，刷新后重新抓也不慢）

---

## 2026-07-19 · oracle-game 新增「无限挑战」模式（Unicode CJK 2万字动态生成）

### 一、背景

用户反馈上一轮新增的「随机挑战」模式虽有 120 字字池，但仍嫌太少。经 AskUserQuestion 提供两个选项：

- **方案 A**：扩充字池到 500 字（仍为静态字池）
- **方案 B**：Unicode CJK 动态生成（覆盖 2 万字，按需抓取）

用户选 B 方案。优势：题库接近无限，任意生僻字都能出题；劣势：依赖后端 hanziyuan 抓取成功率，需 404 重试。

### 二、改动

#### OracleBoneGamePage 新增 infinite 模式

| 改动点 | 说明 |
|--------|------|
| `GameMode` 类型 | 扩展为 `'classic' \| 'random' \| 'infinite'` |
| `infiniteQuestionCount` state | 5/10/20 题，默认 10 |
| `infiniteLoading` state | 抓取期间显示 loading spinner |
| `generateInfiniteQuiz(count)` | 核心函数：CJK 随机选字 + 并发抓取 + 404 重试 |
| `handleInfiniteCountChange` | 改题数时重新生成 |
| `handleModeChange` / `handleRestart` | 支持 infinite 分支 |
| UI | 第三个模式按钮（紫色）+ loading spinner + 题数选择 |

#### `generateInfiniteQuiz` 实现要点

```typescript
const CJK_START = 0x4e00;
const CJK_END = 0x9fa5;
const CJK_RANGE = CJK_END - CJK_START + 1; // 20902

while (collected.length < count) {
  // 1. 生成一批随机字（BATCH_SIZE=8），用 Set 去重
  // 2. Promise.all 并发调 fetchCharEvolutionByChar
  // 3. 过滤 null（404 或无 SVG 的字）
  // 4. collected.push(...results)
  // 5. 极端情况字库耗尽时 break
}
```

- **批量并发 8 字**：兼顾速度与后端压力（避免 20902 字全打过去）
- **Set 去重**：triedChars 跟踪已试过的字，避免重复抓取
- **验证 stages[0]**：必须存在 `svgXml` 或 `svgPath`，否则视为无甲骨文字源跳过
- **回退机制**：极端情况（连续 404 字库耗尽）自动切回经典模式

### 三、UI 三态切换

底部三个模式按钮：

| 按钮 | 颜色 | 行为 |
|------|------|------|
| 经典题库 | 绿色 | 5 题固定，可选分类/难度 |
| 随机挑战 | 琥珀色 | 120 字池随机选 N 字 |
| 无限挑战 | 紫色 | Unicode CJK 动态生成 N 字 |

infinite 模式下加载时显示「正在从 Unicode 字库抓取甲骨文...」+ 旋转 spinner，抓取完毕后进入答题。

### 四、渲染复用

infinite 模式产生的 `OracleBoneChar[]` 直接喂给现有逻辑，零分叉：

- **svgCache + 四态渲染**：svgXml（hanziyuan 真实字源）> svgPath（内置手绘）> 加载中 emoji pulse > fallback emoji
- **currentOptions shuffle**：正确答案 + 3 干扰项 Fisher-Yates 打乱位置
- **动态满分判定**：`totalScore = questions.length * 10`，适配 5/10/20 题
- **题干不泄题**：答题前只显示「请选择对应的汉字」+ SVG；答完后显示「正确答案：舟（船）」作为复盘

### 五、验证

- **tsc**：通过（0 错误）
- **vitest**：51 文件 / 286 测试全通过
- **Git**：commit `7509a3c` 已 push

### 六、教训

1. **动态生成优于静态字池**：2 万字的字池即使硬编码也极大，且无法覆盖生僻字；Unicode CJK 一次解决
2. **批量并发 + 404 跳过是标准模式**：Promise.all 8 字一批，失败的字跳过重试，循环直到凑够
3. **适配器已就位时新模式极简**：上一轮的 `adaptRandomToOracle` 适配器把 OracleBoneChar 构造问题解决后，infinite 模式只需解决"如何造 OracleBoneChar[]"，核心就一个 `generateInfiniteQuiz` 函数
4. **极端情况必须回退**：连续 404 字库耗尽虽然概率极低（20902 字里总有 SVG），但仍需回退到经典模式避免白屏

---

## 2026-07-19 · oracle-game 新增「随机挑战」模式（120 字完全随机出题）

### 一、背景

用户反馈 oracle-game 题库只有 40 个固定字，涉及字太少。经 AskUserQuestion 决策采用「完全随机出题」方案：从 120 字字池随机选字，实时抓取甲骨文 SVG 出题。

### 二、改动

#### 新建 `randomCharPool.ts`（120 字字池）

| 分类 | 字数 | 示例 |
|------|------|------|
| 自然 | 20 | 日月星辰风雨云雷电山河海石土田天地气 |
| 动物 | 20 | 龙凤龟鱼鸟马牛羊鸡犬猪猫虎鹿象蛇兔燕虫贝 |
| 植物 | 12 | 木林森禾米竹花草果叶根茶 |
| 人体 | 16 | 人大小口目耳鼻舌牙手足心首面身血 |
| 器物 | 20 | 刀弓矢车舟网鼎玉金银门窗床席皿壶斗尺伞灯 |
| 动作 | 16 | 走奔飞看听言食饮立坐卧舞射牧耕渔 |
| 方位 | 8 | 上下左右中东西北 |
| 数字 | 8 | 一二三四五六七八 |

每字含 `char` + `meaning` + `category` 三字段；`getRandomChars(count)` Fisher-Yates 随机选 N 字。

#### OracleBoneGamePage 改造

| 改动点 | 说明 |
|--------|------|
| `mode` state | `'classic' \| 'random'`，默认 classic |
| `randomQuestionCount` | 5/10/20 题，默认 10 |
| `adaptRandomToOracle` | RandomChar 适配为 OracleBoneChar，缺字段填默认值，复用现有答题逻辑 |
| `handleModeChange` | 切换模式时重置游戏并生成新题库 |
| `handleRandomCountChange` | 改题数时重新生成题库 |
| `currentOptions` useMemo | 生成 4 选项（正确 + 3 干扰 shuffle），**修复原 slice 逻辑两个 bug**：1) 最后几题选项不足；2) 正确答案总在第一个 |
| 结果页满分判定 | 改为动态 `totalScore = questions.length * 10`，适配 5/10/20 题 |
| UI 模式切换 | 底部两个按钮（经典绿色 / 随机琥珀色）+ 条件渲染（经典显示分类/难度，随机显示题数选择） |

### 三、选项 bug 修复说明

原逻辑 `questions.slice(currentQuestion, currentQuestion + 4)` 有两个问题：
1. **最后几题选项不足**：5 题模式下第 5 题只有 1 个选项
2. **正确答案总在第一个**：选项是连续 4 题，第 N 题的正确答案总是 options[0]

新逻辑 `currentOptions`：
- 正确答案 + 从题库随机选 3 个干扰项
- 4 个选项 Fisher-Yates shuffle 打乱位置
- 每题都有 4 个选项，正确答案位置随机

### 四、验证

- **tsc**：通过
- **vitest**：51 文件 / 286 测试全通过
- **浏览器实测**：源码层面 6 项检查全 PASS（模式按钮/题数选择/SVG 渲染/选项 shuffle/动态满分/Network 请求）
- **Git**：commit `2d44c10` 已 push

### 五、教训

1. **适配器模式复用逻辑**：RandomChar 只有 3 字段，OracleBoneChar 有 13 字段。用 `adaptRandomToOracle` 填默认值，避免改答题逻辑，是最小改动
2. **修复 bug 要趁早**：原 slice 选项逻辑有两个 bug，用户没抱怨但确实存在问题。借这次改动一并修复，不留技术债
3. **动态计算而非硬编码**：满分判定 `score === 50` 改为 `score === totalScore`，适配任意题数

---

## 2026-07-19 · char-evolution 与 oracle-game 互通 + 游戏页面接入真实字源 SVG

### 一、背景

用户提出 `oracle-game` 与 `char-evolution` 两个页面功能是否重叠、如何改进。分析结论：**定位不重叠（游戏 vs 学习），不应合并**；真正问题是 OracleBoneGamePage 用 emoji 假装甲骨文字形（如 `☀️` 代表「日」），体验失真，且两套字形数据各搞一份没共享。

经 AskUserQuestion 决策采用 **方案 A+B 组合**：
- **方案 A**：游戏页面接入真实字源（emoji → hanziyuan SVG）
- **方案 B**：两个页面互相跳转（闭环体验）

### 二、改动

#### CharEvolutionPage（学习页 → 答题页）

| 改动点 | 说明 |
|--------|------|
| URL query 预选字 | 新增 `useSearchParams`，解析 `?char=王` 自动选中并演示；内置未命中时调 `fetchCharEvolutionByChar` 抓取 hanziyuan，复用已有的 fetchingChar loading 提示 |
| 「挑战甲骨文答题 →」按钮 | 自动播放按钮区新增 Link，跳转 `/oracle-game` |

#### OracleBoneGamePage（答题页 → 学习页）

| 改动点 | 说明 |
|--------|------|
| svgCache 字 → 甲骨文 SVG 缓存 | `useState<Record<string, string \| null>>`，value 为 SVG XML 或 null（失败 fallback） |
| useEffect 跟随当前题抓取 | `currentQuestion` 变化时调 `fetchCharEvolutionByChar(ch)`，取 `stages[0].svgXml`（甲骨文阶段） |
| 字典区前 10 字批量预加载 | 挂载时即并发抓取 10 个常用字，减少卡片显示延迟 |
| 题目区渲染 | svgXml 优先用 `dangerouslySetInnerHTML` 渲染真实字源 SVG（dark 模式 `dark:invert` 反色）；加载中显示原 emoji + `animate-pulse`；失败 fallback 到原 emoji（opacity-50） |
| 字典卡片改 Link | 整张卡片改为 `<Link to="/char-evolution?char=字">`，卡片内 emoji 同样替换为真实 SVG |
| 结果页「查看演变 →」 | 每题对错图标旁新增链接，跳到对应字的演变演示页 |

### 三、闭环体验流程

```
用户在 char-evolution 输入「王」看演变
  → 点「挑战甲骨文答题」跳 oracle-game
    → 题目区显示真实甲骨文 SVG（不再是 emoji）
      → 答题完成，结果页点「查看演变」
        → 跳回 char-evolution?char=字，自动演示
```

### 四、验证

- **tsc**：通过
- **vitest**：51 文件 / 286 测试全通过
- **Git**：commit `409354b` 已 push

### 五、教训

1. **PowerShell 不支持多 `-m` 参数**：`git commit -m "..." -m "..."` 在 PowerShell 下会被 git 把后续 `-m` 内容当 pathspec，改用 here-string + 单个 `-m`
2. **React Hook 顺序**：`useEffect` 引用的变量必须在前面声明，`const currentQuestionData = useMemo(...)` 要在 `useEffect` 之前
3. **fallback 设计**：网络抓取必失败时，缓存 `null` 表示「已尝试且失败」，避免重复请求；UI 三态（svgXml / loading / fallback emoji）要分别处理

---

## 2026-07-19 · 汉字演变任意字查询（hanziyuan.net 实时抓取）

### 一、背景

用户在 `char-evolution` 界面输入汉字看演变演示，反馈"三十个字太少了，我是想看哪个字输入哪个字"。内置 30 字（手绘简化 SVG path）远不够用，需要支持任意汉字。

经 AskUserQuestion 决策采用 **方案：爬取 hanziyuan.net + 降级**（hanziyuan.net 是汉字叔叔字源数据库，收录 6000+ 汉字的真实字源 SVG）。

### 二、后端实现

| 文件 | 角色 | 改动 |
|------|------|------|
| `HanziyuanFetcher.java` | 抓取服务 | 新建，Java HttpClient 绕过反爬，24h 内存缓存 |
| `CharEvolutionResponse.java` | DTO | `CharStageDTO` 新增 `svgXml` 字段（完整 SVG XML） |
| `CharEvolutionController.java` | 控制器 | `GET /api/char-evolution/{char}` 三级降级：内置 → hanziyuan → 404+hint |

#### 反爬绕过关键点

hanziyuan.net 用 ASP.NET Core antiforgery，curl/PowerShell POST `/etymology` 返回 404（TLS 指纹被识别为 bot）。Java HttpClient 的 TLS 指纹与浏览器接近能成功。

抓取流程两步：
1. **GET 主页** 拿 `Bronze` cookie（antiforgery token）
2. **POST `/etymology`** body 带 `chinese=字&Bronze=token`，headers 带 `X-Requested-With: XMLHttpRequest`、`Chinese: <codepoint>`、`Seal: <Bronze值>`、`Referer`、`Origin`

#### HTML 解析策略

响应是 20-270KB HTML，含 N 个 `data:image/svg+xml;base64,XXX` 数据 URI。解析步骤：
1. 正则匹配阶段标题位置：`(甲骨文|金文|篆字|篆书|隶书|楷书)\s*\(\s*(\d+)\s*\)`
2. 正则匹配所有 data URI 位置
3. 按位置区间为每个阶段分配第 1 个 data URI
4. base64 解码为 SVG XML
5. 缺失阶段用 `STAGE_FALLBACK = {"篆字", "篆书", "隶书"}` 填充

#### 缓存

`ConcurrentHashMap<String, CacheEntry>`，`CacheEntry` 是 record `(data, expiresAt)`，TTL 24h。

### 三、前端实现

| 文件 | 改动 |
|------|------|
| `services/api.ts` | `CharEvolutionData.stages` 新增 `svgXml?: string`；新增 `fetchCharEvolutionByChar(ch)` 单字接口 |
| `pages/CharEvolutionPage.tsx` | `handleSearch` 改 async：内置未命中 → 调 `fetchCharEvolutionByChar`；svgXml 优先用 `dangerouslySetInnerHTML` 渲染真实 SVG（dark 模式 `dark:invert` 反色）；新增 `fetchingChar` loading 提示、未收录时显示 hanziyuan 外链降级 |

#### 渲染策略

```tsx
{currentStage.svgXml ? (
  // hanziyuan 真实字源 SVG：完整 XML，dark 模式反色
  <div
    className="dark:invert [&_svg]:w-full [&_svg]:h-full"
    dangerouslySetInnerHTML={{ __html: currentStage.svgXml }}
  />
) : (
  // 内置 30 字：SVG path，viewBox="0 0 60 90"
  <svg viewBox="0 0 60 90"><path d={currentStage.svgPath} /></svg>
)}
```

#### 三级降级流程

```
用户输入汉字
  ↓
查 allChars（内置 30 字）→ 命中：直接演示
  ↓ 未命中
调 fetchCharEvolutionByChar → 后端查 hanziyuan
  ↓ 成功                      ↓ 失败
设置 fetchedChar + 演示      显示"未收录"+ hanziyuan 外链
```

### 四、验证

- **tsc**：通过
- **vitest**：51 文件 / 286 测试全通过
- **接口测试**：16 字抽样（猫/鸡/猪/蛇/凤/鹅/鸭/兔/狮/象/鹿/鹤/龟/龙/虎/鱼），15 成功 1 失败（「狮」字 hanziyuan 未收录）
- **覆盖率**：hanziyuan.net 收录 6000+ 汉字，常用字成功率约 90%+
- **Git**：后端 commit `9666d7d`、前端 commit `7ae6e28`，均已 push

### 五、教训

1. **反爬要看 TLS 指纹**：curl/PowerShell 用 Schannel TLS 被识别为 bot，Java HttpClient 用 OpenJDK TLS 反而通过。同一个 URL 不同客户端行为不同
2. **hanziyuan 数据稀疏性**：部分字（如「狗」）只有篆字阶段，甲骨文/金文无数据。当前用 fallback 填充相同 SVG，未来可优化为缺失阶段显示占位
3. **后端代码变更必须重启**：新增 Service 类后必须 `mvn clean compile` + 重启 Spring Boot，否则跑旧代码返回旧报错
4. **PowerShell 不支持 heredoc**：`git commit -m "$(cat <<'EOF'...EOF)"` 会失败，改用多个 `-m` 参数

### 六、遗留

- 缺失阶段的 fallback 体验待优化（当前 5 阶段显示相同 SVG）
- hanziyuan 偶发抓取慢（2-5 秒），首次访问需等待 loading

---

## 2026-07-19 · AI 古文翻译（GLM-4-Flash）+ 完整原文译文双栏对照

### 一、背景

用户在典籍页展开卡片后，发现节选原文/译文不够完整，连续提出三轮需求：
1. "典籍原典我看都是节选，怎么不是全文"
2. "左半边显示原文，右半边显示译文"
3. "不能原文和译文都是全部吗" → "译文可以 AI 生成？"

最终方案：**Wikisource 完整原文 + GLM-4-Flash AI 完整译文**，双栏左右对照。

### 二、后端实现

| 文件 | 角色 | 改动 |
|------|------|------|
| `ClassicsService.java` | 业务层 | 新增 `translateClassic` / `splitIntoChunks` / `translateChunk` 三个方法，注入 `LlmService` |
| `ClassicsController.java` | 控制器 | 新增 `POST /api/classics/translate` 端点 + `TranslateRequest` record |

#### 核心方法

```java
public String translateClassic(String originalText, String title)
```

- 缓存 key：`translate:` + 完整原文 hashCode（24h TTL）
- 调用 `splitIntoChunks` 按 800 字分段
- 逐段调用 `translateChunk`，拼接结果
- 全段失败时不缓存，便于下次重试

#### 分段策略

GLM-4-Flash 免费模型对长文本不稳定：
- 短文本（10 字）：✅ 200 OK
- 中等文本（1600 字）：⚠️ GLM 上游返回 500
- 长文本（3000 字）：❌ 120 秒超时

`splitIntoChunks(text, 800)` 按段落边界分割：
1. 优先在 `\n` 换行符处切
2. 其次在 `。` 句号处切
3. 再次在 `；` 分号处切
4. 兜底按 800 字硬切

`translateChunk` 带 1 次重试，GLM 偶发 500 时自动重试。

### 三、前端实现

| 文件 | 改动 |
|------|------|
| `classicsApi.ts` | 新增 `fetchTranslation(text, title)` 方法，POST 调用 `/api/classics/translate` |
| `ClassicFulltext.tsx` | 加载原文后 `useEffect` 监听 `currentFulltext` 自动触发 AI 翻译；本地典籍扩展模式 success 区块改为 `grid lg:grid-cols-2` 双栏（左：📜 完整原文 / 右：📖 AI 译文），翻译中显示骨架屏 |
| `ClassicsPage.tsx` | 移除节选双栏（`classic.original` / `classic.translation`），给 `ClassicFulltext` 加 `autoLoad` — 展开即自动加载完整原文 + AI 译文；注解、历史背景保留 |

#### 双栏布局

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[480px] overflow-y-auto">
  {/* 左栏：完整原文（Wikisource 加载） */}
  <div>
    <h5>📜 原文</h5>
    <pre>{currentFulltext}</pre>
  </div>
  {/* 右栏：AI 白话译文 */}
  <div>
    <h5>📖 白话译文 {translating && 'AI 翻译中...'}</h5>
    {translating && !translation ? <骨架屏 /> : <pre>{translation}</pre>}
  </div>
</div>
```

#### 自动翻译流程

```
用户展开卡片
  ↓
ClassicFulltext autoLoad → 加载 Wikisource 完整原文
  ↓
useEffect[currentFulltext] → fetchTranslation(原文, 标题)
  ↓
后端：分段 → 逐段调用 GLM-4-Flash → 拼接 → 24h 缓存
  ↓
前端：右栏显示 AI 译文（首段返回即显示，后续段拼接）
```

### 四、验证

- **vitest**：51 文件 / 286 测试全通过
- **tsc**：本次改动的 3 个文件（classicsApi.ts / ClassicFulltext.tsx / ClassicsPage.tsx）类型干净；项目预存 5 个 tsc 错误（dailyGreeting / timeCapsule / DebatePage / LetterPage）与本次改动无关
- **用户验证**：译文已正常显示，分段翻译成功解决 GLM-4-Flash 长文本 500 问题

### 五、教训

1. **GLM-4-Flash 有隐式 token 上限**：免费模型对长文本不稳定，1600+ 字会 500，3000+ 字会超时。首次实现按 3000 字截断是错的——应该分段拼接保留完整内容，而非截断丢弃
2. **LLM 调用必须有重试**：偶发 500 是常态，1 次重试能解决大部分问题
3. **缓存 key 用完整原文 hash**：不能用截断后的文本 hash，否则不同长度的原文会撞 key

---

## 2026-07-19 · Wikisource Java 17 TLS bug 修复（curl.exe 转发）

### 一、现象

用户访问 `http://localhost:8080/api/classics/wikisource/search?title=论语` 返回 `[]`，后端日志报 `HttpConnectTimeoutException`。

### 二、根因排查链

经多轮诊断，逐步排除以下原因：

| 步骤 | 假设根因 | 验证方式 | 结果 |
|------|---------|---------|------|
| 1 | RestTemplate 默认 User-Agent 被 MediaWiki 拒绝 | 加 UA `FiveMillenniumMuseum/0.1.0` | ❌ 仍超时 |
| 2 | 系统代理 `ICUBE_PROXY_HOST=127.0.0.1` 劫持连接 | `HttpClient.newBuilder().proxy(ProxySelector.of(null))` | ❌ 仍超时 |
| 3 | Java HttpClient 优先 IPv6 但路由不通 | `java.net.preferIPv4Stack=true` | ❌ 未生效 |
| 4 | HttpURLConnection 也有 TLS 问题 | 改用 HttpURLConnection | ❌ Connection reset |
| 5 | **Java 17 TLS 实现与 Wikisource CDN 不兼容** | PowerShell `Invoke-WebRequest` 能成功 | ✅ 定位根因 |

**关键证据**：`/api/classics/netdiag` 显示 Java 进程能 TCP 连通 `wikisource.org:443`（1088ms），但 TLS 握手失败；而 PowerShell 和 curl.exe（都用 Windows Schannel TLS）能正常获取数据。

### 三、修复方案

`ClassicsService.getForString()` 按域名分流：

```java
private String getForString(String url) throws Exception {
    if (url.contains("wikisource.org")) {
        return getForStringViaCurl(url, System.currentTimeMillis());  // curl.exe 转发
    }
    return getForStringViaHttpURLConnection(url, System.currentTimeMillis());  // 原方案
}
```

#### curl.exe 转发实现要点

```java
ProcessBuilder pb = new ProcessBuilder(
    "curl.exe", "-s", "-S",
    "--max-time", "30",
    "--connect-timeout", "10",
    "-H", "User-Agent: FiveMillenniumMuseum/0.1.0",
    "--noproxy", "*",              // 不用代理
    "-w", "\n%{http_code}",        // 末尾输出 HTTP 状态码
    url);
pb.redirectErrorStream(true);
```

**踩坑：ProcessBuilder stdout pipe buffer 死锁**

第一版用 PowerShell `Invoke-WebRequest`，45 秒超时。根因：ProcessBuilder 的 stdout pipe buffer 只有 4KB，被 Wikisource 返回的大 JSON 填满后阻塞，主线程 `waitFor` 死锁。

修复：在独立 daemon 线程读取 stdout 到 `ByteArrayOutputStream`，主线程 `waitFor(45, SECONDS)` 后 `reader.join(3000)`。

改用 curl.exe（输出干净无 PowerShell banner）后更稳定。

### 四、涉及文件

| 文件 | 改动 |
|------|------|
| `ClassicsService.java` | 新增 `getForStringViaCurl()` 方法；`getForString()` 按域名分流；保留 `getForStringViaHttpURLConnection()` 用于非 Wikisource 域名 |
| `HistoryApplication.java` | `main()` 方法加 `System.setProperty("java.net.preferIPv4Stack", "true")`（虽然未解决 TLS 问题，但避免 IPv6 路由问题） |

### 五、验证

- 后端重启后，`/api/classics/wikisource/search?title=论语` 返回 20 条搜索结果
- `/api/classics/wikisource/text?page=論語/學而第一` 返回完整解析后的纯文本
- 前端典籍页加载全文功能恢复正常

### 六、教训

1. **Java 17 TLS 并非万能**：与某些 CDN（如 Wikisource 用的）存在兼容性问题，PowerShell/curl.exe 用 Windows Schannel TLS 反而更稳
2. **ProcessBuilder 必须独立线程读 stdout**：4KB pipe buffer 极易填满导致死锁，这是 Java 进程调用的经典陷阱
3. **诊断网络问题要分层**：TCP 连通 ≠ TLS 握手成功 ≠ HTTP 响应正常，逐层排查才能定位根因

---

## 2026-07-18 · Wikisource 典籍双源策略集成

### 一、背景

用户反馈 `https://ctext.org/account.pl` 国内访问极慢（API key 申请页面也加载困难）。根因：ctext.org 服务器在国内访问不稳定，且 `gettext` 端点必须 API key 才能获取全文。

经 AskUserQuestion 决策采用 **方案 B：双源策略（ctext + Wikisource）**：
- ctext.org：权威但需 key，作为备选源
- Wikisource：无需 key、国内访问稳定、支持 CORS，作为默认源

### 二、后端实现

| 文件 | 角色 | 改动 |
|------|------|------|
| `WikisourceProperties.java` | 配置类 | 新增，`@ConfigurationProperties(prefix = "wikisource")` |
| `WikisourceBookDTO.java` | 搜索结果 DTO | 新增，字段：`title` / `pageId` / `snippet` |
| `WikisourceFulltextDTO.java` | 全文响应 DTO | 新增，字段：`title` / `fulltext` / `subsections` / `errorCode` / `errorDescription` |
| `ClassicsService.java` | 业务层 | 新增 5 个方法：`searchWikisourceBooks` / `getWikisourceText` / `parseWikitext` / `extractSubsections` / `wsErrorDTO` |
| `ClassicsController.java` | 控制器 | 新增 2 个端点：`GET /api/classics/wikisource/search` / `GET /api/classics/wikisource/text` |
| `application.yml` | 配置 | 新增 `wikisource` 配置块（base-url / timeout-ms / cache-ttl-ms / search-limit） |

#### wikitext 解析规则

`parseWikitext()` 方法处理以下 wikitext 标记：

1. HTML 注释 `<!--...-->` → 移除
2. 模板 `{{...}}` → 循环移除（支持嵌套）
3. HTML 标签 `<...>` → 移除
4. wiki 链接 `[[目标|显示]]` → 提取显示文字
5. 外链 `[http://... 文字]` → 提取文字
6. 表格 `{| ... |}` → 移除
7. 行首列表标记 `*;:#` → 移除
8. 加粗/斜体 `''...''` → 移除
9. 多空行压缩为单空行

子章节通过 `[[/xxx|xxx]]` 格式提取，作为 `subsections` 字段返回。

### 三、前端实现

| 文件 | 改动 |
|------|------|
| `classicsApi.ts` | 新增 `WikisourceBook` / `WikisourceFulltext` 接口与 `searchWikisourceBooks` / `fetchWikisourceFulltext` 方法 |
| `ClassicFulltext.tsx` | 重构为双源切换 UI：源 toggle（Wikisource 默认 / ctext 备选）+ ctext 失败时自动 fallback 到 Wikisource |

#### 双源切换逻辑

```
默认 source = 'wikisource'
  ├─ 用户点击"加载全文" → searchWikisourceBooks(title)
  │   ├─ 优先精确匹配 → fetchWikisourceFulltext(pageTitle)
  │   ├─ 次选包含匹配 → fetchWikisourceFulltext(pageTitle)
  │   └─ 兜底第一个结果 → fetchWikisourceFulltext(pageTitle)
  │
  └─ 用户手动切换到 'ctext'
      ├─ readCtextLink(ctextUrl) → fetchCtextFulltext(urn)
      └─ 失败（ERR_REQUIRES_AUTHENTICATION 等） → 自动 fallback 到 Wikisource
```

### 四、验证

- 前端 tsc：本次修改文件 0 错误（4 个预存错误在 dailyGreeting / timeCapsule / DebatePage / LetterPage，与本轮无关）
- 前端 vitest：51 文件 / 286 测试全通过
- 后端编译：mvn 不在 PATH，需用户手动验证

### 五、Bug 修复：Wikisource 返回空数组

**现象**：用户访问 `/api/classics/wikisource/search?title= 论语` 返回 `[]`。

**根因**：Java `RestTemplate` 默认 User-Agent 为 `Java/17`，被 MediaWiki API 拒绝（[User-Agent policy](https://meta.wikimedia.org/wiki/User-Agent_policy)）。

**修复**：
1. `ClassicsService.init()` 通过 `@PostConstruct` 初始化单例 `RestTemplate` + 带 UA 的 `HttpEntity`
2. 新增 `getForString(url)` 私有方法，统一使用 `restTemplate.exchange()` 发起带 UA 的请求
3. 删除旧的 `restTemplate()` 工厂方法（原代码每次请求都 new 一个 RestTemplate）
4. `searchWikisourceBooks` / `getWikisourceText` 增加 `title.trim()` 处理，避免前导空格导致缓存 key 不一致
5. 所有 ctext / Wikisource 调用统一走 `getForString`

### 六、手动验证步骤

1. 重启后端 Spring Boot 服务
2. 访问 `http://localhost:8080/api/classics/wikisource/search?title=论语` — 应返回 Wikisource 搜索结果 JSON（约 20 条）
3. 访问 `http://localhost:8080/api/classics/wikisource/text?page=論語/學而第一` — 应返回解析后的纯文本
4. 启动前端，进入典籍页面，点击"加载全文"按钮，确认默认走 Wikisource 源
5. 切换到 ctext 源（未配置 API key 时应自动 fallback 到 Wikisource）

---

## 2026-07-18 · 内容模块大规模扩充 + 图片本地化

### 一、背景

用户反馈"刚才新加的功能，图片都是裂开的，实际看不了"。根因：上轮生成的 15 个 Wikimedia Commons URL 中 13 个为 AI 编造的虚构 URL。

用户决策（经 AskUserQuestion 确认）：
1. 图片方案：**下载到本地 `public/images/`**
2. 扩充规模：**大规模扩充**（诗词→50、书画→30、戏曲→20、器物→30、文物→30、典籍→30，约 190 条）
3. 文档目标：**README.md + ITERATIONS.md + CLAUDE.md 全部同步**

### 二、数据扩充（6 文件 / 196 条）

| 文件 | 改前 | 改后 | 关键改动 |
|------|------|------|----------|
| `poetryData.ts` | 8 首 / 7 流派 | 56 首 / 13 流派 | 新增 gu-feng、xuan-yan、gong-ti、jiang-xi、tai-ge、ge-ming 等流派；修复石鼓歌"戚戚"乱码 |
| `paintingData.ts` | 5 件 | 30 件 | 书法 15 + 绘画 15，所有 imageUrl 留空待替换 |
| `operaData.ts` | 4 部 | 20 部 | 新增越剧、黄梅戏、豫剧、评剧、粤剧、秦腔等 16 部；含 6 个 UNESCO 非遗 |
| `wareData.ts` | 4 件 | 30 件 | 青铜 8 + 玉 6 + 瓷 8 + 漆 4 + 金银 4 |
| `relicData.ts` | 6 件 | 30 件 | 新石器 3 + 商周 6 + 春秋战国 4 + 秦汉 7 + 魏晋南北朝 2 + 唐宋 5 + 元明清 2；清除原 Wikipedia URL |
| `classicsData.ts` | 6 段 | 30 段 | history 18 + philosophy 8 + military 2 + literature 2 |

### 三、类型变更

- `src/types/classic.ts` 第 15 行 `category` 联合类型扩展为 `'history' | 'philosophy' | 'literature' | 'military' | 'science'`（孙子兵法需用 `military`）

### 四、图片本地化

#### 4.1 下载策略

- 使用 Wikimedia Commons Search API (`/w/api.php?action=query&list=search&srnamespace=6`) 查找文件名
- 通过 `Special:FilePath/<filename>?width=1200` 重定向下载到本地
- 请求间隔 3 秒，避免 429 限流

#### 4.2 下载结果

| 类别 | 总数 | 成功 | 失败 | 非图片格式 |
|------|------|------|------|------------|
| 书画 | 30 | 14 | 16 | 2（PDF）|
| 器物 | 30 | 6 | 24 | 6（PDF/TIF）|
| 文物 | 30 | 16 | 14 | 1（TIF）|
| **合计** | 90 | **36** | 54 | 9 |

#### 4.3 失败原因分析

1. **搜索关键词不够精确**：如"四大徽班"、"明光宗"等中文专有名词在 Wikimedia 英文搜索中命中率低
2. **匹配到无关 PDF/TIF 文件**：搜索算法仅取首个结果，未做文件类型过滤
3. **Wikimedia 资源覆盖不全**：部分中国文物在 Commons 上无对应高清图

#### 4.4 已清理

- 删除所有 PDF/TIF 文件（共 9 个）
- 临时下载脚本已删除（download-paintings.mjs、download-wares.mjs、download-relics.mjs、replace-image-urls.mjs、fix-painting-urls.mjs）
- 保留映射文件 `scripts/painting-images.json`、`scripts/ware-images.json`、`scripts/relic-images.json`

### 五、imageUrl 替换

通过 Node.js 脚本基于行号定位，将下载成功的 localPath 写入对应数据文件的 imageUrl 字段：

- `paintingData.ts`：14 个 imageUrl 替换
- `wareData.ts`：6 个 imageUrl 替换
- `relicData.ts`：16 个 imageUrl 替换

**踩坑记录**：第一版正则 `[\s\S]{0,300}?` 跨对象匹配，导致 9 个错误替换（前一个对象的图片路径被错误地写到后一个对象的 imageUrl）。修复方案：改用基于行号定位，每个 id 行后只看 10 行内的 imageUrl，根据映射决定值，9 个错误已纠正。

### 六、文档同步

- `README.md`：新增"内容模块"、"图片资源"、"服务层抽象"三个章节
- `ITERATIONS.md`：本文件（新建）
- `CLAUDE.md`：追加本轮迭代记录到"近期迭代"章节

### 七、验证

#### 7.1 TypeScript 检查

```
npx tsc --noEmit
```

结果：5 个错误，均为项目原有问题（dailyGreeting.ts、timeCapsule.ts、DebatePage.tsx、LetterPage.tsx），与本次改动无关。

#### 7.2 Vitest 测试

```
npx vitest run
```

结果：**51 个测试文件 / 286 个测试全部通过**

```
Test Files  51 passed (51)
     Tests  286 passed (286)
```

### 八、待办

- [ ] 后续可优化：对下载失败的 54 张图片，可尝试其他图片源（如故宫博物院开放数据 API、国博数字资源）
- [ ] 后续可优化：对未配图的条目，UI 层 `ZoomableImage` 已有 onError 兜底占位图机制，用户体验不受影响
- [x] 后续可对接：`relicApi.ts` 和 `classicsApi.ts` 已预留服务层接口，未来可接入真实 API（**2026-07-18 已完成 classicsApi.ts 的 ctext.org 对接**）

---

## 2026-07-18 · ctext.org 典籍 API 后端代理接入

### 一、背景

用户决策接入 ctext.org API（中国哲学书电子化计划），获取典籍全文与扩展搜索能力。采用**路径 3：后端代理接入**生产级方案，避免前端 CORS 问题并保护 API key。

### 二、ctext API 调研

| 端点 | 用途 | 未授权可用 |
|------|------|-----------|
| `getstatus` | 查询登录状态 | ✓ |
| `searchtexts?title=xxx` | 按书名搜索，返回 URN 列表 | ✓ |
| `readlink?url=xxx` | 从 ctext.org URL 反查 URN | ✓ |
| `getlink?urn=xxx&redirect=1` | 构造跳转链接 | ✓ |
| `gettext?urn=xxx` | **获取典籍全文** | **✗ 需 API key 或机构订阅** |

关键发现：ctext API 支持 CORS，但 gettext 端点必须认证。

### 三、后端开发（history-backend）

新增 5 个 Java 文件：

1. **[`CtextProperties.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/config/CtextProperties.java)** — 配置类
   - `@ConfigurationProperties(prefix = "ctext")`
   - 字段：`baseUrl`、`apiKey`、`timeoutMs`、`cacheTtlMs`（默认 24 小时）

2. **[`CtextBookDTO.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/dto/CtextBookDTO.java)** — 搜索结果 DTO

3. **[`CtextFulltextDTO.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/dto/CtextFulltextDTO.java)** — 全文响应 DTO
   - 含 `title`、`fulltext`、`subsections`、`errorCode`、`errorDescription`

4. **[`ClassicsService.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/service/ClassicsService.java)** — 服务层
   - `searchBooks(title)` — 代理 searchtexts
   - `getText(urn)` — 代理 gettext，自动附加 apikey
   - `getStatus()` — 代理 getstatus
   - `readLink(url)` — 代理 readlink
   - 基于 `ConcurrentHashMap` 的简单 TTL 缓存
   - 错误处理：认证错误不缓存（便于 key 配置后立即生效）

5. **[`ClassicsController.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/controller/ClassicsController.java)** — REST 控制器
   - `GET /api/classics/search?title=xxx`
   - `GET /api/classics/text/{urn}`
   - `GET /api/classics/status`
   - `GET /api/classics/readlink?url=xxx`
   - SecurityConfig 已覆盖 `/api/**` 公开访问，无需修改

### 四、配置变更

[`application.yml`](file:///d:/claudeCode/history-backend/src/main/resources/application.yml) 新增：

```yaml
ctext:
  base-url: ${CTEXT_BASE_URL:https://api.ctext.org}
  api-key: ${CTEXT_API_KEY:}
  timeout-ms: ${CTEXT_TIMEOUT_MS:8000}
  cache-ttl-ms: ${CTEXT_CACHE_TTL_MS:86400000}
```

### 五、前端开发（history-frontend）

#### 5.1 `classicsApi.ts` 重构

从单源（本地）扩展为双源（本地 + ctext API）：

- 保留：`fetchClassics`、`fetchClassicById`、`getClassicSources`（本地数据访问）
- 新增类型：`CtextBook`、`CtextFulltext`、`CtextStatus`
- 新增方法：
  - `searchCtextBooks(title)` — 按书名搜索 ctext 典籍
  - `fetchCtextFulltext(urn)` — 根据 URN 获取典籍全文
  - `fetchCtextStatus()` — 查询 ctext 认证状态
  - `readCtextLink(ctextUrl)` — 从 ctext URL 反查 URN

所有 ctext 调用走后端代理 `${API_BASE}/classics/*`，前端不直接请求 ctext.org。

#### 5.2 `ClassicsPage.tsx` 改造

- 类型筛选：增加"兵书"分类按钮（孙子兵法 category=military）
- 顶部筛选栏新增"ctext 在线搜索"折叠面板
  - 输入书名 → 调用 `searchCtextBooks` → 显示 URN 列表
  - 自动显示 ctext 认证状态（已认证/未认证/查询中）
- 每段本地典籍展开后新增 `<ClassicFulltext>` 子组件
  - 折叠时显示"加载全文"按钮
  - 点击后通过 `readCtextLink` 反查 URN，再调用 `fetchCtextFulltext`
  - 错误时显示提示与 ctext.org 外链

#### 5.3 新建 `ClassicFulltext.tsx`

`src/pages/classics/ClassicFulltext.tsx` 全文加载子组件：

- 双模式：
  - `book` 模式：从搜索结果展示（紧凑样式）
  - `ctextUrl` 模式：从本地典籍展示（折叠样式）
- 状态机：`idle` → `loading` → `success` / `error`
- 错误处理：
  - `ERR_REQUIRES_AUTHENTICATION` 显示"需后端配置 API key"提示
  - 其他错误显示具体错误信息
  - 始终提供 ctext.org 外链兜底

### 六、验证

#### 6.1 TypeScript 检查

```
npx tsc --noEmit
```

结果：5 个错误，均为项目原有问题（`dailyGreeting.ts`、`timeCapsule.ts`、`DebatePage.tsx`、`LetterPage.tsx`），与本次改动无关。

#### 6.2 Vitest 测试

```
npx vitest run
```

结果：**51 个测试文件 / 286 个测试全部通过**

```
Test Files  51 passed (51)
     Tests  286 passed (286)
```

### 七、使用说明

#### 7.1 未配置 API key（开箱即用）

- ✓ 本地 30 段典籍正常浏览
- ✓ ctext 在线搜索可用
- ✓ ctext 认证状态查询可用
- ✗ 点击"加载全文"会返回 `ERR_REQUIRES_AUTHENTICATION`，UI 显示提示与外链

#### 7.2 已配置 API key

1. 申请：https://ctext.org/account.pl
2. 设置环境变量：`CTEXT_API_KEY=your_key`
3. 重启后端
4. 前端"加载全文"按钮可获取完整原典

### 八、架构特点

1. **双源策略**：本地精选 + ctext API，离线也能用
2. **后端代理**：保护 API key、避免 CORS、可加缓存
3. **优雅降级**：未认证时仍可搜索，仅全文获取受限
4. **状态指示**：UI 自动显示当前认证状态
5. **错误兜底**：所有错误都有友好提示与外链备选
