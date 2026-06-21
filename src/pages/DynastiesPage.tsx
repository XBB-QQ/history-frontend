import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { DynastyItem } from '@/types';
import { fetchDynasties } from '@/services/api';
import SectionHeader from '@/components/common/SectionHeader';
import DynastyGrid from '@/components/dynasty/DynastyGrid';
import RevealOnScroll from '@/components/common/RevealOnScroll';

function DynastiesPage() {
  const [dynasties, setDynasties] = useState<DynastyItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDynasties()
      .then((data) => {
        setDynasties(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading || dynasties.length === 0) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <RevealOnScroll direction="fade">
            <SectionHeader
              label="DYNASTIES"
              title="历代朝代"
              description="纵观中国主要朝代，感受历史脉动"
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
            label="DYNASTIES"
            title="历代朝代"
            description="纵观中国主要朝代，感受历史脉动"
          />
        </RevealOnScroll>
        <RevealOnScroll direction="up" delay={200}>
          <DynastyGrid dynasties={dynasties} />
        </RevealOnScroll>
        <RevealOnScroll direction="fade" delay={400}>
          <Link to="/" className="btn-secondary mt-12 inline-flex">返回首页</Link>
        </RevealOnScroll>
      </div>
    </div>
  );
}

export default DynastiesPage;
