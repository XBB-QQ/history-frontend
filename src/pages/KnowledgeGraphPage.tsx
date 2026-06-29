/**
 * 全局知识图谱页面
 * @see history-museum/design/000-future-roadmap.md §方向六 §6.4
 */

import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildKnowledgeGraph } from '@/features/knowledgeGraphBuilder';
import { NODE_STYLES } from '@/types/knowledgeGraph';
import type { NodeType } from '@/types/knowledgeGraph';
import KnowledgeGraphView from '@/components/graph/KnowledgeGraphView';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';

const TYPES: NodeType[] = ['dynasty', 'event', 'person', 'knowledge'];

function KnowledgeGraphPage() {
  const graph = useMemo(() => buildKnowledgeGraph(), []);
  const [highlightType, setHighlightType] = useState<NodeType | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ w: 800, h: 600 });

  useEffect(() => {
    function updateSize() {
      const container = document.getElementById('graph-container');
      if (container) {
        const w = Math.min(container.clientWidth, 1200);
        const h = Math.max(500, window.innerHeight - 320);
        setDimensions({ w, h });
      }
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const stats = useMemo(() => {
    const byType: Record<NodeType, number> = { dynasty: 0, event: 0, person: 0, knowledge: 0 };
    graph.nodes.forEach((n) => { byType[n.type]++; });
    return { totalNodes: graph.nodes.length, totalLinks: graph.links.length, byType };
  }, [graph]);

  const selectedNode = useMemo(
    () => graph.nodes.find((n) => n.id === selectedId),
    [graph, selectedId]
  );

  const selectedLinks = useMemo(() => {
    if (!selectedId) return [];
    return graph.links.filter((l) => l.source === selectedId || l.target === selectedId);
  }, [graph, selectedId]);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="KNOWLEDGE GRAPH"
            title="全局知识图谱"
            description="实体关联图谱"
          />
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={200}>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="p-3 bg-white/60 dark:bg-ink-900/60 rounded-lg border border-ink-200 dark:border-ink-700 text-center">
              <div className="text-2xl font-bold text-accent">{stats.totalNodes}</div>
              <div className="text-xs text-ink-500 dark:text-ink-400">节点总数</div>
            </div>
            <div className="p-3 bg-white/60 dark:bg-ink-900/60 rounded-lg border border-ink-200 dark:border-ink-700 text-center">
              <div className="text-2xl font-bold text-accent">{stats.totalLinks}</div>
              <div className="text-xs text-ink-500 dark:text-ink-400">关系边数</div>
            </div>
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setHighlightType(highlightType === t ? null : t)}
                className={`p-3 rounded-lg border text-center transition-all ${
                  highlightType === t
                    ? 'border-accent bg-accent/10'
                    : 'border-ink-200 dark:border-ink-700 bg-white/60 dark:bg-ink-900/60 hover:border-accent'
                }`}
              >
                <div className="text-2xl font-bold" style={{ color: NODE_STYLES[t].color }}>
                  {stats.byType[t]}
                </div>
                <div className="text-xs text-ink-500 dark:text-ink-400">
                  {NODE_STYLES[t].emoji} {NODE_STYLES[t].label}
                </div>
              </button>
            ))}
          </div>
        </RevealOnScroll>

        <div className="mt-6 grid lg:grid-cols-4 gap-4">
          <RevealOnScroll direction="right" delay={300} className="lg:col-span-3">
            <div id="graph-container" className="bg-white/40 dark:bg-ink-900/40 rounded-xl border border-ink-200 dark:border-ink-700 overflow-hidden">
              <div className="p-3 border-b border-ink-200 dark:border-ink-700 flex items-center justify-between text-sm">
                <span className="text-ink-600 dark:text-ink-400">
                  注 拖拽节点可重新布局，点击查看详情
                  {highlightType && (
                    <span className="ml-2 text-accent">筛选: {NODE_STYLES[highlightType].label}</span>
                  )}
                </span>
                <button onClick={() => setHighlightType(null)} className="text-xs text-accent hover:underline">
                  清除筛选
                </button>
              </div>
              <div className="flex justify-center bg-paper/30 dark:bg-ink-950/30">
                <KnowledgeGraphView
                  graph={graph}
                  width={dimensions.w}
                  height={dimensions.h}
                  highlightType={highlightType}
                  selectedId={selectedId}
                  onSelectNode={setSelectedId}
                />
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="left" delay={400}>
            <div className="bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 p-4 lg:sticky lg:top-20">
              <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-3">节点详情</h3>
              {!selectedNode ? (
                <div className="text-center py-8 text-ink-400 dark:text-ink-500 text-sm">
                  <div className="text-4xl mb-2">拖</div>
                  点击图谱节点查看详情
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full" style={{ background: NODE_STYLES[selectedNode.type].color }} />
                    <span className="text-xs text-ink-500 dark:text-ink-400">
                      {NODE_STYLES[selectedNode.type].emoji} {NODE_STYLES[selectedNode.type].label}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">{selectedNode.label}</h4>
                  {selectedNode.dynasty && (
                    <div className="text-sm text-ink-600 dark:text-ink-400 mb-2">朝代: {selectedNode.dynasty}</div>
                  )}
                  {selectedNode.year && (
                    <div className="text-sm text-ink-600 dark:text-ink-400 mb-2">
                      年份: {selectedNode.year < 0 ? `公元前 ${-selectedNode.year}` : selectedNode.year}
                    </div>
                  )}
                  <div className="mt-4 pt-3 border-t border-ink-200 dark:border-ink-700">
                    <div className="text-xs font-bold text-ink-700 dark:text-ink-300 mb-2">
                      相关节点 ({selectedLinks.length})
                    </div>
                    <div className="space-y-1 max-h-60 overflow-y-auto">
                      {selectedLinks.map((link, i) => {
                        const otherId = link.source === selectedId ? link.target : link.source;
                        const other = graph.nodes.find((n) => n.id === otherId);
                        if (!other) return null;
                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedId(other.id)}
                            className="w-full text-left px-2 py-1 rounded hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors flex items-center gap-2"
                          >
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: NODE_STYLES[other.type].color }} />
                            <span className="text-sm text-ink-700 dark:text-ink-300 flex-1 truncate">{other.label}</span>
                            <span className="text-xs text-ink-400">{other.id.split(':')[0]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll direction="up" delay={500}>
          <div className="mt-6 p-4 bg-white/60 dark:bg-ink-900/60 rounded-lg border border-ink-200 dark:border-ink-700">
            <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-3 text-sm">图例</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {TYPES.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full" style={{ background: NODE_STYLES[t].color }} />
                  <span className="text-ink-600 dark:text-ink-400">{NODE_STYLES[t].emoji} {NODE_STYLES[t].label}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="fade" delay={600}>
          <div className="mt-8 text-center">
            <Link to="/" className="btn-secondary">返回首页</Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

export default KnowledgeGraphPage;
