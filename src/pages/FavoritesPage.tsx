import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useDetailStore } from '@/store/detailStore';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import SectionHeader from '@/components/common/SectionHeader';

type FavoriteType = 'event' | 'person' | 'dynasty' | 'knowledge';

const typeLabels: Record<FavoriteType, string> = {
  event: '事件',
  person: '人物',
  dynasty: '朝代',
  knowledge: '知识',
};

const typeIcons: Record<FavoriteType, string> = {
  event: '📅',
  person: '👤',
  dynasty: '🏚️',
  knowledge: '📚',
};

const typeColors: Record<FavoriteType, string> = {
  event: 'bg-accent/10 text-accent',
  person: 'bg-indigo-100 text-indigo-700',
  dynasty: 'bg-darkGreen/10 text-darkGreen',
  knowledge: 'bg-gold/10 text-gold',
};

function FavoriteItem({ id, type, title, pinned }: { id: string; type: FavoriteType; title: string; pinned: boolean }) {
  const navigate = useNavigate();
  const openDetail = useDetailStore((s) => s.openDetail);

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
            {typeLabels[type]}
          </span>
          {pinned && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-white">置顶</span>
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
  const { favorites, removeFavorite, togglePin } = useFavoriteStore();

  // 排序：置顶在前，然后按添加时间倒序
  const sortedFavorites = useMemo(() => {
    return [...favorites].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.addedAt - a.addedAt;
    });
  }, [favorites]);

  const pinnedCount = favorites.filter((f) => f.pinned).length;

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="FAVORITES"
            title="我的收藏"
            description={`已收藏 ${favorites.length} 项内容，其中 ${pinnedCount} 项已置顶`}
          />
        </RevealOnScroll>

        {sortedFavorites.length === 0 ? (
          <RevealOnScroll direction="scale">
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📜</div>
              <p className="text-ink-400 text-lg mb-2">还没有收藏任何内容</p>
              <p className="text-ink-300 text-sm">点击详情弹窗中的收藏按钮，即可收藏感兴趣的内容</p>
            </div>
          </RevealOnScroll>
        ) : (
          <div className="space-y-3">
            {sortedFavorites.map((fav) => (
              <div key={fav.id} className="relative group">
                <FavoriteItem {...fav} />
                {/* 操作按钮 */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePin(fav.id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-700 text-ink-400 hover:text-accent transition-colors"
                    title={fav.pinned ? '取消置顶' : '置顶'}
                  >
                    <svg className="w-4 h-4" fill={fav.pinned ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(fav.id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-ink-400 hover:text-red-600 transition-colors"
                    title="移除收藏"
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

        {favorites.length > 0 && (
          <RevealOnScroll direction="fade" delay={200}>
            <div className="text-center mt-8">
              <a href="/" className="btn-secondary inline-flex">返回首页</a>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  );
}
