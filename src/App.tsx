import { Routes, Route, lazy, Suspense } from 'react-router-dom';
import HomePage from './pages/HomePage';
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const DynastiesPage = lazy(() => import('./pages/DynastiesPage'));
const PersonsPage = lazy(() => import('./pages/PersonsPage'));
const KnowledgePage = lazy(() => import('./pages/KnowledgePage'));
const MapPage = lazy(() => import('./pages/MapPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
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
          <Route path="/" element={<HomePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/dynasties" element={<DynastiesPage />} />
          <Route path="/persons" element={<PersonsPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
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
