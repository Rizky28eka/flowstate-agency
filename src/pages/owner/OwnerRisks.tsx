
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TriangleAlert, ArrowRight, TrendingDown, UserX, FolderX } from "lucide-react";
import { projects, clients, teamMembers } from "@/lib/mock-data";

const getRiskColor = (level: string) => {
  switch (level) {
    case "High":
      return "text-red-500";
    case "Medium":
      return "text-amber-500";
    case "Low":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

const OwnerRisks = () => {
  const projectsAtRisk = projects.filter(p => p.progress < 50 && p.status !== "Completed").map(p => ({
    id: p.id,
    name: p.name,
    issue: `${p.progress}% progress, status: ${p.status}`,
    level: p.progress < 30 ? "High" : "Medium",
    action: "Review project status",
  }));

  const clientsAtRisk = clients.filter(c => c.satisfaction < 4.0 || c.status === "Churned").map(c => ({
    id: c.id,
    name: c.name,
    issue: `Satisfaction: ${c.satisfaction}/5.0, status: ${c.status}`,
    level: c.satisfaction < 3.0 || c.status === "Churned" ? "High" : "Medium",
    action: "Contact client",
  }));

  const teamHealthRisks = teamMembers.filter(m => m.utilization > 90 || m.utilization < 60).map(m => ({
    id: m.id,
    name: m.name,
    issue: `Utilization: ${m.utilization}%`,
    level: m.utilization > 95 || m.utilization < 50 ? "High" : "Medium",
    action: "Adjust workload",
  }));

  const risks = {
    projects: projectsAtRisk,
    clients: clientsAtRisk,
    team: teamHealthRisks,
  };
  return (
    <main className="flex-1 px-6 py-8 overflow-auto bg-muted/20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <TriangleAlert className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Risk Management</h1>
            <p className="text-sm text-muted-foreground">Identifying and mitigating potential business risks</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Projects at Risk */}
        <Card className="border-l-4 border-red-500">
          <CardHeader>
            <div className="flex items-center space-x-3">
                <FolderX className="w-6 h-6 text-red-500"/>
                <CardTitle>Projects at Risk</CardTitle>
            </div>
            <CardDescription>Projects requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {risks.projects.map(risk => (
                <div key={risk.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                        <p className="font-semibold">{risk.name}</p>
                        <p className={`text-sm ${getRiskColor(risk.level)}`}>{risk.issue}</p>
                    </div>
                    <Button variant="outline" size="sm">{risk.action} <ArrowRight className="w-4 h-4 ml-2"/></Button>
                </div>
            ))}
          </CardContent>
        </Card>

        {/* Clients at Risk */}
        <Card className="border-l-4 border-amber-500">
          <CardHeader>
            <div className="flex items-center space-x-3">
                <UserX className="w-6 h-6 text-amber-500"/>
                <CardTitle>Clients at Risk</CardTitle>
            </div>
            <CardDescription>Clients with low satisfaction or engagement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {risks.clients.map(risk => (
                <div key={risk.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                        <p className="font-semibold">{risk.name}</p>
                        <p className={`text-sm ${getRiskColor(risk.level)}`}>{risk.issue}</p>
                    </div>
                    <Button variant="outline" size="sm">{risk.action} <ArrowRight className="w-4 h-4 ml-2"/></Button>
                </div>
            ))}
          </CardContent>
        </Card>

        {/* Team Health Risks */}
        <Card className="border-l-4 border-blue-500">
          <CardHeader>
            <div className="flex items-center space-x-3">
                <TrendingDown className="w-6 h-6 text-blue-500"/>
                <CardTitle>Team Health Risks</CardTitle>
            </div>
            <CardDescription>Potential burnout or low utilization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {risks.team.map(risk => (
                <div key={risk.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                        <p className="font-semibold">{risk.name}</p>
                        <p className={`text-sm ${getRiskColor(risk.level)}`}>{risk.issue}</p>
                    </div>
                    <Button variant="outline" size="sm">{risk.action} <ArrowRight className="w-4 h-4 ml-2"/></Button>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default OwnerRisks;
