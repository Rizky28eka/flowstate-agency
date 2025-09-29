import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '@/lib/mock-data';
import { getFinancialsForProject, ProjectFinancials } from '@/lib/profitability';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { DollarSign, TrendingUp, TrendingDown, Search, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const ProfitabilityRow = ({ project }: { project: ProjectFinancials & { status: string } }) => {
  const navigate = useNavigate();
  const marginColor = project.profitMargin > 25 ? 'text-green-500' : project.profitMargin > 10 ? 'text-yellow-500' : 'text-red-500';

  return (
    <TableRow 
      className="cursor-pointer"
      onClick={() => navigate(`/dashboard/owner/profitability/${project.projectId}`)}
    >
      <TableCell>
        <div className="font-medium">{project.projectName}</div>
        <div className="text-xs text-muted-foreground">{project.clientName}</div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={project.status === 'Completed' ? 'secondary' : 'default'}>{project.status}</Badge>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className={cn("font-medium", marginColor)}>{project.profitMargin.toFixed(1)}%</span>
          <Progress value={project.profitMargin} className="h-1 mt-1 w-24" />
        </div>
      </TableCell>
      <TableCell className={cn("hidden sm:table-cell font-medium text-right", project.netProfit < 0 && "text-red-500")}>
        {formatCurrency(project.netProfit)}
      </TableCell>
      <TableCell className="hidden lg:table-cell text-right">{formatCurrency(project.totalRevenue)}</TableCell>
      <TableCell className="hidden lg:table-cell text-right">{formatCurrency(project.totalCosts)}</TableCell>
    </TableRow>
  );
};

const OwnerProfitability = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const allProjectFinancials = useMemo(() => {
    return projects
      .map(p => {
        const financials = getFinancialsForProject(p.id);
        return financials ? { ...financials, status: p.status } : null;
      })
      .filter((p): p is ProjectFinancials & { status: string } => p !== null);
  }, []);

  const filteredProjects = useMemo(() => {
    return allProjectFinancials.filter(p => {
      const searchMatch = p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || p.clientName.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === 'all' || p.status === statusFilter;
      return searchMatch && statusMatch;
    });
  }, [allProjectFinancials, searchTerm, statusFilter]);

  const portfolioStats = useMemo(() => {
    const totalRevenue = allProjectFinancials.reduce((sum, p) => sum + p.totalRevenue, 0);
    const totalCosts = allProjectFinancials.reduce((sum, p) => sum + p.totalCosts, 0);
    const netProfit = totalRevenue - totalCosts;
    const avgMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    return { totalRevenue, totalCosts, netProfit, avgMargin };
  }, [allProjectFinancials]);

  const kpiData = [
    { title: 'Total Portfolio Revenue', value: formatCurrency(portfolioStats.totalRevenue), icon: DollarSign },
    { title: 'Total Portfolio Costs', value: formatCurrency(portfolioStats.totalCosts), icon: Scale },
    { title: 'Overall Net Profit', value: formatCurrency(portfolioStats.netProfit), icon: portfolioStats.netProfit >= 0 ? TrendingUp : TrendingDown },
    { title: 'Average Profit Margin', value: `${portfolioStats.avgMargin.toFixed(1)}%`, icon: TrendingUp },
  ];

  const projectStatuses = ['In Progress', 'Planning', 'Review', 'Completed'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Project Profitability</h1>
        <p className="text-muted-foreground">Analyze the financial performance of your projects.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Projects Overview</CardTitle>
            <CardDescription>Financial summary for each project. Click a row for details.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search project or client..." 
                className="pl-8 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {projectStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead>Profit Margin</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Net Profit</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Revenue</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Costs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map(p => <ProfitabilityRow key={p.projectId} project={p} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerProfitability;