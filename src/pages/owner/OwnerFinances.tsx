
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, TrendingUp, TrendingDown, Landmark, Download, Filter, FileText, Banknote, Scale, PieChart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Line, ComposedChart, Pie, Cell } from "recharts";
import { Progress } from "@/components/ui/progress";
import { monthlyRevenueData, expenses } from "@/lib/mock-data";

const pnlData = monthlyRevenueData.map(item => ({
  month: item.month,
  revenue: item.revenue,
  expenses: item.expenses,
  profit: item.profit,
}));

const cashFlowData = monthlyRevenueData.map(item => ({
    month: item.month,
    cashIn: item.revenue * 0.9, // Assuming 90% cash in from revenue
    cashOut: item.expenses * 1.1, // Assuming cash out is 110% of expenses
    net: (item.revenue * 0.9) - (item.expenses * 1.1),
}));

const expenseCategories = expenses.reduce((acc, expense) => {
  if (!acc[expense.category]) {
    acc[expense.category] = { name: expense.category, value: 0, color: `hsl(var(--primary) / ${1 - (Object.keys(acc).length * 0.2)})` };
  }
  acc[expense.category].value += expense.amount;
  return acc;
}, {});

const expenseData = Object.values(expenseCategories);

const OwnerFinances = () => {
  const [timeRange, setTimeRange] = useState("30d");

  const totalNetProfit = pnlData.reduce((sum, item) => sum + item.profit, 0);
  const totalExpenses = pnlData.reduce((sum, item) => sum + item.expenses, 0);
  const overallProfitMargin = (totalNetProfit / pnlData.reduce((sum, item) => sum + item.revenue, 0) * 100).toFixed(1);
  const totalCashFlow = cashFlowData.reduce((sum, item) => sum + item.net, 0);

  return (
    <main className="flex-1 px-6 py-8 overflow-auto bg-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <DollarSign className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Financial Overview</h1>
            <p className="text-sm text-muted-foreground">Monitor and manage company finances</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalNetProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{overallProfitMargin}%</div>
            <p className="text-xs text-muted-foreground">+4.3% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Flow</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCashFlow.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Healthy cash reserves</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pnl" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pnl">Profit & Loss</TabsTrigger>
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow Statement</TabsTrigger>
          <TabsTrigger value="expenses">Expense Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="pnl" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Profit & Loss Trend</CardTitle>
                <CardDescription>Monthly revenue, expenses, and profit analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-96 w-full" config={{}}>
                  <ComposedChart data={pnlData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} tickMargin={10} />
                    <YAxis tickLine={false} tickMargin={10} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="hsl(var(--primary) / 0.3)" radius={4} name="Revenue" />
                    <Bar dataKey="expenses" fill="hsl(var(--destructive) / 0.3)" radius={4} name="Expenses" />
                    <Line type="monotone" dataKey="profit" stroke="hsl(var(--primary))" strokeWidth={2} name="Profit" />
                  </ComposedChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>P&L Summary</CardTitle>
                <CardDescription>For the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Gross Revenue</span>
                    <span className="font-bold text-green-600">${pnlData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Operating Expenses</span>
                    <span className="font-bold text-red-600">(${pnlData.reduce((sum, item) => sum + item.expenses, 0).toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Operating Income</span>
                    <span className="font-bold">${pnlData.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Taxes (20%)</span>
                    <span className="font-bold text-red-600">(${(pnlData.reduce((sum, item) => sum + item.profit, 0) * 0.2).toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                    <span className="font-medium text-lg">Net Profit</span>
                    <span className="font-bold text-lg text-green-600">${(pnlData.reduce((sum, item) => sum + item.profit, 0) * 0.8).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="balance-sheet" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Balance Sheet</CardTitle>
              <CardDescription>As of {new Date().toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Assets */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center"><Banknote className="w-5 h-5 mr-2"/>Assets</h3>
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between"><span className="text-muted-foreground">Cash & Equivalents</span> <span>$128,921</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Accounts Receivable</span> <span>$58,340</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Inventory</span> <span>$24,000</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Prepaid Expenses</span> <span>$12,500</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Fixed Assets</span> <span>$78,900</span></div>
                    <Separator />
                    <div className="flex justify-between font-bold"><span className="text-lg">Total Assets</span> <span className="text-lg">$302,661</span></div>
                  </div>
                </div>

                {/* Liabilities & Equity */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center"><Scale className="w-5 h-5 mr-2"/>Liabilities & Equity</h3>
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between"><span className="text-muted-foreground">Accounts Payable</span> <span>$24,800</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Accrued Expenses</span> <span>$9,750</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Short-term Loans</span> <span>$15,000</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Long-term Debt</span> <span>$50,000</span></div>
                    <Separator />
                    <div className="flex justify-between font-bold"><span>Total Liabilities</span> <span>$99,550</span></div>
                    <Separator />
                    <div className="flex justify-between"><span className="text-muted-foreground">Owner's Equity</span> <span>$150,000</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Retained Earnings</span> <span>$53,111</span></div>
                    <div className="flex justify-between font-bold"><span>Total Equity</span> <span>$203,111</span></div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg"><span>Total Liabilities & Equity</span> <span>$302,661</span></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash-flow" className="space-y-6">
           <Card>
            <CardHeader>
              <CardTitle>Cash Flow Statement</CardTitle>
              <CardDescription>For the selected period</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer className="h-96 w-full" config={{}}>
                    <ComposedChart data={cashFlowData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} tickMargin={10} />
                        <YAxis tickLine={false} tickMargin={10} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="cashIn" fill="hsl(var(--primary) / 0.5)" radius={4} name="Cash In" />
                        <Bar dataKey="cashOut" fill="hsl(var(--destructive) / 0.5)" radius={4} name="Cash Out" />
                        <Line type="monotone" dataKey="net" stroke="hsl(var(--primary))" strokeWidth={2} name="Net Cash Flow" />
                    </ComposedChart>
                </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Categorical spending analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-96 w-full" config={{}}>
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                            {expenseData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Expense Categories</CardTitle>
                <CardDescription>For the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Salaries & Wages", amount: "$25,500", percentage: 60 },
                    { category: "Software & Subscriptions", amount: "$5,800", percentage: 14 },
                    { category: "Office & Utilities", amount: "$4,200", percentage: 10 },
                    { category: "Marketing & Advertising", amount: "$3,500", percentage: 8 },
                    { category: "Other", amount: "$3,150", percentage: 8 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                            <span className="font-medium">{item.category}</span>
                            <span className="text-muted-foreground">{item.amount}</span>
                        </div>
                        <Progress value={item.percentage} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default OwnerFinances;
