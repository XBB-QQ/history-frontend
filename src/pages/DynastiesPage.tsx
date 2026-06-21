import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { DynastyItem } from '@/types';
import { fetchDynasties } from '@/services/api';
import SectionHeader from '@/components/common/SectionHeader';
import DynastyGrid from '@/components/dynasty/DynastyGrid';

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
      <div className="min-h-screen bg-paper py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeader
            label="DYNASTIES"
            title="历代朝代"
            description="纵观中国主要朝代，感受历史脉动"
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
          label="DYNASTIES"
          title="历代朝代"
          description="纵观中国主要朝代，感受历史脉动"
        />
        <DynastyGrid dynasties={dynasties} />
        <Link to="/" className="btn-secondary mt-12 inline-flex">返回首页</Link>
      </div>
    </div>
  );
}

export default DynastiesPage;
