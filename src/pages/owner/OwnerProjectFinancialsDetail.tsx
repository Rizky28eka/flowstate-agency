import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFinancialsForProject, ProjectFinancials } from '@/lib/profitability';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Scale, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const OwnerProjectFinancialsDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const financials = useMemo(() => 
    projectId ? getFinancialsForProject(projectId) : null
  , [projectId]);

  useEffect(() => {
    if (!financials) {
      // Optional: redirect if project not found after a delay, in case of slow fetch
      // For now, we rely on the loading state.
    }
  }, [financials, navigate]);

  if (!financials) {
    return <div>Loading project financials...</div>; // Or a skeleton loader
  }

  const kpiData = [
    { title: 'Total Revenue', value: formatCurrency(financials.totalRevenue), icon: DollarSign },
    { title: 'Total Costs', value: formatCurrency(financials.totalCosts), icon: Scale },
    { title: 'Net Profit', value: formatCurrency(financials.netProfit), icon: financials.netProfit >= 0 ? TrendingUp : TrendingDown, isProfit: true },
    { title: 'Profit Margin', value: `${financials.profitMargin.toFixed(1)}%`, icon: TrendingUp, isMargin: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/owner/profitability')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{financials.projectName}</h1>
          <p className="text-muted-foreground">Financial deep dive for project with {financials.clientName}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={cn("h-4 w-4 text-muted-foreground", 
                kpi.isProfit && (financials.netProfit < 0 && 'text-red-500'),
                kpi.isMargin && (financials.profitMargin < 10 ? 'text-red-500' : financials.profitMargin < 25 ? 'text-yellow-500' : 'text-green-500')
              )} />
            </CardHeader>
            <CardContent>
              <div className={cn("text-2xl font-bold", 
                kpi.isProfit && (financials.netProfit < 0 && 'text-red-500'),
                kpi.isMargin && (financials.profitMargin < 10 ? 'text-red-500' : financials.profitMargin < 25 ? 'text-yellow-500' : 'text-green-500')
              )}>{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Budget vs Actual */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Budget vs. Actual Costs</CardTitle>
            <CardDescription>Tracking project costs against the allocated budget.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Budget Usage</span>
                <span className={cn(financials.budgetUsage > 100 && "font-bold text-destructive")}>{financials.budgetUsage.toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(financials.budgetUsage, 100)} className="h-3" />
            </div>
            <div className="text-sm space-y-2 pt-2">
              <div className="flex justify-between"><span>Allocated Budget:</span> <span className="font-medium">{formatCurrency(financials.budget)}</span></div>
              <div className="flex justify-between"><span>Actual Costs:</span> <span className="font-medium">{formatCurrency(financials.totalCosts)}</span></div>
              <div className={cn("flex justify-between font-medium", financials.totalCosts > financials.budget ? "text-destructive" : "text-green-600")}>
                <span>{financials.totalCosts > financials.budget ? 'Over Budget By:' : 'Remaining Budget:'}</span>
                <span>{formatCurrency(Math.abs(financials.budget - financials.totalCosts))}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>All invoices associated with this project.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {financials.revenueItems.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.description}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell><Badge variant={item.status === 'Paid' ? 'default' : 'secondary'}>{item.status}</Badge></TableCell>
                    <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
          <CardDescription>All billable time and direct expenses for this project.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {financials.costItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.description}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell><Badge variant="outline">{item.type}</Badge></TableCell>
                  <TableCell className="text-right">{formatCurrency(item.cost)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerProjectFinancialsDetail;
