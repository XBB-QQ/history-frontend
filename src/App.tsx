import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import DynastiesPage from './pages/DynastiesPage';
import PersonsPage from './pages/PersonsPage';
import KnowledgePage from './pages/KnowledgePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/timeline" element={<TimelinePage />} />
      <Route path="/dynasties" element={<DynastiesPage />} />
      <Route path="/persons" element={<PersonsPage />} />
      <Route path="/knowledge" element={<KnowledgePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
