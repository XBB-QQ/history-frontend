import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchPersonRelationships, type RelationshipEntry } from '@/services/api';

interface RelationshipNode {
  id: string;
  name: string;
  uid: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isCenter: boolean;
  color: string;
  dynasty?: string;
}

const relationColors: Record<string, string> = {
  '师徒': '#8B4513',
  '父子': '#2E8B57',
  '母子': '#DA70D6',
  '兄弟': '#4682B4',
  '姐妹': '#FF69B4',
  '夫妻': '#FF1493',
  '夫妻/情侣': '#FF1493',
  '敌对': '#DC143C',
  '朋友': '#4169E1',
  '同僚': '#6B8E23',
  '师生': '#8B4513',
  '门生': '#8B4513',
  '君臣': '#B8860B',
  '政敌': '#DC143C',
  '战友': '#4682B4',
  '仇敌': '#DC143C',
  '知己': '#4169E1',
  '义父': '#2E8B57',
  '义子': '#2E8B57',
  '养父': '#2E8B57',
  '养子': '#2E8B57',
  '岳父': '#2E8B57',
  '女婿': '#2E8B57',
  '叔侄': '#2E8B57',
  '甥舅': '#2E8B57',
  '君臣/上下级': '#B8860B',
  '学生': '#8B4513',
  '老师': '#8B4513',
};

function getRelationColor(relation: string): string {
  for (const [key, color] of Object.entries(relationColors)) {
    if (relation.includes(key)) return color;
  }
  return '#999';
}

/** 简易力导向图 */
function ForceGraph({
  nodes: initialNodes,
  links,
  width,
  height,
}: {
  nodes: { name: string; uid: string; isCenter?: boolean; color: string; dynasty?: string }[];
  links: { source: string; target: string; relation: string; label: string }[];
  width: number;
  height: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<RelationshipNode[]>([]);

  // 初始化节点位置
  const initNodes = useCallback(() => {
    const cx = width / 2;
    const cy = height / 2;
    const centerNode = initialNodes.find((n) => n.isCenter);
    const others = initialNodes.filter((n) => !n.isCenter);

    const result: RelationshipNode[] = [];

    if (centerNode) {
      result.push({
        id: centerNode.uid,
        name: centerNode.name,
        uid: centerNode.uid,
        x: cx,
        y: cy,
        vx: 0,
        vy: 0,
        isCenter: true,
        color: centerNode.color,
        dynasty: centerNode.dynasty,
      });
    }

    others.forEach((n, i) => {
      const angle = (2 * Math.PI * i) / others.length;
      const radius = Math.min(width, height) * 0.3;
      result.push({
        id: n.uid,
        name: n.name,
        uid: n.uid,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        isCenter: false,
        color: n.color,
        dynasty: n.dynasty,
      });
    });

    return result;
  }, [initialNodes, width, height]);

  useEffect(() => {
    nodesRef.current = initNodes();

    // 力导向模拟
    const simulate = () => {
      const nodes = nodesRef.current;
      const k = Math.sqrt((width * height) / nodes.length) * 0.8; // 理想边长

      // 斥力（所有节点之间）
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (k * k) / dist;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          if (!nodes[i].isCenter) {
            nodes[i].vx -= fx;
            nodes[i].vy -= fy;
          }
          if (!nodes[j].isCenter) {
            nodes[j].vx += fx;
            nodes[j].vy += fy;
          }
        }
      }

      // 引力（连边节点之间）
      for (const link of links) {
        const source = nodes.find((n) => n.uid === (link.source as string));
        const target = nodes.find((n) => n.uid === (link.target as string));
        if (!source || !target) continue;

        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (dist - k) * 0.06;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        if (!source.isCenter) {
          source.vx += fx;
          source.vy += fy;
        }
        if (!target.isCenter) {
          target.vx -= fx;
          target.vy -= fy;
        }
      }

      // 居中力
      for (const node of nodes) {
        if (node.isCenter) continue;
        node.vx += (width / 2 - node.x) * 0.005;
        node.vy += (height / 2 - node.y) * 0.005;
      }

      // 更新位置
      for (const node of nodes) {
        if (node.isCenter) continue;
        node.vx *= 0.85;
        node.vy *= 0.85;
        node.x += node.vx;
        node.y += node.vy;
        // 边界约束
        node.x = Math.max(40, Math.min(width - 40, node.x));
        node.y = Math.max(40, Math.min(height - 40, node.y));
      }
    };

    const render = () => {
      simulate();
      const svg = svgRef.current;
      if (!svg) return;
      const nodes = nodesRef.current;

      // 绘制连线
      const lines = svg.querySelectorAll('line');
      lines.forEach((l) => l.remove());

      for (const link of links) {
        const source = nodes.find((n) => n.uid === (link.source as string));
        const target = nodes.find((n) => n.uid === (link.target as string));
        if (!source || !target) continue;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', String(source.x));
        line.setAttribute('y1', String(source.y));
        line.setAttribute('x2', String(target.x));
        line.setAttribute('y2', String(target.y));
        line.setAttribute('stroke', getRelationColor(link.relation));
        line.setAttribute('stroke-width', '1.5');
        line.setAttribute('stroke-opacity', '0.5');
        line.setAttribute('stroke-dasharray', link.relation === '敌对' || link.relation.includes('仇') ? '4,4' : 'none');
        svg.insertBefore(line, svg.querySelector('text') || null);
      }

      // 绘制节点
      const circles = svg.querySelectorAll('circle');
      circles.forEach((c) => c.remove());
      const labels = svg.querySelectorAll('text.node-label');
      labels.forEach((l) => l.remove());

      for (const node of nodes) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', String(node.x));
        circle.setAttribute('cy', String(node.y));
        circle.setAttribute('r', node.isCenter ? '18' : '12');
        circle.setAttribute('fill', node.color);
        circle.setAttribute('opacity', '0.9');
        if (node.isCenter) {
          circle.setAttribute('stroke', node.color);
          circle.setAttribute('stroke-width', '3');
          circle.setAttribute('fill', '#fff');
        }
        svg.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', String(node.x));
        text.setAttribute('y', String(node.y + (node.isCenter ? 32 : 22)));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'currentColor');
        text.setAttribute('class', 'node-label');
        text.setAttribute('font-size', node.isCenter ? '14' : '11');
        text.setAttribute('font-weight', node.isCenter ? 'bold' : 'normal');
        text.textContent = node.name;
        svg.appendChild(text);
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animRef.current);
  }, [initialNodes, links, initNodes, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="w-full rounded-xl bg-white/40 dark:bg-ink-900/40"
    />
  );
}

