import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, FileText, DollarSign, TrendingUp } from "lucide-react";

const FinanceReports = () => {
  const financialReports = [
    {
      id: 1,
      title: "Profit & Loss Statement",
      description: "Comprehensive P&L analysis with revenue and expense breakdown",
      type: "P&L",
      lastGenerated: "2024-12-01",
      frequency: "Monthly"
    },
    {
      id: 2,
      title: "Cash Flow Statement",
      description: "Cash inflows and outflows analysis",
      type: "Cash Flow",
      lastGenerated: "2024-11-30",
      frequency: "Monthly"
    },
    {
      id: 3,
      title: "Budget vs Actual Report",
      description: "Comparison of budgeted vs actual expenses by department",
      type: "Budget",
      lastGenerated: "2024-12-05",
      frequency: "Weekly"
    },
    {
      id: 4,
      title: "Client Profitability Analysis",
      description: "Revenue and profit analysis by client and project",
      type: "Profitability",
      lastGenerated: "2024-11-28",
      frequency: "Quarterly"
    }
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Financial Reports</h2>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Custom Report
        </Button>
      </div>

      {/* Report Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialReports.length}</div>
            <p className="text-xs text-muted-foreground">Report types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly P&L</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$110K</div>
            <p className="text-xs text-muted-foreground">Net profit this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">36.7%</div>
            <p className="text-xs text-muted-foreground">Current margin</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {financialReports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{report.type}</Badge>
                <span className="text-sm text-muted-foreground">{report.frequency}</span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                </p>
                <Button variant="outline" size="sm">
                  <Download className="w-3 h-3 mr-1" />
                  Generate
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default FinanceReports;