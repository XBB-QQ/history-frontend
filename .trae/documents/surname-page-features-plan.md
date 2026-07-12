# 百家姓功能增强实现计划

## 任务背景

用户反馈"百家姓任务还未完成"。上一会话已完成数据修复（聂/万/公羊/凤全）和504个姓氏格式统一为多行格式。本计划聚焦三个未实现的功能：

1. **人口排名排序** — 在姓氏列表中添加按百家姓排名/人口排名/人口数量排序
2. **姓氏详情页** — 创建 `/surname/:rank` 路由的独立详情页
3. **迁徙地图增强** — 使用真实中国地图轮廓 + 正确坐标转换替代当前有 bug 的简化 SVG

## 当前状态分析

### 1. SurnameMapPage.tsx 迁徙地图 bug（关键问题）

文件：`d:\claudeCode\history-frontend\src\pages\SurnameMapPage.tsx` 行 219-311

```typescript
<svg viewBox="0 0 800 400" ...>
  {/* 节点直接用经纬度作为坐标 */}
  <circle cx={node.lng} cy={node.lat} r="6" ... />
  <line x1={selected.migration[idx-1].lng} y1={selected.migration[idx-1].lat} ... />
```

**问题**：经度范围 73-135，纬度范围 18-54，直接作为 SVG 坐标会导致所有节点挤在左上角（viewBox 800x400 中只占约 62x36 的区域）。必须用 `lngLatToXY` 转换。

### 2. map-data.ts 未导出 lngLatToXY

文件：`d:\claudeCode\history-frontend\src\data\core\map-data.ts`

当前已导出：`chinaOutlinePath()`, `nanhaiBoxPath()`, `mapRegions`, `dynastyMapData`

未导出：`lngLatToXY` 函数（目前只在 MapSVG.tsx 中作为内部函数存在，行 14-18）

```typescript
function lngLatToXY(lng: number, lat: number): { x: number; y: number } {
  const x = ((lng - 73) / 62) * 800;
  const y = 600 - ((lat - 18) / 36) * 600;
  return { x, y };
}
```

### 3. SurnameMapPage 缺少排序功能

当前 SurnameMapPage.tsx 行 26-43 只按拼音首字母分组，无排序选项。用户需要按百家姓排名/人口排名/人口数量三种方式排序。

### 4. 姓氏详情页未创建

当前 App.tsx 行 199 只有 `<Route path="/surname" element={<SurnameMapPage />} />`，无 `/surname/:rank` 详情页路由。

参考模式（App.tsx 行 210）：
```typescript
<Route path="/topic/:uid" element={<TopicDetailPage />} />
```

### 5. surnameData.ts 末尾导出代码（行 16713-16722）

```typescript
export const SURNAMES_BY_INITIAL: Record<string, Surname[]> = SURNAMES.reduce(...);
export const SURNAMES_INITIALS: string[] = Object.keys(SURNAMES_BY_INITIAL).sort();
```

需要新增 `findSurnameByRank` 辅助函数。

### 6. i18n 现有键（zh.json / en.json 行 595-617）

已有 22 个 surnameMap 键（title, description, searchPlaceholder, rank, populationRank, population, origin, originPlace, longitude, latitude, junwang, tanghao, totem, history, migrationTrack, originLabel, migrationNode, currentResidence, mapNote, figures, wan）。

需新增排序和详情页相关键。

## 实现方案

### 步骤 1：导出 lngLatToXY 函数

**文件**：`d:\claudeCode\history-frontend\src\data\core\map-data.ts`

**修改**：在 `polyPath` 函数后（约第 36 行）新增导出函数。

```typescript
/** 将经纬度映射到 SVG 坐标（viewBox 0 0 800 600） */
export function lngLatToXY(lng: number, lat: number): { x: number; y: number } {
  const x = ((lng - 73) / 62) * 800;
  const y = 600 - ((lat - 18) / 36) * 600;
  return { x, y };
}
```

**理由**：消除 MapSVG.tsx 与未来 SurnameMigrationMap 的代码重复，统一坐标转换逻辑。

### 步骤 2：创建 SurnameMigrationMap 组件

**新文件**：`d:\claudeCode\history-frontend\src\components\map\SurnameMigrationMap.tsx`

**功能**：可复用的姓氏迁徙地图组件，接收 `migration: SurnameMigrationNode[]` 和 `originPlace` props，渲染带动画的迁徙路径。

