import { useState, useMemo } from 'react';
import { timeEntries, projects, tasks } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, eachDayOfInterval } from 'date-fns';
import { ChevronLeft, ChevronRight, CalendarIcon, Clock } from 'lucide-react';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

import Paywall from "@/components/Paywall";

const MemberTimesheet = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState<string | undefined>();

  // Assume logged-in member is Sarah Wilson (ID 1) for demo
  const currentUserId = 1;

  const weekInterval = useMemo(() => ({
    start: startOfWeek(currentDate, { weekStartsOn: 1 }),
    end: endOfWeek(currentDate, { weekStartsOn: 1 }),
  }), [currentDate]);

  const weeklyEntries = useMemo(() => {
    return timeEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entry.employeeId === currentUserId && entryDate >= weekInterval.start && entryDate <= weekInterval.end;
    });
  }, [currentUserId, weekInterval]);

  const projectBreakdown = useMemo(() => {
    const breakdown: { [key: string]: number } = {};
    weeklyEntries.forEach(entry => {
      breakdown[entry.projectName] = (breakdown[entry.projectName] || 0) + entry.hours;
    });
    return Object.entries(breakdown).map(([name, value]) => ({ name, value }));
  }, [weeklyEntries]);

  const dailyBreakdown = useMemo(() => {
    const days = eachDayOfInterval(weekInterval);
    return days.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const hours = weeklyEntries.filter(e => e.date === dayStr).reduce((sum, e) => sum + e.hours, 0);
      return { name: format(day, 'EEE'), hours };
    });
  }, [weeklyEntries, weekInterval]);

  const totalHours = weeklyEntries.reduce((sum, e) => sum + e.hours, 0);

  return (
    <Paywall 
      feature="timesheet"
      featureName="Timesheet"
      features={[
        "Log your hours and view your weekly activity",
        "Generate timesheet reports",
        "Integrate with payroll systems",
      ]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Timesheet</h1>
            <p className="text-muted-foreground">Log your hours and view your weekly activity.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setCurrentDate(subWeeks(currentDate, 1))}><ChevronLeft className="h-4 w-4"/></Button>
            <Button variant="outline" onClick={() => setCurrentDate(new Date())}>This Week</Button>
            <Button variant="outline" size="icon" onClick={() => setCurrentDate(addWeeks(currentDate, 1))}><ChevronRight className="h-4 w-4"/></Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Week of {format(weekInterval.start, 'MMMM d')} - {format(weekInterval.end, 'MMMM d, yyyy')}</CardTitle>
            <CardDescription>Total hours logged this week: <span className="font-bold text-primary">{totalHours}h</span></CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Daily Hours</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyBreakdown}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="hours" fill="hsl(var(--primary))" /></BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Project Breakdown</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={projectBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {projectBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value} hours`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Log New Time Entry</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Date</Label><Input type="date" defaultValue={format(new Date(), 'yyyy-MM-dd')} /></div>
              <div className="space-y-2"><Label>Project</Label><Select onValueChange={setSelectedProject}><SelectTrigger><SelectValue placeholder="Select a project" /></SelectTrigger><SelectContent>{projects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-2"><Label>Task</Label><Select disabled={!selectedProject}><SelectTrigger><SelectValue placeholder="Select a task" /></SelectTrigger><SelectContent>{tasks.filter(t => t.projectId === selectedProject).map(t => <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-2"><Label>Hours</Label><Input type="number" placeholder="e.g., 2.5" /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea placeholder="What did you work on?" /></div>
              <Button className="w-full"><Clock className="h-4 w-4 mr-2"/>Log Time</Button>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader><CardTitle>Weekly Entries</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Project</TableHead><TableHead>Task</TableHead><TableHead className="text-right">Hours</TableHead></TableRow></TableHeader>
                <TableBody>
                  {weeklyEntries.map(entry => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.projectName}</TableCell>
                      <TableCell>{entry.taskName}</TableCell>
                      <TableCell className="text-right font-medium">{entry.hours}h</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Paywall>
  );
};

export default MemberTimesheet;
