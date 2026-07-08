import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoriteStore } from '@/store/favoriteStore';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import SectionHeader from '@/components/common/SectionHeader';
import { useT } from '@/i18n/i18n';

type FavoriteType = 'event' | 'person' | 'dynasty' | 'knowledge';
type FilterType = 'all' | FavoriteType;

const typeLabelKeys: Record<FavoriteType, string> = {
  event: 'favorite.type_event',
  person: 'favorite.type_person',
  dynasty: 'favorite.type_dynasty',
  knowledge: 'favorite.type_knowledge',
};

const typeIcons: Record<FavoriteType, string> = {
  event: '事',
  person: '人',
  dynasty: '朝',
  knowledge: '知',
};

const typeColors: Record<FavoriteType, string> = {
  event: 'bg-accent/10 text-accent',
  person: 'bg-indigo-100 text-indigo-700',
  dynasty: 'bg-darkGreen/10 text-darkGreen',
  knowledge: 'bg-gold/10 text-gold',
};

const FILTER_TABS: { value: FilterType; label: string; icon: string }[] = [
  { value: 'all', label: '全部', icon: '◆' },
  { value: 'event', label: '事件', icon: '事' },
  { value: 'person', label: '人物', icon: '人' },
  { value: 'dynasty', label: '朝代', icon: '朝' },
  { value: 'knowledge', label: '知识', icon: '知' },
];

