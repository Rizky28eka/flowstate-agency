import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/dashboard/ProjectsPage';
import ClientsPage from './pages/dashboard/ClientsPage';
import InvoicesPage from './pages/dashboard/InvoicesPage';
import AnalyticsPage from './pages/dashboard/AnalyticsPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import ProjectDetailPage from './pages/dashboard/ProjectDetailPage';
import ReportsPage from './pages/dashboard/ReportsPage';
import { Toaster } from "./components/ui/toaster";



import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

const App = () => {
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/dashboard/projects" element={<ProjectsPage />} />
                            <Route path="/dashboard/projects/:id" element={<ProjectDetailPage />} />
                            <Route path="/dashboard/clients" element={<ClientsPage />} />

                            <Route path="/dashboard/invoices" element={<InvoicesPage />} />
                            <Route path="/dashboard/reports" element={<ReportsPage />} />
                            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
                            <Route path="/dashboard/settings" element={<SettingsPage />} />

                        </Routes>

                    </BrowserRouter>
                </TooltipProvider>
            </QueryClientProvider>
        </GoogleOAuthProvider>
    );
};

export default App;
