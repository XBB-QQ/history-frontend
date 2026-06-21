import { useDetailStore } from '@/store/detailStore';
import type { KnowledgeCardItem } from '@/types';

interface KnowledgeCardProps {
  card: KnowledgeCardItem;
}

export default function KnowledgeCard({ card }: KnowledgeCardProps) {
  const openDetail = useDetailStore((s) => s.openDetail);

  return (
    <div
      className="bg-white/60 dark:bg-ink-900/60 backdrop-blur-sm rounded-xl p-6 border border-ink-200 dark:border-ink-700 hover:shadow-md hover:border-accent/50 dark:hover:border-accent/50 transition-all duration-300 cursor-pointer"
      onClick={() => openDetail('knowledge', card.id ? Number(card.id) : 0, card)}
    >
      {card.startYear && (
        <span className="text-xs px-2 py-1 bg-accent/10 rounded-full text-accent">
          {card.startYear}年
        </span>
      )}
      <h3 className="text-lg font-bold mt-3 mb-2">{card.title}</h3>
      <p className="text-sm text-ink-500 mb-3">{card.description}</p>
      {card.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-ink-50 rounded-full text-ink-400">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
