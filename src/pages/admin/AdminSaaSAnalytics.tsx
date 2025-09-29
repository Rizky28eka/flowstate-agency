import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import {
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Pie, 
  PieChart, 
  Cell 
} from "recharts"
import { 
  DollarSign, 
  Users, 
  Building2, 
  TrendingDown, 
  TrendingUp, 
  CircleDot 
} from "lucide-react"
import { 
  MOCK_SAAS_METRICS, 
  MOCK_MONTHLY_GROWTH, 
  MOCK_PLAN_DISTRIBUTION, 
  MOCK_RECENT_ACTIVITY 
} from "@/lib/saas-analytics"

const iconMap = {
  mrr: DollarSign,
  active_users: Users,
  active_tenants: Building2,
  churn_rate: TrendingDown,
};

const AdminSaaSAnalytics = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">SaaS Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          An overview of your platform's business performance.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-3 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        {MOCK_SAAS_METRICS.map((metric) => {
          const Icon = iconMap[metric.id as keyof typeof iconMap] || CircleDot;
          const ChangeIcon = metric.changeType === 'increase' ? TrendingUp : TrendingDown;
          return (
            <Card key={metric.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium">{metric.label}</CardTitle>
                <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-lg sm:text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground flex items-center flex-wrap">
                  <ChangeIcon className={`h-3 w-3 mr-1 shrink-0 ${metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`} />
                  {metric.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* MRR Growth Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">MRR Growth (YTD)</CardTitle>
            <CardDescription>Monthly Recurring Revenue growth for the current year.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] sm:h-[300px] w-full">
              <BarChart data={MOCK_MONTHLY_GROWTH.filter(d => d.mrr > 0)} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickFormatter={(value) => `Rp${Number(value) / 1000000}jt`} tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="mrr" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Plan Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Plan Distribution</CardTitle>
            <CardDescription>Number of customers per subscription plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] sm:h-[300px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={MOCK_PLAN_DISTRIBUTION} dataKey="customerCount" nameKey="planName" cx="50%" cy="50%" outerRadius={100} label>
                  {MOCK_PLAN_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fillColor} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
          <CardDescription>Latest signups, upgrades, and cancellations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Type</TableHead>
                  <TableHead className="text-xs sm:text-sm">Description</TableHead>
                  <TableHead className="text-right text-xs sm:text-sm">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_RECENT_ACTIVITY.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="p-2 sm:p-4">
                      <Badge variant={activity.type === 'New Signup' ? 'default' : (activity.type === 'Plan Upgrade' ? 'secondary' : 'destructive')} className="text-xs">
                        {activity.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="p-2 sm:p-4 text-sm">{activity.description}</TableCell>
                    <TableCell className="text-right text-muted-foreground p-2 sm:p-4 text-xs sm:text-sm">{activity.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSaaSAnalytics;
