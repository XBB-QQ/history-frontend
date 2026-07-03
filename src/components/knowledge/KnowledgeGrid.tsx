import type { KnowledgeCardItem } from '@/types';
import KnowledgeCard from './KnowledgeCard';

interface KnowledgeGridProps {
  cards: KnowledgeCardItem[];
}

export default function KnowledgeGrid({ cards }: KnowledgeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card: any) => (
        <KnowledgeCard key={card.id} card={card} />
      ))}
    </div>
  );
}
