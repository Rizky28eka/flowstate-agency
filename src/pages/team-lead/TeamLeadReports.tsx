import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBar as BarChart3, Download, FileText, TrendingUp, Users, Clock } from "lucide-react";
import { teamMembers } from "@/lib/mock-data";

const TeamLeadReports = () => {
  const myTeam = teamMembers.filter(m => 
    m.department === "Creative Team" || 
    m.department === "Development Team"
  );

  const reports = [
    {
      id: 1,
      title: "Team Productivity Report",
      description: "Weekly productivity metrics and utilization rates",
      type: "Productivity",
      lastGenerated: "2024-12-08",
      frequency: "Weekly"
    },
    {
      id: 2,
      title: "Individual Performance Summary",
      description: "Performance metrics for each team member",
      type: "Performance",
      lastGenerated: "2024-12-01",
      frequency: "Monthly"
    },
    {
      id: 3,
      title: "Team Goal Progress",
      description: "Progress tracking for team objectives and KPIs",
      type: "Goals",
      lastGenerated: "2024-11-30",
      frequency: "Bi-weekly"
    },
    {
      id: 4,
      title: "Workload Distribution",
      description: "Analysis of task distribution and capacity planning",
      type: "Workload",
      lastGenerated: "2024-12-05",
      frequency: "Weekly"
    }
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Team Reports</h2>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Report Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Productivity</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(myTeam.reduce((sum, m) => sum + m.utilization, 0) / myTeam.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Average utilization</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Completion</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">94%</div>
            <p className="text-xs text-muted-foreground">On-time delivery</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Growth</CardTitle>
            <Users className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">+15%</div>
            <p className="text-xs text-muted-foreground">Skill improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
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

export default TeamLeadReports;