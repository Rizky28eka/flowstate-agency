import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RoleSidebar } from "@/components/RoleSidebar";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardFinance = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    // In a real app, you would clear auth tokens here
    console.log("Signing out...");
    navigate("/");
  };

  return (
    <SidebarProvider>
      <RoleSidebar 
        role="FINANCE" 
        currentPath={location.pathname}
        onNavigate={navigate}
        onSignOut={handleSignOut}
      />
      <SidebarInset>
        <header className="border-b bg-card sticky top-0 z-20">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <DollarSign className="w-8 h-8 text-primary shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-2xl font-bold text-foreground truncate">Finance Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Financial management & reporting</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">Generate Report</Button>
                <Button>Create Invoice</Button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardFinance;