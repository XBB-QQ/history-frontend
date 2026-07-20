import { useEffect, useState } from 'react';
import HeroAnimation from '@/components/hero/HeroAnimation';
import TodayBanner from '@/components/hero/TodayBanner';
import DailyRecommendCard from '@/components/hero/DailyRecommendCard';
import HomeSearchBox from '@/components/hero/HomeSearchBox';
import TimelineOverview from '@/components/hero/TimelineOverview';
import RecentBrowseBar from '@/components/hero/RecentBrowseBar';
import PersonGallery from '@/components/hero/PersonGallery';
import TimeTravelBar from '@/components/time/TimeTravelBar';
import TimeTravelPanel from '@/components/time/TimeTravelPanel';
import QuizDialog from '@/components/quiz/QuizDialog';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { fetchTimelineEvents } from '@/services/api';
import { useT } from '@/i18n/i18n';
import type { EventItem } from '@/types';

function HomePage() {
  const t = useT();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    fetchTimelineEvents().then(setEvents).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-paper dark:bg-ink-950">
      <TimeTravelBar />
      <HeroAnimation />

      {/* B4: 首页搜索框（Hero 下方） */}
      <RevealOnScroll direction="up" delay={100}>
        <div className="w-full max-w-5xl px-4 mt-6">
          <HomeSearchBox />
        </div>
      </RevealOnScroll>

      {/* A1: 最近浏览继续浏览条 */}
      <RevealOnScroll direction="up" delay={150}>
        <div className="w-full max-w-5xl px-4 mt-6">
          <RecentBrowseBar />
        </div>
      </RevealOnScroll>

      <TodayBanner />

      {/* 每日挑战入口 */}
      <div className="w-full max-w-5xl px-4 mt-6">
        <button
          onClick={() => setShowQuiz(true)}
          className="w-full bg-gradient-to-r from-amber-500/10 to-red-500/10 dark:from-amber-500/5 dark:to-red-500/5 rounded-2xl border border-amber-200/50 dark:border-amber-700/50 p-4 flex items-center gap-4 hover:shadow-lg transition-all cursor-pointer group"
        >
          <span className="text-lg text-ink-400 dark:text-ink-500 flex-shrink-0">◆</span>
          <div className="flex-1 text-left">
            <h3 className="font-bold text-ink-900 dark:text-ink-100 group-hover:text-accent transition-colors">
              {t('home.daily_quiz')}
            </h3>
            <p className="text-xs text-ink-500 dark:text-ink-400">
              {t('home.daily_quiz_desc')}
            </p>
          </div>
          <svg className="w-5 h-5 text-ink-400 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="w-full max-w-5xl px-4 mt-8">
        <DailyRecommendCard />
      </div>

      {/* B5: 五千年时间轴缩略图 */}
      <RevealOnScroll direction="up" delay={100}>
        <div className="w-full max-w-5xl px-4 mt-8">
          <TimelineOverview />
        </div>
      </RevealOnScroll>

      {/* C8: 五千年人物长廊 */}
      <RevealOnScroll direction="up" delay={150}>
        <div className="w-full max-w-5xl px-4 mt-8">
          <PersonGallery />
        </div>
      </RevealOnScroll>

      <TimeTravelPanel events={events} />

      {/* 每日挑战弹窗 */}
      <QuizDialog isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
    </div>
  );
}

export default HomePage;
