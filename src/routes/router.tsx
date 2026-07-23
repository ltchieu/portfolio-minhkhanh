import { Routes, Route } from 'react-router-dom';
import MainPortfolio from './MainPortfolio';
import FreelanceJobDetail from '../components/FreelanceJobDetail';
import MarketingExecutiveJobDetail from '../components/MarketingExecutiveJobDetail';
import MarComAssociateJobDetail from '../components/MarComAssociateJobDetail';
import PRInternJobDetail from '../components/PRInternJobDetail';
import XuanTinhNguyen2021Detail from '../components/XuanTinhNguyen2021Detail';
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
        <Route
          path="/experience/school-advanced-study-pr"
          element={<PRInternJobDetail />}
        />
        <Route
          path="/experience/pr-practitioner-intern"
          element={<PRInternJobDetail />}
        />
        <Route
          path="/project/xuan-tinh-nguyen-2021"
          element={<XuanTinhNguyen2021Detail />}
        />
        <Route
          path="/project/:projectId"
          element={<XuanTinhNguyen2021Detail />}
        />
        {/* Fallback route to home page */}
        <Route path="*" element={<MainPortfolio />} />
      </Routes>
    </>
  );
}
