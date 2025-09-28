import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area } from "recharts";
import { TrendingUp, Sparkles, LoaderCircle, Bot } from "lucide-react";
import { monthlyRevenueData } from "@/lib/mock-data";

const OwnerForecasting = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [forecast, setForecast] = useState(null);
  const [aiSummary, setAiSummary] = useState("");

  const handleGenerateForecast = () => {
    setIsAnalyzing(true);
    setForecast(null);

    // Simulate AI analysis and prediction
    setTimeout(() => {
      const historicalData = monthlyRevenueData.slice(-6); // Use last 6 months for trend
      const n = historicalData.length;
      let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
      historicalData.forEach((point, i) => {
        sumX += i;
        sumY += point.revenue;
        sumXY += i * point.revenue;
        sumXX += i * i;
      });
      const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;

      // Generate 3 months of forecast data
      const nextMonths = ["Jan", "Feb", "Mar"]; // Assuming forecast starts after Dec
      const forecastData = [...Array(3)].map((_, i) => {
        const nextMonthIndex = n + i;
        const basePrediction = slope * nextMonthIndex + intercept;
        // Add some AI "variability" and confidence bands
        const prediction = basePrediction * (1 + (Math.random() - 0.5) * 0.1); // +/- 5% random variance
        return {
          month: `${nextMonths[i]} '25`,
          revenue: null, // Historical revenue is null
          predictedRevenue: Math.round(prediction),
          confidenceBand: [Math.round(prediction * 0.9), Math.round(prediction * 1.1)], // +/- 10% confidence
        };
      });

      const finalData = [
        ...monthlyRevenueData.map(d => ({...d, confidenceBand: [d.revenue, d.revenue], predictedRevenue: null})),
        ...forecastData,
      ];

      setForecast(finalData);

      // Generate AI Summary
      const lastMonthRevenue = historicalData[n-1].revenue;
      const firstPrediction = forecastData[0].predictedRevenue;
      const trendDirection = firstPrediction > lastMonthRevenue ? "upward" : "downward";
      setAiSummary(
        `Based on the ${trendDirection} trend from the last 6 months, revenue is projected to continue its path. ` +
        `I predict revenue for January 2025 to be around ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(firstPrediction)}. ` +
        `The 90% confidence interval suggests results will likely fall between ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(forecastData[0].confidenceBand[0])} and ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(forecastData[0].confidenceBand[1])}.`
      );

      setIsAnalyzing(false);
    }, 1500);
  };

  const chartData = forecast ? forecast : monthlyRevenueData.map(d => ({...d, confidenceBand: [d.revenue, d.revenue]}));

  return (
    <main className="flex-1 px-6 py-8 bg-background">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-primary" />
                <div>
                    <h1 className="text-2xl font-bold text-foreground">AI-Powered Forecasting</h1>
                    <p className="text-sm text-muted-foreground">Generate predictive revenue forecasts using AI</p>
                </div>
            </div>
             <Button onClick={handleGenerateForecast} disabled={isAnalyzing}>
              {isAnalyzing ? (
                <><LoaderCircle className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
              ) : (
                <><Sparkles className="w-4 h-4 mr-2" /> Generate AI Forecast</>
              )}
            </Button>
        </div>

        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Revenue & Profit Forecast</CardTitle>
                <CardDescription>Historical data and AI-powered projection for the next 3 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer className="h-96 w-full" config={{}}>
                    <ComposedChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} tickMargin={10} />
                        <YAxis tickLine={false} tickMargin={10} domain={['dataMin - 50000', 'dataMax + 50000']} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="revenue" fill="hsl(var(--primary) / 0.2)" name="Historical Revenue" />
                        <Line type="monotone" dataKey="profit" stroke="hsl(var(--secondary-foreground) / 0.5)" strokeWidth={2} name="Historical Profit" />
                        {forecast && (
                          <>
                            <Area type="monotone" dataKey="confidenceBand" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} strokeOpacity={0.4} name="90% Confidence Interval" />
                            <Line type="monotone" dataKey="predictedRevenue" stroke="#82ca9d" strokeWidth={3} name="Predicted Revenue" />
                          </>
                        )}
                    </ComposedChart>
                </ChartContainer>
            </CardContent>
        </Card>

        {aiSummary && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-base">
                <Bot className="w-5 h-5 mr-2 text-blue-700" />
                Gemini Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-900">{aiSummary}</p>
            </CardContent>
          </Card>
        )}
    </main>
  );
};

export default OwnerForecasting;
