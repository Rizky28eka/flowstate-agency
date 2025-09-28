import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, CreditCard, Receipt, AlertTriangle, Calendar } from "lucide-react";

const DashboardFinance = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Finance Dashboard</h1>
                <p className="text-sm text-muted-foreground">Financial management & reporting</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Generate Report</Button>
              <Button>Create Invoice</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$47,826</div>
              <p className="text-xs text-muted-foreground">+8.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              <Receipt className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,340</div>
              <p className="text-xs text-muted-foreground">7 unpaid invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <CreditCard className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$18,567</div>
              <p className="text-xs text-muted-foreground">-3.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$29,259</div>
              <p className="text-xs text-muted-foreground">+15.3% margin</p>
            </CardContent>
          </Card>
        </div>

        {/* Financial Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Latest billing and payment status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { invoice: "INV-2024-001", client: "TechCorp Inc.", amount: "$8,500", status: "Paid", date: "Dec 8" },
                  { invoice: "INV-2024-002", client: "StartupXYZ", amount: "$5,200", status: "Overdue", date: "Nov 25" },
                  { invoice: "INV-2024-003", client: "RetailBrand", amount: "$12,800", status: "Pending", date: "Dec 5" },
                  { invoice: "INV-2024-004", client: "FinanceApp", amount: "$6,750", status: "Sent", date: "Dec 9" }
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{invoice.invoice}</p>
                      <p className="text-sm text-muted-foreground">{invoice.client} • {invoice.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{invoice.amount}</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' :
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

          <Card>
            <CardHeader>
              <CardTitle>Expense Tracking</CardTitle>
              <CardDescription>Monthly expense breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Software & Tools", amount: "$3,450", percentage: "18.6%", trend: "+2.1%" },
                  { category: "Office Rent", amount: "$4,200", percentage: "22.6%", trend: "0%" },
                  { category: "Marketing", amount: "$2,800", percentage: "15.1%", trend: "+8.3%" },
                  { category: "Utilities", amount: "$1,200", percentage: "6.5%", trend: "-1.2%" },
                  { category: "Professional Services", amount: "$6,917", percentage: "37.2%", trend: "+12.4%" }
                ].map((expense, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{expense.category}</h4>
                      <span className="text-sm font-medium">{expense.amount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{expense.percentage} of total</span>
                      <span className={`text-sm ${
                        expense.trend.startsWith('+') ? 'text-red-600' : 
                        expense.trend.startsWith('-') ? 'text-green-600' : 
                        'text-muted-foreground'
                      }`}>
                        {expense.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Alerts */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Financial Alerts</CardTitle>
              <CardDescription>Important financial notifications and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 border border-red-200 rounded-lg bg-red-50">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-red-800">Overdue Invoice Alert</p>
                    <p className="text-sm text-red-600">Invoice INV-2024-002 ($5,200) is 14 days overdue from StartupXYZ</p>
                  </div>
                  <Button variant="outline" size="sm">Follow Up</Button>
                </div>

                <div className="flex items-start space-x-3 p-3 border border-amber-200 rounded-lg bg-amber-50">
                  <Calendar className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-amber-800">Payment Due Reminder</p>
                    <p className="text-sm text-amber-600">Software subscription ($450) due in 3 days</p>
                  </div>
                  <Button variant="outline" size="sm">Schedule Payment</Button>
                </div>

                <div className="flex items-start space-x-3 p-3 border border-blue-200 rounded-lg bg-blue-50">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-blue-800">Monthly Report Ready</p>
                    <p className="text-sm text-blue-600">November financial report is ready for review</p>
                  </div>
                  <Button variant="outline" size="sm">View Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardFinance;