import { Routes, Route, lazy, Suspense } from 'react-router-dom';
import HomePage from './pages/HomePage';
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const DynastiesPage = lazy(() => import('./pages/DynastiesPage'));
const PersonsPage = lazy(() => import('./pages/PersonsPage'));
const KnowledgePage = lazy(() => import('./pages/KnowledgePage'));
const MapPage = lazy(() => import('./pages/MapPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
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
import ScrollProgress from './components/common/ScrollProgress';
import SearchModal from './components/common/SearchModal';
import DetailModal from './components/detail/DetailModal';
import BackgroundLayer from './components/background/BackgroundLayer';

function App() {
  return (
    <BackgroundLayer>
      <ScrollProgress />
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-ink-950">
          <div className="text-center">
            <div className="text-4xl mb-2 animate-pulse">📜</div>
            <p className="text-ink-400 dark:text-ink-500">加载中...</p>
          </div>
        </div>
      }>
        <Routes>
          {/* 前台路由 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/dynasties" element={<DynastiesPage />} />
          <Route path="/persons" element={<PersonsPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />

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
    </BackgroundLayer>
  );
}

export default App;
