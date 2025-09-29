import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Crown, Shield, User, Users, Code, DollarSign, Handshake, LayoutDashboard, FolderKanban, MessageSquare, Calendar, Settings, ChartBar as BarChart3, FileText, Clock, Target, CreditCard, Receipt, TrendingUp, Eye, CircleCheck as CheckCircle2, Download, Building2, UserCheck, TriangleAlert as AlertTriangle, Lock, Briefcase, ChartPie as PieChart, ChevronLeft, ChevronRight, LogOut, Bell, Plug, Activity, Database, HardDrive, Zap, Folder, Presentation, Headphones, UserCog, ChevronsUpDown } from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
  href?: string;
  badge?: string;
  children?: SidebarItem[];
}

interface RoleSidebarProps {
  role: 'OWNER' | 'ADMIN' | 'PROJECT_MANAGER' | 'TEAM_LEAD' | 'MEMBER' | 'FINANCE' | 'CLIENT';
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

const roleConfigs = {
  OWNER: {
    title: "Owner Dashboard",
    icon: Crown,
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/owner" },
      {
        id: "strategy",
        label: "Strategy & Growth",
        icon: Presentation,
        children: [
          { id: "analytics", label: "Business Analytics", icon: BarChart3, href: "/dashboard/owner/analytics" },
          { id: "kpi-dashboard", label: "KPI Dashboard", icon: BarChart3, href: "/dashboard/owner/kpi-dashboard" },
          { id: "goals", label: "Company Goals", icon: Target, href: "/dashboard/owner/goals" },
          { id: "strategic-roadmap", label: "Strategic Roadmap", icon: Presentation, href: "/dashboard/owner/strategic-roadmap" },
          { id: "forecasting", label: "Forecasting", icon: TrendingUp, href: "/dashboard/owner/forecasting" },
          { id: "sales-pipeline", label: "Sales Pipeline", icon: Briefcase, href: "/dashboard/owner/sales-pipeline" },
        ],
      },
      {
        id: "operations",
        label: "Operations",
        icon: Zap,
        children: [
          { id: "projects", label: "All Projects", icon: FolderKanban, href: "/dashboard/owner/projects", badge: "47" },
          { id: "risks", label: "Risk Management", icon: AlertTriangle, href: "/dashboard/owner/risks" },
          { id: "contract-management", label: "Contract Management", icon: FileText, href: "/dashboard/owner/contract-management" },
          { id: "integrations", label: "Integrations", icon: Plug, href: "/dashboard/owner/integrations" },
        ],
      },
      {
        id: "team",
        label: "Team",
        icon: Users,
        children: [
          { id: "teams", label: "Team Management", icon: Users, href: "/dashboard/owner/teams" },
          { id: "resource-allocation", label: "Resource Allocation", icon: Users, href: "/dashboard/owner/resource-allocation" },
          { id: "communication", label: "Communication", icon: MessageSquare, href: "/dashboard/owner/communication" },
        ],
      },
      {
        id: "finance",
        label: "Finance",
        icon: DollarSign,
        children: [
          { id: "finances", label: "Financial Overview", icon: DollarSign, href: "/dashboard/owner/finances" },
          { id: "profitability", label: "Profitability Analysis", icon: PieChart, href: "/dashboard/owner/profitability" },
        ],
      },
      {
        id: "clients-reports",
        label: "Clients & Reports",
        icon: FileText,
        children: [
          { id: "clients", label: "Client Relations", icon: Handshake, href: "/dashboard/owner/clients" },
          { id: "reports", label: "Executive Reports", icon: FileText, href: "/dashboard/owner/reports" },
        ],
      },
      { id: "settings", label: "Company Settings", icon: Settings, href: "/dashboard/owner/settings" },
    ]
  },
  ADMIN: {
    title: "Admin Dashboard",
    icon: Shield,
    items: [
      { id: "users", label: "User Management", icon: UserCheck, href: "/dashboard/admin/users" },
      { id: "security", label: "Security & Permissions", icon: Lock, href: "/dashboard/admin/security" },
      { id: "system", label: "System Health", icon: Activity, href: "/dashboard/admin/system" },
      { id: "audit", label: "Audit Logs", icon: FileText, href: "/dashboard/admin/audit" },
      { id: "backup", label: "Backup & Recovery", icon: HardDrive, href: "/dashboard/admin/backup" },
    ]
  },
  PROJECT_MANAGER: {
    title: "Project Manager",
    icon: User,
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/project-manager" },
      { id: "projects", label: "My Projects", icon: FolderKanban, href: "/dashboard/project-manager/projects", badge: "12" },
      { id: "calendar", label: "Project Calendar", icon: Calendar, href: "/dashboard/project-manager/calendar" },
      { id: "team", label: "Team Performance", icon: Users, href: "/dashboard/project-manager/team" },
      { id: "resources", label: "Resource Planning", icon: Target, href: "/dashboard/project-manager/resources" },
      { id: "reports", label: "Project Reports", icon: BarChart3, href: "/dashboard/project-manager/reports" },
      { id: "clients", label: "Client Communication", icon: MessageSquare, href: "/dashboard/project-manager/clients" },
      { id: "templates", label: "Project Templates", icon: FileText, href: "/dashboard/project-manager/templates" }
    ]
  },
  TEAM_LEAD: {
    title: "Team Lead",
    icon: Users,
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/team-lead" },
      { id: "team", label: "My Team", icon: Users, href: "/dashboard/team-lead/team", badge: "8" },
      { id: "goals", label: "Team Goals", icon: Target, href: "/dashboard/team-lead/goals" },
      { id: "performance", label: "Performance Review", icon: TrendingUp, href: "/dashboard/team-lead/performance" },
      { id: "meetings", label: "Team Meetings", icon: Calendar, href: "/dashboard/team-lead/meetings" },
      { id: "communication", label: "Team Chat", icon: MessageSquare, href: "/dashboard/team-lead/communication", badge: "5" },
      { id: "resources", label: "Resources & Tools", icon: Briefcase, href: "/dashboard/team-lead/resources" },
      { id: "reports", label: "Team Reports", icon: BarChart3, href: "/dashboard/team-lead/reports" }
    ]
  },
  MEMBER: {
    title: "Member",
    icon: Code,
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/member" },
      { id: "tasks", label: "My Tasks", icon: CheckCircle2, href: "/dashboard/member/tasks", badge: "7" },
      { id: "projects", label: "My Projects", icon: FolderKanban, href: "/dashboard/member/projects" },
      { id: "timesheet", label: "Time Tracking", icon: Clock, href: "/dashboard/member/timesheet" },
      { id: "calendar", label: "My Calendar", icon: Calendar, href: "/dashboard/member/calendar" },
      { id: "resources", label: "Resources", icon: FileText, href: "/dashboard/member/resources" },
      { id: "communication", label: "Team Chat", icon: MessageSquare, href: "/dashboard/member/communication" },
      { id: "profile", label: "My Profile", icon: User, href: "/dashboard/member/profile" }
    ]
  },
  FINANCE: {
    title: "Finance",
    icon: DollarSign,
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/finance" },
      { id: "invoices", label: "Invoices", icon: Receipt, href: "/dashboard/finance/invoices", badge: "7" },
      { id: "expenses", label: "Expense Tracking", icon: CreditCard, href: "/dashboard/finance/expenses" },
      { id: "revenue", label: "Revenue Analytics", icon: TrendingUp, href: "/dashboard/finance/revenue" },
      { id: "budgets", label: "Budget Planning", icon: PieChart, href: "/dashboard/finance/budgets" },
      { id: "reports", label: "Financial Reports", icon: BarChart3, href: "/dashboard/finance/reports" },
      { id: "payments", label: "Payment Processing", icon: DollarSign, href: "/dashboard/finance/payments" },
      { id: "taxes", label: "Tax Management", icon: FileText, href: "/dashboard/finance/taxes" }
    ]
  },
  CLIENT: {
    title: "Client Portal",
    icon: Handshake,
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/client" },
      { id: "projects", label: "My Projects", icon: Eye, href: "/dashboard/client/projects", badge: "3" },
      { id: "messages", label: "Messages", icon: MessageSquare, href: "/dashboard/client/messages", badge: "5" },
      { id: "files", label: "Project Files", icon: Download, href: "/dashboard/client/files" },
      { id: "invoices", label: "Invoices & Billing", icon: Receipt, href: "/dashboard/client/invoices" },
      { id: "calendar", label: "Meetings", icon: Calendar, href: "/dashboard/client/calendar" },
      { id: "feedback", label: "Feedback & Reviews", icon: CheckCircle2, href: "/dashboard/client/feedback" },
      { id: "support", label: "Support", icon: MessageSquare, href: "/dashboard/client/support" }
    ]
  }
};

