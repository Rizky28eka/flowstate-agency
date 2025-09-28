
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Line, ComposedChart } from "recharts";
import { TrendingUp, Users, DollarSign, Activity, Briefcase, Heart, Zap, Award, Target, Clock, GripVertical } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { monthlyRevenueData, projects, teamMembers, clients, departments, notifications } from "@/lib/mock-data";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Helper component for sortable items
const SortableItem = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none', // Prevent scrolling on touch devices
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative">
            {children}
        </div>
    );
};

const OwnerOverview = () => {
  // --- Original Data Calculations ---
  const totalRevenue = monthlyRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = monthlyRevenueData.reduce((sum, item) => sum + item.profit, 0);
  const profitMargin = (totalProfit / totalRevenue * 100).toFixed(1);
  const activeProjects = projects.filter(p => p.status === "In Progress").length;
  const clientRetentionRate = 94;
  const chartData = monthlyRevenueData.map(item => ({ month: item.month, revenue: item.revenue, profit: item.profit }));

  // --- State for Draggable Widgets ---
  const initialWidgets = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      subtext: '+12.5% from last month',
      icon: <DollarSign className="h-4 w-4 text-green-500" />
    },
    {
      id: 'profit',
      title: 'Profit Margin',
      value: `${profitMargin}%`,
      subtext: '+2.1% from last month',
      icon: <Award className="h-4 w-4 text-blue-500" />
    },
    {
      id: 'projects',
      title: 'Active Projects',
      value: activeProjects,
      subtext: '3 projects nearing deadline',
      icon: <Briefcase className="h-4 w-4 text-amber-500" />
    },
    {
      id: 'retention',
      title: 'Client Retention',
      value: `${clientRetentionRate}%`,
      subtext: 'Maintained this quarter',
      icon: <Heart className="h-4 w-4 text-red-500" />
    }
  ];

  const [widgets, setWidgets] = useState(initialWidgets);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <main className="flex-1 px-6 py-8 bg-background">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {widgets.map(widget => (
                        <SortableItem key={widget.id} id={widget.id}>
                            <Card className="hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
                                    {widget.icon}
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{widget.value}</div>
                                    <p className="text-xs text-muted-foreground">{widget.subtext}</p>
                                </CardContent>
                            </Card>
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>

      {/* --- The rest of the page remains the same --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue vs. Profit</CardTitle>
            <CardDescription>Last 6 months performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-80 w-full" config={{}}>
              <ComposedChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} />
                <YAxis tickLine={false} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="hsl(var(--primary) / 0.5)" radius={4} />
                <Line type="monotone" dataKey="profit" stroke="hsl(var(--primary))" strokeWidth={2} />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goal Progress</CardTitle>
            <CardDescription>Q4 2025 Company Goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium flex items-center"><Target className="w-4 h-4 mr-2 text-muted-foreground"/>Revenue Target</span>
                <span className="text-sm font-medium">{((totalRevenue / 350000) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={parseFloat(((totalRevenue / 350000) * 100).toFixed(0))} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium flex items-center"><Heart className="w-4 h-4 mr-2 text-muted-foreground"/>Client Satisfaction</span>
                <span className="text-sm font-medium">{(clients.reduce((sum, client) => sum + client.satisfaction, 0) / clients.length).toFixed(1)}/5.0</span>
              </div>
              <Progress value={parseFloat(((clients.reduce((sum, client) => sum + client.satisfaction, 0) / clients.length) / 5 * 100).toFixed(0))} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium flex items-center"><Users className="w-4 h-4 mr-2 text-muted-foreground"/>Employee Satisfaction</span>
                <span className="text-sm font-medium">{(teamMembers.reduce((sum, member) => sum + member.rating, 0) / teamMembers.length).toFixed(1)}/5.0</span>
              </div>
              <Progress value={parseFloat(((teamMembers.reduce((sum, member) => sum + member.rating, 0) / teamMembers.length) / 5 * 100).toFixed(0))} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium flex items-center"><Zap className="w-4 h-4 mr-2 text-muted-foreground"/>Project Success Rate</span>
                <span className="text-sm font-medium">{(projects.filter(p => p.status === "Completed").length / projects.length * 100).toFixed(0)}%</span>
              </div>
              <Progress value={parseFloat((projects.filter(p => p.status === "Completed").length / projects.length * 100).toFixed(0))} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Productivity and project overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {departments.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.projects} active projects</p>
                  </div>
                  <span className="text-lg font-semibold text-primary">{item.utilization}%</span>
                </div>
                <Progress value={item.utilization} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across the company</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.slice(0, 4).map((notification, index) => (
                <div key={notification.id}>
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${notification.type === 'payment' ? 'bg-green-100' : 'bg-blue-100'}`}>
                      {notification.type === 'payment' && <DollarSign className="w-4 h-4 text-green-600"/>}
                      {notification.type === 'team' && <Users className="w-4 h-4 text-blue-600"/>}
                      {notification.type === 'deadline' && <Clock className="w-4 h-4 text-amber-600"/>}
                      {notification.type === 'expense' && <Briefcase className="w-4 h-4 text-purple-600"/>}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                    </div>
                  </div>
                  {index < notifications.slice(0, 4).length - 1 && <Separator className="my-4" />} 
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default OwnerOverview;
