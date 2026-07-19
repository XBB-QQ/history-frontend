# 五千年史馆 — React 前端

中国历史可视化平台 · React + TypeScript + Vite + Tailwind CSS

## 快速开始

```bash
# 1. 安装依赖
cd history-frontend
npm install

# 2. 复制数据文件
cp ../history-museum/data/*.json src/data/

# 3. 启动开发服务器
npm run dev

# 4. 构建生产版本
npm run build
```

## 项目结构

```
history-frontend/
├── public/             # 静态资源
│   ├── fonts/         # 自定义字体
│   ├── assets/        # 纹理、SVG
│   └── seal.svg       # 图标
├── src/
│   ├── main.tsx       # 入口
│   ├── App.tsx        # 路由
│   ├── index.css      # 全局样式
│   ├── styles/        # 设计令牌 & 效果
│   ├── pages/         # 页面组件
│   ├── components/    # 业务组件（待拆分）
│   ├── store/         # Zustand 状态管理
│   ├── types/         # TypeScript 类型
│   ├── utils/         # 工具函数
│   └── data/          # JSON 数据（需复制）
├── tailwind.config.js  # Tailwind 配置
├── vite.config.ts      # Vite 配置
└── package.json
```

## 设计令牌

所有颜色、字体、间距定义在 `src/styles/tokens.css` 中。

## 数据源

数据来自 `../history-museum/data/` 目录下的标准 JSON 文件：
- `events.json` — 87个历史事件
- `persons.json` — 50位历史人物
- `dynasties.json` — 13个朝代
- `knowledge-cards.json` — 14个知识卡片

## 内容模块（src/data/features/）

六大中华文化内容模块，共约 196 条精选数据：

| 模块 | 文件 | 数量 | 说明 |
|------|------|------|------|
| 诗词 | `poetryData.ts` | 56 首 | 13 个流派，覆盖先秦至近代 |
| 书画 | `paintingData.ts` | 30 件 | 书法 15 + 绘画 15 |
| 戏曲 | `operaData.ts` | 20 部 | 含 6 个 UNESCO 非遗 |
| 器物 | `wareData.ts` | 30 件 | 青铜/玉/瓷/漆/金银五大类 |
| 文物 | `relicData.ts` | 30 件 | 新石器至明清，按时代排列 |
| 典籍 | `classicsData.ts` | 30 段 | 史/哲/兵/文四大类，含 ctext 外链 |

### 图片资源（public/images/）

部分书画、器物、文物配有高清图片，来自 Wikimedia Commons：

- `painting/` — 14 张书画图片
- `ware/` — 6 张器物图片
- `relic/` — 16 张文物图片

未配图的条目由 `ZoomableImage` 组件自动显示占位图。图片下载映射保存在 `scripts/*-images.json`。

### 服务层抽象

- `src/services/relicApi.ts` — 文物 API 抽象（预留博物馆 API 接入）
- `src/services/classicsApi.ts` — 典籍 API 抽象（已对接 ctext.org API）

未来对接真实 API 时，UI 层无需改动。

## ctext.org 典籍 API 集成

