import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Plus, Trash2 } from "lucide-react";
import { projects, clients, teamMembers } from "@/lib/mock-data";

const OwnerAlerts = () => {
  const dynamicAlerts = [
    ...projects.filter(p => (p.spent / p.budget) > 0.9).map(p => ({
      id: `project-budget-${p.id}`,
      title: `Project Over Budget: ${p.name}`,
      description: `Budget: ${p.budget}, Spent: ${p.spent}`,
      enabled: true,
    })),
    ...clients.filter(c => c.satisfaction < 3.5 || c.status === "Churned").map(c => ({
      id: `client-${c.id}`,
      title: `Client Churn Risk: ${c.name}`,
      description: `Satisfaction: ${c.satisfaction}/5.0, status: ${c.status}`,
      enabled: true,
    })),
    ...teamMembers.filter(m => m.utilization < 50).map(m => ({
      id: `team-low-util-${m.id}`,
      title: `Low Team Utilization: ${m.name}`,
      description: `Utilization: ${m.utilization}%`,
      enabled: false,
    })),
    ...teamMembers.filter(m => m.utilization > 95).map(m => ({
      id: `team-high-util-${m.id}`,
      title: `High Burnout Risk: ${m.name}`,
      description: `Utilization: ${m.utilization}%`,
      enabled: true,
    })),
  ];
  return (
    <main className="flex-1 px-6 py-8 overflow-auto bg-muted/20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Bell className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Custom Alerts</h1>
            <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create New Alert
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alert Configuration</CardTitle>
          <CardDescription>Enable or disable alerts and configure their thresholds.</CardDescription>
        </CardHeader>
        <CardContent className="divide-y">
          {dynamicAlerts.map((alert) => (
            <div key={alert.id} className="py-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{alert.title}</h3>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Switch defaultChecked={alert.enabled} />
                <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4"/></Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
};

export default OwnerAlerts;
