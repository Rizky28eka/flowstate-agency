import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RoleSidebar } from "@/components/RoleSidebar";
import { Handshake, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const DashboardClient = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar (desktop only) */}
      <div className="hidden md:block">
        <RoleSidebar
          role="CLIENT"
          currentPath={location.pathname}
          onNavigate={navigate}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card sticky top-0 z-20">
          <div className="px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left section */}
              <div className="flex items-center space-x-3">
                {/* Sidebar trigger for mobile */}
                <div className="md:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mr-2"
                      >
                        <Menu className="w-6 h-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0">
                      <RoleSidebar
                        role="CLIENT"
                        currentPath={location.pathname}
                        onNavigate={navigate}
                      />
                    </SheetContent>
                  </Sheet>
                </div>

                <Handshake className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-foreground">
                    Client Portal
                  </h1>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Track your projects & collaborate
                  </p>
                </div>
              </div>

              {/* Right section */}
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

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-6 py-6 md:py-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardClient;