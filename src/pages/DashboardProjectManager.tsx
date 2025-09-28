import { User } from "lucide-react";
import { RoleSidebar } from "@/components/RoleSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const DashboardProjectManager = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <RoleSidebar 
        role="PROJECT_MANAGER" 
        currentPath={location.pathname}
        onNavigate={handleNavigate}
      />
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-card">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Project Manager Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Project oversight & team coordination</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 px-6 py-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardProjectManager;