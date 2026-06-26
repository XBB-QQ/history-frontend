import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { KnowledgeCardItem } from '@/types';
import { fetchKnowledgeCards } from '@/services/api';
import SectionHeader from '@/components/common/SectionHeader';
import KnowledgeGrid from '@/components/knowledge/KnowledgeGrid';
import TagCloud from '@/components/knowledge/TagCloud';
import { GridSkeleton } from '@/components/common/Skeleton';
import RevealOnScroll from '@/components/common/RevealOnScroll';

function KnowledgePage() {
  const [cards, setCards] = useState<KnowledgeCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);

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

  const filteredCards = useMemo(() => {
    if (!activeTag) return cards;
    return cards.filter((c) => c.tags.includes(activeTag));
  }, [cards, activeTag]);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="KNOWLEDGE"
            title="史海钩沉"
            description="知识卡片"
          />
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={100}>
          <div className="text-left mt-6">
            <TagCloud onSelectTag={setActiveTag} activeTag={activeTag} />
          </div>
        </RevealOnScroll>

        {activeTag && (
          <RevealOnScroll direction="fade" delay={150}>
            <div className="text-left mb-4">
              <span className="text-xs text-ink-400">
                筛选标签：<span className="text-accent font-bold">{activeTag}</span>
                <button
                  onClick={() => setActiveTag(null)}
                  className="ml-2 text-ink-400 hover:text-accent transition-colors underline"
                >
                  清除筛选
                </button>
              </span>
            </div>
          </RevealOnScroll>
        )}

        <RevealOnScroll direction="up" delay={200}>
          {loading ? <GridSkeleton count={8} /> : <KnowledgeGrid cards={filteredCards} />}
        </RevealOnScroll>

        {filteredCards.length === 0 && !loading && (
          <div className="text-center py-12 text-ink-400">
            <p>该标签下暂无知识卡片</p>
          </div>
        )}

        <RevealOnScroll direction="fade" delay={400}>
          <Link to="/" className="btn-secondary mt-12 inline-flex">返回首页</Link>
        </RevealOnScroll>
      </div>
    </div>
  );
}

export default KnowledgePage;