function FavoriteItem({ id, type, title, pinned }: { id: string; type: FavoriteType; title: string; pinned: boolean }) {
  const t = useT();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${type === 'knowledge' ? 'knowledge' : type === 'person' ? 'persons' : type === 'dynasty' ? 'dynasties' : 'timeline'}?id=${id}`);
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border border-ink-100 dark:border-ink-700 transition-all duration-300 cursor-pointer hover:shadow-md ${
        pinned ? 'bg-ink-50 dark:bg-ink-800/50' : 'bg-white/60 dark:bg-ink-900/60'
      }`}
      onClick={handleClick}
    >
      <span className="text-2xl flex-shrink-0">{typeIcons[type]}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[type]}`}>
            {t(typeLabelKeys[type])}
          </span>
          {pinned && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-white">{t('favorite.pin_badge')}</span>
          )}
        </div>
        <h3 className="text-ink-900 dark:text-ink-100 font-semibold truncate">{title}</h3>
      </div>
      <svg className="w-5 h-5 text-ink-300 dark:text-ink-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

export default function FavoritesPage() {
  const t = useT();
  const { favorites, removeFavorite, togglePin } = useFavoriteStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [groupByType, setGroupByType] = useState(false);

  // 筛选 + 排序：置顶在前，然后按添加时间倒序
  const filteredFavorites = useMemo(() => {
    const filtered = filter === 'all'
      ? favorites
      : favorites.filter((f) => f.type === filter);
    return [...filtered].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.addedAt - a.addedAt;
    });
  }, [favorites, filter]);

  // 分组视图：按类型分组
  const groupedFavorites = useMemo(() => {
    if (!groupByType) return null;
    const groups: Record<FavoriteType, typeof filteredFavorites> = {
      event: [], person: [], dynasty: [], knowledge: [],
    };
    filteredFavorites.forEach((f) => {
      groups[f.type as FavoriteType]?.push(f);
    });
    return groups;
  }, [filteredFavorites, groupByType]);

  const pinnedCount = favorites.filter((f) => f.pinned).length;

  // 类型计数（用于筛选标签）
  const typeCounts = useMemo(() => {
    const counts: Record<FilterType, number> = { all: favorites.length, event: 0, person: 0, dynasty: 0, knowledge: 0 };
    favorites.forEach((f) => { counts[f.type as FavoriteType]++; });
    return counts;
  }, [favorites]);

  // 导出收藏为 JSON 文件
  const handleExport = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      total: favorites.length,
      favorites: favorites.map((f) => ({
        id: f.id,
        type: f.type,
        title: f.title,
        pinned: f.pinned,
        addedAt: new Date(f.addedAt).toISOString(),
      })),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `favorites-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="FAVORITES"
            title={t('favorite.title')}
            description={t('favorite.summary', { total: favorites.length, pinned: pinnedCount })}
          />
        </RevealOnScroll>

        {favorites.length === 0 ? (
          <RevealOnScroll direction="scale">
            <div className="text-center py-20">
              <div className="text-6xl mb-4">史</div>
              <p className="text-ink-400 text-lg mb-2">{t('favorite.empty_title')}</p>
              <p className="text-ink-300 text-sm">{t('favorite.empty_hint')}</p>
            </div>
          </RevealOnScroll>
        ) : (
          <>
            {/* 工具栏：筛选 + 视图切换 + 导出 */}
            <RevealOnScroll direction="up" delay={80}>
              <div className="mt-6 mb-4 space-y-3">
                {/* 筛选标签 */}
                <div className="flex flex-wrap gap-2">
                  {FILTER_TABS.map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setFilter(tab.value)}
                      className={`px-3 py-1.5 text-xs rounded-full transition-all border flex items-center gap-1.5 ${
                        filter === tab.value
                          ? 'bg-accent text-white border-accent shadow-md'
                          : 'bg-white/60 dark:bg-ink-900/60 border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:border-accent/50 hover:text-accent'
                      }`}
                    >
                      <span className="text-[10px]">{tab.icon}</span>
                      <span>{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        filter === tab.value ? 'bg-white/20' : 'bg-ink-100 dark:bg-ink-800'
                      }`}>
                        {typeCounts[tab.value]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* 视图切换 + 导出按钮 */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-ink-400">视图：</span>
                    <button
                      onClick={() => setGroupByType(false)}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        !groupByType ? 'bg-accent/10 text-accent font-bold' : 'text-ink-500 hover:text-accent'
                      }`}
                    >
                      列表
                    </button>
                    <button
                      onClick={() => setGroupByType(true)}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        groupByType ? 'bg-accent/10 text-accent font-bold' : 'text-ink-500 hover:text-accent'
                      }`}
                    >
                      按类型分组
                    </button>
                  </div>
                  <button
                    onClick={handleExport}
                    className="px-3 py-1.5 text-xs rounded-lg border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:border-accent/50 hover:text-accent transition-all flex items-center gap-1.5"
                    title="导出收藏为 JSON 文件"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    导出 JSON
                  </button>
                </div>
              </div>
            </RevealOnScroll>

            {/* 列表/分组视图 */}
            {filteredFavorites.length === 0 ? (
              <div className="text-center py-12 text-ink-400">
                <p className="text-lg mb-1">该分类下暂无收藏</p>
                <p className="text-sm">切换其他筛选试试</p>
              </div>
            ) : groupByType && groupedFavorites ? (
              <div className="space-y-6">
                {(Object.keys(groupedFavorites) as FavoriteType[]).map((type) => {
                  const items = groupedFavorites[type];
                  if (items.length === 0) return null;
                  return (
                    <div key={type}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">{typeIcons[type]}</span>
                        <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 tracking-widest">
                          {t(typeLabelKeys[type])}
                        </h3>
                        <span className="text-xs text-ink-400">({items.length})</span>
                        <div className="flex-1 h-px bg-ink-100 dark:bg-ink-800" />
                      </div>
                      <div className="space-y-3">
                        {items.map((fav) => (
                          <div key={fav.id} className="relative group">
                            <FavoriteItem {...fav} />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => { e.stopPropagation(); togglePin(fav.id); }}
                                className="p-1.5 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-700 text-ink-400 hover:text-accent transition-colors"
                                title={fav.pinned ? t('favorite.unpin') : t('favorite.pin')}
                              >
                                <svg className="w-4 h-4" fill={fav.pinned ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); removeFavorite(fav.id); }}
                                className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-ink-400 hover:text-red-600 transition-colors"
                                title={t('favorite.remove_label')}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFavorites.map((fav) => (
                  <div key={fav.id} className="relative group">
                    <FavoriteItem {...fav} />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); togglePin(fav.id); }}
                        className="p-1.5 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-700 text-ink-400 hover:text-accent transition-colors"
                        title={fav.pinned ? t('favorite.unpin') : t('favorite.pin')}
                      >
                        <svg className="w-4 h-4" fill={fav.pinned ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeFavorite(fav.id); }}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-ink-400 hover:text-red-600 transition-colors"
                        title={t('favorite.remove_label')}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {favorites.length > 0 && (
          <RevealOnScroll direction="fade" delay={200}>
            <div className="text-center mt-8">
              <a href="/" className="btn-secondary inline-flex">{t('common.back_home')}</a>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  );
}
