import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DesignProvider } from './context/DesignContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AIChatbotWidget from './components/AIChatbotWidget';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UploadRoomPage from './pages/UploadRoomPage';
import AIAnalysisPage from './pages/AIAnalysisPage';
import DesignResultsPage from './pages/DesignResultsPage';
import DesignStudioPage from './pages/DesignStudioPage';
import FurnitureCatalogPage from './pages/FurnitureCatalogPage';
import SavedDesignsPage from './pages/SavedDesignsPage';
import CostEstimationPage from './pages/CostEstimationPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SystemTestingPage from './pages/SystemTestingPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('login');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useAuth();

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  // Standalone auth pages
  if (currentPage === 'login') {
    return <LoginPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'register') {
    return <RegisterPage onNavigate={handleNavigate} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'upload-room':
        return <UploadRoomPage onNavigate={handleNavigate} />;
      case 'ai-analysis':
        return <AIAnalysisPage onNavigate={handleNavigate} />;
      case 'design-results':
        return <DesignResultsPage onNavigate={handleNavigate} />;
      case 'studio-3d':
        return <DesignStudioPage onNavigate={handleNavigate} />;
      case 'furniture-catalog':
        return <FurnitureCatalogPage onNavigate={handleNavigate} />;
      case 'saved-designs':
        return <SavedDesignsPage onNavigate={handleNavigate} />;
      case 'cost-estimation':
        return <CostEstimationPage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboardPage onNavigate={handleNavigate} />;
      case 'testing':
        return <SystemTestingPage onNavigate={handleNavigate} />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Workspace Area */}
      <div className="main-content">
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <main className="content-body">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Floating AI Interior Styling Assistant */}
      <AIChatbotWidget />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DesignProvider>
          <AppContent />
        </DesignProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
