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
              <div className="text-4xl mb-2 animate-pulse">📜</div>
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
