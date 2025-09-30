
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plug, Settings, Plus } from "lucide-react";
import { integrations } from "@/lib/mock-data";

import Paywall from "@/components/Paywall";

const OwnerIntegrations = () => {
  return (
    <Paywall 
      feature="integrations"
      featureName="Integrations"
      features={[
        "Connect with your favorite business tools",
        "Automate workflows between apps",
        "Sync data across your software stack",
      ]}>
      <main className="flex-1 px-6 py-8 bg-background">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Plug className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
              <p className="text-sm text-muted-foreground">Connect with your favorite business tools</p>
            </div>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Integration
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <Card key={integration.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{integration.name}</CardTitle>
                  <Badge variant={integration.status === "Connected" ? "default" : "secondary"}>
                    {integration.status}
                  </Badge>
                </div>
                <CardDescription>{integration.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    {integration.status === "Connected" ? "Manage" : "Connect"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </Paywall>
  );
};

export default OwnerIntegrations;
