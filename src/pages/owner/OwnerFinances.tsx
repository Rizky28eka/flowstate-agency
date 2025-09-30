import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DollarSign, TrendingUp, TrendingDown, Landmark, Download, Filter, FileText, Banknote, Scale, PieChart, Calendar as CalendarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Line, ComposedChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { Progress } from "@/components/ui/progress";
import { monthlyRevenueData, expenses as allExpenses } from "@/lib/mock-data";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

const OwnerFinances = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 31),
  });

  // Memoized filtered data based on date range
  const filteredData = useMemo(() => {
    if (!date?.from || !date?.to) return { pnlData: [], cashFlowData: [], expenseData: [] };

    const pnlData = monthlyRevenueData.filter(item => {
        const monthIndex = new Date(Date.parse(item.month +" 1, 2024")).getMonth();
        return monthIndex >= date.from.getMonth() && monthIndex <= date.to.getMonth();
    });

    const cashFlowData = pnlData.map(item => ({
        month: item.month,
        cashIn: item.revenue * 0.9,
        cashOut: item.expenses * 1.1,
        net: (item.revenue * 0.9) - (item.expenses * 1.1),
    }));

    const expenseCategories = allExpenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
            acc[expense.category] = { name: expense.category, value: 0, color: `hsl(var(--primary) / ${1 - (Object.keys(acc).length * 0.2)})` };
        }
        acc[expense.category].value += expense.amount;
        return acc;
    }, {});

    return { pnlData, cashFlowData, expenseData: Object.values(expenseCategories) };
  }, [date]);

  const { pnlData, cashFlowData, expenseData } = filteredData;

  const summary = useMemo(() => ({
    totalNetProfit: pnlData.reduce((sum, item) => sum + item.profit, 0),
    totalExpenses: pnlData.reduce((sum, item) => sum + item.expenses, 0),
    overallProfitMargin: (pnlData.reduce((sum, item) => sum + item.profit, 0) / pnlData.reduce((sum, item) => sum + item.revenue, 0) * 100).toFixed(1),
    totalCashFlow: cashFlowData.reduce((sum, item) => sum + item.net, 0),
  }), [pnlData, cashFlowData]);

  return (
    <main className="flex-1 px-6 py-8 bg-background">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold">Financial Overview</h1><p className="text-sm text-muted-foreground">Monitor and manage company finances</p></div>
        <div className="flex space-x-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-[280px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (date.to ? <>{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}</> : format(date.from, "LLL dd, y")) : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0"><Calendar mode="range" selected={date} onSelect={setDate} numberOfMonths={2} /></PopoverContent>
            </Popover>
          <Button><Download className="w-4 h-4 mr-2" />Export Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Net Profit</CardTitle><DollarSign className="h-4 w-4 text-green-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">${summary.totalNetProfit.toLocaleString()}</div><p className="text-xs text-muted-foreground">+15.2% from last period</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Expenses</CardTitle><TrendingDown className="h-4 w-4 text-red-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">${summary.totalExpenses.toLocaleString()}</div><p className="text-xs text-muted-foreground">+8.1% from last period</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Profit Margin</CardTitle><TrendingUp className="h-4 w-4 text-blue-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-blue-600">{summary.overallProfitMargin}%</div><p className="text-xs text-muted-foreground">+4.3% improvement</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Cash Flow</CardTitle><Landmark className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">${summary.totalCashFlow.toLocaleString()}</div><p className="text-xs text-muted-foreground">Net cash movement</p></CardContent></Card>
      </div>

      <Tabs defaultValue="pnl" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4"><TabsTrigger value="pnl">Profit & Loss</TabsTrigger><TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger><TabsTrigger value="cash-flow">Cash Flow</TabsTrigger><TabsTrigger value="expenses">Expenses</TabsTrigger></TabsList>
        
        <TabsContent value="pnl">
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss</CardTitle>
              <CardDescription>Monthly revenue, expenses, and profit.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-96 w-full" config={{}}>
                <ComposedChart data={pnlData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} tickLine={false} tickMargin={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="revenue" fill="hsl(var(--primary) / 0.5)" radius={4} name="Revenue" />
                  <Bar dataKey="expenses" fill="hsl(var(--destructive) / 0.5)" radius={4} name="Expenses" />
                  <Line type="monotone" dataKey="profit" stroke="hsl(var(--primary))" strokeWidth={2} name="Profit" />
                </ComposedChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="balance-sheet"><Card><CardHeader><CardTitle>Balance Sheet</CardTitle></CardHeader><CardContent><p>Balance Sheet view is under construction.</p></CardContent></Card></TabsContent>
        <TabsContent value="cash-flow">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow</CardTitle>
              <CardDescription>Monthly cash in vs. cash out.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-96 w-full" config={{}}>
                <BarChart data={cashFlowData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} tickLine={false} tickMargin={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="cashIn" fill="hsl(var(--primary) / 0.7)" radius={4} name="Cash In" />
                  <Bar dataKey="cashOut" fill="hsl(var(--destructive) / 0.7)" radius={4} name="Cash Out" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Expenses by category for the selected period.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-96">
                <ChartContainer config={{}} className="w-full h-full">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="space-y-4 self-center">
                {expenseData.map(item => (
                  <div key={item.name} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="font-mono">${item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default OwnerFinances;
