// 历史地图模块 — 类型定义

/** 地图区域（简化为中国主要省份/核心区域的多边形） */
export interface MapRegion {
  /** 区域标识 */
  id: string;
  /** 区域名称（中文） */
  name: string;
  /** SVG path 数据（简化版中国地图轮廓） */
  path: string;
  /** 中心坐标 [lng, lat] 用于标注 */
  center: [number, number];
  /** 区域别名（用于匹配朝代管辖） */
  aliases: string[];
}

/** 朝代在地图上对应的区域集合 */
export interface DynastyMapData {
  /** 朝代名称（与 FrontendDynasty.name 匹配） */
  dynastyName: string;
  /** 该朝代管辖的区域 id 列表 */
  regionIds: string[];
  /** 朝代时期描述 */
  period: string;
  /** 都城坐标 [lng, lat] */
  capitalPos: [number, number];
  /** 都城名称 */
  capitalName: string;
}

/** 地图状态 */
export interface MapState {
  /** 当前选中的朝代名称 */
  selectedDynasty: string;
  /** 是否正在切换动画中 */
  transitioning: boolean;
}
