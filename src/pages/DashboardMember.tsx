import { Code } from "lucide-react";
import { RoleSidebar } from "@/components/RoleSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardMember = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // In a real app, you would clear auth tokens here
    console.log("Signing out...");
    navigate("/");
  };

  return (
    <SidebarProvider>
      <RoleSidebar 
        role="MEMBER" 
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
                <Code className="w-8 h-8 text-primary shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-2xl font-bold text-foreground truncate">Member Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Your workspace & tasks</p>
                </div>
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

export default DashboardMember;