**设计要点**：
- 使用 `chinaOutlinePath()` 绘制真实中国地图轮廓（替代简化的波浪线）
- 使用 `lngLatToXY()` 正确转换经纬度（修复坐标 bug）
- viewBox 统一为 `0 0 800 600`（与 MapSVG 一致）
- 使用 `<animate>` SMIL 实现路径流动效果（参考 MigrationMapPage）
- 起源节点（绿色，脉冲动画）→ 中间节点（黄色）→ 终点（红色，脉冲动画）
- 箭头标记连接相邻节点
- 图例 + 南海诸岛小框

**组件接口**：
```typescript
interface SurnameMigrationMapProps {
  migration: SurnameMigrationNode[];
  originPlace: { name: string; lng: number; lat: number };
}
```

### 步骤 3：添加 findSurnameByRank 辅助函数

**文件**：`d:\claudeCode\history-frontend\src\data\features\surnameData.ts`

**修改**：在文件末尾（行 16722 后）新增导出函数。

```typescript
/** 根据《百家姓》排名查找姓氏 */
export function findSurnameByRank(rank: number): Surname | undefined {
  return SURNAMES.find(s => s.rank === rank);
}
```

**理由**：详情页路由 `/surname/:rank` 需要通过 rank 查找姓氏数据。

### 步骤 4：添加 i18n 翻译键

**文件**：`d:\claudeCode\history-frontend\src\i18n\locales\zh.json` 和 `en.json`

在 `surnameMap` 对象末尾（"wan": "万" 后）新增：

zh.json：
```json
"sortBy": "排序方式",
"sortByRank": "百家姓排名",
"sortByPopulationRank": "人口排名",
"sortByPopulation": "人口数量",
"viewDetail": "查看详情",
"backToList": "返回列表",
"notFoundTitle": "姓氏未找到",
"notFoundDesc": "未找到排名为 {{rank}} 的姓氏",
"migrationAnimation": "迁徙路径动画",
"junwangCount": "郡望数量",
"figureCount": "名人数量"
```

en.json：
```json
"sortBy": "Sort By",
"sortByRank": "Hundred Surnames Rank",
"sortByPopulationRank": "Population Rank",
"sortByPopulation": "Population",
"viewDetail": "View Details",
"backToList": "Back to List",
"notFoundTitle": "Surname Not Found",
"notFoundDesc": "No surname found with rank {{rank}}",
"migrationAnimation": "Migration Path Animation",
"junwangCount": "Junwang Count",
"figureCount": "Famous Figures Count"
```

### 步骤 5：创建 SurnameDetailPage

**新文件**：`d:\claudeCode\history-frontend\src\pages\SurnameDetailPage.tsx`

**功能**：姓氏详情页，路由 `/surname/:rank`。

**设计要点**：
- 使用 `useParams<{ rank: string }>()` 获取路由参数
- 使用 `findSurnameByRank(parseInt(rank))` 查找姓氏
- 未找到时显示 not_found 兜底页面（参考 TopicDetailPage 模式）
- 使用 `useNavigate()` 提供"返回列表"按钮
- 复用 SurnameMapPage 的详情卡片布局（起源/郡望/图腾/族史/名人）
- 使用新的 SurnameMigrationMap 组件渲染迁徙地图
- 添加上一个/下一个姓氏导航按钮（按 rank 顺序）

**页面结构**：
```
- 顶部导航栏（返回列表 + 上一个/下一个）
- 姓氏头部（大字 + 拼音 + 排名徽章）
- 起源与图腾（2列网格）
- 郡望堂号
- 迁徙地图（使用 SurnameMigrationMap 组件）
- 历代名人（3列网格）
- 族史
```

### 步骤 6：注册详情页路由

**文件**：`d:\claudeCode\history-frontend\src\App.tsx`

**修改 1**：在行 52 附近添加 lazy import：
```typescript
const SurnameDetailPage = lazy(() => import('./pages/SurnameDetailPage'));
```

**修改 2**：在行 199 后添加路由：
```typescript
<Route path="/surname" element={<SurnameMapPage />} />
<Route path="/surname/:rank" element={<SurnameDetailPage />} />
```

### 步骤 7：修改 SurnameMapPage 添加排序与详情页链接

**文件**：`d:\claudeCode\history-frontend\src\pages\SurnameMapPage.tsx`

