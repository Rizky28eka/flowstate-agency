
import { useParams, Link } from "react-router-dom";
import { risks } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Shield, Activity, AlertTriangle, User, ListChecks, ArrowRight } from "lucide-react";

const OwnerRiskDetail = () => {
  const { riskId } = useParams();
  const risk = risks.find(r => r.id === riskId);

  if (!risk) {
    return <div className="p-8">Risk not found.</div>;
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-amber-100 text-amber-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-amber-100 text-amber-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-red-100 text-red-800";
      case "Mitigated": return "bg-green-100 text-green-800";
      case "New": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="flex-1 px-6 py-8 bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
        <div className="space-y-1">
            <div className="flex items-center space-x-2">
                <AlertTriangle className="w-8 h-8 text-destructive" />
                <h1 className="text-3xl font-bold text-foreground">{risk.title}</h1>
            </div>
            <p className="text-muted-foreground ml-10">Last updated on {new Date(risk.lastUpdate).toLocaleDateString()}</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline"><Edit className="w-4 h-4 mr-2"/> Edit Risk</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{risk.score}</div>
            <p className="text-xs text-muted-foreground">Impact x Probability</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={getStatusColor(risk.status)}>{risk.status}</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={getImpactColor(risk.impact)}>{risk.impact}</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Probability</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={getProbabilityColor(risk.probability)}>{risk.probability}</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader><CardTitle>Risk Description</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">{risk.description}</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="flex items-center"><ListChecks className="w-5 h-5 mr-2"/> Mitigation Plan</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">{risk.mitigationPlan}</p></CardContent>
            </Card>
        </div>

        <div className="space-y-8">
            <Card>
                <CardHeader><CardTitle>Details</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground flex items-center"><User className="w-4 h-4 mr-2"/> Owner</span>
                        <span className="font-medium">{risk.owner}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground flex items-center"><Shield className="w-4 h-4 mr-2"/> Project</span>
                        <Link to={`/dashboard/owner/projects/${risk.projectId}`} className="font-medium text-primary hover:underline flex items-center">
                            {risk.projectName} <ArrowRight className="w-4 h-4 ml-1"/>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
};

export default OwnerRiskDetail;