const SidebarMenu = ({ items, currentPath, onNavigate, isCollapsed }) => {
  const isActive = (href: string) => currentPath === href;

  const handleItemClick = (item: SidebarItem) => {
    if (item.href && onNavigate) {
      onNavigate(item.href);
    }
  };

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const ItemIcon = item.icon;
        
        if (!isCollapsed && item.children && item.children.length > 0) {
          const isChildActive = item.children.some(child => child.href && isActive(child.href));
          return (
            <Collapsible key={item.id} defaultOpen={isChildActive}>
              <CollapsibleTrigger asChild>
                <Button
                  variant={isChildActive ? "secondary" : "ghost"}
                  className={cn("w-full justify-start h-10 px-3")}
                >
                  <ItemIcon className={cn("h-4 w-4 mr-3")} />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-7 pt-1 space-y-1">
                <SidebarMenu items={item.children} currentPath={currentPath} onNavigate={onNavigate} isCollapsed={isCollapsed} />
              </CollapsibleContent>
            </Collapsible>
          );
        }

        const active = item.href ? isActive(item.href) : false;
        return (
          <Button
            key={item.id}
            variant={active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start h-10 px-3",
              active && "bg-primary/10 text-primary border-primary/20",
              isCollapsed && "px-2"
            )}
            onClick={() => handleItemClick(item)}
          >
            <ItemIcon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Button>
        );
      })}
    </nav>
  );
};

