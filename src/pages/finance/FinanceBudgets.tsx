import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartPie as PieChart, Plus, TrendingUp, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from "lucide-react";
import { departments } from "@/lib/mock-data";

const FinanceBudgets = () => {
  const budgets = departments.map(dept => ({
    ...dept,
    budgetUsed: (parseFloat(dept.spent.replace(/[^0-9.-]+/g,"")) / parseFloat(dept.budget.replace(/[^0-9.-]+/g,""))) * 100
  }));

return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Budget Planning</h2>
        <Button className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Create Budget
        </Button>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Budget</CardTitle>
            <PieChart className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">
              ${budgets.reduce((sum, b) => sum + parseFloat(b.budget.replace(/[^0-9.-]+/g, "")), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Annual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Spent</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">
              ${budgets.reduce((sum, b) => sum + parseFloat(b.spent.replace(/[^0-9.-]+/g, "")), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((budgets.reduce((sum, b) => sum + parseFloat(b.spent.replace(/[^0-9.-]+/g, "")), 0) / budgets.reduce((sum, b) => sum + parseFloat(b.budget.replace(/[^0-9.-]+/g, "")), 0)) * 100)}% used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">On Track</CardTitle>
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold text-green-600">
              {budgets.filter(b => b.budgetUsed <= 80).length}
            </div>
            <p className="text-xs text-muted-foreground">Depts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Over Budget</CardTitle>
            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold text-red-600">
              {budgets.filter(b => b.budgetUsed > 100).length}
            </div>
            <p className="text-xs text-muted-foreground">Depts</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Budgets */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Department Budgets</CardTitle>
          <CardDescription>Budget allocation and spending by department</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-6">
            {budgets.map((budget) => (
              <div key={budget.id} className="space-y-3">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{budget.name}</h4>
                    <p className="text-sm text-muted-foreground truncate">{budget.description}</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <p className="font-bold text-sm sm:text-base">{budget.spent} / {budget.budget}</p>
                    <p className={`text-xs sm:text-sm ${
                      budget.budgetUsed > 100 ? 'text-red-600' :
                      budget.budgetUsed > 80 ? 'text-amber-600' :
                      'text-green-600'
                    }`}>
                      {budget.budgetUsed.toFixed(1)}% used
                    </p>
                  </div>
                </div>
                <Progress 
                  value={Math.min(budget.budgetUsed, 100)} 
                  className={budget.budgetUsed > 100 ? "bg-red-100" : ""}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{budget.members} team members</span>
                  <span>{budget.projects} active projects</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FinanceBudgets;