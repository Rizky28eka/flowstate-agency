import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Plus, Trash2 } from "lucide-react";
import { projects, clients, teamMembers } from "@/lib/mock-data";

interface Alert {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const OwnerAlerts = () => {
  const initialAlerts: Alert[] = [
    ...projects
      .filter((p) => {
        const budget = Number(p.budget);
        const spent = Number(p.spent);
        return budget > 0 && spent / budget > 0.9;
      })
      .map((p) => ({
        id: `project-budget-${p.id}`,
        title: `Project Over Budget: ${p.name}`,
        description: `Budget: ${p.budget}, Spent: ${p.spent}`,
        enabled: true,
      })),
    ...clients
      .filter((c) => Number(c.satisfaction) < 3.5 || c.status === "Churned")
      .map((c) => ({
        id: `client-${c.id}`,
        title: `Client Churn Risk: ${c.name}`,
        description: `Satisfaction: ${Number(c.satisfaction).toFixed(1)}/5.0, Status: ${c.status}`,
        enabled: true,
      })),
    ...teamMembers
      .filter((m) => Number(m.utilization) < 50)
      .map((m) => ({
        id: `team-low-util-${m.id}`,
        title: `Low Team Utilization: ${m.name}`,
        description: `Utilization: ${m.utilization}%`,
        enabled: false,
      })),
    ...teamMembers
      .filter((m) => Number(m.utilization) > 95)
      .map((m) => ({
        id: `team-high-util-${m.id}`,
        title: `High Burnout Risk: ${m.name}`,
        description: `Utilization: ${m.utilization}%`,
        enabled: true,
      })),
  ];

  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const toggleAlert = (id: string, checked: boolean) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, enabled: checked } : alert
      )
    );
  };

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <main className="flex-1 px-6 py-8 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Bell className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Custom Alerts</h1>
            <p className="text-sm text-muted-foreground">
              Manage your notification preferences
            </p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create New Alert
        </Button>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Configuration</CardTitle>
          <CardDescription>
            Enable or disable alerts and configure their thresholds.
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="py-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold">{alert.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {alert.description}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Switch
                  checked={alert.enabled}
                  onCheckedChange={(checked) => toggleAlert(alert.id, checked)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteAlert(alert.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
};

export default OwnerAlerts;