**修改 1**：新增排序状态（行 19 附近）：
```typescript
type SortBy = 'rank' | 'populationRank' | 'population';
const [sortBy, setSortBy] = useState<SortBy>('rank');
```

**修改 2**：新增排序后的姓氏列表 useMemo（基于 SURNAMES_BY_INITIAL）：
```typescript
const sortedSurnamesByInitial = useMemo(() => {
  const groups: Record<string, Surname[]> = {};
  Object.entries(SURNAMES_BY_INITIAL).forEach(([initial, list]) => {
    groups[initial] = [...list].sort((a, b) => {
      if (sortBy === 'rank') return a.rank - b.rank;
      if (sortBy === 'populationRank') return a.populationRank - b.populationRank;
      return b.population - a.population; // 人口数量降序
    });
  });
  return groups;
}, [sortBy]);
```

**修改 3**：在搜索框下方添加排序选择器 UI（3个按钮切换排序方式）。

**修改 4**：将姓氏卡片改为可点击跳转详情页（使用 `useNavigate`）：
- 点击姓氏卡片 → `navigate(/surname/${rank})`
- 同时保留 `setSelectedSurname` 用于本页面预览

**修改 5**：替换迁徙地图 SVG（行 219-311）为 `<SurnameMigrationMap>` 组件：
```tsx
<SurnameMigrationMap
  migration={selected.migration}
  originPlace={selected.originPlace}
/>
```

**修改 6**：在详情卡片底部添加"查看完整详情"按钮，跳转到 `/surname/:rank`。

## 依赖关系

```
步骤 1（导出 lngLatToXY）     ← 无依赖
步骤 3（添加 findSurnameByRank）← 无依赖
步骤 4（添加 i18n 翻译键）     ← 无依赖
步骤 2（创建 SurnameMigrationMap）← 依赖步骤 1
步骤 5（创建 SurnameDetailPage） ← 依赖步骤 2、3、4
步骤 6（注册路由）              ← 依赖步骤 5
步骤 7（修改 SurnameMapPage）   ← 依赖步骤 2、4、6
```

可并行执行：步骤 1、3、4 可同时进行。

## 验证步骤

1. **TypeScript 编译**：运行 `npm run typecheck` 或 `npx tsc --noEmit` 确认无类型错误
2. **开发服务器**：启动 `npm run dev`，访问 `/surname` 页面验证：
   - 排序按钮可切换三种排序方式
   - 姓氏卡片点击跳转到详情页
   - 迁徙地图正确显示中国轮廓（不再是简化的波浪线）
   - 迁徙节点位置正确（不再挤在左上角）
3. **详情页验证**：访问 `/surname/1`（赵姓）验证：
   - 详情页正常加载
   - 上一个/下一个导航正常
   - 返回列表按钮正常
   - 未找到姓氏时显示兜底页面（访问 `/surname/9999`）
4. **浏览器控制台**：确认无 React key 警告、无 TypeScript 运行时错误

## 假设与决策

1. **假设**：`SurnameMigrationNode` 类型已在 surnameData.ts 中定义（含 name, lng, lat, period, reason 字段）
2. **决策**：排序按钮使用 3 个独立按钮（而非下拉选择），视觉更直观，符合现有页面风格
3. **决策**：详情页使用 lazy import，与 App.tsx 现有模式一致
4. **决策**：SurnameMigrationMap 组件放在 `components/map/` 目录，与 MapSVG.tsx 同级
5. **决策**：详情页保留"上一个/下一个"导航，提升浏览体验
6. **决策**：不修改 SurnameMapPage.module.css，新组件使用 Tailwind 类名（与现有代码一致）

## 文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/data/core/map-data.ts` | 修改 | 新增导出 lngLatToXY 函数 |
| `src/data/features/surnameData.ts` | 修改 | 末尾新增 findSurnameByRank 函数 |
| `src/i18n/locales/zh.json` | 修改 | 新增 11 个 surnameMap 键 |
| `src/i18n/locales/en.json` | 修改 | 新增 11 个 surnameMap 键 |
| `src/components/map/SurnameMigrationMap.tsx` | 新建 | 可复用姓氏迁徙地图组件 |
| `src/pages/SurnameDetailPage.tsx` | 新建 | 姓氏详情页 |
| `src/App.tsx` | 修改 | 添加 lazy import 和路由 |
| `src/pages/SurnameMapPage.tsx` | 修改 | 添加排序、详情页链接、替换迁徙地图组件 |

总计：6 个文件修改，2 个文件新建。
