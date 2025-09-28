import { RoleSidebar } from "@/components/RoleSidebar";
import { useState } from "react";
import OwnerOverview from "./owner/OwnerOverview";
import OwnerAnalytics from "./owner/OwnerAnalytics";
import OwnerProjects from "./owner/OwnerProjects";
import OwnerTeams from "./owner/OwnerTeams";
import OwnerFinances from "./owner/OwnerFinances";
import OwnerClients from "./owner/OwnerClients";
import OwnerReports from "./owner/OwnerReports";
import OwnerSettings from "./owner/OwnerSettings";
import OwnerGoals from "./owner/OwnerGoals";
import OwnerForecasting from "./owner/OwnerForecasting";
import OwnerRisks from "./owner/OwnerRisks";
import OwnerAlerts from "./owner/OwnerAlerts";
import OwnerIntegrations from "./owner/OwnerIntegrations";
import OwnerGoalDetail from "./owner/OwnerGoalDetail";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardOwner = () => {
  const [currentPath, setCurrentPath] = useState("/dashboard/owner");

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const renderContent = () => {
    if (currentPath.startsWith("/goals/") && currentPath !== "/goals") {
      return <OwnerGoalDetail />;
    }

    switch (currentPath) {
      case "/dashboard/owner":
        return <OwnerOverview />;
      case "/analytics":
        return <OwnerAnalytics />;
      case "/projects":
        return <OwnerProjects />;
      case "/teams":
        return <OwnerTeams />;
      case "/finances":
        return <OwnerFinances />;
      case "/clients":
        return <OwnerClients />;
      case "/reports":
        return <OwnerReports />;
      case "/settings":
        return <OwnerSettings />;
      case "/goals":
        return <OwnerGoals />;
      case "/forecasting":
        return <OwnerForecasting />;
      case "/risks":
        return <OwnerRisks />;
      case "/alerts":
        return <OwnerAlerts />;
      case "/integrations":
        return <OwnerIntegrations />;
      default:
        return <OwnerOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <RoleSidebar 
        role="OWNER" 
        currentPath={currentPath}
        onNavigate={handleNavigate}
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
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardOwner;