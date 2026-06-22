import { useEffect, useRef, useState } from 'react';
import { useDetailStore } from '@/store/detailStore';
import { useNavigate } from 'react-router-dom';
import type {
  FrontendEvent,
  FrontendPerson,
  FrontendDynasty,
  FrontendKnowledge,
} from '@/services/api';
import { fetchTimelineEvents, fetchAllPersons, fetchDynasties, fetchKnowledgeCards } from '@/services/api';

// ──────────────────────────────────────────────
// 各类型详情子组件
// ──────────────────────────────────────────────

function EventDetail({ data }: { data: FrontendEvent }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-accent">{data.yearDisplay}</span>
        {data.dynasty && (
          <span className="text-sm px-2 py-1 bg-ink-100 dark:bg-ink-800 rounded-full text-ink-600 dark:text-ink-300">
            {data.dynasty}
          </span>
        )}
        <span className="text-sm px-2 py-1 bg-ink-100 dark:bg-ink-800 rounded-full text-ink-600 dark:text-ink-300">
          {data.category}
        </span>
      </div>
      <p className="text-ink-800 leading-relaxed">{data.description}</p>
      {data.fulltext && (
        <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed border-l-2 border-accent/30 pl-3">
          {data.fulltext}
        </p>
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
  const yearsText = data.years
    .map((y) => (y !== null ? y : '?'))
    .filter((_, i, arr) => i === 0 || arr[i - 1] !== _)
    .join(' — ');

  return (
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
      </div>
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

    // 从当前数据类型推断推荐来源
    const fetchRelated = async () => {
      try {
        let allItems: { id: number; title: string; dynasty?: string }[] = [];
        let filterField = '';
        let filterValue = '';

        if (type === 'event') {
          const eventData = data as FrontendEvent;
          const allEvents = await fetchTimelineEvents();
          allItems = allEvents.map((e: any) => ({ id: Number(e.id), title: e.title, dynasty: e.dynasty }));
          // 推荐同类别或同朝代的其他事件
          if (eventData.category) {
            filterField = 'category';
            filterValue = eventData.category;
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
        }

        // 过滤掉当前项，如果有筛选条件则只保留匹配的
        let filtered = allItems.filter((item) => {
          if (!filterField) return true;
          return item[filterField as keyof typeof item] === filterValue;
        });

        // 排除当前项
        const currentId = data.id ? Number(data.id) : 0;
        filtered = filtered.filter((item) => item.id !== currentId);

        // 取前 4 个
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
    <div className="mt-6 pt-4 border-t border-ink-300 dark:border-ink-600 bg-ink-100 dark:bg-ink-800/80 -mx-6 px-6 py-4 rounded-b-2xl">
      <h4 className="text-sm font-bold text-ink-900 mb-3 flex items-center gap-2">
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
          <div className="flex items-center gap-3">
            <span className="text-sm px-2 py-0.5 bg-accent/10 dark:bg-accent/20 rounded-full text-accent">
              {typeLabels[type] || type}
            </span>
            <h2 className="text-xl font-bold truncate">
              {type === 'event' && (data as FrontendEvent)?.title}
              {type === 'person' && (data as FrontendPerson)?.name}
              {type === 'dynasty' && (data as FrontendDynasty)?.name}
              {type === 'knowledge' && (data as FrontendKnowledge)?.title}
            </h2>
          </div>
          <button
            onClick={closeDetail}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-ink-100 dark:bg-ink-800 transition-colors flex-shrink-0"
            aria-label="关闭"
          >
            <svg className="w-5 h-5 text-ink-500 dark:text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto max-h-[calc(85vh-80px)]">
          {renderDetail()}

          {/* 相关推荐 */}
          <Recommendations type={type} data={data} />
        </div>

        {/* 移动端底部安全区 */}
        <div className="h-6 md:hidden" />
      </div>
    </div>
  );
}
