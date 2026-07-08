import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { PersonItem } from '@/types';
import { fetchAllPersons } from '@/services/api';
import SectionHeader from '@/components/common/SectionHeader';
import PersonGrid from '@/components/person/PersonGrid';
import { GridSkeleton } from '@/components/common/Skeleton';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { useT } from '@/i18n/i18n';

function PersonsPage() {
  const t = useT();
  const [persons, setPersons] = useState<PersonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchAllPersons()
      .then((data) => {
        const sorted = [...data].sort((a, b) => {
          const yearA = a.years?.[0] ?? 9999;
          const yearB = b.years?.[0] ?? 9999;
          return yearA - yearB;
        });
        setPersons(sorted);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <RevealOnScroll direction="fade">
            <SectionHeader
              label="PERSONS"
              title={t('persons.title')}
              description={t('persons.list_desc')}
            />
          </RevealOnScroll>
          <GridSkeleton count={8} />
          <RevealOnScroll direction="fade" delay={200}>
            <Link to="/" className="btn-secondary mt-12 inline-flex">{t('common.back_home')}</Link>
          </RevealOnScroll>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <RevealOnScroll direction="fade">
            <SectionHeader
              label="PERSONS"
              title={t('persons.title')}
              description={t('persons.list_desc')}
            />
          </RevealOnScroll>
          <div className="text-center py-12 text-ink-400">
            <p>{t('persons.load_failed')}</p>
          </div>
          <RevealOnScroll direction="fade" delay={200}>
            <Link to="/" className="btn-secondary mt-12 inline-flex">{t('common.back_home')}</Link>
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
            title={t('persons.title')}
            description={t('persons.description')}
          />
        </RevealOnScroll>
        <div className="mt-8">
          {loading ? <GridSkeleton count={8} /> : <PersonGrid persons={persons} />}
        </div>
        <RevealOnScroll direction="fade" delay={400}>
          <Link to="/" className="btn-secondary mt-12 inline-flex">{t('common.back_home')}</Link>
        </RevealOnScroll>
      </div>
    </div>
  );
}

export default PersonsPage;
