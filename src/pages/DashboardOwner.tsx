import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RoleSidebar } from "@/components/RoleSidebar";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

const DashboardOwner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <RoleSidebar 
          role="OWNER" 
          currentPath={location.pathname}
          onNavigate={navigate}
        />
      </div>
      
      <div className="flex-1 flex flex-col md:ml-0">
        <header className="border-b bg-card sticky top-0 z-20">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-64">
                    <RoleSidebar 
                      role="OWNER" 
                      currentPath={location.pathname}
                      onNavigate={navigate}
                    />
                  </SheetContent>
                </Sheet>
              </div>
              
              <div className="flex items-center space-x-3">
                <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">Owner Dashboard</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Complete platform oversight</p>
                </div>
              </div>
              <Button variant="outline" size={isMobile ? "sm" : "default"}>
                <span className="hidden sm:inline">Settings</span>
                <span className="sm:hidden">⚙️</span>
              </Button>
            </div>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardOwner;