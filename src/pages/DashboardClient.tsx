import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RoleSidebar } from "@/components/RoleSidebar";
import { Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardClient = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <RoleSidebar 
        role="CLIENT" 
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
                <Handshake className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Client Portal</h1>
                  <p className="text-sm text-muted-foreground">Track your projects & collaborate</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">New Request</Button>
                <Button>Contact Team</Button>
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

export default DashboardClient;