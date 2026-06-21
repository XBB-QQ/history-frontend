import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { KnowledgeCardItem } from '@/types';
import { fetchKnowledgeCards } from '@/services/api';
import SectionHeader from '@/components/common/SectionHeader';
import KnowledgeGrid from '@/components/knowledge/KnowledgeGrid';

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
      <div className="min-h-screen bg-paper py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeader
            label="KNOWLEDGE"
            title="史海钩沉"
            description="知识卡片，深入理解文明脉络"
          />
          <div className="text-ink-400 py-20">加载中...</div>
          <Link to="/" className="btn-secondary mt-12 inline-flex">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <SectionHeader
          label="KNOWLEDGE"
          title="史海钩沉"
          description="知识卡片，深入理解文明脉络"
        />
        <KnowledgeGrid cards={cards} />
        <Link to="/" className="btn-secondary mt-12 inline-flex">返回首页</Link>
      </div>
    </div>
  );
}

export default KnowledgePage;
