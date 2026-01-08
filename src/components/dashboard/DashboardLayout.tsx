import { ReactNode, useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { useNavigate } from "react-router-dom";

interface User {
    id: string;
    email: string;
    name: string;
    organizationId: string;
    role: string;
    avatarUrl?: string;
}

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!userData || !token) {
            navigate("/login");
            return;
        }

        setUser(JSON.parse(userData));
    }, [navigate]);

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-background">
            <DashboardSidebar userRole={user.role} />
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader user={user} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 animate-in fade-in duration-500">
                    <div className="mx-auto max-w-7xl space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
