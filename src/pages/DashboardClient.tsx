import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RoleSidebar } from "@/components/RoleSidebar";
import { Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardClient = () => {
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
        role="CLIENT"
        currentPath={location.pathname}
        onNavigate={navigate}
        onSignOut={handleSignOut}
      />
      <SidebarInset>
        <header className="border-b bg-card sticky top-0 z-20">
          <div className="px-4 md:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <Handshake className="w-8 h-8 text-primary shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">
                    Client Portal
                  </h1>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Track your projects & collaborate
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="md:size-default">
                  New Request
                </Button>
                <Button size="sm" className="md:size-default">
                  Contact Team
                </Button>
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

export default DashboardClient;