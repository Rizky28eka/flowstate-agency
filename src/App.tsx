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
import OwnerEmployees from "./pages/owner/OwnerEmployees";
import OwnerEmployeeDetail from "./pages/owner/OwnerEmployeeDetail";

import OwnerReports from "./pages/owner/OwnerReports";
import OwnerReportDetail from "./pages/owner/OwnerReportDetail";
import OwnerSettings from "./pages/owner/OwnerSettings";
import OwnerGoals from "./pages/owner/OwnerGoals";
import OwnerGoalDetail from "./pages/owner/OwnerGoalDetail";
import OwnerForecasting from "./pages/owner/OwnerForecasting";
import OwnerSalesPipeline from "./pages/owner/OwnerSalesPipeline";
import OwnerStrategicRoadmap from "./pages/owner/OwnerStrategicRoadmap";
import OwnerMemberWorkloadDetail from "./pages/owner/OwnerMemberWorkloadDetail";
import OwnerProjectFinancialsDetail from "./pages/owner/OwnerProjectFinancialsDetail";
import OwnerDealDetail from "./pages/owner/OwnerDealDetail";
import OwnerContractDetail from "./pages/owner/OwnerContractDetail";
import OwnerAgencyHealth from "./pages/owner/OwnerAgencyHealth";
import OwnerProfitability from "./pages/owner/OwnerProfitability";
import OwnerResourceAllocation from "./pages/owner/OwnerResourceAllocation";
import OwnerKpiDashboard from "./pages/owner/OwnerKpiDashboard";
import OwnerContractManagement from "./pages/owner/OwnerContractManagement";
import OwnerCommunication from "./pages/owner/OwnerCommunication";
import OwnerOverview from "./pages/owner/OwnerOverview";
import OwnerTeamDetail from "./pages/owner/OwnerTeamDetail";
import OwnerRiskDetail from "./pages/owner/OwnerRiskDetail";
import OwnerAlerts from "./pages/owner/OwnerAlerts";

import AdminUsers from "./pages/admin/AdminUsers";
import AdminSecurity from "./pages/admin/AdminSecurity";
import AdminSystemHealth from "./pages/admin/AdminSystemHealth";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";
import AdminBackup from "./pages/admin/AdminBackup";
import AdminRoles from "./pages/admin/AdminRoles";
import AdminRoleDetail from "./pages/admin/AdminRoleDetail";
import AdminIntegrations from "./pages/admin/AdminIntegrations";
import AdminIntegrationDetail from "./pages/admin/AdminIntegrationDetail";
import AdminApiKeys from "./pages/admin/AdminApiKeys";
import AdminOrganizationSettings from "./pages/admin/AdminOrganizationSettings";
import AdminSaaSAnalytics from "./pages/admin/AdminSaaSAnalytics";
import AdminSecurityIncidentDetail from "./pages/admin/AdminSecurityIncidentDetail";
import AdminAutomations from "./pages/admin/AdminAutomations";
import AdminAutomationBuilder from "./pages/admin/AdminAutomationBuilder";
import AdminComplianceCenter from "./pages/admin/AdminComplianceCenter";

import ProjectManagerDashboard from "./pages/project-manager/ProjectManagerDashboard";
import ProjectManagerProjects from "./pages/project-manager/ProjectManagerProjects";
import ProjectManagerProjectDetail from "./pages/project-manager/ProjectManagerProjectDetail";
import ProjectManagerTaskDetail from "./pages/project-manager/ProjectManagerTaskDetail";

import ProjectManagerCalendar from "./pages/project-manager/ProjectManagerCalendar";
import ProjectManagerTeam from "./pages/project-manager/ProjectManagerTeam";
import ProjectManagerResources from "./pages/project-manager/ProjectManagerResources";
import ProjectManagerReports from "./pages/project-manager/ProjectManagerReports";
import ProjectManagerClients from "./pages/project-manager/ProjectManagerClients";
import ProjectManagerTemplates from "./pages/project-manager/ProjectManagerTemplates";
import ProjectManagerReportBuilder from "./pages/project-manager/ProjectManagerReportBuilder";
import ProjectManagerReportViewer from "./pages/project-manager/ProjectManagerReportViewer";

import TeamLeadDashboard from "./pages/team-lead/TeamLeadDashboard";
import TeamLeadTeam from "./pages/team-lead/TeamLeadTeam";
import TeamLeadGoals from "./pages/team-lead/TeamLeadGoals";
import TeamLeadPerformance from "./pages/team-lead/TeamLeadPerformance";
import TeamLeadMeetings from "./pages/team-lead/TeamLeadMeetings";
import TeamLeadCommunication from "./pages/team-lead/TeamLeadCommunication";
import TeamLeadResources from "./pages/team-lead/TeamLeadResources";
import TeamLeadReports from "./pages/team-lead/TeamLeadReports";
import TeamLeadGoalDetail from "./pages/team-lead/TeamLeadGoalDetail";

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
import ClientInvoiceDetail from "./pages/client/ClientInvoiceDetail";

