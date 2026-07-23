import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPortfolio from './MainPortfolio';
import ScrollManager from './ScrollManager';

const FreelanceJobDetail = lazy(() => import('../components/FreelanceJobDetail'));
const MarketingExecutiveJobDetail = lazy(() => import('../components/MarketingExecutiveJobDetail'));
const MarComAssociateJobDetail = lazy(() => import('../components/MarComAssociateJobDetail'));
const PRInternJobDetail = lazy(() => import('../components/PRInternJobDetail'));
const XuanTinhNguyen2021Detail = lazy(() => import('../components/XuanTinhNguyen2021Detail'));
const XuanTinhNguyen2022Detail = lazy(() => import('../components/XuanTinhNguyen2022Detail'));
const PhoenixMusicFestivalDetail = lazy(() => import('../components/PhoenixMusicFestivalDetail'));
const YouthUnionCongressDetail = lazy(() => import('../components/YouthUnionCongressDetail'));

export default function AppRouter() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={<div className="min-h-screen bg-[#FAF9F6]" />}>
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
            path="/project/xuan-tinh-nguyen-2022"
            element={<XuanTinhNguyen2022Detail />}
          />
          <Route
            path="/project/phoenix-music-festival-2022"
            element={<PhoenixMusicFestivalDetail />}
          />
          <Route
            path="/project/dai-hoi-doan-2022"
            element={<YouthUnionCongressDetail />}
          />
          <Route
            path="/project/:projectId"
            element={<XuanTinhNguyen2021Detail />}
          />
          {/* Fallback route to home page */}
          <Route path="*" element={<MainPortfolio />} />
        </Routes>
      </Suspense>
    </>
  );
}
