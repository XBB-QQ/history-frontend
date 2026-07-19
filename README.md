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
