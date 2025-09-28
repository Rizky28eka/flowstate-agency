import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import DashboardOwner from "./pages/DashboardOwner";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardProjectManager from "./pages/DashboardProjectManager";
import DashboardTeamLead from "./pages/DashboardTeamLead";
import DashboardMember from "./pages/DashboardMember";
import DashboardFinance from "./pages/DashboardFinance";
import DashboardClient from "./pages/DashboardClient";

import OwnerAnalytics from "./pages/owner/OwnerAnalytics";
import OwnerProjects from "./pages/owner/OwnerProjects";
import OwnerProjectDetail from "./pages/owner/OwnerProjectDetail";
import OwnerTeams from "./pages/owner/OwnerTeams";
import OwnerRisks from "./pages/owner/OwnerRisks";
import OwnerIntegrations from "./pages/owner/OwnerIntegrations";
import OwnerFinances from "./pages/owner/OwnerFinances";
import OwnerClients from "./pages/owner/OwnerClients";
import OwnerReports from "./pages/owner/OwnerReports";
import OwnerSettings from "./pages/owner/OwnerSettings";
import OwnerGoals from "./pages/owner/OwnerGoals";
import OwnerGoalDetail from "./pages/owner/OwnerGoalDetail";
import OwnerForecasting from "./pages/owner/OwnerForecasting";
import OwnerOverview from "./pages/owner/OwnerOverview";

import AdminUsers from "./pages/admin/AdminUsers";
import AdminSecurity from "./pages/admin/AdminSecurity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />

          {/* Owner dashboard */}
          <Route path="/dashboard/owner" element={<DashboardOwner />}>
            <Route index element={<OwnerOverview />} />
            <Route path="analytics" element={<OwnerAnalytics />} />
            <Route path="projects" element={<OwnerProjects />} />
            <Route path="projects/:id" element={<OwnerProjectDetail />} />
            <Route path="teams" element={<OwnerTeams />} />
            <Route path="risks" element={<OwnerRisks />} />
            <Route path="integrations" element={<OwnerIntegrations />} />
            <Route path="finances" element={<OwnerFinances />} />
            <Route path="clients" element={<OwnerClients />} />
            <Route path="reports" element={<OwnerReports />} />
            <Route path="settings" element={<OwnerSettings />} />
            <Route path="goals" element={<OwnerGoals />} />
            <Route path="goals/:id" element={<OwnerGoalDetail />} />
            <Route path="forecasting" element={<OwnerForecasting />} />
          </Route>

          {/* Admin dashboard (with nested routes) */}
          <Route path="/dashboard/admin" element={<DashboardAdmin />}>
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="security" element={<AdminSecurity />} />
          </Route>

          {/* Other dashboards */}
          <Route path="/dashboard/project-manager" element={<DashboardProjectManager />}>
            <Route index element={<Navigate to="projects" replace />} />
            <Route path="projects" element={<NotFound />} />
            <Route path="calendar" element={<NotFound />} />
            <Route path="team" element={<NotFound />} />
            <Route path="resources" element={<NotFound />} />
            <Route path="reports" element={<NotFound />} />
            <Route path="clients" element={<NotFound />} />
            <Route path="templates" element={<NotFound />} />
          </Route>
          <Route path="/dashboard/team-lead" element={<DashboardTeamLead />}>
            <Route index element={<Navigate to="team" replace />} />
            <Route path="team" element={<NotFound />} />
            <Route path="goals" element={<NotFound />} />
            <Route path="performance" element={<NotFound />} />
            <Route path="meetings" element={<NotFound />} />
            <Route path="communication" element={<NotFound />} />
            <Route path="resources" element={<NotFound />} />
            <Route path="reports" element={<NotFound />} />
          </Route>
          <Route path="/dashboard/member" element={<DashboardMember />}>
            <Route index element={<Navigate to="tasks" replace />} />
            <Route path="tasks" element={<NotFound />} />
            <Route path="projects" element={<NotFound />} />
            <Route path="timesheet" element={<NotFound />} />
            <Route path="calendar" element={<NotFound />} />
            <Route path="resources" element={<NotFound />} />
            <Route path="communication" element={<NotFound />} />
            <Route path="profile" element={<NotFound />} />
          </Route>
          <Route path="/dashboard/finance" element={<DashboardFinance />}>
            <Route index element={<Navigate to="invoices" replace />} />
            <Route path="invoices" element={<NotFound />} />
            <Route path="expenses" element={<NotFound />} />
            <Route path="revenue" element={<NotFound />} />
            <Route path="budgets" element={<NotFound />} />
            <Route path="reports" element={<NotFound />} />
            <Route path="payments" element={<NotFound />} />
            <Route path="taxes" element={<NotFound />} />
          </Route>
          <Route path="/dashboard/client" element={<DashboardClient />}>
            <Route index element={<Navigate to="projects" replace />} />
            <Route path="projects" element={<NotFound />} />
            <Route path="messages" element={<NotFound />} />
            <Route path="files" element={<NotFound />} />
            <Route path="invoices" element={<NotFound />} />
            <Route path="calendar" element={<NotFound />} />
            <Route path="feedback" element={<NotFound />} />
            <Route path="support" element={<NotFound />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;