典籍模块通过后端代理对接 [ctext.org](https://ctext.org)（中国哲学书电子化计划），提供原典全文获取与扩展搜索。

### 后端代理端点

| 端点 | 用途 | 认证 |
|------|------|------|
| `GET /api/classics/search?title=xxx` | 按书名搜索 ctext 典籍 | 公开 |
| `GET /api/classics/text/{urn}` | 根据 URN 获取典籍全文 | 需 API key |
| `GET /api/classics/status` | 查询 ctext 认证状态 | 公开 |
| `GET /api/classics/readlink?url=xxx` | 从 ctext URL 反查 URN | 公开 |

### API key 配置

1. 申请：[https://ctext.org/account.pl](https://ctext.org/account.pl)
2. 配置环境变量：
   ```
   CTEXT_API_KEY=your_api_key_here
   ```
3. 重启后端服务

未配置 API key 时，前端仍可使用搜索与状态查询，但无法获取典籍全文（会显示 `ERR_REQUIRES_AUTHENTICATION` 错误）。

### 前端功能

- **本地精选 30 段**：含白话译文与注解，离线可用
- **ctext 在线搜索**：在典籍页展开搜索面板，按书名查找 ctext 收录的所有版本
- **原典全文加载**：每段本地典籍可点击"加载全文"从 ctext 获取完整原典
- **状态指示器**：自动显示当前 ctext 认证状态

### 关键文件

- 后端：
  - [`ClassicsController.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/controller/ClassicsController.java)
  - [`ClassicsService.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/service/ClassicsService.java)
  - [`CtextProperties.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/config/CtextProperties.java)
- 前端：
  - [`classicsApi.ts`](file:///d:/claudeCode/history-frontend/src/services/classicsApi.ts) — 服务层
  - [`ClassicsPage.tsx`](file:///d:/claudeCode/history-frontend/src/pages/ClassicsPage.tsx) — 主页面
  - [`ClassicFulltext.tsx`](file:///d:/claudeCode/history-frontend/src/pages/classics/ClassicFulltext.tsx) — 全文加载子组件

## Wikisource 典籍 API 集成（双源策略）

针对 ctext.org 国内访问慢、需 API key 才能获取全文的问题，新增 [Wikisource](https://zh.wikisource.org)（维基文库）作为替代源。

### 双源策略

| 源 | 优势 | 劣势 |
|----|------|------|
| ctext.org | 权威、校勘规范、URN 体系完整 | 国内访问慢、获取全文需 API key |
| Wikisource | 无需 API key、国内访问稳定、支持 CORS | wikitext 需解析、繁简标题需匹配 |

前端 `ClassicFulltext` 组件默认使用 Wikisource（国内快速），用户可手动切换至 ctext；当 ctext 失败时自动 fallback 到 Wikisource。

### 后端代理端点

| 端点 | 用途 | 认证 |
|------|------|------|
| `GET /api/classics/wikisource/search?title=xxx` | 按书名搜索 Wikisource 页面 | 公开 |
| `GET /api/classics/wikisource/text?page=xxx` | 根据页面标题获取全文（已解析纯文本） | 公开 |

### 配置

`application.yml` 中已添加默认配置，无需手动设置：

```yaml
wikisource:
  base-url: ${WIKISOURCE_BASE_URL:https://zh.wikisource.org/w/api.php}
  timeout-ms: ${WIKISOURCE_TIMEOUT_MS:8000}
  cache-ttl-ms: ${WIKISOURCE_CACHE_TTL_MS:86400000}
  search-limit: ${WIKISOURCE_SEARCH_LIMIT:20}
```

### wikitext 解析

后端 `ClassicsService.parseWikitext()` 方法负责将 wikitext 转换为纯文本，处理：

- HTML 注释 `<!--...-->`
- 模板 `{{...}}`（支持嵌套循环移除）
- HTML 标签 `<...>`
- wiki 链接 `[[目标|显示]]` → 显示文字
- 外链 `[http://... 文字]` → 文字
- 表格标记 `{| ... |}`
- 列表/缩进行首标记 `*;:#`
- 加粗/斜体 `''...''`

子章节通过 `[[/xxx|xxx]]` 格式提取。

### 关键文件

- 后端：
  - [`WikisourceProperties.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/config/WikisourceProperties.java) — 配置类
  - [`WikisourceBookDTO.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/dto/WikisourceBookDTO.java) — 搜索结果 DTO
  - [`WikisourceFulltextDTO.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/dto/WikisourceFulltextDTO.java) — 全文响应 DTO
  - [`ClassicsService.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/service/ClassicsService.java) — 含 `searchWikisourceBooks` / `getWikisourceText` / `parseWikitext` 方法
  - [`ClassicsController.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/controller/ClassicsController.java) — 暴露 2 个 Wikisource 端点
- 前端：
  - [`classicsApi.ts`](file:///d:/claudeCode/history-frontend/src/services/classicsApi.ts) — 新增 `searchWikisourceBooks` / `fetchWikisourceFulltext` 及对应类型
  - [`ClassicFulltext.tsx`](file:///d:/claudeCode/history-frontend/src/pages/classics/ClassicFulltext.tsx) — 双源切换 UI + 自动 fallback

## 汉字演变 API 集成（任意字查询）

支持输入任意汉字查看从甲骨文到楷书的字形演变演示，三级降级保证可用性。

### 三级降级策略

```
用户输入汉字
  ↓
查内置 30 字（手绘简化 SVG path）→ 命中：直接演示
  ↓ 未命中
调后端 /api/char-evolution/{char} → hanziyuan.net 抓取
  ↓ 成功                         ↓ 失败
渲染真实字源 SVG XML             显示"未收录" + hanziyuan 外链
```

### 后端代理端点

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/char-evolution` | GET | 返回内置 30 字列表 |
| `/api/char-evolution/{char}` | GET | 查询单字演变数据，三级降级 |

### hanziyuan.net 反爬绕过

hanziyuan.net 用 ASP.NET Core antiforgery，curl/PowerShell POST `/etymology` 返回 404（TLS 指纹被识别为 bot）。Java HttpClient 的 TLS 指纹与浏览器接近能成功。

抓取流程两步：
1. GET 主页拿 `Bronze` cookie（antiforgery token）
2. POST `/etymology` body 带 `chinese=字&Bronze=token`，headers 带 `X-Requested-With` / `Chinese` / `Seal` / `Referer` / `Origin`

24h 内存缓存（`ConcurrentHashMap`），避免重复抓取。

### 前端渲染策略

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

### 关键文件

- 后端：
  - [`HanziyuanFetcher.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/service/HanziyuanFetcher.java) — 抓取服务（HttpClient + CookieManager + 24h 缓存）
  - [`CharEvolutionResponse.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/dto/CharEvolutionResponse.java) — DTO，`CharStageDTO` 含 `svgPath` / `svgXml` 二选一字段
  - [`CharEvolutionController.java`](file:///d:/claudeCode/history-backend/src/main/java/com/history/controller/CharEvolutionController.java) — 三级降级控制器
- 前端：
  - [`api.ts`](file:///d:/claudeCode/history-frontend/src/services/api.ts) — `fetchCharEvolutionByChar(ch)` 单字接口
  - [`CharEvolutionPage.tsx`](file:///d:/claudeCode/history-frontend/src/pages/CharEvolutionPage.tsx) — 输入即演示、svgXml 优先渲染、fetchingChar loading、未收录外链降级

### 覆盖率

hanziyuan.net 收录 6000+ 汉字，常用字成功率约 90%+。16 字抽样测试（猫/鸡/猪/蛇/凤/鹅/鸭/兔/狮/象/鹿/鹤/龟/龙/虎/鱼）15 成功 1 失败（「狮」字未收录）。

## char-evolution 与 oracle-game 互通（A+B 方案）

两个页面定位不同（学习 vs 游戏），不合并；通过接入同一字源数据源 + 互相跳转实现闭环。

### 闭环流程

```
char-evolution 输入「王」看演变
  → 点「挑战甲骨文答题 →」跳 oracle-game
    → 题目区显示真实甲骨文 SVG（不再是 emoji ☀️）
      → 答题完成，结果页点「查看演变 →」
        → 跳回 char-evolution?char=王，自动演示
```

### CharEvolutionPage 改动

- 新增 `useSearchParams`，解析 `?char=王` 自动选中并演示；内置未命中时调 `fetchCharEvolutionByChar` 抓取 hanziyuan
- 自动播放按钮区新增「挑战甲骨文答题 →」Link 跳 `/oracle-game`

### OracleBoneGamePage 改动

- `svgCache: Record<string, string | null>` 缓存字 → 甲骨文 `svgXml`，value 为 null 表示已抓取且失败
- `useEffect` 跟随 `currentQuestion` 调 `fetchCharEvolutionByChar(ch)`，取 `stages[0].svgXml`（甲骨文阶段）
- 字典区前 10 字挂载时批量预加载
- 题目区三态渲染：
  - svgXml 存在 → `dangerouslySetInnerHTML` 渲染真实 SVG（dark 模式 `dark:invert` 反色）
  - 加载中（value === undefined）→ 原 emoji + `animate-pulse`
  - 失败（value === null）→ 原 emoji + `opacity-50`
- 字典卡片整体改为 `<Link to="/char-evolution?char=字">`，卡片内 emoji 同样替换为真实 SVG
- 结果页每题对错图标旁新增「查看演变 →」链接

### 关键文件

- [`CharEvolutionPage.tsx`](file:///d:/claudeCode/history-frontend/src/pages/CharEvolutionPage.tsx) — `useSearchParams` query 预选字 + 跳转按钮
- [`OracleBoneGamePage.tsx`](file:///d:/claudeCode/history-frontend/src/pages/OracleBoneGamePage.tsx) — svgCache + 三态渲染 + 双向跳转

## oracle-game 随机挑战模式（120 字完全随机出题）

题库从 40 字扩展到 120 字，支持完全随机出题。底部模式切换：经典题库（40 字）/ 随机挑战（120 字）。

### 字池结构

[`randomCharPool.ts`](file:///d:/claudeCode/history-frontend/src/data/features/randomCharPool.ts) 内置 120 字，8 分类：

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

每字含 `char` + `meaning` + `category` 三字段；甲骨文 SVG 通过 `fetchCharEvolutionByChar` 实时抓取（hanziyuan.net）。

### 选项生成（修复原 slice bug）

原 `questions.slice(currentQuestion, currentQuestion + 4)` 有两个问题：
1. 最后几题选项不足（5 题模式第 5 题只有 1 个选项）
2. 正确答案总在第一个（连续 4 题选项，第 N 题正确答案是 options[0]）

新 `currentOptions` useMemo：
- 正确答案 + 从题库随机选 3 个干扰项
- 4 选项 Fisher-Yates shuffle 打乱位置
- 每题都有 4 个选项，正确答案位置随机

### 适配器模式复用答题逻辑

RandomChar（3 字段）→ OracleBoneChar（13 字段）通过 `adaptRandomToOracle` 适配，缺字段填默认值，复用现有答题/计分/结果页逻辑，避免分叉代码。

### 动态满分判定

结果页评级按题数动态计算：
- `totalScore = questions.length * 10`
- perfect: `score === totalScore`
- excellent: `score >= totalScore * 0.8`
- good: `score >= totalScore * 0.6`
- poor: `score < totalScore * 0.6`

适配经典 5 题（满分 50）/ 随机 5/10/20 题（满分 50/100/200）。

## oracle-game 无限挑战模式（Unicode CJK 2万字动态生成）

题库不再受静态字池限制，从 Unicode CJK 基本区（U+4E00-U+9FA5，共 20902 字）随机选字，按需调后端 `/api/char-evolution/{char}` 抓取甲骨文 SVG 出题。底部新增第三个紫色按钮「无限挑战」。

### 核心函数 `generateInfiniteQuiz(count)`

```typescript
const CJK_START = 0x4e00;
const CJK_END = 0x9fa5;
const CJK_RANGE = CJK_END - CJK_START + 1; // 20902

while (collected.length < count) {
  // 1. 生成一批随机字（BATCH_SIZE=8），Set 去重
  // 2. Promise.all 并发调 fetchCharEvolutionByChar
  // 3. 过滤 null（404 或无 SVG 的字跳过）
  // 4. collected.push(...results)
}
```

- **批量并发 8 字**：兼顾速度与后端压力
- **404 跳过重试**：hanziyuan 未收录的字返回 404，自动跳过换字重试
- **回退机制**：极端情况（连续 404 字库耗尽）自动切回经典模式

### 三模式对比

| 模式 | 颜色 | 字源 | 题数 |
|------|------|------|------|
| 经典题库 | 绿色 | 内置 40 字（带分类/难度） | 5 题 |
| 随机挑战 | 琥珀色 | 内置 120 字字池 | 5/10/20 题 |
| 无限挑战 | 紫色 | Unicode CJK 2万字动态抓取 | 5/10/20 题 |

### 渲染复用

infinite 模式产生的 `OracleBoneChar[]` 复用既有逻辑，零分叉：

- svgCache + 四态渲染（svgXml > svgPath > 加载中 emoji pulse > fallback emoji）
- currentOptions shuffle（正确 + 3 干扰 Fisher-Yates 打乱）
- 动态满分判定（`totalScore = questions.length * 10`）
- 题干不泄题（答题前不显示答案字，答完后显示正确答案作为复盘）

## oracle-game 四项体验优化（错题本/历史最高分/字源释义/全局缓存/进度可视化）

### 错题本 + 历史最高分

[`oracleGameStore.ts`](file:///d:/claudeCode/history-frontend/src/store/oracleGameStore.ts) — zustand + localStorage 持久化（key=`oracle-game-stats`）：

| 字段 | 说明 |
|------|------|
| `wrongChars` | 错题本（同字去重，限 100 条） |
| `bestScore` / `bestAccuracy` | 历史最高分 / 正确率 |
| `totalGames` | 累计答题次数 |

- 答错自动入错题本；结束时调 `recordResult` 返回 `{ newBestScore, newBestAccuracy }`
- 结果页展示历史最高分 chip + 破纪录动画 + 错题本卡片（可单删/清空）
- 第四模式按钮「复习错题」（rose 色），`adaptWrongToOracle` 适配器复用答题逻辑

### 答完显示字源释义

答题后展开 amber 卡片三栏：字形（`visualDescription`）+ 背景（`culturalContext`）+ 年代（`dynasty`）。随机/无限/复习模式不展示（避免占位文字噪声）。答对/答错状态 chip 即时反馈。

### svgCache 提升到全局 store

[`charEvolutionStore.ts`](file:///d:/claudeCode/history-frontend/src/store/charEvolutionStore.ts) — zustand store，会话级共享（无持久化）：

```typescript
getOrFetch(char)  // 命中 cache 即返回，未命中调 API 并写入 cache
prefetch(chars)   // 批量预抓
```

[`OracleBoneGamePage.tsx`](file:///d:/claudeCode/history-frontend/src/pages/OracleBoneGamePage.tsx) 和 [`CharEvolutionPage.tsx`](file:///d:/claudeCode/history-frontend/src/pages/CharEvolutionPage.tsx) 都接入 `getOrFetch`：

- 答题页抓过的字，演变页打开秒开
- infinite 模式同一字重出时秒回
- 字典区前 10 字预加载改用 `prefetch`

### infinite 进度可视化

`generateInfiniteQuiz` 每批 `Promise.all` 完成后更新 `{ found, needed, tried, hitRate }`，loading 区显示：

- spinner + 文字提示
- 进度条（purple→pink 渐变，宽度随 found/needed 动态变化）
- 「已找到 X / Y 字 · 已尝试 Z 字 · 命中率 N%」

### 四模式对比

| 模式 | 颜色 | 字源 | 题数 |
|------|------|------|------|
| 经典题库 | 绿色 | 内置 40 字（带分类/难度） | 5 题 |
| 随机挑战 | 琥珀色 | 内置 120 字字池 | 5/10/20 题 |
| 无限挑战 | 紫色 | Unicode CJK 2万字动态抓取 | 5/10/20 题 |
| 复习错题 | 玫红 | localStorage 错题本 | 错题数量 |

## P0 安全修复（第二批：前端功能 bug 3 条）

> 2026-07-20 · P0 安全走查与修复第二批

### F1：quiz/learning 8 端点路径 + 鉴权方式

- **问题**：3 个 quiz 端点（daily/answer/random）+ 5 个 learning 端点缺失 `/user` 前缀；[`learningStore.ts`](file:///d:/claudeCode/history-frontend/src/store/learningStore.ts) 把 JWT token 当 username 传 `X-User-Id` header，后端 `findByUsername(token)` 查不到用户，导致正常用户功能失效 + IDOR 风险
- **修复**：
  - [`api.ts`](file:///d:/claudeCode/history-frontend/src/services/api.ts) `fetchJSON` 改为 `export`，自动从 `useUserStore.getState().token` 注入 `Authorization: Bearer` header
  - 8 个端点路径全部加 `/user` 前缀
  - 删除 `X-User-Id` header
  - 类型名修正（`LearningList` → `ReadingListItem`，`LearningProgress` → `ProgressItem`）

### F2：EntityEditor handleSave 漏调 saveFn

- **问题**：admin 4 个编辑器（朝代/事件/人物/知识）的新增、编辑全部失效——UI 不报错但数据没落库
- **修复**：[`EntityEditor.tsx`](file:///d:/claudeCode/history-frontend/src/pages/admin/EntityEditor.tsx) `handleSave` 补 `await saveFn(editing)`

### F3：TitleGeneratorPage 重复展开

- **问题**：`setGeneratedTitles([...newTitles, ...newTitles])` 把同一数组展开两次，生成 3 个显示 6 个且两两重复
- **修复**：改为 `setGeneratedTitles(newTitles)`

### 验证

- `npx tsc --noEmit`：exit 0
- `npx vitest run`：51 文件 286 测试全通过

## P0 安全修复（第三批前端配套：B1 quiz 泄题修复）

> 2026-07-20 · P0 安全走查与修复第三批（前后端联动）

### B1：QuizDialog 选项高亮逻辑修复（防泄题）

- **问题**：原 [`QuizDialog.tsx`](file:///d:/claudeCode/history-frontend/src/components/quiz/QuizDialog.tsx) 在用户选择选项后立即用 `question.correctIndex` 高亮正确答案（绿色）和错误答案（红色），用户在提交前就能看到正确答案，导致每日挑战形同虚设
- **根因**：后端 `/api/user/quiz/daily` 端点返回的 QuestionDTO 包含 `correctIndex` 和 `explanation` 字段，前端在答题前就能读到正确答案
- **修复**：
  - 后端拆分 DTO：出题端点改返回 `QuestionPublicDTO`（不含 `correctIndex` / `explanation`），答题后通过 `QuizResult.question`（完整 QuestionDTO）返回正确答案和解析
  - 前端 [`api.ts`](file:///d:/claudeCode/history-frontend/src/services/api.ts) 新增 `QuizQuestionPublic` 接口（不含 `correctIndex` / `explanation`），`fetchDailyQuiz` 返回类型改为 `Promise<QuizQuestionPublic>`
  - [`QuizDialog.tsx`](file:///d:/claudeCode/history-frontend/src/components/quiz/QuizDialog.tsx) 选项高亮逻辑重写：
    - **选择阶段**（`selected !== null && !result`）：只标记选中项（蓝色边框），不高亮正确答案
    - **已提交阶段**（`result` 存在）：用 `result.question.correctIndex` 高亮正确答案（绿色 ✓）和错误选项（红色 ✗）
  - [`QuizDialog.test.tsx`](file:///d:/claudeCode/history-frontend/src/components/quiz/QuizDialog.test.tsx) 测试 mock 同步更新：
    - `fetchDailyQuiz` mock 去掉 `correctIndex` 字段（模拟真实出题端点）
    - `submitQuizAnswer` mock 加上 `question` 字段（含 `correctIndex`，模拟答题后返回完整信息）

### 验证

- `npx tsc --noEmit`：exit 0
- `npx vitest run`：51 文件 286 测试全通过
- 后端配套修改：见 [history-backend/README.md](../history-backend/README.md) 的「生产部署安全要点（P0 修复）」表格 B1/B2 行

## P0 安全修复（第四批前端配套：S6 WebSocket 鉴权）

> 2026-07-20 · P0 安全走查与修复第四批（前后端联动）

### S6：gameRoomApi SockJS 连接加 token query string

- **问题**：[`gameRoomApi.ts`](file:///d:/claudeCode/history-frontend/src/services/gameRoomApi.ts) `connectRoom` 中 SockJS 连接 URL 是 `${WS_BASE}/ws-game`，无鉴权信息。后端 S6 修复后握手期要求 `?token=xxx`，否则返回 401，导致联机剧本杀功能完全不可用
- **修复**：
  - import `useUserStore`，从 `useUserStore.getState().token` 取 JWT
  - SockJS URL 拼接 `?token=${encodeURIComponent(token)}`
  - token 为空时仍走原 URL（后端会返回 401，由 onStompError 处理）
- **约束**：SockJS 不支持自定义 header（浏览器限制），WebSocket 鉴权只能走 query string token；token 用 `encodeURIComponent` 编码避免 JWT 中的 `.` 影响 URL 解析

### 验证

- `npx tsc --noEmit`：exit 0
- `npx vitest run`：51 文件 286 测试全通过
- 后端配套修改：见 [history-backend/README.md](../history-backend/README.md) 的「生产部署安全要点（P0 修复）」表格 S4/S5/S6/S7 行
