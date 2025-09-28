
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";
import { monthlyRevenueData } from "@/lib/mock-data";

// Dummy historical data
const historicalData = monthlyRevenueData.map(item => ({ month: item.month, revenue: item.revenue, profit: item.revenue * 0.5 }));

// Simple linear regression for forecasting
const linearRegression = (data) => {
  const n = data.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  data.forEach((point, i) => {
    sumX += i;
    sumY += point.revenue;
    sumXY += i * point.revenue;
    sumXX += i * i;
  });
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
};

const { slope, intercept } = linearRegression(historicalData);

const forecastData = [
    ...historicalData,
    ...[...Array(3)].map((_, i) => {
        const nextMonthIndex = historicalData.length + i;
        const nextMonthRevenue = slope * nextMonthIndex + intercept;
        const nextMonthProfit = nextMonthRevenue * 0.7; // Assuming profit margin remains constant
        return { month: `Jul+${i}`, revenue: nextMonthRevenue, profit: nextMonthProfit, forecast: true };
    })
];

const OwnerForecasting = () => {
  return (
    <main className="flex-1 px-6 py-8 bg-background">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-primary" />
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Financial Forecasting</h1>
                    <p className="text-sm text-muted-foreground">Projected revenue and profit for the next 3 months</p>
                </div>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Revenue & Profit Forecast</CardTitle>
                <CardDescription>Based on historical data from the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer className="h-96 w-full" config={{}}>
                    <ComposedChart data={forecastData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} tickMargin={10} />
                        <YAxis tickLine={false} tickMargin={10} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="revenue" fill="hsl(var(--primary) / 0.3)" name="Revenue" />
                        <Line type="monotone" dataKey="profit" stroke="hsl(var(--primary))" strokeWidth={2} name="Profit" />
                        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeDasharray="5 5" name="Forecasted Revenue" />
                    </ComposedChart>
                </ChartContainer>
            </CardContent>
        </Card>
    </main>
  );
};

export default OwnerForecasting;
