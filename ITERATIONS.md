# 迭代记录 — 五千年史馆前端

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
