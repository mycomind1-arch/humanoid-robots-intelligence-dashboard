import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';

const Home = lazy(() => import('@/pages/Home'));
const RobotsPage = lazy(() => import('@/pages/Robots'));
const CompaniesPage = lazy(() => import('@/pages/Companies'));
const CapabilitiesPage = lazy(() => import('@/pages/Capabilities'));
const DeploymentsPage = lazy(() => import('@/pages/Deployments'));
const NewsPage = lazy(() => import('@/pages/News'));
const TimelinePage = lazy(() => import('@/pages/Timeline'));
const ComparePage = lazy(() => import('@/pages/Compare'));
const SciFiIndexPage = lazy(() => import('@/pages/SciFiIndex'));
const SearchPage = lazy(() => import('@/pages/Search'));
const SettingsPage = lazy(() => import('@/pages/Settings'));
const RobotDetailPage = lazy(() => import('@/pages/RobotDetail'));
const CompanyDetailPage = lazy(() => import('@/pages/CompanyDetail'));

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
          <div className="rounded-3xl border border-border/70 bg-card/80 px-6 py-4 text-sm text-muted-foreground">
            Loading intelligence graph...
          </div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/robots" element={<RobotsPage />} />
        <Route path="/robots/:robotId" element={<RobotDetailPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/:companyId" element={<CompanyDetailPage />} />
        <Route path="/capabilities" element={<CapabilitiesPage />} />
        <Route path="/deployments" element={<DeploymentsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/sci-fi-index" element={<SciFiIndexPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
