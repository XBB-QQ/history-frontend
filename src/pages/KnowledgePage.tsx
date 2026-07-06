import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { KnowledgeCardItem } from '@/types';
import { fetchKnowledgeCards } from '@/services/api';
import SectionHeader from '@/components/common/SectionHeader';
import KnowledgeMasonry from '@/components/knowledge/KnowledgeMasonry';
import TagCloud from '@/components/knowledge/TagCloud';
import { GridSkeleton } from '@/components/common/Skeleton';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { useT } from '@/i18n/i18n';

function KnowledgePage() {
  const t = useT();
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
    // 多标签筛选（逗号分隔）
    const tags = activeTag.split(',').map(t => t.trim()).filter(Boolean);
    if (tags.length === 1) {
      return cards.filter((c) => c.tags.includes(tags[0]));
    }
    // AND 模式：所有标签都要有
    return cards.filter((c) => tags.every(t => c.tags.includes(t)));
  }, [cards, activeTag]);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="KNOWLEDGE"
            title={t('knowledge.title')}
            description={t('knowledge.cards_label')}
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
                {t('knowledge.filter_label')}
                {activeTag!.split(',').map(t => t.trim()).filter(Boolean).map((t, i) => (
                  <span key={i} className="text-accent font-bold">
                    {i > 0 && ' ∩ '}#{t}
                  </span>
                ))}
                <button
                  onClick={() => setActiveTag(null)}
                  className="ml-2 text-ink-400 hover:text-accent transition-colors underline"
                >
                  {t('knowledge.clear_filter')}
                </button>
              </span>
            </div>
          </RevealOnScroll>
        )}

        <RevealOnScroll direction="up" delay={200}>
          {loading ? <GridSkeleton count={8} /> : <KnowledgeMasonry cards={filteredCards} />}
        </RevealOnScroll>

        {filteredCards.length === 0 && !loading && (
          <div className="text-center py-12 text-ink-400">
            <p>{t('knowledge.no_card')}</p>
          </div>
        )}

        <RevealOnScroll direction="fade" delay={400}>
          <Link to="/" className="btn-secondary mt-12 inline-flex">{t('common.back_home')}</Link>
        </RevealOnScroll>
      </div>
    </div>
  );
}

export default KnowledgePage;
