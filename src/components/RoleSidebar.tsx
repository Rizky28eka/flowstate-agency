import React, { useState, useEffect, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Crown,
  Shield,
  User,
  Users,
  Code,
  DollarSign,
  Handshake,
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Calendar,
  Settings,
  BarChart3,
  FileText,
  Clock,
  Target,
  CreditCard,
  Receipt,
  TrendingUp,
  Eye,
  CheckCircle2,
  Download,
  Building2,
  UserCheck,
  AlertTriangle,
  Lock,
  Briefcase,
  PieChart,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Plug,
  Activity,
  HardDrive,
  Zap,
  Presentation,
  ChevronsUpDown,
  Home,
  Bookmark,
  HelpCircle,
  Sun,
  Moon,
  Star, KeyRound, UserCog, HeartPulse, Bot, Gavel
} from "lucide-react";
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem as UiSidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";

// Type definitions
interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  badge?: string | number;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  children?: SidebarItem[];
  isNew?: boolean;
  description?: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  department?: string;
  status: "online" | "away" | "busy" | "offline";
}

type UserRole =
  | "OWNER"
  | "ADMIN"
  | "PROJECT_MANAGER"
  | "TEAM_LEAD"
  | "MEMBER"
  | "FINANCE"
  | "CLIENT";

interface RoleSidebarProps {
  role: UserRole;
  currentPath?: string;
  onNavigate?: (path: string) => void;
  userProfile?: UserProfile;
  notifications?: number;
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
  onSignOut?: () => void;
}

interface RoleConfig {
  title: string;

  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: SidebarItem[];
}

