import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RoleSidebar } from "@/components/RoleSidebar";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardOwner = () => {
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
        role="OWNER" 
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
                <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground truncate">Owner Dashboard</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Complete platform oversight</p>
                </div>
              </div>
              <Button variant="outline">
                <span className="hidden sm:inline">Settings</span>
                <span className="sm:hidden">⚙️</span>
              </Button>
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

export default DashboardOwner;