import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import {
    DollarSign,
    Briefcase,
    Users,
    CheckCircle2,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const AnalyticsPage = () => {
    const { data: response, isLoading, isError } = useQuery({
        queryKey: ["analytics", "dashboard"],
        queryFn: async () => {
            const res = await api.get("/analytics/dashboard");
            return res.data;
        },
        retry: 1
    });

    const metrics = response || {
        revenue: 0,
        activeProjects: 0,
        totalClients: 0,
        completedTasks: 0,
        revenueData: [],
        projectStats: []
    };

    const stats = [
        {
            title: "Total Revenue",
            value: `$${(metrics.revenue || 0).toLocaleString()}`,
            change: "+12.5%",
            trend: "up",
            icon: DollarSign,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            title: "Active Projects",
            value: metrics.activeProjects || 0,
            change: "+3",
            trend: "up",
            icon: Briefcase,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Total Clients",
            value: metrics.totalClients || 0,
            change: "+2",
            trend: "up",
            icon: Users,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            title: "Completed Tasks",
            value: metrics.completedTasks || 0,
            change: "+18%",
            trend: "up",
            icon: CheckCircle2,
            color: "text-amber-500",
            bg: "bg-amber-500/10"
        },
    ];

    if (isLoading) {
        return (
            <DashboardLayout>
                <DashboardPageHeader title="Analytics" description="Real-time performance metrics and insights." />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-[400px] w-full rounded-2xl" />
                    <Skeleton className="h-[400px] w-full rounded-2xl" />
                </div>
            </DashboardLayout>
        );
    }

    if (isError) {
        return (
            <DashboardLayout>
                <DashboardPageHeader title="Analytics" description="An error occurred while loading analytics." />
                <Card className="border-destructive/50 bg-destructive/5 p-12 text-center">
                    <h3 className="text-lg font-bold text-destructive">Dashboard Connection Error</h3>
                    <p className="text-muted-foreground mt-2">We couldn't fetch real-time analytics. Please check your connection or try again later.</p>
                </Card>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <DashboardPageHeader
                title="Analytics"
                description="Real-time performance metrics and insights for your agency."
            />

            <div className="flex flex-col gap-8">
                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, i) => (
                        <Card key={i} className="border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden group">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={cn("p-2 rounded-xl transition-colors", stat.bg, stat.color)}>
                                        <stat.icon className="w-5 h-5" />
                                    </div>
                                    <div className={cn(
                                        "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                                        stat.trend === 'up' ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
                                    )}>
                                        {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        {stat.change}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.title}</p>
                                    <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
                                </div>
                            </CardContent>
                            <div className={cn("h-1 w-full bg-current opacity-10", stat.color)} />
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Revenue Chart */}
                    <Card className="lg:col-span-2 border-border/50 bg-background/50 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg font-bold">Revenue Growth</CardTitle>
                                    <CardDescription>Monthly revenue performance over time.</CardDescription>
                                </div>
                                <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-lg border border-border/50">
                                    <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold px-3">ALL</Button>
                                    <Button variant="secondary" size="sm" className="h-7 text-[10px] font-bold px-3 shadow-sm">12M</Button>
                                    <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold px-3">30D</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full pt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={metrics.revenueData?.length ? metrics.revenueData : [
                                        { name: 'Jan', value: 4000 },
                                        { name: 'Feb', value: 3000 },
                                        { name: 'Mar', value: 2000 },
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
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 600 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 600 }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--background))',
                                                borderColor: 'hsl(var(--border))',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: 'bold'
                                            }}
                                        />
                                        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Project Status Chart */}
                    <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Project Distribution</CardTitle>
                            <CardDescription>Status breakdown of all ongoing projects.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full pt-4 text-primary">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={metrics.projectStats?.length ? metrics.projectStats : [
                                        { name: 'Active', value: 12 },
                                        { name: 'On Hold', value: 4 },
                                        { name: 'Review', value: 7 },
                                        { name: 'Done', value: 15 },
                                    ]}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 600 }}
                                            dy={10}
                                        />
                                        <YAxis axisLine={false} tickLine={false} hide />
                                        <Tooltip
                                            cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--background))',
                                                borderColor: 'hsl(var(--border))',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: 'bold'
                                            }}
                                        />
                                        <Bar dataKey="value" fill="currentColor" radius={[6, 6, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AnalyticsPage;
