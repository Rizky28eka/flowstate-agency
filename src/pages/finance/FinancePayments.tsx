import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CreditCard, Plus, CircleCheck as CheckCircle, Clock, TriangleAlert as AlertTriangle } from "lucide-react";

const FinancePayments = () => {
  const payments = [
    {
      id: "PAY-001",
      invoiceId: "INV-001",
      client: "TechCorp Inc.",
      amount: 15750,
      method: "Bank Transfer",
      status: "Completed",
      date: "2024-11-25",
      reference: "TXN-789456123"
    },
    {
      id: "PAY-002",
      invoiceId: "INV-002",
      client: "FinanceApp Ltd.",
      amount: 12600,
      method: "Credit Card",
      status: "Processing",
      date: "2024-12-08",
      reference: "TXN-789456124"
    },
    {
      id: "PAY-003",
      invoiceId: "INV-003",
      client: "HealthWell Group",
      amount: 18500,
      method: "ACH",
      status: "Pending",
      date: "2024-12-10",
      reference: "TXN-789456125"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-amber-100 text-amber-800";
      case "Failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Processing": return <Clock className="w-4 h-4 text-blue-600" />;
      case "Pending": return <Clock className="w-4 h-4 text-amber-600" />;
      case "Failed": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Payment Processing</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Process Payment
        </Button>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Processed</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${payments.filter(p => p.status === "Completed").reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${payments.filter(p => p.status === "Processing").reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">{payments.filter(p => p.status === "Processing").length} payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              ${payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">{payments.filter(p => p.status === "Pending").length} payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">98.5%</div>
            <p className="text-xs text-muted-foreground">Payment success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>All payment transactions and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Payment ID</th>
                  <th className="text-left p-3 font-medium">Client</th>
                  <th className="text-left p-3 font-medium">Amount</th>
                  <th className="text-left p-3 font-medium">Method</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Reference</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">{payment.id}</td>
                    <td className="p-3">{payment.client}</td>
                    <td className="p-3 font-medium">${payment.amount.toLocaleString()}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        <span>{payment.method}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(payment.status)}
                        <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                      </div>
                    </td>
                    <td className="p-3">{new Date(payment.date).toLocaleDateString()}</td>
                    <td className="p-3 font-mono text-sm">{payment.reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FinancePayments;