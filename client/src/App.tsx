import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import ProfilePage from './pages/ProfilePage';
import AnalysisPage from './pages/AnalysisPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import DashboardPage from './pages/DashboardPage';
import AgentServicesPage from './pages/AgentServicesPage';
import SkillExchangePage from './pages/SkillExchangePage';
import AboutPage from './pages/AboutPage';
import StatusPage from './pages/StatusPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="opportunities" element={<OpportunitiesPage />} />
          <Route path="payments" element={<AgentServicesPage />} />
          <Route path="agent-services" element={<AgentServicesPage />} />
          <Route path="skill-exchange" element={<SkillExchangePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="status" element={<StatusPage />} />
          <Route path="*" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
