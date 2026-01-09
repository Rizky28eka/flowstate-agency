import { Bell, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export function DashboardHeader() {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4 w-96">
                <Search className="text-slate-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search anything..."
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
                />
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <div className="text-right">
                        <p className="text-sm font-medium text-slate-900">{user?.name || 'User'}</p>
                        <p className="text-xs text-slate-500 capitalize">{user?.role === 'admin' ? 'Super Admin' : user?.role || 'Member'}</p>
                    </div>
                    <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold overflow-hidden">
                        {user?.avatar_url ? (
                            <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            user?.name?.[0] || 'U'
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
