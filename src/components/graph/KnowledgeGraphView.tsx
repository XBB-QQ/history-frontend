/**
 * 全局知识图谱可视化组件
 * 力导向图算法：斥力 + 引力 + 居中力 + 阻尼
 * @see history-museum/design/000-future-roadmap.md §方向六 §6.4
 */

import { useEffect, useRef, useState, useMemo } from 'react';
import type {
  GraphNode,
  KnowledgeGraph,
  NodeType,
} from '@/types/knowledgeGraph';
import { NODE_STYLES, LINK_STYLES } from '@/types/knowledgeGraph';

interface SimNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number;
  fy?: number;
}

interface KnowledgeGraphViewProps {
  graph: KnowledgeGraph;
  width: number;
  height: number;
  highlightType?: NodeType | null;
  selectedId?: string | null;
  onSelectNode?: (id: string) => void;
}

const TYPE_COLORS: Record<NodeType, string> = {
  dynasty: NODE_STYLES.dynasty.color,
  event: NODE_STYLES.event.color,
  person: NODE_STYLES.person.color,
  knowledge: NODE_STYLES.knowledge.color,
};

export default function KnowledgeGraphView({
  graph,
  width,
  height,
  highlightType = null,
  selectedId = null,
  onSelectNode,
}: KnowledgeGraphViewProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<SimNode[]>([]);
  const [tick, setTick] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const draggingNode = useRef<SimNode | null>(null);
  const animateRef = useRef<() => void>(() => {});
  const isRunningRef = useRef(false);

  useEffect(() => {
    const cx = width / 2;
    const cy = height / 2;
    nodesRef.current = graph.nodes.map((n, i) => {
      const angle = (i / graph.nodes.length) * Math.PI * 2;
      const r = Math.min(width, height) * 0.35;
      return {
        ...n,
        x: cx + Math.cos(angle) * r + (Math.random() - 0.5) * 20,
        y: cy + Math.sin(angle) * r + (Math.random() - 0.5) * 20,
        vx: 0,
        vy: 0,
      };
    });
    setTick((t) => t + 1);
  }, [graph, width, height]);

  useEffect(() => {
    if (nodesRef.current.length === 0) return;
    const cx = width / 2;
    const cy = height / 2;
    const REPULSION = 8000;
    const SPRING = 0.05;
    const SPRING_LENGTH = 100;
    const CENTER = 0.01;
    const DAMPING = 0.85;
    // 使用平均动能（每节点）作为收敛判据，避免阈值受节点数量影响
    const ENERGY_THRESHOLD = 0.1;
    // 时间兜底：无论帧率如何，3 秒后强制停止动画
    const startTime = performance.now();
    const MAX_DURATION = 3000;

    const animate = () => {
      const nodes = nodesRef.current;
      if (nodes.length === 0) return;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
          const force = REPULSION / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          if (!a.fx) { a.vx -= fx; a.vy -= fy; }
          if (!b.fx) { b.vx += fx; b.vy += fy; }
        }
      }

      graph.links.forEach((link) => {
        const a = nodes.find((n) => n.id === link.source);
        const b = nodes.find((n) => n.id === link.target);
        if (!a || !b) return;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
        const force = SPRING * (dist - SPRING_LENGTH);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        if (!a.fx) { a.vx += fx; a.vy += fy; }
        if (!b.fx) { b.vx -= fx; b.vy -= fy; }
      });

      let totalEnergy = 0;
      nodes.forEach((n) => {
        if (n.fx !== undefined && n.fy !== undefined) {
          n.x = n.fx;
          n.y = n.fy;
          return;
        }
        n.vx += (cx - n.x) * CENTER;
        n.vy += (cy - n.y) * CENTER;
        n.vx *= DAMPING;
        n.vy *= DAMPING;
        n.x += n.vx;
        n.y += n.vy;
        const padding = 30;
        if (n.x < padding) { n.x = padding; n.vx = 0; }
        if (n.x > width - padding) { n.x = width - padding; n.vx = 0; }
        if (n.y < padding) { n.y = padding; n.vy = 0; }
        if (n.y > height - padding) { n.y = height - padding; n.vy = 0; }
        totalEnergy += n.vx * n.vx + n.vy * n.vy;
      });

      setTick((t) => t + 1);

      if (performance.now() - startTime > MAX_DURATION || totalEnergy / nodes.length < ENERGY_THRESHOLD) {
        isRunningRef.current = false;
        return;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animateRef.current = animate;
    isRunningRef.current = true;
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [graph, width, height]);

  const nodes = nodesRef.current;

  const visibleNodes = useMemo(
    () => nodes.filter((n) => !highlightType || n.type === highlightType),
    [nodes, highlightType, tick]
  );
  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));

  const visibleLinks = useMemo(
    () =>
      graph.links.filter(
        (l) => visibleNodeIds.has(l.source) && visibleNodeIds.has(l.target)
      ),
    [graph.links, visibleNodeIds, tick]
  );

  function handleMouseDown(e: React.MouseEvent, node: SimNode) {
    e.preventDefault();
    draggingNode.current = node;
    node.fx = node.x;
    node.fy = node.y;
  }
  function handleMouseMove(e: React.MouseEvent) {
    if (!draggingNode.current || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    draggingNode.current.fx = e.clientX - rect.left;
    draggingNode.current.fy = e.clientY - rect.top;
  }
  function handleMouseUp() {
    if (draggingNode.current) {
      draggingNode.current.fx = undefined;
      draggingNode.current.fy = undefined;
      // 给节点一个微小速度，打破平衡以便重新触发收敛
      draggingNode.current.vx = (Math.random() - 0.5) * 2;
      draggingNode.current.vy = (Math.random() - 0.5) * 2;
      draggingNode.current = null;
      // 若动画已停止，重新启动以重新布局
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animRef.current = requestAnimationFrame(animateRef.current);
      }
    }
  }

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="cursor-move"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <g>
        {visibleLinks.map((link, i) => {
          const a = nodes.find((n) => n.id === link.source);
          const b = nodes.find((n) => n.id === link.target);
          if (!a || !b) return null;
          const style = LINK_STYLES[link.relation];
          const isHighlighted =
            hoveredNode === a.id || hoveredNode === b.id ||
            selectedId === a.id || selectedId === b.id;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={style.color}
              strokeWidth={isHighlighted ? 2 : 1}
              strokeOpacity={isHighlighted ? 0.9 : 0.4}
              strokeDasharray={style.dashed ? '4 4' : undefined}
            />
          );
        })}
      </g>

      <g>
        {visibleNodes.map((node) => {
          const style = NODE_STYLES[node.type];
          const r = style.size / 2;
          const isSelected = selectedId === node.id;
          const isHovered = hoveredNode === node.id;
          const isDimmed = highlightType && node.type !== highlightType;
          return (
            <g
              key={node.id}
              transform={`translate(${node.x},${node.y})`}
              className="cursor-pointer"
              onMouseDown={(e) => handleMouseDown(e, node)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onSelectNode?.(node.id)}
              opacity={isDimmed ? 0.25 : 1}
            >
              <circle
                r={r}
                fill={TYPE_COLORS[node.type]}
                stroke={isSelected || isHovered ? '#fff' : 'none'}
                strokeWidth={isSelected || isHovered ? 3 : 0}
              />
              <text
                y={r + 12}
                textAnchor="middle"
                className="pointer-events-none fill-current text-ink-800 dark:text-ink-200"
                style={{ fontSize: '11px', fontWeight: 'bold' }}
              >
                {node.label.length > 8 ? node.label.slice(0, 7) + '…' : node.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
