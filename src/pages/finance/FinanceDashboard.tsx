import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Receipt, CreditCard, AlertTriangle, Calendar } from "lucide-react";
import { invoices, expenses, monthlyRevenueData } from "@/lib/mock-data";

const FinanceDashboard = () => {
  const totalRevenue = monthlyRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingInvoices = invoices.filter(inv => inv.status === "Pending");
  const overdueInvoices = invoices.filter(inv => inv.status === "Pending" && new Date(inv.dueDate) < new Date());

  return (
    <>
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / 12).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <Receipt className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{pendingInvoices.length} unpaid invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">-3.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${((totalRevenue / 12) - totalExpenses).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15.3% margin</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Latest billing and payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.slice(0, 5).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-muted-foreground">{invoice.clientName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${invoice.amount.toLocaleString()}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Alerts</CardTitle>
            <CardDescription>Important financial notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overdueInvoices.length > 0 && (
                <div className="flex items-start space-x-3 p-3 border border-red-200 rounded-lg bg-red-50">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-red-800">Overdue Invoices</p>
                    <p className="text-sm text-red-600">{overdueInvoices.length} invoices are overdue</p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3 p-3 border border-amber-200 rounded-lg bg-amber-50">
                <Calendar className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-amber-800">Payment Due</p>
                  <p className="text-sm text-amber-600">Software subscription due in 3 days</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 border border-blue-200 rounded-lg bg-blue-50">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-blue-800">Monthly Report Ready</p>
                  <p className="text-sm text-blue-600">November financial report available</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FinanceDashboard;