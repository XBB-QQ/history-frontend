import { useEffect, useRef } from 'react';
import { useDetailStore } from '@/store/detailStore';
import type {
  FrontendEvent,
  FrontendPerson,
  FrontendDynasty,
  FrontendKnowledge,
} from '@/services/api';

// ──────────────────────────────────────────────
// 各类型详情子组件
// ──────────────────────────────────────────────

function EventDetail({ data }: { data: FrontendEvent }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-accent">{data.yearDisplay}</span>
        {data.dynasty && (
          <span className="text-sm px-2 py-1 bg-ink-100 rounded-full text-ink-600">
            {data.dynasty}
          </span>
        )}
        <span className="text-sm px-2 py-1 bg-ink-100 rounded-full text-ink-600">
          {data.category}
        </span>
      </div>
      <p className="text-ink-700 leading-relaxed">{data.description}</p>
      {data.fulltext && (
        <p className="text-sm text-ink-500 leading-relaxed border-l-2 border-accent/30 pl-3">
          {data.fulltext}
        </p>
      )}
      {data.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {data.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-ink-50 rounded-full text-ink-400">
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
        <span className="text-sm px-2 py-1 bg-ink-100 rounded-full text-ink-600">
          {data.dynasty || '未知朝代'}
        </span>
        {data.gender === 'female' && (
          <span className="text-xs px-2 py-1 bg-pink-100 rounded-full text-pink-600">女</span>
        )}
        {data.courtesyName && (
          <span className="text-sm text-ink-400">字 {data.courtesyName}</span>
        )}
      </div>
      {data.quote && (
        <blockquote className="text-lg font-medium text-ink-700 italic border-l-2 border-accent/30 pl-3">
          "{data.quote}"
        </blockquote>
      )}
      {data.bio && (
        <p className="text-ink-600 leading-relaxed">{data.bio}</p>
      )}
      {data.roles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.roles.map((role) => (
            <span key={role} className="text-xs px-2 py-1 bg-ink-50 rounded-full text-ink-400">
              {role}
            </span>
          ))}
        </div>
      )}
      {data.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {data.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-ink-50 rounded-full text-ink-400">
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
          <span className="text-sm text-ink-400">{data.period}</span>
        )}
      </div>
      {data.highlights && (
        <p className="text-sm text-ink-500">
          <span className="font-semibold text-ink-700">亮点：</span>{data.highlights}
        </p>
      )}
      {data.description && (
        <p className="text-ink-600 leading-relaxed">{data.description}</p>
      )}
      <div className="grid grid-cols-2 gap-4 text-sm">
        {data.founder && (
          <div>
            <span className="text-ink-400">建立者：</span>
            <span className="text-ink-700 font-medium">{data.founder}</span>
          </div>
        )}
        <div>
          <span className="text-ink-400">都城：</span>
          <span className="text-ink-700 font-medium">{data.capital}</span>
        </div>
        <div>
          <span className="text-ink-400">时长：</span>
          <span className="text-ink-700 font-medium">{data.duration}</span>
        </div>
        {data.fallReason && (
          <div>
            <span className="text-ink-400">灭亡原因：</span>
            <span className="text-ink-700 font-medium">{data.fallReason}</span>
          </div>
        )}
      </div>
      {data.legacy && (
        <p className="text-sm text-ink-500 border-t border-ink-100 pt-3">
          <span className="font-semibold text-ink-700">影响：</span>{data.legacy}
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
          <span className="text-sm px-2 py-1 bg-accent/10 rounded-full text-accent">
            {data.startYearDisplay || `${data.startYear}年`}
          </span>
        )}
        {data.dynasty && (
          <span className="text-sm px-2 py-1 bg-ink-100 rounded-full text-ink-600">
            {data.dynasty}
          </span>
        )}
      </div>
      {data.description && (
        <p className="text-ink-700 leading-relaxed">{data.description}</p>
      )}
      {data.fulltext && (
        <p className="text-sm text-ink-500 leading-relaxed border-l-2 border-accent/30 pl-3">
          {data.fulltext}
        </p>
      )}
      {data.meta && (
        <p className="text-xs text-ink-400">备注：{data.meta}</p>
      )}
      {data.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {data.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-ink-50 rounded-full text-ink-400">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// 主弹窗组件
// ──────────────────────────────────────────────

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
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div className="bg-paper rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-200">
          <div className="flex items-center gap-3">
            <span className="text-sm px-2 py-0.5 bg-accent/10 rounded-full text-accent">
              {typeLabels[type] || type}
            </span>
            <h2 className="text-xl font-bold">
              {type === 'event' && (data as FrontendEvent)?.title}
              {type === 'person' && (data as FrontendPerson)?.name}
              {type === 'dynasty' && (data as FrontendDynasty)?.name}
              {type === 'knowledge' && (data as FrontendKnowledge)?.title}
            </h2>
          </div>
          <button
            onClick={closeDetail}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-ink-100 transition-colors"
            aria-label="关闭"
          >
            <svg className="w-5 h-5 text-ink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto max-h-[calc(85vh-80px)]">
          {renderDetail()}
        </div>
      </div>
    </div>
  );
}
