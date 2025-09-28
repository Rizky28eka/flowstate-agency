import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import OwnerTeams from "./pages/owner/OwnerTeams";
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
          <Route path="/" element={<Index />} />
          <Route path="/dashboard/owner" element={<DashboardOwner />} />
          <Route path="/dashboard/admin" element={<DashboardAdmin />} />
          <Route path="/dashboard/project-manager" element={<DashboardProjectManager />} />
          <Route path="/dashboard/team-lead" element={<DashboardTeamLead />} />
          <Route path="/dashboard/member" element={<DashboardMember />} />
          <Route path="/dashboard/finance" element={<DashboardFinance />} />
          <Route path="/dashboard/client" element={<DashboardClient />} />
          <Route path="/analytics" element={<OwnerAnalytics />} />
          <Route path="/projects" element={<OwnerProjects />} />
          <Route path="/teams" element={<OwnerTeams />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/security" element={<AdminSecurity />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
