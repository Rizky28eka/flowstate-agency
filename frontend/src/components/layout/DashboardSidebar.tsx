import {
    LayoutDashboard,
    FolderKanban,
    Users,
    Settings,
    LogOut,
    FileText,
    Receipt
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    path: string;
    active: boolean;
}

const SidebarItem = ({ icon, label, path, active }: SidebarItemProps) => (
    <Link
        to={path}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
            }`}
    >
        {icon}
        {label}
    </Link>
);

export function DashboardSidebar() {
    const { logout } = useAuth();
    const location = useLocation();

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <FolderKanban size={20} />, label: 'Projects', path: '/projects' },
        { icon: <FileText size={20} />, label: 'Quotations', path: '/quotations' },
        { icon: <Receipt size={20} />, label: 'Invoices', path: '/invoices' },
        { icon: <Users size={20} />, label: 'Clients', path: '/clients' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-slate-100">
                <Link to="/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
                    <span className="text-xl font-bold text-slate-900">AgencyFlow</span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item, i) => (
                    <SidebarItem
                        key={i}
                        {...item}
                        active={location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))}
                    />
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-red-600 transition-colors text-sm font-medium"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