/**
 * 人物关系图谱组件
 * 展示当前人物及其关系网络
 */
export default function RelationshipGraph({ personId, personName, personUid }: {
  personId: number;
  personName: string;
  personUid: string;
}) {
  const [relationships, setRelationships] = useState<RelationshipEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [graphWidth, setGraphWidth] = useState(600);
  const [graphHeight, setGraphHeight] = useState(400);

  useEffect(() => {
    fetchPersonRelationships(personId)
      .then(setRelationships)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [personId]);

  // 响应式宽度
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setGraphWidth(containerRef.current.clientWidth);
        setGraphHeight(Math.max(300, Math.min(500, containerRef.current.clientWidth * 0.6)));
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse h-64 flex items-center justify-center text-ink-400">
        加载关系中...
      </div>
    );
  }

  if (error || relationships.length === 0) {
    return (
      <div className="text-center py-10 text-ink-400">
        <p className="text-lg mb-2">暂无关系数据</p>
        <p className="text-sm">可在后台管理为人物添加关系信息</p>
      </div>
    );
  }

  // 构建图谱数据
  const nodes = [
    { name: personName, uid: personUid, isCenter: true, color: '#C41E3A' },
    ...relationships.map((r) => ({
      name: r.label,
      uid: r.targetUid,
      isCenter: false,
      color: '#4169E1',
    })),
  ];

  const links = relationships.map((r) => ({
    source: personUid,
    target: r.targetUid,
    relation: r.relation,
    label: r.label,
  }));

  return (
    <div ref={containerRef} className="w-full">
      <ForceGraph nodes={nodes} links={links} width={graphWidth} height={graphHeight} />
      {/* 图例 */}
      <div className="flex flex-wrap gap-3 mt-3 text-xs text-ink-500 dark:text-ink-400">
        {Array.from(new Set(relationships.map((r) => r.relation))).map((rel) => (
          <span key={rel} className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-0.5"
              style={{
                backgroundColor: getRelationColor(rel),
                backgroundImage: rel.includes('敌') || rel.includes('仇') ? 'repeating-linear-gradient(45deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)' : 'none',
              }}
            />
            {rel}
          </span>
        ))}
      </div>
    </div>
  );
}
