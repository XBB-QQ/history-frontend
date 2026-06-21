import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { KnowledgeCardItem } from '@/types';
import { fetchKnowledgeCards } from '@/services/api';
import SectionHeader from '@/components/common/SectionHeader';
import KnowledgeGrid from '@/components/knowledge/KnowledgeGrid';
import RevealOnScroll from '@/components/common/RevealOnScroll';

function KnowledgePage() {
  const [cards, setCards] = useState<KnowledgeCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKnowledgeCards()
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading || cards.length === 0) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <RevealOnScroll direction="fade">
            <SectionHeader
              label="KNOWLEDGE"
              title="史海钩沉"
              description="知识卡片，深入理解文明脉络"
            />
          </RevealOnScroll>
          <div className="text-ink-400 py-20">加载中...</div>
          <RevealOnScroll direction="fade" delay={200}>
            <Link to="/" className="btn-secondary mt-12 inline-flex">返回首页</Link>
          </RevealOnScroll>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="KNOWLEDGE"
            title="史海钩沉"
            description="知识卡片，深入理解文明脉络"
          />
        </RevealOnScroll>
        <RevealOnScroll direction="up" delay={200}>
          <KnowledgeGrid cards={cards} />
        </RevealOnScroll>
        <RevealOnScroll direction="fade" delay={400}>
          <Link to="/" className="btn-secondary mt-12 inline-flex">返回首页</Link>
        </RevealOnScroll>
      </div>
    </div>
  );
}

export default KnowledgePage;
