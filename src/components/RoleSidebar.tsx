import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Crown, Shield, User, Users, Code, DollarSign, Handshake, LayoutDashboard, FolderKanban, MessageSquare, Calendar, Settings, ChartBar as BarChart3, FileText, Clock, Target, CreditCard, Receipt, TrendingUp, Eye, CircleCheck as CheckCircle2, Download, Building2, UserCheck, TriangleAlert as AlertTriangle, Lock, Briefcase, ChartPie as PieChart, ChevronLeft, ChevronRight, LogOut } from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
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
      { id: "analytics", label: "Business Analytics", icon: BarChart3, href: "/analytics" },
      { id: "projects", label: "All Projects", icon: FolderKanban, href: "/projects", badge: "47" },
      { id: "teams", label: "Team Management", icon: Users, href: "/teams" },
      { id: "finances", label: "Financial Overview", icon: DollarSign, href: "/finances" },
      { id: "clients", label: "Client Relations", icon: Handshake, href: "/clients" },
      { id: "reports", label: "Executive Reports", icon: FileText, href: "/reports" },
      { id: "settings", label: "Company Settings", icon: Settings, href: "/settings" }
    ]
  },
  ADMIN: {
    title: "Admin Dashboard",
    icon: Shield,
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/admin" },
      { id: "users", label: "User Management", icon: UserCheck, href: "/users" },
      { id: "security", label: "Security & Permissions", icon: Lock, href: "/security" },
      { id: "system", label: "System Settings", icon: Settings, href: "/system" },
      { id: "alerts", label: "Security Alerts", icon: AlertTriangle, href: "/alerts", badge: "3" },
      { id: "workspaces", label: "Team Workspaces", icon: Building2, href: "/workspaces" },
      { id: "audit", label: "Audit Logs", icon: FileText, href: "/audit" },
      { id: "backup", label: "Backup & Recovery", icon: Shield, href: "/backup" }
    ]
  },
  PROJECT_MANAGER: {
    title: "Project Manager",
    icon: User,
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/project-manager" },
      { id: "projects", label: "My Projects", icon: FolderKanban, href: "/projects", badge: "12" },
      { id: "calendar", label: "Project Calendar", icon: Calendar, href: "/calendar" },
      { id: "team", label: "Team Performance", icon: Users, href: "/team" },
      { id: "resources", label: "Resource Planning", icon: Target, href: "/resources" },
      { id: "reports", label: "Project Reports", icon: BarChart3, href: "/reports" },
      { id: "clients", label: "Client Communication", icon: MessageSquare, href: "/clients" },
      { id: "templates", label: "Project Templates", icon: FileText, href: "/templates" }
    ]
  },
  TEAM_LEAD: {
    title: "Team Lead",
    icon: Users,
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/team-lead" },
      { id: "team", label: "My Team", icon: Users, href: "/team", badge: "8" },
      { id: "goals", label: "Team Goals", icon: Target, href: "/goals" },
      { id: "performance", label: "Performance Review", icon: TrendingUp, href: "/performance" },
      { id: "meetings", label: "Team Meetings", icon: Calendar, href: "/meetings" },
      { id: "communication", label: "Team Chat", icon: MessageSquare, href: "/communication", badge: "5" },
      { id: "resources", label: "Resources & Tools", icon: Briefcase, href: "/resources" },
      { id: "reports", label: "Team Reports", icon: BarChart3, href: "/reports" }
    ]
  },
  MEMBER: {
    title: "Member",
    icon: Code,
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/member" },
      { id: "tasks", label: "My Tasks", icon: CheckCircle2, href: "/tasks", badge: "7" },
      { id: "projects", label: "My Projects", icon: FolderKanban, href: "/projects" },
      { id: "timesheet", label: "Time Tracking", icon: Clock, href: "/timesheet" },
      { id: "calendar", label: "My Calendar", icon: Calendar, href: "/calendar" },
      { id: "resources", label: "Resources", icon: FileText, href: "/resources" },
      { id: "communication", label: "Team Chat", icon: MessageSquare, href: "/communication" },
      { id: "profile", label: "My Profile", icon: User, href: "/profile" }
    ]
  },
  FINANCE: {
    title: "Finance",
    icon: DollarSign,
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/finance" },
      { id: "invoices", label: "Invoices", icon: Receipt, href: "/invoices", badge: "7" },
      { id: "expenses", label: "Expense Tracking", icon: CreditCard, href: "/expenses" },
      { id: "revenue", label: "Revenue Analytics", icon: TrendingUp, href: "/revenue" },
      { id: "budgets", label: "Budget Planning", icon: PieChart, href: "/budgets" },
      { id: "reports", label: "Financial Reports", icon: BarChart3, href: "/reports" },
      { id: "payments", label: "Payment Processing", icon: DollarSign, href: "/payments" },
      { id: "taxes", label: "Tax Management", icon: FileText, href: "/taxes" }
    ]
  },
  CLIENT: {
    title: "Client Portal",
    icon: Handshake,
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/client" },
      { id: "projects", label: "My Projects", icon: Eye, href: "/projects", badge: "3" },
      { id: "messages", label: "Messages", icon: MessageSquare, href: "/messages", badge: "5" },
      { id: "files", label: "Project Files", icon: Download, href: "/files" },
      { id: "invoices", label: "Invoices & Billing", icon: Receipt, href: "/invoices" },
      { id: "calendar", label: "Meetings", icon: Calendar, href: "/calendar" },
      { id: "feedback", label: "Feedback & Reviews", icon: CheckCircle2, href: "/feedback" },
      { id: "support", label: "Support", icon: MessageSquare, href: "/support" }
    ]
  }
};

export const RoleSidebar = ({ role, currentPath, onNavigate }: RoleSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const config = roleConfigs[role];
  const IconComponent = config.icon;

  const handleItemClick = (item: SidebarItem) => {
    if (item.href && onNavigate) {
      onNavigate(item.href);
    }
  };

  const isActive = (href: string) => {
    return currentPath === href;
  };

  return (
    <div className={cn(
      "flex flex-col h-screen bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{config.title}</h2>
              <p className="text-xs text-muted-foreground">AgencyFlow</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {config.items.map((item) => {
            const ItemIcon = item.icon;
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
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <Separator className="mb-3" />
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-10 px-3 text-muted-foreground hover:text-foreground",
            isCollapsed && "px-2"
          )}
        >
          <LogOut className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};