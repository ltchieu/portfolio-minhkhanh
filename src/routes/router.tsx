import { Routes, Route } from 'react-router-dom';
import MainPortfolio from './MainPortfolio';
import FreelanceJobDetail from '../components/FreelanceJobDetail';
import MarketingExecutiveJobDetail from '../components/MarketingExecutiveJobDetail';
import MarComAssociateJobDetail from '../components/MarComAssociateJobDetail';
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
        <Route
          path="/experience/marketing-executive-probation"
          element={<MarketingExecutiveJobDetail />}
        />
        <Route
          path="/experience/ou-news-marcom-associate"
          element={<MarComAssociateJobDetail />}
        />
        {/* Fallback route to home page */}
        <Route path="*" element={<MainPortfolio />} />
      </Routes>
    </>
  );
}
