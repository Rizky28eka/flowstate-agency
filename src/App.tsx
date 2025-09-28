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
import OwnerClientDetail from "./pages/owner/OwnerClientDetail";
import OwnerReports from "./pages/owner/OwnerReports";
import OwnerReportDetail from "./pages/owner/OwnerReportDetail";
import OwnerSettings from "./pages/owner/OwnerSettings";
import OwnerGoals from "./pages/owner/OwnerGoals";
import OwnerGoalDetail from "./pages/owner/OwnerGoalDetail";
import OwnerForecasting from "./pages/owner/OwnerForecasting";
import OwnerSalesPipeline from "./pages/owner/OwnerSalesPipeline";
import OwnerStrategicRoadmap from "./pages/owner/OwnerStrategicRoadmap";
import OwnerProfitability from "./pages/owner/OwnerProfitability";
import OwnerResourceAllocation from "./pages/owner/OwnerResourceAllocation";
import OwnerKpiDashboard from "./pages/owner/OwnerKpiDashboard";
import OwnerContractManagement from "./pages/owner/OwnerContractManagement";
import OwnerCommunication from "./pages/owner/OwnerCommunication";
import OwnerOverview from "./pages/owner/OwnerOverview";
import OwnerTeamDetail from "./pages/owner/OwnerTeamDetail";
import OwnerRiskDetail from "./pages/owner/OwnerRiskDetail";

import AdminUsers from "./pages/admin/AdminUsers";
import AdminSecurity from "./pages/admin/AdminSecurity";
import AdminSystemHealth from "./pages/admin/AdminSystemHealth";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";
import AdminBackup from "./pages/admin/AdminBackup";

import ProjectManagerDashboard from "./pages/project-manager/ProjectManagerDashboard";
import ProjectManagerProjects from "./pages/project-manager/ProjectManagerProjects";
import ProjectManagerProjectDetail from "./pages/project-manager/ProjectManagerProjectDetail";
import ProjectManagerCalendar from "./pages/project-manager/ProjectManagerCalendar";
import ProjectManagerTeam from "./pages/project-manager/ProjectManagerTeam";
import ProjectManagerResources from "./pages/project-manager/ProjectManagerResources";
import ProjectManagerReports from "./pages/project-manager/ProjectManagerReports";
import ProjectManagerClients from "./pages/project-manager/ProjectManagerClients";
import ProjectManagerTemplates from "./pages/project-manager/ProjectManagerTemplates";

import TeamLeadDashboard from "./pages/team-lead/TeamLeadDashboard";
import TeamLeadTeam from "./pages/team-lead/TeamLeadTeam";
import TeamLeadGoals from "./pages/team-lead/TeamLeadGoals";
import TeamLeadPerformance from "./pages/team-lead/TeamLeadPerformance";
import TeamLeadMeetings from "./pages/team-lead/TeamLeadMeetings";
import TeamLeadCommunication from "./pages/team-lead/TeamLeadCommunication";
import TeamLeadResources from "./pages/team-lead/TeamLeadResources";
import TeamLeadReports from "./pages/team-lead/TeamLeadReports";

import MemberDashboard from "./pages/member/MemberDashboard";
import MemberTasks from "./pages/member/MemberTasks";
import MemberProjects from "./pages/member/MemberProjects";
import MemberTimesheet from "./pages/member/MemberTimesheet";
import MemberCalendar from "./pages/member/MemberCalendar";
import MemberResources from "./pages/member/MemberResources";
import MemberCommunication from "./pages/member/MemberCommunication";
import MemberProfile from "./pages/member/MemberProfile";

import FinanceDashboard from "./pages/finance/FinanceDashboard";
import FinanceInvoices from "./pages/finance/FinanceInvoices";
import FinanceInvoiceNew from "./pages/finance/FinanceInvoiceNew";
import FinanceExpenses from "./pages/finance/FinanceExpenses";
import FinanceRevenue from "./pages/finance/FinanceRevenue";
import FinanceBudgets from "./pages/finance/FinanceBudgets";
import FinanceReports from "./pages/finance/FinanceReports";
import FinancePayments from "./pages/finance/FinancePayments";
import FinanceTaxes from "./pages/finance/FinanceTaxes";

