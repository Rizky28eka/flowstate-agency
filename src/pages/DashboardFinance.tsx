import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RoleSidebar } from "@/components/RoleSidebar";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardFinance = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <RoleSidebar 
        role="FINANCE" 
        currentPath={location.pathname}
        onNavigate={navigate}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Finance Dashboard</h1>
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

        {/* Main Content */}
        <main className="flex-1 px-6 py-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardFinance;