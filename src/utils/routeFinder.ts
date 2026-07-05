/**
 * 古代交通路径查找引擎
 * @see ITERATIONS.md #93
 *
 * 基于 Dijkstra 算法的最短路径查找，支持朝代速度系数。
 */

import {
  TRANSPORT_GRAPH,
  ALL_CITIES,
  DYNASTY_SPEED_FACTORS,
  type TransportGraph,
  type PathResult as PathResultType,
} from '@/data/features/transportData';

/** Re-export for consumers */
export type PathResult = PathResultType;

/**
 * Dijkstra 最短路径算法
 */
export function findShortestPath(
  graph: TransportGraph,
  startCity: string,
  endCity: string,
  dynasty: string = '汉',
): PathResult | null {
  const startId = ALL_CITIES[startCity];
  const endId = ALL_CITIES[endCity];

  if (!startId || !endId) {
    return null;
  }

  if (startId === endId) {
    return {
      route: [startCity],
      totalDays: 0,
      totalDistanceKm: 0,
      speedFactor: DYNASTY_SPEED_FACTORS[dynasty] || 1.0,
      dynasty,
    };
  }

  const speedFactor = DYNASTY_SPEED_FACTORS[dynasty] || 1.0;
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const visited = new Set<string>();

  // 初始化
  for (const node of graph.nodes) {
    distances[node.id] = Infinity;
    previous[node.id] = null;
  }
  distances[startId] = 0;

  // Dijkstra
  while (visited.size < graph.nodes.length) {
    // 找未访问的最小距离节点
    let currentId: string | null = null;
    let minDist = Infinity;

    for (const node of graph.nodes) {
      if (!visited.has(node.id) && distances[node.id] < minDist) {
        minDist = distances[node.id];
        currentId = node.id;
      }
    }

    if (currentId === null) break;

    // 到达终点提前终止
    if (currentId === endId) break;

    visited.add(currentId);

    // 更新邻居
    const neighbors = graph.adjacency[currentId];
    if (!neighbors) continue;

    for (const neighbor of neighbors) {
      if (visited.has(neighbor.target)) continue;

      // 考虑朝代速度系数
      const adjustedDays = neighbor.weight.days / speedFactor;
      const alt = distances[currentId] + adjustedDays;

      if (alt < distances[neighbor.target]) {
        distances[neighbor.target] = alt;
        previous[neighbor.target] = currentId;
      }
    }
  }

  // 回溯路径
  if (distances[endId] === Infinity) {
    return null; // 不可达
  }

  const path: string[] = [];
  let current: string | null = endId;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  // 转换为城市名并计算总距离
  const routeNames: string[] = [];
  let totalDays = 0;
  let totalDistanceKm = 0;
  let edgeCount = 0;

  for (let i = 0; i < path.length - 1; i++) {
    const fromId = path[i];
    const toId = path[i + 1];
    const fromNode = graph.nodes.find(n => n.id === fromId);
    const toNode = graph.nodes.find(n => n.id === toId);

    if (!fromNode || !toNode) continue;

    routeNames.push(fromNode.name);

    const neighborEntry = graph.adjacency[fromId]?.find(n => n.target === toId);
    if (neighborEntry) {
      totalDays += neighborEntry.weight.days / speedFactor;
      totalDistanceKm += neighborEntry.weight.distanceKm;
      edgeCount++;
    }
  }

  if (routeNames.length > 0) {
    routeNames.push(graph.nodes.find(n => n.id === path[path.length - 1])!.name);
  }

  return {
    route: routeNames,
    totalDays: Math.round(totalDays * 10) / 10,
    totalDistanceKm,
    speedFactor,
    dynasty,
  };
}

/**
 * 多朝代对比
 */
export function compareDynasties(
  startCity: string,
  endCity: string,
  dynasties: string[] = ['汉', '唐', '宋', '明', '清'],
): PathResult[] {
  return dynasties
    .map(d => findShortestPath(TRANSPORT_GRAPH, startCity, endCity, d))
    .filter((r): r is PathResult => r !== null)
    .sort((a, b) => a.totalDays - b.totalDays);
}

/**
 * 查找所有可达城市
 */
export function findReachableCities(
  startCity: string,
  maxDays: number = 30,
  dynasty: string = '汉',
): Array<{ city: string; days: number; distanceKm: number }> {
  const startId = ALL_CITIES[startCity];
  if (!startId) return [];

  const speedFactor = DYNASTY_SPEED_FACTORS[dynasty] || 1.0;
  const distances: Record<string, number> = {};
  const distanceKm: Record<string, number> = {};

  for (const node of TRANSPORT_GRAPH.nodes) {
    distances[node.id] = Infinity;
    distanceKm[node.id] = Infinity;
  }
  distances[startId] = 0;
  distanceKm[startId] = 0;

  const visited = new Set<string>();

  while (visited.size < TRANSPORT_GRAPH.nodes.length) {
    let currentId: string | null = null;
    let minDist = Infinity;

    for (const node of TRANSPORT_GRAPH.nodes) {
      if (!visited.has(node.id) && distances[node.id] < minDist) {
        minDist = distances[node.id];
        currentId = node.id;
      }
    }

    if (currentId === null || minDist > maxDays) break;
    visited.add(currentId);

    const neighbors = TRANSPORT_GRAPH.adjacency[currentId];
    if (!neighbors) continue;

    for (const neighbor of neighbors) {
      if (visited.has(neighbor.target)) continue;
      const adjustedDays = neighbor.weight.days / speedFactor;
      const alt = distances[currentId] + adjustedDays;
      const altKm = distanceKm[currentId] + neighbor.weight.distanceKm;

      if (alt < distances[neighbor.target]) {
        distances[neighbor.target] = alt;
        distanceKm[neighbor.target] = altKm;
      }
    }
  }

  const results: Array<{ city: string; days: number; distanceKm: number }> = [];

  for (const node of TRANSPORT_GRAPH.nodes) {
    if (node.id !== startId && distances[node.id] <= maxDays && distances[node.id] < Infinity) {
      results.push({
        city: node.name,
        days: Math.round(distances[node.id] * 10) / 10,
        distanceKm: distanceKm[node.id] < Infinity ? distanceKm[node.id] : 0,
      });
    }
  }

  return results.sort((a, b) => a.days - b.days);
}
