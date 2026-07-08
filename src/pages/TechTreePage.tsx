import { useState, useMemo } from 'react';
import { INVENTIONS, CATEGORY_STYLE, IMPORTANCE_STYLE } from '@/data/features/techTree';
import { useT } from '@/i18n/i18n';

export default function TechTreePage() {
  const t = useT();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (selectedCategory === 'all') return INVENTIONS;
    return INVENTIONS.filter(inv => inv.category === selectedCategory);
  }, [selectedCategory]);

  const selected = INVENTIONS.find(inv => inv.id === selectedNode);

  // 构建依赖树
  const dependents = useMemo(() => {
    if (!selectedNode) return [];
    return INVENTIONS.filter(inv => inv.dependsOn.includes(selectedNode));
  }, [selectedNode]);

  const dependencies = useMemo(() => {
    if (!selectedNode) return [];
    return INVENTIONS.filter(inv => selected?.dependsOn?.includes(inv.id));
  }, [selectedNode, selected]);

  // 构建层级
  const layers = useMemo(() => {
    const rootNodes = filtered.filter(inv => inv.dependsOn.length === 0);
    const midNodes = filtered.filter(inv =>
      inv.dependsOn.length > 0 &&
      INVENTIONS.some(child => child.dependsOn.includes(inv.id))
    );
    const leafNodes = filtered.filter(inv =>
      inv.dependsOn.length > 0 &&
      !INVENTIONS.some(child => child.dependsOn.includes(inv.id))
    );
    return [rootNodes, midNodes, leafNodes];
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif">
            {t('techTree.title')}
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            {t('techTree.subtitle')}
          </p>
        </div>

        {/* 类别筛选 */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
              selectedCategory === 'all'
                ? 'border-accent bg-accent text-white'
                : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400'
            }`}
          >
            {t('techTree.all')}
          </button>
          {Object.entries(CATEGORY_STYLE).map(([key, style]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
                selectedCategory === key
                  ? 'border-accent bg-accent text-white'
                  : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:border-accent/50'
              }`}
            >
              {style.icon} {style.label}
            </button>
          ))}
        </div>

        {/* 科技树可视化 */}
        <div className="space-y-6">
          {layers.map((layer, layerIdx) => (
            <div key={layerIdx}>
              <div className="text-xs font-bold text-ink-400 dark:text-ink-500 mb-3 text-center">
                {layerIdx === 0 ? t('techTree.layer_base') : layerIdx === 1 ? t('techTree.layer_derived') : t('techTree.layer_terminal')}
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {layer.map(inv => {
                  const catStyle = CATEGORY_STYLE[inv.category];
                  const impStyle = IMPORTANCE_STYLE[inv.importance];
                  const isSelected = selectedNode === inv.id;
                  return (
                    <button
                      key={inv.id}
                      onClick={() => setSelectedNode(inv.id)}
                      className={`relative px-4 py-3 rounded-xl border-2 transition-all group ${
                        isSelected
                          ? 'border-accent bg-accent/10 dark:bg-accent/5 shadow-lg scale-105'
                          : 'border-ink-200 dark:border-ink-700 hover:border-accent/50 hover:shadow-md'
                      }`}
                      style={{ borderColor: isSelected ? catStyle.color : undefined }}
                    >
                      {/* 重要性标记 */}
                      <div className="absolute -top-2 -right-1 text-sm">{impStyle.icon}</div>
                      {/* 内容 */}
                      <div className="text-center">
                        <span className="text-sm">{catStyle.icon}</span>
                        <div className="font-bold text-ink-800 dark:text-ink-200 mt-1"
                          style={{ fontSize: `${impStyle.size * 0.6}px` }}>
                          {inv.name}
                        </div>
                        <div className="text-xs text-ink-400 mt-0.5">{inv.dynasty} · {inv.year}</div>
                      </div>
                      {/* 依赖箭头 */}
                      {inv.dependsOn.length > 0 && (
                        <div className="flex justify-center mt-1 gap-1">
                          {inv.dependsOn.map(dep => {
                            const depInv = INVENTIONS.find(d => d.id === dep);
                            return (
                              <span key={dep} className="text-xs text-ink-400">
                                ← {depInv?.name}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {/* 层间连接线提示 */}
              {layerIdx < layers.length - 1 && (
                <div className="text-center my-2 text-ink-300 dark:text-ink-600">
                  ↓ ↓ ↓
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 详情面板 */}
        {selected && (
          <div className="mt-8 p-6 rounded-xl border-2 bg-ink-50/50 dark:bg-ink-800/50"
            style={{ borderColor: CATEGORY_STYLE[selected.category].color }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{CATEGORY_STYLE[selected.category].icon}</span>
              <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-100">
                {selected.name}
              </h2>
              <span className="px-2 py-1 rounded text-xs font-bold"
                style={{ backgroundColor: CATEGORY_STYLE[selected.category].color + '20', color: CATEGORY_STYLE[selected.category].color }}>
                {CATEGORY_STYLE[selected.category].label}
              </span>
              <span className="px-2 py-1 rounded text-xs font-bold bg-accent/10 text-accent">
                {IMPORTANCE_STYLE[selected.importance].icon} {IMPORTANCE_STYLE[selected.importance].label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div><span className="text-ink-400">{t('techTree.dynasty_label')}</span><span className="font-bold text-ink-700 dark:text-ink-300">{selected.dynasty}</span></div>
              <div><span className="text-ink-400">{t('techTree.year_label')}</span><span className="font-bold text-ink-700 dark:text-ink-300">{selected.year}</span></div>
            </div>

            <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed mb-4">
              {selected.description}
            </p>

            {/* 依赖关系 */}
            <div className="space-y-3">
              {dependencies.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-ink-600 dark:text-ink-400 mb-2">
                    {t('techTree.based_on')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dependencies.map(dep => (
                      <button
                        key={dep.id}
                        onClick={() => setSelectedNode(dep.id)}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-400 hover:bg-accent/10 transition-colors"
                      >
                        {CATEGORY_STYLE[dep.category].icon} {dep.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {dependents.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-ink-600 dark:text-ink-400 mb-2">
                    {t('techTree.derived_to')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dependents.map(dep => (
                      <button
                        key={dep.id}
                        onClick={() => setSelectedNode(dep.id)}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-400 hover:bg-accent/10 transition-colors"
                      >
                        {CATEGORY_STYLE[dep.category].icon} {dep.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
