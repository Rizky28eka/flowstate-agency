
import { useParams } from "react-router-dom";
import { reports } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2, Calendar, User, FileText } from "lucide-react";

const OwnerReportDetail = () => {
  const { reportId } = useParams();
  const report = reports.find(r => r.id === reportId);

  if (!report) {
    return <div className="p-8">Report not found.</div>;
  }

  const renderFinancialData = (data) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Card>
            <CardHeader><CardTitle>Net Profit</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">${data.netProfit.toLocaleString()}</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Total Revenue</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">${data.totalRevenue.toLocaleString()}</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Total Expenses</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">${data.totalExpenses.toLocaleString()}</p></CardContent>
        </Card>
        <Card className="col-span-full">
            <CardHeader><CardTitle>Revenue by Department</CardTitle></CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {Object.entries(data.departmentBreakdown).map(([key, value]) => (
                        <li key={key} className="flex justify-between capitalize">
                            <span>{key}</span>
                            <span className="font-mono">${(value as number).toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    </div>
  );

  const renderResourceData = (data) => (
     <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Card>
            <CardHeader><CardTitle>Avg. Utilization</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">{data.averageUtilization}%</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Highest Utilization</CardTitle></CardHeader>
            <CardContent>
                <p className="text-xl font-bold">{data.highestUtilization.rate}%</p>
                <p className="text-sm text-muted-foreground">{data.highestUtilization.employee}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Lowest Utilization</CardTitle></CardHeader>
            <CardContent>
                <p className="text-xl font-bold">{data.lowestUtilization.rate}%</p>
                <p className="text-sm text-muted-foreground">{data.lowestUtilization.employee}</p>
            </CardContent>
        </Card>
    </div>
  );

  const renderClientData = (data) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Card>
            <CardHeader><CardTitle>Avg. Satisfaction</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">{data.averageSatisfaction} / 5.0</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Top Rated Client</CardTitle></CardHeader>
            <CardContent>
                <p className="text-xl font-bold">{data.topRatedClient.rating} / 5.0</p>
                <p className="text-sm text-muted-foreground">{data.topRatedClient.name}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Needs Improvement</CardTitle></CardHeader>
            <CardContent>
                <p className="text-xl font-bold">{data.improvementNeeded.rating} / 5.0</p>
                <p className="text-sm text-muted-foreground">{data.improvementNeeded.name}</p>
            </CardContent>
        </Card>
    </div>
  );

  const renderReportData = () => {
    switch(report.type) {
        case 'Financial': return renderFinancialData(report.data);
        case 'Resource': return renderResourceData(report.data);
        case 'Client': return renderClientData(report.data);
        default: return <p>No data visualization available for this report type.</p>
    }
  }

  return (
    <main className="flex-1 px-6 py-8 bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
        <div>
            <div className="flex items-center space-x-2 mb-1">
                <FileText className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">{report.title}</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground ml-10">
                <div className="flex items-center space-x-1">
                    <Badge variant="secondary">{report.type}</Badge>
                </div>
                <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{report.period}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Generated by {report.generatedBy}</span>
                </div>
            </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline"><Share2 className="w-4 h-4 mr-2"/> Share</Button>
            <Button variant="outline"><Printer className="w-4 h-4 mr-2"/> Print</Button>
            <Button><Download className="w-4 h-4 mr-2"/> Download PDF</Button>
        </div>
      </div>

      {/* Report Content */}
      <Card>
        <CardHeader>
            <CardTitle>Report Details</CardTitle>
            <CardDescription>Generated on {new Date(report.generatedDate).toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent>
            {renderReportData()}
        </CardContent>
      </Card>

    </main>
  );
};

export default OwnerReportDetail;
