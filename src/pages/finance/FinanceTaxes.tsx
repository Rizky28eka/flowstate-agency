import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Calculator, AlertTriangle, CheckCircle } from "lucide-react";

const FinanceTaxes = () => {
  const taxPeriods = [
    {
      id: 1,
      period: "Q4 2024",
      type: "Quarterly",
      dueDate: "2025-01-31",
      status: "Pending",
      estimatedTax: 45000,
      preparedBy: "Tax Advisor"
    },
    {
      id: 2,
      period: "Q3 2024",
      type: "Quarterly",
      dueDate: "2024-10-31",
      status: "Filed",
      actualTax: 38500,
      filedDate: "2024-10-28"
    },
    {
      id: 3,
      period: "Q2 2024",
      type: "Quarterly",
      dueDate: "2024-07-31",
      status: "Filed",
      actualTax: 42000,
      filedDate: "2024-07-25"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Filed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-amber-100 text-amber-800";
      case "Overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Filed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Pending": return <Calendar className="w-4 h-4 text-amber-600" />;
      case "Overdue": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tax Management</h2>
        <Button>
          <Calculator className="w-4 h-4 mr-2" />
          Calculate Taxes
        </Button>
      </div>

      {/* Tax Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Tax Liability</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$165,500</div>
            <p className="text-xs text-muted-foreground">Estimated for 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxes Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$120,500</div>
            <p className="text-xs text-muted-foreground">Paid to date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Due</CardTitle>
            <Calendar className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">$45,000</div>
            <p className="text-xs text-muted-foreground">Due Jan 31, 2025</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Effective Rate</CardTitle>
            <Calculator className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">22.5%</div>
            <p className="text-xs text-muted-foreground">Current tax rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Tax Periods */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Filing Status</CardTitle>
          <CardDescription>Quarterly and annual tax filing status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taxPeriods.map((period) => (
              <div key={period.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(period.status)}
                    <div>
                      <h4 className="font-semibold">{period.period}</h4>
                      <p className="text-sm text-muted-foreground">{period.type} Filing</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(period.status)}>{period.status}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p className="font-medium">{new Date(period.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tax Amount</p>
                    <p className="font-medium">
                      ${(period.estimatedTax || period.actualTax).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Prepared By</p>
                    <p className="font-medium">{period.preparedBy || "Internal"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Filed Date</p>
                    <p className="font-medium">
                      {period.filedDate ? new Date(period.filedDate).toLocaleDateString() : "Not filed"}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  {period.status === "Filed" ? (
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3 mr-1" />
                      Download Return
                    </Button>
                  ) : (
                    <Button size="sm">
                      <FileText className="w-3 h-3 mr-1" />
                      Prepare Filing
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FinanceTaxes;