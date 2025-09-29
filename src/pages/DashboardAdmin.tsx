import { Shield } from "lucide-react";
import { RoleSidebar } from "@/components/RoleSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const DashboardAdmin = () => {
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
        role="ADMIN"
        currentPath={location.pathname}
        onNavigate={navigate}
        onSignOut={handleSignOut}
      />
      <SidebarInset>
        {/* Header */}
        <header className="border-b bg-card sticky top-0 z-20">
          <div className="px-3 sm:px-6 py-2 sm:py-4">
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              {/* Sidebar Trigger hanya di mobile */}
              <div className="md:hidden">
                <SidebarTrigger />
              </div>

              {/* Title & Subtitle */}
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">
                    Admin Dashboard
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    System administration & security
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-3 sm:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardAdmin;