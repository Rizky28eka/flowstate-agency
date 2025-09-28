import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RoleSidebar } from "@/components/RoleSidebar";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardOwner = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      <RoleSidebar 
        role="OWNER" 
        currentPath={location.pathname}
        onNavigate={navigate}
      />
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-card">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Crown className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Owner Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Complete platform oversight</p>
                </div>
              </div>
              <Button variant="outline">Settings</Button>
            </div>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardOwner;