import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    FileText,
    CreditCard,
    Settings,
    PieChart,
    LogOut,
    ChevronLeft,
    ChevronRight,
    PlusCircle,
    FolderOpen
} from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const sidebarLinks = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard", roles: ["admin", "superadmin", "member", "client"] },
    { icon: Briefcase, label: "Projects", href: "/dashboard/projects", roles: ["admin", "superadmin", "member", "client"] },
    { icon: Users, label: "Clients", href: "/dashboard/clients", roles: ["admin", "superadmin"] },
    { icon: FileText, label: "Reports", href: "/dashboard/reports", roles: ["admin", "superadmin", "client"] },
    { icon: CreditCard, label: "Invoices", href: "/dashboard/invoices", roles: ["admin", "superadmin", "client"] },
    { icon: PieChart, label: "Analytics", href: "/dashboard/analytics", roles: ["admin", "superadmin"] },
    { icon: Settings, label: "Settings", href: "/dashboard/settings", roles: ["admin", "superadmin", "member", "client"] },
];

const DashboardSidebar = ({ userRole }: { userRole: string }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const filteredLinks = sidebarLinks.filter(link =>
        link.roles.includes(userRole.toLowerCase())
    );

    return (
        <aside
            className={cn(
                "h-screen bg-background border-r border-border transition-all duration-300 flex flex-col relative sticky top-0",
                collapsed ? "w-20" : "w-64"
            )}
        >
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-primary-foreground"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>
                {!collapsed && (
                    <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        FlowState
                    </span>
                )}
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {filteredLinks.map((link) => (
                    <Link
                        key={link.href}
                        to={link.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group relative",
                            location.pathname === link.href
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <link.icon className={cn("w-5 h-5 shrink-0", location.pathname === link.href ? "text-primary" : "")} />
                        {!collapsed && <span className="text-sm font-medium">{link.label}</span>}
                        {collapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border shadow-md">
                                {link.label}
                            </div>
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-border space-y-4">
                {!collapsed && (
                    <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Actions</p>
                        <div className="space-y-1">
                            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 h-9">
                                <PlusCircle className="w-4 h-4" />
                                New Project
                            </Button>
                        </div>
                    </div>
                )}

                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-3 hover:text-destructive transition-colors group relative"
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = "/login";
                    }}
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!collapsed && <span className="text-sm font-medium">Logout</span>}
                    {collapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-destructive text-destructive-foreground text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border shadow-md">
                            Logout
                        </div>
                    )}
                </Button>
            </div>

            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center hover:bg-muted transition-colors z-20 shadow-sm"
            >
                {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
            </button>
        </aside>
    );
};

export default DashboardSidebar;
