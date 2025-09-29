import { useMemo } from 'react';
import { getBudgetVsActuals, BudgetItem } from '@/lib/budget';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const BudgetRow = ({ item }: { item: BudgetItem }) => {
  const performance = item.budgetedAmount > 0 ? (item.actualAmount / item.budgetedAmount) * 100 : 100;
  const isRevenue = item.category === 'Revenue';
  const isOverBudget = item.variance > 0;

  let varianceColor = 'text-muted-foreground';
  if (isRevenue) {
    varianceColor = isOverBudget ? 'text-green-500' : 'text-red-500';
  } else {
    varianceColor = isOverBudget ? 'text-red-500' : 'text-green-500';
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{item.category}</TableCell>
      <TableCell className="text-right">{formatCurrency(item.budgetedAmount)}</TableCell>
      <TableCell className="text-right">{formatCurrency(item.actualAmount)}</TableCell>
      <TableCell className={`text-right font-medium ${varianceColor}`}>{formatCurrency(item.variance)}</TableCell>
      <TableCell>
        <Progress value={Math.min(performance, 100)} className="h-2" />
      </TableCell>
    </TableRow>
  );
};

const FinanceBudgets = () => {
  const budgetData = useMemo(() => getBudgetVsActuals(), []);

  const totals = useMemo(() => {
    const totalBudgeted = budgetData.filter(i => i.category !== 'Revenue').reduce((s, i) => s + i.budgetedAmount, 0);
    const totalActual = budgetData.filter(i => i.category !== 'Revenue').reduce((s, i) => s + i.actualAmount, 0);
    const netVariance = totalActual - totalBudgeted;
    return { totalBudgeted, totalActual, netVariance };
  }, [budgetData]);

  const kpiData = [
    { title: 'Total Budgeted Costs', value: formatCurrency(totals.totalBudgeted), icon: DollarSign },
    { title: 'Total Actual Costs', value: formatCurrency(totals.totalActual), icon: DollarSign },
    { title: 'Net Cost Variance', value: formatCurrency(totals.netVariance), icon: totals.netVariance > 0 ? TrendingDown : TrendingUp, critical: totals.netVariance > 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Budget vs. Actuals</h1>
        <p className="text-muted-foreground">Analyze company-wide financial performance against the budget.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {kpiData.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={cn("h-4 w-4 text-muted-foreground", kpi.critical && "text-destructive")} />
            </CardHeader>
            <CardContent>
              <div className={cn("text-2xl font-bold", kpi.critical && "text-destructive")}>{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Breakdown</CardTitle>
          <CardDescription>Comparison of budgeted vs. actual amounts for each category.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Budgeted</TableHead>
                <TableHead className="text-right">Actual</TableHead>
                <TableHead className="text-right">Variance</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetData.map(item => <BudgetRow key={item.category} item={item} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceBudgets;