// Role configurations
const roleConfigs: Record<UserRole, RoleConfig> = {
  OWNER: {
    title: "AgencyFlow",

    icon: Crown,
    color: "from-purple-600 to-purple-800",
    items: [
{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/owner" },
      { id: "agency-health", label: "Agency Health", icon: HeartPulse, href: "/dashboard/owner/agency-health" },
      {
        id: "strategy",
        label: "Strategy & Growth",
        icon: Presentation,
        children: [
          {
            id: "analytics",
            label: "Analytics",
            icon: BarChart3,
            href: "/dashboard/owner/analytics",
          },
          {
            id: "kpi-dashboard",
            label: "KPI Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard/owner/kpi-dashboard",
          },
          {
            id: "goals",
            label: "Goals",
            icon: Star,
            href: "/dashboard/owner/goals",
          },
          {
            id: "forecasting",
            label: "Forecasting",
            icon: TrendingUp,
            href: "/dashboard/owner/forecasting",
          },
          {
            id: "roadmap",
            label: "Strategic Roadmap",
            icon: Presentation,
            href: "/dashboard/owner/strategic-roadmap",
          },
        ],
      },
      {
        id: "operations",
        label: "Operations",
        icon: Zap,
        children: [
          {
            id: "projects",
            label: "Projects",
            icon: FolderKanban,
            href: "/dashboard/owner/projects",
            badge: 47,
          },
          {
            id: "risks",
            label: "Risks",
            icon: AlertTriangle,
            href: "/dashboard/owner/risks",
            badge: 3,
            badgeVariant: "destructive",
          },
          {
            id: "resource-allocation",
            label: "Resource Allocation",
            icon: Target,
            href: "/dashboard/owner/resource-allocation",
          },
          {
            id: "profitability",
            label: "Profitability",
            icon: PieChart,
            href: "/dashboard/owner/profitability",
          },
        ],
      },
      {
        id: "team",
        label: "Team",
        icon: Users,
        children: [
          {
            id: "team-management",
            label: "Team Management",
            icon: Users,
            href: "/dashboard/owner/employees",
          },
          {
            id: "communication",
            label: "Communication",
            icon: MessageSquare,
            href: "/dashboard/owner/communication",
          },
        ],
      },
      {
        id: "finance",
        label: "Finance",
        icon: DollarSign,
        children: [
          {
            id: "financial-overview",
            label: "Overview",
            icon: DollarSign,
            href: "/dashboard/owner/finances",
          },
          {
            id: "contract-management",
            label: "Contracts",
            icon: FileText,
            href: "/dashboard/owner/contract-management",
          },
        ],
      },
      {
        id: "clients-reports",
        label: "Clients & Reports",
        icon: Handshake,
        children: [
          {
            id: "clients",
            label: "Clients",
            icon: Building2,
            href: "/dashboard/owner/clients",
          },
          {
            id: "reports",
            label: "Reports",
            icon: FileText,
            href: "/dashboard/owner/reports",
          },
          {
            id: "sales-pipeline",
            label: "Sales Pipeline",
            icon: TrendingUp,
            href: "/dashboard/owner/sales-pipeline",
          },
        ],
      },
      {
        id: "company-settings",
        label: "Company Settings",
        icon: Settings,
        children: [
          {
            id: "settings",
            label: "Settings",
            icon: Settings,
            href: "/dashboard/owner/settings",
          },
          {
            id: "integrations",
            label: "Integrations",
            icon: Plug,
            href: "/dashboard/owner/integrations",
          },
          {
            id: "alerts",
            label: "Alerts",
            icon: Bell,
            href: "/dashboard/owner/alerts",
          },
        ],
      },
    ],
  },
  ADMIN: {
    title: "System Administration",

    icon: Shield,
    color: "from-red-600 to-red-800",
    items: [
      {
        id: "dashboard",
        label: "Admin Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/admin",
      },
      {
        id: "saas-analytics",
        label: "SaaS Analytics",
        icon: BarChart3,
        href: "/dashboard/admin/saas-analytics",
      },
      {
        id: "users",
        label: "User Management",
        icon: UserCheck,
        href: "/dashboard/admin/users",
        badge: 156,
      },
      {
        id: "roles",
        label: "Roles & Permissions",
        icon: Users,
        href: "/dashboard/admin/roles",
      },
      {
        id: "communication",
        label: "Communication",
        icon: MessageSquare,
        href: "/dashboard/admin/communication",
      },
{ id: "security", label: "Security Center", icon: Lock, href: "/dashboard/admin/security", badge: 2, badgeVariant: "destructive" },
      { id: "compliance", label: "Compliance", icon: Gavel, href: "/dashboard/admin/compliance" },
      {
        id: "organization",
        label: "Organization Settings",
        icon: Building2,
        href: "/dashboard/admin/organization-settings",
      },
      {
        id: "health",
        label: "System Health",
        icon: Activity,
        href: "/dashboard/admin/system",
      },
      {
        id: "audit",
        label: "Audit Trails",
        icon: FileText,
        href: "/dashboard/admin/audit",
      },
      {
        id: "backup",
        label: "Backup & Recovery",
        icon: HardDrive,
        href: "/dashboard/admin/backup",
      },
      {
        id: "integrations",
        label: "Integrations",
        icon: Plug,
        href: "/dashboard/admin/integrations",
      },
{ id: "api", label: "API Management", icon: KeyRound, href: "/dashboard/admin/api-keys" },
      { id: "automations", label: "Automations", icon: Bot, href: "/dashboard/admin/automations" }
    ],
  },
  PROJECT_MANAGER: {
    title: "Project Management",

    icon: Briefcase,
    color: "from-blue-600 to-blue-800",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/project-manager",
      },
      {
        id: "projects",
        label: "Projects",
        icon: FolderKanban,
        href: "/dashboard/project-manager/projects",
        badge: 12,
      },
      {
        id: "calendar",
        label: "Calendar",
        icon: Calendar,
        href: "/dashboard/project-manager/calendar",
      },
      {
        id: "team",
        label: "Team",
        icon: Users,
        href: "/dashboard/project-manager/team",
      },
      {
        id: "resources",
        label: "Resources",
        icon: Target,
        href: "/dashboard/project-manager/resources",
      },
      {
        id: "clients",
        label: "Clients",
        icon: MessageSquare,
        href: "/dashboard/project-manager/clients",
        badge: 3,
      },
      {
        id: "reports",
        label: "Reports",
        icon: BarChart3,
        href: "/dashboard/project-manager/reports",
      },
      {
        id: "templates",
        label: "Templates",
        icon: FileText,
        href: "/dashboard/project-manager/templates",
      },
    ],
  },
  TEAM_LEAD: {
    title: "Team Leadership",

    icon: Users,
    color: "from-green-600 to-green-800",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/team-lead",
      },
      {
        id: "team",
        label: "My Team",
        icon: Users,
        href: "/dashboard/team-lead/team",
        badge: 8,
      },
      {
        id: "goals",
        label: "Goals",
        icon: Target,
        href: "/dashboard/team-lead/goals",
      },
      {
        id: "performance",
        label: "Performance",
        icon: TrendingUp,
        href: "/dashboard/team-lead/performance",
      },
      {
        id: "meetings",
        label: "Meetings",
        icon: Calendar,
        href: "/dashboard/team-lead/meetings",
      },
      {
        id: "communication",
        label: "Communication",
        icon: MessageSquare,
        href: "/dashboard/team-lead/communication",
        badge: 5,
      },
      {
        id: "resources",
        label: "Resources",
        icon: Briefcase,
        href: "/dashboard/team-lead/resources",
      },
      {
        id: "reports",
        label: "Reports",
        icon: BarChart3,
        href: "/dashboard/team-lead/reports",
      },
    ],
  },
  MEMBER: {
    title: "My Workspace",

    icon: Code,
    color: "from-indigo-600 to-indigo-800",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: Home,
        href: "/dashboard/member",
      },
      {
        id: "tasks",
        label: "My Tasks",
        icon: CheckCircle2,
        href: "/dashboard/member/tasks",
        badge: 7,
        badgeVariant: "secondary",
      },
      {
        id: "projects",
        label: "My Projects",
        icon: FolderKanban,
        href: "/dashboard/member/projects",
      },
      {
        id: "timesheet",
        label: "Timesheet",
        icon: Clock,
        href: "/dashboard/member/timesheet",
      },
      {
        id: "calendar",
        label: "Calendar",
        icon: Calendar,
        href: "/dashboard/member/calendar",
      },
      {
        id: "communication",
        label: "Communication",
        icon: MessageSquare,
        href: "/dashboard/member/communication",
        badge: 3,
      },
      {
        id: "resources",
        label: "Resources",
        icon: Bookmark,
        href: "/dashboard/member/resources",
      },
      {
        id: "profile",
        label: "My Profile",
        icon: User,
        href: "/dashboard/member/profile",
      },
    ],
  },
  FINANCE: {
    title: "Financial Management",

    icon: DollarSign,
    color: "from-emerald-600 to-emerald-800",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/finance",
      },
      {
        id: "invoices",
        label: "Invoices",
        icon: Receipt,
        href: "/dashboard/finance/invoices",
        badge: 7,
        badgeVariant: "secondary",
      },
      {
        id: "communication",
        label: "Communication",
        icon: MessageSquare,
        href: "/dashboard/finance/communication",
      },
      {
        id: "expenses",
        label: "Expenses",
        icon: CreditCard,
        href: "/dashboard/finance/expenses",
      },
      {
        id: "revenue",
        label: "Revenue",
        icon: TrendingUp,
        href: "/dashboard/finance/revenue",
      },
      {
        id: "budgets",
        label: "Budgets",
        icon: PieChart,
        href: "/dashboard/finance/budgets",
      },
      {
        id: "reports",
        label: "Reports",
        icon: FileText,
        href: "/dashboard/finance/reports",
      },
      {
        id: "payments",
        label: "Payments",
        icon: DollarSign,
        href: "/dashboard/finance/payments",
      },
      {
        id: "taxes",
        label: "Taxes",
        icon: Shield,
        href: "/dashboard/finance/taxes",
      },
    ],
  },
  CLIENT: {
    title: "Client Portal",

    icon: Handshake,
    color: "from-orange-600 to-orange-800",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/client",
      },
      {
        id: "projects",
        label: "Projects",
        icon: Eye,
        href: "/dashboard/client/projects",
        badge: 3,
      },
      {
        id: "messages",
        label: "Messages",
        icon: MessageSquare,
        href: "/dashboard/client/messages",
        badge: 5,
        badgeVariant: "default",
      },
      {
        id: "files",
        label: "Files",
        icon: Download,
        href: "/dashboard/client/files",
      },
      {
        id: "invoices",
        label: "Invoices",
        icon: Receipt,
        href: "/dashboard/client/invoices",
      },
      {
        id: "calendar",
        label: "Calendar",
        icon: Calendar,
        href: "/dashboard/client/calendar",
      },
      {
        id: "feedback",
        label: "Feedback",
        icon: Star,
        href: "/dashboard/client/feedback",
      },
      {
        id: "support",
        label: "Support",
        icon: HelpCircle,
        href: "/dashboard/client/support",
      },
    ],
  },
};