export const RoleSidebar = ({ role, currentPath, onNavigate }: RoleSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const config = roleConfigs[role];
  const IconComponent = config.icon;

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={cn(
      "fixed top-0 left-0 z-50 flex flex-col h-screen bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-12 sm:w-16" : "w-56 sm:w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-2 sm:p-4 border-b border-border h-14 sm:h-16">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h2 className="font-semibold text-foreground text-sm sm:text-base">{config.title}</h2>
              <p className="text-xs text-muted-foreground">AgencyFlow</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size={isMobile ? "icon" : "sm"}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-6 w-6 sm:h-8 sm:w-8 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          ) : (
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-1 sm:px-2 py-2 sm:py-4">
        <SidebarMenu 
          items={config.items} 
          currentPath={currentPath} 
          onNavigate={onNavigate}
          isCollapsed={isCollapsed}
        />
      </ScrollArea>

      {/* Footer */}
      <div className="p-2 sm:p-3 border-t border-border">
        <Separator className="mb-2 sm:mb-3" />
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-8 sm:h-10 px-2 sm:px-3 text-muted-foreground hover:text-foreground",
            isCollapsed && "px-1 sm:px-2"
          )}
        >
          <LogOut className={cn("h-3 w-3 sm:h-4 sm:w-4", !isCollapsed && "mr-2 sm:mr-3")} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};