import { OrganizationProvider } from "./contexts/OrganizationContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <OrganizationProvider>
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
            <Route path="projects/:projectId" element={<OwnerProjectDetail />} />
              
              <Route path="teams" element={<OwnerTeams />} />
              <Route path="teams/:teamId" element={<OwnerTeamDetail />} />
              <Route path="resource-allocation" element={<OwnerResourceAllocation />} />
              <Route path="resource-allocation/:memberId" element={<OwnerMemberWorkloadDetail />} />
              <Route path="risks" element={<OwnerRisks />} />
              <Route path="risks/:riskId" element={<OwnerRiskDetail />} />
              <Route path="integrations" element={<OwnerIntegrations />} />
              <Route path="contract-management" element={<OwnerContractManagement />} />
              <Route path="contract-management/:contractId" element={<OwnerContractDetail />} />
              <Route path="communication" element={<OwnerCommunication />} />
              <Route path="finances" element={<OwnerFinances />} />
              <Route path="profitability" element={<OwnerProfitability />} />
              <Route path="profitability/:projectId" element={<OwnerProjectFinancialsDetail />} />
              <Route path="clients" element={<OwnerClients />} />
            <Route path="clients/:clientId" element={<OwnerClientDetail />} />
              <Route path="employees" element={<OwnerEmployees />} />
              <Route path="employees/:employeeId" element={<OwnerEmployeeDetail />} />
              
              <Route path="reports" element={<OwnerReports />} />
              <Route path="reports/:reportId" element={<OwnerReportDetail />} />
              <Route path="settings" element={<OwnerSettings />} />
              <Route path="goals" element={<OwnerGoals />} />
              <Route path="goals/:id" element={<OwnerGoalDetail />} />
              <Route path="forecasting" element={<OwnerForecasting />} />
              <Route path="sales-pipeline" element={<OwnerSalesPipeline />} />
              <Route path="sales-pipeline/:dealId" element={<OwnerDealDetail />} />
              <Route path="strategic-roadmap" element={<OwnerStrategicRoadmap />} />
              <Route path="alerts" element={<OwnerAlerts />} />
              <Route path="agency-health" element={<OwnerAgencyHealth />} />
            </Route>

            {/* Admin dashboard (with nested routes) */}
            <Route path="/dashboard/admin" element={<DashboardAdmin />}>
              <Route index element={<Navigate to="users" replace />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="security" element={<AdminSecurity />} />
              <Route path="security/:incidentId" element={<AdminSecurityIncidentDetail />} />
              <Route path="automations" element={<AdminAutomations />} />
              <Route path="automations/:ruleId" element={<AdminAutomationBuilder />} />
              <Route path="compliance" element={<AdminComplianceCenter />} />
              <Route path="system" element={<AdminSystemHealth />} />
              <Route path="audit" element={<AdminAuditLogs />} />
              <Route path="backup" element={<AdminBackup />} />
              <Route path="roles" element={<AdminRoles />} />
              <Route path="roles/:roleId" element={<AdminRoleDetail />} />
              <Route path="integrations" element={<AdminIntegrations />} />
              <Route path="integrations/:integrationId" element={<AdminIntegrationDetail />} />
              <Route path="api-keys" element={<AdminApiKeys />} />
              <Route path="organization-settings" element={<AdminOrganizationSettings />} />
              <Route path="saas-analytics" element={<AdminSaaSAnalytics />} />
            </Route>

            {/* Other dashboards */}
            <Route path="/dashboard/project-manager" element={<DashboardProjectManager />}>
              <Route index element={<ProjectManagerDashboard />} />
              <Route path="projects" element={<ProjectManagerProjects />} />
            <Route path="projects/:projectId" element={<ProjectManagerProjectDetail />} />
            <Route path="projects/:projectId/tasks" element={<ProjectManagerTaskDetail />} />
              
              <Route path="calendar" element={<ProjectManagerCalendar />} />
              <Route path="team" element={<ProjectManagerTeam />} />
              <Route path="resources" element={<ProjectManagerResources />} />
              <Route path="reports" element={<ProjectManagerReports />} />
              <Route path="reports/new" element={<ProjectManagerReportBuilder />} />
              <Route path="reports/:reportId/edit" element={<ProjectManagerReportBuilder />} />
              <Route path="reports/:reportId/view" element={<ProjectManagerReportViewer />} />
              <Route path="clients" element={<ProjectManagerClients />} />
              <Route path="templates" element={<ProjectManagerTemplates />} />
            </Route>
            <Route path="/dashboard/team-lead" element={<DashboardTeamLead />}>
              <Route index element={<TeamLeadDashboard />} />
              <Route path="team" element={<TeamLeadTeam />} />
              <Route path="goals" element={<TeamLeadGoals />} />
              <Route path="goals/:goalId" element={<TeamLeadGoalDetail />} />
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
            <Route path="projects/:projectId" element={<ClientProjectDetail />} />
              
              <Route path="messages" element={<ClientMessages />} />
              <Route path="files" element={<ClientFiles />} />
              <Route path="invoices" element={<ClientInvoices />} />
              <Route path="invoices/:invoiceId" element={<ClientInvoiceDetail />} />
              <Route path="calendar" element={<ClientCalendar />} />
              <Route path="feedback" element={<ClientFeedback />} />
              <Route path="support" element={<ClientSupport />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </OrganizationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;