// Individual sidebar menu item component
const SidebarMenuItem = ({
  item,
  onNavigate,
  currentPath,
}: {
  item: SidebarItem;
  onNavigate?: (path: string) => void;
  currentPath?: string;
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isOpen, setIsOpen] = useState(false);
  const ItemIcon = item.icon;

  // Check if current item is active based on path
  const isActive = item.href === currentPath;

  // Check if any child item is active
  const hasActiveChild = useMemo(() => {
    if (!item.children) return false;
    return item.children.some((child) => child.href === currentPath);
  }, [item.children, currentPath]);

  // Auto-expand parent if child is active
  useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true);
    }
  }, [hasActiveChild]);

  const handleClick = useCallback(() => {
    if (item.href && onNavigate) {
      onNavigate(item.href);
    }
  }, [item.href, onNavigate]);

  // Tooltip content for collapsed sidebar
  const tooltipContent = (
    <div className="flex flex-col p-1">
      <span className="font-medium">{item.label}</span>
      {item.description && (
        <span className="text-xs text-muted-foreground mt-1">
          {item.description}
        </span>
      )}
    </div>
  );

  // Handle items with children (collapsible)
  if (item.children && item.children.length > 0) {
    return (
      <UiSidebarMenuItem className="px-2">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              isActive={hasActiveChild}
              tooltip={{ children: tooltipContent, side: "right" }}
              className="w-full"
            >
              <ItemIcon
                className={cn(
                  "h-4 w-4 shrink-0",
                  hasActiveChild && "text-primary"
                )}
              />
              <span className="truncate flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge
                  variant={item.badgeVariant || "default"}
                  className="h-5 min-w-[1.25rem] px-1.5"
                >
                  {item.badge}
                </Badge>
              )}
              {!isCollapsed && (
                <ChevronsUpDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children.map((child) => (
                <SidebarMenuSubItem key={child.id}>
                  <SidebarMenuSubButton
                    href={child.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate && child.href) onNavigate(child.href);
                    }}
                    isActive={child.href === currentPath}
                  >
                    {child.label}
                    {child.badge && (
                      <Badge
                        variant={child.badgeVariant || "default"}
                        className="ml-auto h-5 min-w-[1.25rem] px-1.5"
                      >
                        {child.badge}
                      </Badge>
                    )}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </UiSidebarMenuItem>
    );
  }

  // Handle simple menu items
  return (
    <UiSidebarMenuItem className="px-2">
      <SidebarMenuButton
        isActive={isActive}
        onClick={handleClick}
        tooltip={{ children: tooltipContent, side: "right" }}
        className="w-full"
      >
        <ItemIcon
          className={cn("h-4 w-4 shrink-0", isActive && "text-primary")}
        />
        <span className="truncate flex-1 text-left">{item.label}</span>
        {item.badge && (
          <Badge
            variant={item.badgeVariant || "default"}
            className="h-5 min-w-[1.25rem] px-1.5"
          >
            {item.badge}
          </Badge>
        )}
      </SidebarMenuButton>
    </UiSidebarMenuItem>
  );
};

