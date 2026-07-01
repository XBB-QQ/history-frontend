import { useEffect, useRef, useState } from 'react';
import { useDetailStore } from '@/store/detailStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useUserStore } from '@/store/userStore';
import { useNavigate, useLocation } from 'react-router-dom';
import type {
  FrontendEvent,
  FrontendPerson,
  FrontendDynasty,
  FrontendKnowledge,
} from '@/services/api';
import { fetchTimelineEvents, fetchAllPersons, fetchDynasties, fetchKnowledgeCards } from '@/services/api';
import ShareDialog from '@/components/share/ShareDialog';
import CommentSection from '@/components/comments/CommentSection';
import RelationshipGraph from '@/components/person/RelationshipGraph';
import ClassicalTextPanel from '@/components/detail/ClassicalTextPanel';
import VoiceHistorian from '@/components/detail/VoiceHistorian';

// ──────────────────────────────────────────────
// 各类型详情子组件
// ──────────────────────────────────────────────

function EventDetail({ data }: { data: FrontendEvent }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-lg font-bold text-accent">{data.yearDisplay}</span>
        {data.dynasty && (
          <span className="text-sm px-2 py-1 bg-ink-100 dark:bg-ink-800 rounded-full text-ink-600 dark:text-ink-300">
            {data.dynasty}
          </span>
        )}
        <span className="text-sm px-2 py-1 bg-ink-100 dark:bg-ink-800 rounded-full text-ink-600 dark:text-ink-300">
          {data.category}
        </span>
        {data.significance && (
          <span className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-400">
            重要度: {'星'.repeat(data.significance)}
          </span>
        )}
      </div>
      <p className="text-ink-800 leading-relaxed">{data.description}</p>
      {data.fulltext && (
        <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed border-l-2 border-accent/30 pl-3">
          {data.fulltext}
        </p>
      )}
      {/* 史书原文引用 */}
      {data.classicalText && (
        <ClassicalTextPanel
          classicalText={data.classicalText}
          classicalSource={data.classicalSource}
          modernTranslation={data.modernTranslation}
        />
      )}
      {/* 语音史官 */}
      <VoiceHistorian event={data} />
      {data.impact && (
        <div>
          <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1">历史影响</h4>
          <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">{data.impact}</p>
        </div>
      )}
      {data.relatedArticles && data.relatedArticles.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1">相关文章</h4>
          <ul className="text-sm text-ink-600 dark:text-ink-400 list-disc list-inside space-y-0.5">
            {data.relatedArticles.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}
      {data.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {data.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-ink-50 dark:bg-ink-800 rounded-full text-ink-400 dark:text-ink-500 dark:text-ink-400">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function PersonDetail({ data }: { data: FrontendPerson }) {
  const { id, uid } = useDetailStore();
  const [activeTab, setActiveTab] = useState<'info' | 'relations'>('info');

  return (
    <div className="space-y-4">
      {/* 标签页切换 */}
      <div className="flex gap-4 border-b border-ink-200 dark:border-ink-700">
        <button
          onClick={() => setActiveTab('info')}
          className={`pb-2 text-sm font-bold transition-colors ${
            activeTab === 'info'
              ? 'text-accent border-b-2 border-accent'
              : 'text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-300'
          }`}
        >
          基本信息
        </button>
        <button
          onClick={() => setActiveTab('relations')}
          className={`pb-2 text-sm font-bold transition-colors ${
            activeTab === 'relations'
              ? 'text-accent border-b-2 border-accent'
              : 'text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-300'
          }`}
        >
          关系图谱
        </button>
      </div>

      {activeTab === 'info' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm px-2 py-1 bg-ink-100 dark:bg-ink-800 rounded-full text-ink-600 dark:text-ink-300">
              {data.dynasty || '未知朝代'}
            </span>
            {data.gender === 'female' && (
              <span className="text-xs px-2 py-1 bg-pink-100 rounded-full text-pink-600">女</span>
            )}
            {data.courtesyName && (
              <span className="text-sm text-ink-400 dark:text-ink-500 dark:text-ink-400">字 {data.courtesyName}</span>
            )}
            {data.birthPlace && (
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                生于 {data.birthPlace}
              </span>
            )}
            {data.deathPlace && (
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                卒于 {data.deathPlace}
              </span>
            )}
          </div>
          {data.quote && (
            <blockquote className="text-lg font-medium text-ink-800 italic border-l-2 border-accent/30 pl-3">
              "{data.quote}"
            </blockquote>
          )}
          {data.bio && (
            <p className="text-ink-800 leading-relaxed">{data.bio}</p>
          )}
          {data.roles.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.roles.map((role) => (
                <span key={role} className="text-xs px-2 py-1 bg-ink-50 dark:bg-ink-800 rounded-full text-ink-400 dark:text-ink-500 dark:text-ink-400">
                  {role}
                </span>
              ))}
            </div>
          )}
          {data.achievements && (
            <div>
              <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1">主要成就</h4>
              <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">{data.achievements}</p>
            </div>
          )}
          {data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {data.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-ink-50 dark:bg-ink-800 rounded-full text-ink-400 dark:text-ink-500 dark:text-ink-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'relations' && (
        <div className="py-2">
          {id && uid ? (
            <RelationshipGraph personId={id} personName={data.name} personUid={uid} />
          ) : (
            <div className="text-center py-10 text-ink-400">
              无法获取人物信息，关系图谱不可用
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DynastyDetail({ data }: { data: FrontendDynasty }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {data.periodStart !== null && data.periodEnd !== null ? (
          <span className="text-lg font-bold text-accent">
            {data.periodStart < 0 ? `${Math.abs(data.periodStart)} BC` : `${data.periodStart} AD`}
            {' — '}
            {data.periodEnd < 0 ? `${Math.abs(data.periodEnd)} BC` : `${data.periodEnd} AD`}
          </span>
        ) : (
          <span className="text-sm text-ink-400 dark:text-ink-500 dark:text-ink-400">{data.period}</span>
        )}
      </div>
      {data.highlights && (
        <p className="text-sm text-ink-500 dark:text-ink-400">
          <span className="font-semibold text-ink-700 dark:text-ink-300">亮点：</span>{data.highlights}
        </p>
      )}
      {data.description && (
        <p className="text-ink-800 leading-relaxed">{data.description}</p>
      )}
      <div className="grid grid-cols-2 gap-4 text-sm">
        {data.founder && (
          <div>
            <span className="text-ink-500 dark:text-ink-400">建立者：</span>
            <span className="text-ink-800 font-medium">{data.founder}</span>
          </div>
        )}
        <div>
          <span className="text-ink-500 dark:text-ink-400">都城：</span>
          <span className="text-ink-800 font-medium">{data.capital}</span>
        </div>
        <div>
          <span className="text-ink-500 dark:text-ink-400">时长：</span>
          <span className="text-ink-800 font-medium">{data.duration}</span>
        </div>
        {data.fallReason && (
          <div>
            <span className="text-ink-500 dark:text-ink-400">灭亡原因：</span>
            <span className="text-ink-800 font-medium">{data.fallReason}</span>
          </div>
        )}
        {data.populationPeak && (
          <div>
            <span className="text-ink-500 dark:text-ink-400">人口峰值：</span>
            <span className="text-ink-800 font-medium">{data.populationPeak}</span>
          </div>
        )}
        {data.gdpEstimate && (
          <div>
            <span className="text-ink-500 dark:text-ink-400">GDP 估算：</span>
            <span className="text-ink-800 font-medium">{data.gdpEstimate}</span>
          </div>
        )}
      </div>
      {data.culturalHighlights && (
        <div>
          <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1">文化亮点</h4>
          <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">{data.culturalHighlights}</p>
        </div>
      )}
      {data.majorTradeRoutes && (
        <div>
          <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1">主要贸易路线</h4>
          <p className="text-sm text-ink-600 dark:text-ink-400">{data.majorTradeRoutes}</p>
        </div>
      )}
      {data.legacy && (
        <p className="text-sm text-ink-700 dark:text-ink-300 border-t border-ink-100 dark:border-ink-700 pt-3">
          <span className="font-semibold text-ink-700 dark:text-ink-300">影响：</span>{data.legacy}
        </p>
      )}
    </div>
  );
}

function KnowledgeDetail({ data }: { data: FrontendKnowledge }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {data.startYear !== null && (
          <span className="text-sm px-2 py-1 bg-accent/10 dark:bg-accent/20 rounded-full text-accent">
            {data.startYearDisplay || `${data.startYear}年`}
          </span>
        )}
        {data.dynasty && (
          <span className="text-sm px-2 py-1 bg-ink-100 dark:bg-ink-800 rounded-full text-ink-600 dark:text-ink-300">
            {data.dynasty}
          </span>
        )}
      </div>
      {data.description && (
        <p className="text-ink-800 leading-relaxed">{data.description}</p>
      )}
      {data.fulltext && (
        <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed border-l-2 border-accent/30 pl-3">
          {data.fulltext}
        </p>
      )}
      {data.meta && (
        <p className="text-xs text-ink-400 dark:text-ink-500 dark:text-ink-400">备注：{data.meta}</p>
      )}
      {data.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {data.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-ink-50 dark:bg-ink-800 rounded-full text-ink-400 dark:text-ink-500 dark:text-ink-400">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// 相关推荐组件
// ──────────────────────────────────────────────

interface RecommendationItem {
  id: number;
  title: string;
}

function Recommendations({ type, data }: { type: string | null; data: FrontendEvent | FrontendPerson | FrontendDynasty | FrontendKnowledge | null }) {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!type || !data) return;
    setLoading(true);

    const fetchRelated = async () => {
      try {
        let allItems: { id: number; title: string; dynasty?: string; tags?: string[] }[] = [];
        let filterField = '';
        let filterValue = '';

        // 根据当前类型只拉取对应数据，不拉全量
        if (type === 'event') {
          const eventData = data as FrontendEvent;
          const allEvents = await fetchTimelineEvents();
          allItems = allEvents.map((e: any) => ({ id: Number(e.id), title: e.title, dynasty: e.dynasty }));
          if (eventData.category) {
            filterField = 'dynasty'; // 优先按朝代推荐
            filterValue = eventData.dynasty;
          }
        } else if (type === 'person') {
          const personData = data as FrontendPerson;
          const allPersons = await fetchAllPersons();
          allItems = allPersons.map((p: any) => ({ id: Number(p.id), title: p.name, dynasty: p.dynasty }));
          if (personData.dynasty) {
            filterField = 'dynasty';
            filterValue = personData.dynasty;
          }
        } else if (type === 'dynasty') {
          const dynastyData = data as FrontendDynasty;
          const allDynasties = await fetchDynasties();
          allItems = allDynasties.map((d: any) => ({ id: Number(d.id), title: d.name }));
        } else if (type === 'knowledge') {
          const knowledgeData = data as FrontendKnowledge;
          const allKnowledge = await fetchKnowledgeCards();
          allItems = allKnowledge.map((k: any) => ({ id: Number(k.id), title: k.title }));
          if (knowledgeData.tags.length > 0) {
            filterField = 'tags';
            filterValue = knowledgeData.tags[0];
          }
        }

        let filtered = allItems.filter((item) => {
          if (!filterField) return true;
          if (filterField === 'tags') {
            return item.tags?.includes(filterValue);
          }
          return item[filterField as keyof typeof item] === filterValue;
        });

        const currentId = data.id ? Number(data.id) : 0;
        filtered = filtered.filter((item) => item.id !== currentId);

        setRecommendations(filtered.slice(0, 4));
      } catch {
        // 静默失败
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [type, data]);

  if (recommendations.length === 0) return null;

  const handleNavigate = (id: number) => {
    navigate(`/${type}?id=${id}`);
    // 同时关闭弹窗
    // 注意：这里需要调用 closeDetail，但由于 navigate 会触发重新渲染，弹窗会自动关闭
  };

  return (
    <div className="mt-8 pt-4 border-t border-ink-200 dark:border-ink-600 bg-ink-50 dark:bg-ink-800/50 -mx-6 px-6 py-4 rounded-b-2xl">
      <h4 className="text-sm font-bold text-ink-800 dark:text-ink-200 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        相关推荐
      </h4>
      {loading ? (
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-24 bg-ink-100 dark:bg-ink-800 rounded-full animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {recommendations.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className="text-sm px-4 py-2 bg-accent text-white hover:bg-red-800 rounded-full font-medium transition-colors shadow-md"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// 收藏按钮
// ──────────────────────────────────────────────

function FavoriteButton({ type, id, title }: { type: string; id: string; title: string }) {
  const isFav = useFavoriteStore((s) => s.isFavorite(id));
  const toggle = useFavoriteStore((s) => s.toggleFavorite);
  const { isAuthenticated } = useUserStore();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    toggle({ type: type as 'event' | 'person' | 'dynasty' | 'knowledge', id, title });
  };

  return (
    <button
      onClick={handleClick}
      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
        isFav
          ? 'text-accent hover:bg-red-50 dark:hover:bg-red-900/30'
          : 'text-ink-400 dark:text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 hover:text-accent'
      }`}
      aria-label={isFav ? '取消收藏' : '收藏'}
      title={isFav ? '取消收藏' : '收藏'}
    >
      <svg className="w-5 h-5" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    </button>
  );
}

// ──────────────────────────────────────────────
// 主弹窗组件
// ──────────────────────────────────────────────

/**
 * 移动端抽屉把手指示器
 */
function DrawerHandle() {
  return (
    <div className="flex justify-center pt-2 pb-1 md:hidden">
      <div className="w-10 h-1 rounded-full bg-ink-300 dark:bg-ink-600" />
    </div>
  );
}

/**
 * 触摸滑动钩子
 */
function useSwipeDown(onSwipeDown: () => void) {
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.changedTouches[0].screenY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.changedTouches[0].screenY;
  };

  const handleTouchEnd = () => {
    const diff = touchEndY.current - touchStartY.current;
    if (diff > 80) {
      // 向下滑动超过 80px → 关闭
      onSwipeDown();
    }
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
}

export default function DetailModal() {
  const { isOpen, type, data, closeDetail } = useDetailStore();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showShare, setShowShare] = useState(false);

  // ESC 关闭
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDetail();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, closeDetail]);

  // 点击遮罩关闭
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeDetail();
  };

  // 触摸滑动关闭
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipeDown(closeDetail);

  if (!isOpen || !data) return null;

  const typeLabels: Record<string, string> = {
    event: '事件',
    person: '人物',
    dynasty: '朝代',
    knowledge: '知识',
  };

  const renderDetail = () => {
    switch (type) {
      case 'event':
        return <EventDetail data={data as FrontendEvent} />;
      case 'person':
        return <PersonDetail data={data as FrontendPerson} />;
      case 'dynasty':
        return <DynastyDetail data={data as FrontendDynasty} />;
      case 'knowledge':
        return <KnowledgeDetail data={data as FrontendKnowledge} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 animate-fade-in md:p-6"
      onClick={handleOverlayClick}
    >
      {/* 桌面端：居中弹窗 | 移动端：底部抽屉 */}
      <div
        className="bg-paper dark:bg-ink-900/90 rounded-t-2xl shadow-2xl w-full max-w-2xl overflow-hidden
                   max-h-[90vh] md:max-h-[85vh] md:rounded-2xl
                   fixed bottom-0 left-0 right-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                   animate-[drawerSlideUp_0.35s_ease-out_forwards] md:animate-slide-up"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 移动端抽屉把手 */}
        <DrawerHandle />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-200 dark:border-ink-700">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-sm px-2 py-0.5 bg-accent/10 dark:bg-accent/20 rounded-full text-accent flex-shrink-0">
              {typeLabels[type] || type}
            </span>
            <h2 className="text-xl font-bold truncate">
              {type === 'event' && (data as FrontendEvent)?.title}
              {type === 'person' && (data as FrontendPerson)?.name}
              {type === 'dynasty' && (data as FrontendDynasty)?.name}
              {type === 'knowledge' && (data as FrontendKnowledge)?.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* 收藏按钮 */}
            {data && (
              <FavoriteButton type={type} id={String(data.id)} title={(data as FrontendEvent | FrontendPerson | FrontendDynasty | FrontendKnowledge).title || (data as FrontendPerson).name || ''} />
            )}
            {/* 分享按钮 */}
            <button
              onClick={() => setShowShare(true)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-ink-100 dark:bg-ink-800 transition-colors"
              aria-label="分享"
            >
              <svg className="w-5 h-5 text-ink-500 dark:text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button
              onClick={closeDetail}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-ink-100 dark:bg-ink-800 transition-colors"
              aria-label="关闭"
            >
              <svg className="w-5 h-5 text-ink-500 dark:text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto max-h-[calc(85vh-80px)]">
          {renderDetail()}

          {/* 相关推荐 */}
          <Recommendations type={type} data={data} />

          {/* 评论区 */}
          {data && (
            <CommentSection
              resourceId={String(data.id)}
              resourceType={type}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-ink-200 dark:border-ink-700 bg-ink-50/50 dark:bg-ink-950/50 flex items-center justify-between text-xs text-ink-400">
          <span>双击关闭弹窗</span>
          <span>五千年史馆</span>
        </div>

        {/* 移动端底部安全区 */}
        <div className="h-6 md:hidden" />
      </div>

      {/* 分享弹窗 */}
      <ShareDialog
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        title={type === 'event' ? (data as FrontendEvent)?.title : type === 'person' ? (data as FrontendPerson)?.name : type === 'dynasty' ? (data as FrontendDynasty)?.name : (data as FrontendKnowledge)?.title}
        url={window.location.href}
        description={type === 'event' ? (data as FrontendEvent)?.description : type === 'person' ? (data as FrontendPerson)?.bio : type === 'dynasty' ? (data as FrontendDynasty)?.description : (data as FrontendKnowledge)?.description}
      />
    </div>
  );
}
