import { Link } from 'react-router-dom';
import SealStamp from '@/components/common/SealStamp';
import SectionHeader from '@/components/common/SectionHeader';

function HomePage() {
  const entryCards = [
    {
      to: '/timeline',
      icon: '📅',
      title: '时间轴',
      desc: '从炎黄到现代，一览五千年大事',
    },
    {
      to: '/dynasties',
      icon: '🏚',
      title: '朝代更迭',
      desc: '十三王朝兴衰，见证历史沧桑',
    },
    {
      to: '/persons',
      icon: '🤔',
      title: '人物志',
      desc: '五十位历史人物，各领风骚数百年',
    },
    {
      to: '/knowledge',
      icon: '📚',
      title: '史海钩沉',
      desc: '知识卡片，深入理解文明脉络',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper">
      <SealStamp text="史" size="lg" className="mb-8" />

      <SectionHeader
        label="五千年史馆"
        title="以史为鉴 · 可知兴替"
        description="探索中华文明五千年辉煌历史"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl px-6 animate-slide-up delay-500">
        {entryCards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="group block"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-ink-200 hover:border-accent transition-all duration-300 hover:shadow-lg">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                {card.title}
              </h3>
              <p className="text-ink-500 text-sm">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-20 text-center text-ink-300 text-sm pb-8">
        <p>五千年史馆 v0.1.0 — React + TypeScript + Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default HomePage;
