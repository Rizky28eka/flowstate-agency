import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import { io } from "socket.io-client";

import { cn } from "@/lib/utils";
import {
    Users,
    Briefcase,
    DollarSign,
    Clock,
    TrendingUp,
    CheckCircle2,
    AlertCircle,
    ArrowUpRight,
    PlusCircle
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
    id: string;
    email: string;
    name: string;
    organizationId: string;
    role: string;
    avatarUrl?: string;
}

interface Project {
    id: string;
    name: string;
    status: string;
    client?: { name: string };
    endDate?: string;
}


const Dashboard = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);

            const socket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || "http://localhost:5000");
            socket.emit("join_organization", parsedUser.organizationId);

            return () => {
                socket.disconnect();
            };
        }
    }, []);


    const { data: analyticsRes, isLoading: analyticsLoading } = useQuery({
        queryKey: ["dashboard-analytics"],
        queryFn: () => api.get("/analytics/dashboard"),
        enabled: !!user
    });

    const { data: projectsRes, isLoading: projectsLoading } = useQuery({
        queryKey: ["active-projects"],
        queryFn: () => api.get("/projects"),
        enabled: !!user
    });

    if (!user) return null;

    const userRole = user.role.toLowerCase();
    const stats = {
        totalRevenue: analyticsRes?.data?.totalRevenue || 0,
        activeClients: analyticsRes?.data?.activeClients || 0,
        projectSuccessRate: analyticsRes?.data?.projectSuccessRate || 0,
        avgProjectValue: analyticsRes?.data?.avgProjectValue || 0
    };
    const projects = projectsRes?.data?.slice(0, 5) || [];

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                        <p className="text-muted-foreground mt-1">
                            Welcome back, <span className="text-foreground font-semibold">{user.name}</span>. Here's what's happening today.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="gap-2">
                            <Clock className="w-4 h-4" />
                            Schedule
                        </Button>
                        <Button className="gap-2">
                            <PlusCircle className="w-4 h-4" />
                            Quick Action
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {analyticsLoading ? (
                        [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
                    ) : (
                        <>
                            <StatsCard
                                title="Revenue"
                                value={`$${stats.totalRevenue.toLocaleString()}`}
                                description="Total paid invoices"
                                icon={DollarSign}
                                trend={{ value: 12, isUp: true }}
                            />
                            <StatsCard
                                title="Active Clients"
                                value={stats.activeClients.toString()}
                                description="Current active accounts"
                                icon={Users}
                                trend={{ value: 4, isUp: true }}
                            />
                            <StatsCard
                                title="Active Projects"
                                value={projects.length.toString()}
                                description="Currently in progress"
                                icon={Briefcase}
                                trend={{ value: 8, isUp: true }}
                            />
                            <StatsCard
                                title="Success Rate"
                                value={`${stats.projectSuccessRate}%`}
                                description="On-time delivery"
                                icon={CheckCircle2}
                            />
                        </>
                    )}
                </div>

                {/* Charts & Table Section */}
                <div className="grid gap-8 lg:grid-cols-7">
                    <Card className="lg:col-span-4 border-border/50 bg-background/50 backdrop-blur-sm shadow-xl">
                        <CardHeader>
                            <CardTitle>Revenue Analytics</CardTitle>
                            <CardDescription>
                                Overview of your financial performance over time.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[
                                        { name: 'Jan', value: 4000 },
                                        { name: 'Feb', value: 3000 },
                                        { name: 'Mar', value: 5000 },
                                        { name: 'Apr', value: 2780 },
                                        { name: 'May', value: 1890 },
                                        { name: 'Jun', value: 2390 },
                                        { name: 'Jul', value: 3490 },
                                    ]}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                            dx={-10}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--background))',
                                                borderColor: 'hsl(var(--border))',
                                                borderRadius: '8px',
                                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="hsl(var(--primary))"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorValue)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-3 border-border/50 bg-background/50 backdrop-blur-sm shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Activities</CardTitle>
                                <CardDescription>Latest updates from your team.</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary font-semibold">View All</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {[
                                    { name: "John Doe", action: "completed task", target: "Setup Database", time: "2h ago", avatar: "JD" },
                                    { name: "Jane Smith", action: "uploaded file", target: "Design Mockups", time: "4h ago", avatar: "JS" },
                                    { name: "Robert Fox", action: "created project", target: "Apollo App", time: "6h ago", avatar: "RF" },
                                    { name: "Esther Howard", action: "sent invoice", target: "INV-2024-001", time: "1d ago", avatar: "EH" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <Avatar className="w-9 h-9 border-2 border-background shadow-sm">
                                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">{item.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm leading-none">
                                                <span className="font-bold">{item.name}</span> {item.action} <span className="text-primary font-medium">{item.target}</span>
                                            </p>
                                            <p className="text-xs text-muted-foreground">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Section: Active Projects Table */}
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Active Projects</CardTitle>
                            <CardDescription>Manage and monitor your ongoing projects.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">Download Report</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-lg">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">Project Name</th>
                                        <th className="px-4 py-3 font-semibold">Status</th>
                                        <th className="px-4 py-3 font-semibold">Client</th>
                                        <th className="px-4 py-3 font-semibold">Progress</th>
                                        <th className="px-4 py-3 font-semibold">Deadline</th>
                                        <th className="px-4 py-3 font-semibold"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {projectsLoading ? (
                                        [1, 2, 3, 4].map(i => (
                                            <tr key={i}>
                                                <td colSpan={6} className="px-4 py-4"><Skeleton className="h-4 w-full" /></td>
                                            </tr>
                                        ))
                                    ) : projects.map((project: Project, i: number) => (

                                        <tr key={i} className="hover:bg-muted/30 transition-colors group">
                                            <td className="px-4 py-4 font-semibold text-foreground">{project.name}</td>
                                            <td className="px-4 py-4">
                                                <Badge variant="secondary" className={cn(
                                                    "font-bold text-[10px] uppercase",
                                                    project.status === 'DELAYED' ? "bg-rose-500/10 text-rose-500" :
                                                        project.status === 'REVIEW' ? "bg-amber-500/10 text-amber-500" :
                                                            "bg-blue-500/10 text-blue-500"
                                                )}>
                                                    {project.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-4 text-muted-foreground">{project.client?.name || 'N/A'}</td>
                                            <td className="px-4 py-4 w-40">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className={cn("h-full rounded-full transition-all duration-1000 bg-primary")}
                                                            style={{ width: `65%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-bold">65%</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-muted-foreground">
                                                {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'No Deadline'}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <Button variant="ghost" size="icon" className="group-hover:text-primary">
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {projects.length === 0 && !projectsLoading && (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                                                No active projects found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