import ClientDashboard from "./pages/client/ClientDashboard";
import ClientProjects from "./pages/client/ClientProjects";
import ClientProjectDetail from "./pages/client/ClientProjectDetail";
import ClientMessages from "./pages/client/ClientMessages";
import ClientFiles from "./pages/client/ClientFiles";
import ClientInvoices from "./pages/client/ClientInvoices";
import ClientCalendar from "./pages/client/ClientCalendar";
import ClientFeedback from "./pages/client/ClientFeedback";
import ClientSupport from "./pages/client/ClientSupport";

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
            <Route path="kpi-dashboard" element={<OwnerKpiDashboard />} />
            <Route path="projects" element={<OwnerProjects />} />
            <Route path="projects/:id" element={<OwnerProjectDetail />} />
            <Route path="teams" element={<OwnerTeams />} />
            <Route path="teams/:teamId" element={<OwnerTeamDetail />} />
            <Route path="resource-allocation" element={<OwnerResourceAllocation />} />
            <Route path="risks" element={<OwnerRisks />} />
            <Route path="risks/:riskId" element={<OwnerRiskDetail />} />
            <Route path="integrations" element={<OwnerIntegrations />} />
            <Route path="contract-management" element={<OwnerContractManagement />} />
            <Route path="communication" element={<OwnerCommunication />} />
            <Route path="finances" element={<OwnerFinances />} />
            <Route path="profitability" element={<OwnerProfitability />} />
            <Route path="clients" element={<OwnerClients />} />
            <Route path="clients/:clientId" element={<OwnerClientDetail />} />
            <Route path="reports" element={<OwnerReports />} />
            <Route path="reports/:reportId" element={<OwnerReportDetail />} />
            <Route path="settings" element={<OwnerSettings />} />
            <Route path="goals" element={<OwnerGoals />} />
            <Route path="goals/:id" element={<OwnerGoalDetail />} />
            <Route path="forecasting" element={<OwnerForecasting />} />
            <Route path="sales-pipeline" element={<OwnerSalesPipeline />} />
            <Route path="strategic-roadmap" element={<OwnerStrategicRoadmap />} />
          </Route>

          {/* Admin dashboard (with nested routes) */}
          <Route path="/dashboard/admin" element={<DashboardAdmin />}>
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="security" element={<AdminSecurity />} />
            <Route path="system" element={<AdminSystemHealth />} />
            <Route path="audit" element={<AdminAuditLogs />} />
            <Route path="backup" element={<AdminBackup />} />
          </Route>

          {/* Other dashboards */}
          <Route path="/dashboard/project-manager" element={<DashboardProjectManager />}>
            <Route index element={<ProjectManagerDashboard />} />
            <Route path="projects" element={<ProjectManagerProjects />} />
            <Route path="projects/:id" element={<ProjectManagerProjectDetail />} />
            <Route path="calendar" element={<ProjectManagerCalendar />} />
            <Route path="team" element={<ProjectManagerTeam />} />
            <Route path="resources" element={<ProjectManagerResources />} />
            <Route path="reports" element={<ProjectManagerReports />} />
            <Route path="clients" element={<ProjectManagerClients />} />
            <Route path="templates" element={<ProjectManagerTemplates />} />
          </Route>
          <Route path="/dashboard/team-lead" element={<DashboardTeamLead />}>
            <Route index element={<TeamLeadDashboard />} />
            <Route path="team" element={<TeamLeadTeam />} />
            <Route path="goals" element={<TeamLeadGoals />} />
            <Route path="performance" element={<TeamLeadPerformance />} />
            <Route path="meetings" element={<TeamLeadMeetings />} />
            <Route path="communication" element={<TeamLeadCommunication />} />
            <Route path="resources" element={<TeamLeadResources />} />
            <Route path="reports" element={<TeamLeadReports />} />
          </Route>
          <Route path="/dashboard/member" element={<DashboardMember />}>
            <Route index element={<MemberDashboard />} />
            <Route path="tasks" element={<MemberTasks />} />
            <Route path="projects" element={<MemberProjects />} />
            <Route path="timesheet" element={<MemberTimesheet />} />
            <Route path="calendar" element={<MemberCalendar />} />
            <Route path="resources" element={<MemberResources />} />
            <Route path="communication" element={<MemberCommunication />} />
            <Route path="profile" element={<MemberProfile />} />
          </Route>
          <Route path="/dashboard/finance" element={<DashboardFinance />}>
            <Route index element={<FinanceDashboard />} />
            <Route path="invoices" element={<FinanceInvoices />} />
            <Route path="invoices/new" element={<FinanceInvoiceNew />} />
            <Route path="expenses" element={<FinanceExpenses />} />
            <Route path="revenue" element={<FinanceRevenue />} />
            <Route path="budgets" element={<FinanceBudgets />} />
            <Route path="reports" element={<FinanceReports />} />
            <Route path="payments" element={<FinancePayments />} />
            <Route path="taxes" element={<FinanceTaxes />} />
          </Route>
          <Route path="/dashboard/client" element={<DashboardClient />}>
            <Route index element={<ClientDashboard />} />
            <Route path="projects" element={<ClientProjects />} />
            <Route path="projects/:id" element={<ClientProjectDetail />} />
            <Route path="messages" element={<ClientMessages />} />
            <Route path="files" element={<ClientFiles />} />
            <Route path="invoices" element={<ClientInvoices />} />
            <Route path="calendar" element={<ClientCalendar />} />
            <Route path="feedback" element={<ClientFeedback />} />
            <Route path="support" element={<ClientSupport />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;