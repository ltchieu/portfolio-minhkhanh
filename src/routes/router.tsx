import { Routes, Route } from 'react-router-dom';
import MainPortfolio from './MainPortfolio';
import FreelanceJobDetail from '../components/FreelanceJobDetail';
import ScrollManager from './ScrollManager';

export default function AppRouter() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route
          path="/experience/freelance-event-coordinator"
          element={<FreelanceJobDetail />}
        />
        {/* Fallback route to home page */}
        <Route path="*" element={<MainPortfolio />} />
      </Routes>
    </>
  );
}
