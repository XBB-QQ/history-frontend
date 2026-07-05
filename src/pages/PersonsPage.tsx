import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { PersonItem } from '@/types';
import { fetchAllPersons } from '@/services/api';
import SectionHeader from '@/components/common/SectionHeader';
import PersonGrid from '@/components/person/PersonGrid';
import { GridSkeleton } from '@/components/common/Skeleton';
import RevealOnScroll from '@/components/common/RevealOnScroll';

function PersonsPage() {
  const [persons, setPersons] = useState<PersonItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPersons()
      .then((data) => {
        // 按出生年份排序（从古到今）
        const sorted = [...data].sort((a, b) => {
          const yearA = a.years?.[0] ?? 9999;
          const yearB = b.years?.[0] ?? 9999;
          return yearA - yearB;
        });
        setPersons(sorted);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading || persons.length === 0) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <RevealOnScroll direction="fade">
            <SectionHeader
              label="PERSONS"
              title="人物志"
              description="人物列表"
            />
          </RevealOnScroll>
          <GridSkeleton count={8} />
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
            label="PERSONS"
            title="人物志"
            description="从先秦到近代，纵览五千年风云人物"
          />
        </RevealOnScroll>
        <RevealOnScroll direction="up" delay={200}>
          {loading ? <GridSkeleton count={8} /> : <PersonGrid persons={persons} />}
        </RevealOnScroll>
        <RevealOnScroll direction="fade" delay={400}>
          <Link to="/" className="btn-secondary mt-12 inline-flex">返回首页</Link>
        </RevealOnScroll>
      </div>
    </div>
  );
}

export default PersonsPage;
