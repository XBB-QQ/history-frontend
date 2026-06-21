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
