/**
 * KnowledgeMasonry — 知识卡片瀑布流布局
 * 使用 CSS columns 实现真正的瀑布流，卡片高度不一也能完美排列
 * @see ITERATIONS.md Iteration #29
 */

import type { KnowledgeCardItem } from '@/types';
import KnowledgeCard from './KnowledgeCard';

interface KnowledgeMasonryProps {
  cards: KnowledgeCardItem[];
}

export default function KnowledgeMasonry({ cards }: KnowledgeMasonryProps) {
  // 3列瀑布流：手机1列、平板2列、桌面3列
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {cards.map((card) => (
        <div key={card.id} className="break-inside-avoid">
          <KnowledgeCard card={card} />
        </div>
      ))}
    </div>
  );
}
