import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { PersonItem } from '@/types';
import { fetchAllPersons } from '@/services/api';
import SectionHeader from '@/components/common/SectionHeader';
import PersonGrid from '@/components/person/PersonGrid';

function PersonsPage() {
  const [persons, setPersons] = useState<PersonItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPersons()
      .then((data) => {
        setPersons(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading || persons.length === 0) {
    return (
      <div className="min-h-screen bg-paper py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeader
            label="PERSONS"
            title="人物志"
            description="五十位历史人物，各领风骚数百年"
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
          label="PERSONS"
          title="人物志"
          description="五十位历史人物，各领风骚数百年"
        />
        <PersonGrid persons={persons} />
        <Link to="/" className="btn-secondary mt-12 inline-flex">返回首页</Link>
      </div>
    </div>
  );
}

export default PersonsPage;
