
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { projects, timeEntries, expenses, teamMembers } from '@/lib/mock-data';
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';

// Helper to parse currency string to number
const parseCurrency = (currencyStr) => {
  if (!currencyStr) return 0;
  return parseFloat(currencyStr.replace(/[^\d.-]/g, ''));
};

// Calculate profitability data
const calculateProfitability = () => {
  const profitabilityData = projects.map(project => {
    const projectTimeEntries = timeEntries.filter(t => t.projectId === project.id);
    const projectExpenses = expenses.filter(e => e.projectId === project.id && e.billable);

    const laborCost = projectTimeEntries.reduce((total, entry) => {
      const member = teamMembers.find(m => m.id === entry.employeeId);
      if (!member) return total;
      const hourlyRate = parseCurrency(member.salary) / 2080; // Assuming 2080 work hours/year
      return total + (entry.hours * hourlyRate);
    }, 0);

    const expenseCost = projectExpenses.reduce((total, expense) => total + expense.amount, 0);
    const totalCost = laborCost + expenseCost;
    const totalRevenue = parseCurrency(project.budget);
    const profit = totalRevenue - totalCost;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    return {
      ...project,
      totalRevenue,
      totalCost,
      profit,
      margin,
    };
  });

  return profitabilityData;
};

const profitabilityDetails = calculateProfitability();

const totalProfit = profitabilityDetails.reduce((sum, p) => sum + p.profit, 0);
const averageMargin = profitabilityDetails.reduce((sum, p) => sum + p.margin, 0) / profitabilityDetails.length;
const mostProfitable = profitabilityDetails.reduce((max, p) => p.profit > max.profit ? p : max, profitabilityDetails[0]);
const leastProfitable = profitabilityDetails.reduce((min, p) => p.profit < min.profit ? p : min, profitabilityDetails[0]);

const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {change && <p className="text-xs text-muted-foreground">{change}</p>}
    </CardContent>
  </Card>
);

const OwnerProfitability = () => {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-2">Profitability Analysis</h1>
      <p className="text-gray-500 mb-8">Analyze profit and margin for each project to identify key performers.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard 
          title="Total Profit"
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalProfit)}
          icon={DollarSign}
          change="+15.3%"
          changeType="positive"
        />
        <StatCard 
          title="Average Margin"
          value={`${averageMargin.toFixed(2)}%`}
          icon={Percent}
          change="+2.4%"
          changeType="positive"
        />
        <StatCard 
          title="Most Profitable Project"
          value={mostProfitable.name}
          icon={TrendingUp}
          change={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(mostProfitable.profit)}
          changeType="positive"
        />
        <StatCard 
          title="Least Profitable Project"
          value={leastProfitable.name}
          icon={TrendingDown}
          change={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(leastProfitable.profit)}
          changeType="negative"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Profitability Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Profit</TableHead>
                <TableHead className="text-right">Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profitabilityDetails.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p.totalRevenue)}</TableCell>
                  <TableCell className="text-right text-red-600">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p.totalCost)}</TableCell>
                  <TableCell className={`text-right font-bold ${p.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p.profit)}
                  </TableCell>
                  <TableCell className={`text-right font-bold ${p.margin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {p.margin.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerProfitability;
