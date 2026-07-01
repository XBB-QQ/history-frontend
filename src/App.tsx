import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const DynastiesPage = lazy(() => import('./pages/DynastiesPage'));
const PersonsPage = lazy(() => import('./pages/PersonsPage'));
const KnowledgePage = lazy(() => import('./pages/KnowledgePage'));
const MapPage = lazy(() => import('./pages/MapPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const LearningPage = lazy(() => import('./pages/LearningPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ProfileReportPage = lazy(() => import('./pages/ProfileReportPage'));
const WorldComparePage = lazy(() => import('./pages/WorldComparePage'));
const SimulatorPage = lazy(() => import('./pages/SimulatorPage'));
const DialogPage = lazy(() => import('./pages/DialogPage'));
const KnowledgeGraphPage = lazy(() => import('./pages/KnowledgeGraphPage'));
const CardsPage = lazy(() => import('./pages/CardsPage'));
const DynastyCardPage = lazy(() => import('./pages/DynastyCardPage'));
const SkyEventPage = lazy(() => import('./pages/SkyEventPage'));
const CausalChainPage = lazy(() => import('./pages/CausalChainPage'));
const LearningPathPage = lazy(() => import('./pages/LearningPathPage'));
const DebatePage = lazy(() => import('./pages/DebatePage'));
const TechTreePage = lazy(() => import('./pages/TechTreePage'));
const CharEvolutionPage = lazy(() => import('./pages/CharEvolutionPage'));
const DynastyFoodPage = lazy(() => import('./pages/DynastyFoodPage'));
const DynastyComparePage = lazy(() => import('./pages/DynastyComparePage'));
const CalendarConverterPage = lazy(() => import('./pages/CalendarConverterPage'));
const ClimatePage = lazy(() => import('./pages/ClimatePage'));
const PodcastPage = lazy(() => import('./pages/PodcastPage'));
const K12PathPage = lazy(() => import('./pages/K12PathPage'));
const RagQaPage = lazy(() => import('./pages/RagQaPage'));
const CrossDebatePage = lazy(() => import('./pages/CrossDebatePage'));
const AiHistorianPage = lazy(() => import('./pages/AiHistorianPage'));
const LetterPage = lazy(() => import('./pages/LetterPage'));
const MomentsPage = lazy(() => import('./pages/MomentsPage'));
const DailyGreetingPage = lazy(() => import('./pages/DailyGreetingPage'));
const TimeCapsulePage = lazy(() => import('./pages/TimeCapsulePage'));
const MultiPerspectivePage = lazy(() => import('./pages/MultiPerspectivePage'));
const ClassicalAnnotationPage = lazy(() => import('./pages/ClassicalAnnotationPage'));
const DynastyEconomyPage = lazy(() => import('./pages/DynastyEconomyPage'));
const BattleSandbagPage = lazy(() => import('./pages/BattleSandbagPage'));
const InkAnimationPage = lazy(() => import('./pages/InkAnimationPage'));
const TerritoryMapPage = lazy(() => import('./pages/TerritoryMapPage'));
const MigrationMapPage = lazy(() => import('./pages/MigrationMapPage'));
const SoundMuseumPage = lazy(() => import('./pages/SoundMuseumPage'));
const ContributionPage = lazy(() => import('./pages/ContributionPage'));
const TopicListPage = lazy(() => import('./pages/TopicListPage'));
const TopicDetailPage = lazy(() => import('./pages/TopicDetailPage'));

// 后台管理页面（不用 lazy，避免 SSR 问题）
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import EventsEditor from './pages/admin/EventsEditor';
import PersonsEditor from './pages/admin/PersonsEditor';
import DynastiesEditor from './pages/admin/DynastiesEditor';
import KnowledgeEditor from './pages/admin/KnowledgeEditor';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollProgress from './components/common/ScrollProgress';
import SearchModal from './components/common/SearchModal';
import DetailModal from './components/detail/DetailModal';
import BackgroundLayer from './components/background/BackgroundLayer';
import SceneSwitcher from './components/scene/SceneSwitcher';
import SceneTransition from './components/scene/SceneTransition';
import { useSceneStore } from './store/sceneStore';
import { preloadAllSceneFonts } from './utils/fontLoader';

function App() {
  const hydrateFromStorage = useSceneStore((s) => s.hydrateFromStorage);

  // 启动时恢复场景偏好 + 后台预加载所有字体
  useEffect(() => {
    hydrateFromStorage();
    // 延迟预加载，不阻塞首屏
    const timer = setTimeout(() => preloadAllSceneFonts(), 3000);
    // 注册 Service Worker (PWA)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    return () => clearTimeout(timer);
  }, [hydrateFromStorage]);

  return (
    <BackgroundLayer>
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <SceneTransition />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-ink-950">
            <div className="text-center">
              <div className="text-4xl mb-2 animate-pulse">史</div>
              <p className="text-ink-400 dark:text-ink-500">加载中...</p>
            </div>
          </div>
        }
      >
        <Routes>
          {/* 前台路由 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/dynasties" element={<DynastiesPage />} />
          <Route path="/persons" element={<PersonsPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/learning" element={<LearningPage />} />

          {/* 用户路由 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile-report" element={<ProfileReportPage />} />
          <Route path="/world-compare" element={<WorldComparePage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/dialog" element={<DialogPage />} />
          <Route path="/knowledge-graph" element={<KnowledgeGraphPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/dynasty-card" element={<DynastyCardPage />} />
          <Route path="/sky-events" element={<SkyEventPage />} />
          <Route path="/causal-chain" element={<CausalChainPage />} />
          <Route path="/learning-path" element={<LearningPathPage />} />
          <Route path="/debate" element={<DebatePage />} />
          <Route path="/tech-tree" element={<TechTreePage />} />
          <Route path="/char-evolution" element={<CharEvolutionPage />} />
          <Route path="/dynasty-food" element={<DynastyFoodPage />} />
          <Route path="/dynasty-compare" element={<DynastyComparePage />} />
          <Route path="/calendar" element={<CalendarConverterPage />} />
          <Route path="/climate" element={<ClimatePage />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/k12" element={<K12PathPage />} />
          <Route path="/rag-qa" element={<RagQaPage />} />
          <Route path="/cross-debate" element={<CrossDebatePage />} />
          <Route path="/ai-historian" element={<AiHistorianPage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="/moments" element={<MomentsPage />} />
          <Route path="/greeting" element={<DailyGreetingPage />} />
          <Route path="/time-capsule" element={<TimeCapsulePage />} />
          <Route path="/multi-perspective" element={<MultiPerspectivePage />} />
          <Route path="/classical-annotation" element={<ClassicalAnnotationPage />} />
          <Route path="/dynasty-economy" element={<DynastyEconomyPage />} />
          <Route path="/battle" element={<BattleSandbagPage />} />
          <Route path="/ink-animation" element={<InkAnimationPage />} />
          <Route path="/territory" element={<TerritoryMapPage />} />
          <Route path="/migration" element={<MigrationMapPage />} />
          <Route path="/sound-museum" element={<SoundMuseumPage />} />
          <Route path="/contribution" element={<ContributionPage />} />
          <Route path="/topics" element={<TopicListPage />} />
          <Route path="/topic/:uid" element={<TopicDetailPage />} />

          {/* 后台管理路由 */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="events" element={<EventsEditor />} />
            <Route path="events/:editId" element={<EventsEditor />} />
            <Route path="persons" element={<PersonsEditor />} />
            <Route path="persons/:editId" element={<PersonsEditor />} />
            <Route path="dynasties" element={<DynastiesEditor />} />
            <Route path="dynasties/:editId" element={<DynastiesEditor />} />
            <Route path="knowledge" element={<KnowledgeEditor />} />
            <Route path="knowledge/:editId" element={<KnowledgeEditor />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
      <SearchModal />
      <DetailModal />
      <SceneSwitcher />
    </BackgroundLayer>
  );
}

export default App;
