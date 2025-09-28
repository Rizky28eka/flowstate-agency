import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TriangleAlert, ArrowRight, Plus } from "lucide-react";
import { risks } from "@/lib/mock-data";
import { Link } from "react-router-dom";

const OwnerRisks = () => {

  const getImpactColor = (impact: string) => {
    switch (impact) {
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
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <TriangleAlert className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Risk Management</h1>
            <p className="text-sm text-muted-foreground">Identifying and mitigating potential business risks</p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add New Risk
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Risk Register</CardTitle>
          <CardDescription>List of all identified risks across projects and operations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk Title</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.map((risk) => (
                <TableRow key={risk.id}>
                  <TableCell className="font-medium">{risk.title}</TableCell>
                  <TableCell>{risk.projectName}</TableCell>
                  <TableCell><Badge className={getStatusColor(risk.status)}>{risk.status}</Badge></TableCell>
                  <TableCell><Badge className={getImpactColor(risk.impact)}>{risk.impact}</Badge></TableCell>
                  <TableCell><Badge className={getImpactColor(risk.probability)}>{risk.probability}</Badge></TableCell>
                  <TableCell className="font-semibold">{risk.score}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/dashboard/owner/risks/${risk.id}`}>View Details <ArrowRight className="w-4 h-4 ml-2"/></Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
};

export default OwnerRisks;