// User profile section component
const UserProfileSection = ({
  userProfile,
  isCollapsed,
  notifications = 0,
}: {
  userProfile?: UserProfile;
  isCollapsed: boolean;
  notifications?: number;
}) => {
  if (!userProfile) return null;

  const statusColors = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    busy: "bg-red-500",
    offline: "bg-gray-500",
  };

  // Collapsed profile view with tooltip
  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative flex justify-center p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {/* Status indicator */}
              <div
                className={cn(
                  "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-sidebar",
                  statusColors[userProfile.status]
                )}
              />
              {/* Notification badge */}
              {notifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
                >
                  {notifications > 9 ? "9+" : notifications}
                </Badge>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <div className="flex flex-col">
              <span className="font-medium">{userProfile.name}</span>
              <span className="text-xs text-muted-foreground">
                {userProfile.role}
              </span>
              <span className="text-xs text-muted-foreground">
                {userProfile.email}
              </span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Expanded profile view
  return (
    <div className="p-3">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {/* Status indicator */}
          <div
            className={cn(
              "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-sidebar",
              statusColors[userProfile.status]
            )}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {userProfile.name}
            </p>
            {/* Notification badge */}
            {notifications > 0 && (
              <Badge
                variant="destructive"
                className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                {notifications > 9 ? "9+" : notifications}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {userProfile.role}
          </p>
          {userProfile.department && (
            <p className="text-xs text-muted-foreground truncate">
              {userProfile.department}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Main sidebar component
export const RoleSidebar = ({
  role,
  currentPath,
  onNavigate,
  userProfile,
  notifications = 0,
  theme = "light",
  onThemeToggle,
  onSignOut,
}: RoleSidebarProps) => {
  const config = roleConfigs[role];
  const IconComponent = config.icon;
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      {/* Header section with logo and title */}
      <SidebarHeader className="p-4 h-16 flex items-center justify-between border-b">
        <div className={cn("flex items-center gap-3", isCollapsed && "hidden")}>
          <div
            className={cn(
              "w-10 h-10 bg-gradient-to-r rounded-xl flex items-center justify-center shadow-lg",
              config.color
            )}
          >
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground text-base leading-tight">
              {config.title}
            </h2>
          </div>
        </div>
        {/* Collapse/expand toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </SidebarHeader>

      {/* Navigation menu */}
      <ScrollArea className="flex-1">
        <SidebarContent>
          <SidebarMenu>
            {config.items.map((item) => (
              <SidebarMenuItem
                key={item.id}
                item={item}
                onNavigate={onNavigate}
                currentPath={currentPath}
              />
            ))}
          </SidebarMenu>
        </SidebarContent>
      </ScrollArea>

      {/* Footer with user profile and actions */}
      <SidebarFooter className="p-0 border-t">
        <UserProfileSection
          userProfile={userProfile}
          isCollapsed={isCollapsed}
          notifications={notifications}
        />

        {/* Action buttons */}
        <div className="p-3 border-t space-y-1">
          {/* Theme toggle button (only show when expanded and callback exists) */}
          {!isCollapsed && onThemeToggle && (
            <Button
              variant="ghost"
              className="w-full justify-start h-9 px-3"
              onClick={onThemeToggle}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4 mr-3" />
              ) : (
                <Sun className="h-4 w-4 mr-3" />
              )}
              <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
            </Button>
          )}

          {/* Sign out button */}
          <Button
            variant="ghost"
            onClick={onSignOut}
            className={cn(
              "w-full justify-start h-9 transition-colors hover:text-destructive",
              isCollapsed ? "justify-center px-2" : "px-3"
            )}
            aria-label="Sign out"
          >
            <LogOut className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
            {!isCollapsed && <span>Sign Out</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
