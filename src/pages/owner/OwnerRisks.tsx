import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TriangleAlert, ArrowRight, Plus, Bot, Sparkles, LoaderCircle } from "lucide-react";
import { risks as initialRisks, projects } from "@/lib/mock-data";
import { Link } from "react-router-dom";

// This is a hardcoded simulation of what a Gemini API call might return
const aiSuggestedRisksData = [
  {
    id: "AI-RSK-001",
    title: "Potential Timeline Slippage",
    description: "Project 'E-commerce Platform' (PRJ-002) shows only 25% progress but has a distant end date (2025-02-28). There is a risk of slow progress leading to a last-minute crunch or delay.",
    reasoning: "Low progress velocity relative to total project duration.",
    suggestedAction: "Review project velocity and resource allocation with the Project Manager.",
    projectId: "PRJ-002",
  },
  {
    id: "AI-RSK-002",
    title: "Budget Overrun Risk",
    description: "Project 'TechCorp Brand Redesign' (PRJ-001) has spent 75% of its budget ($33,750 of $45,000) but is only at 75% completion. Any unexpected work will lead to a budget overrun.",
    reasoning: "Budget consumption is directly proportional to progress, leaving no buffer.",
    suggestedAction: "Confirm with the client that no further scope changes are expected.",
    projectId: "PRJ-001",
  },
];

const AddRiskForm = ({ onAddRisk }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [impact, setImpact] = useState('Low');
  const [probability, setProbability] = useState('Low');

  const handleSubmit = () => {
    if (!title || !description) return;
    const newRisk = {
      id: `RSK-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      title,
      description,
      projectId,
      projectName: projects.find(p => p.id === projectId)?.name || 'N/A',
      status: 'New',
      impact,
      probability,
      score: (['Low', 'Medium', 'High'].indexOf(impact) + 1) * (['Low', 'Medium', 'High'].indexOf(probability) + 1) * 3,
      mitigationPlan: 'To be defined.',
      lastUpdate: new Date().toISOString().split('T')[0],
    };
    onAddRisk(newRisk);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">Title</Label>
        <Input id="title" value={title} onChange={e => setTitle(e.target.value)} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">Description</Label>
        <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="project" className="text-right">Project</Label>
        <Select onValueChange={setProjectId} defaultValue={projectId}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid items-center gap-2">
          <Label htmlFor="impact">Impact</Label>
          <Select onValueChange={setImpact} defaultValue={impact}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid items-center gap-2">
          <Label htmlFor="probability">Probability</Label>
          <Select onValueChange={setProbability} defaultValue={probability}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={handleSubmit}>Add Risk</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
};

const OwnerRisks = () => {
  const [activeRisks, setActiveRisks] = useState(initialRisks);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggested, setSuggested] = useState([]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setSuggested(aiSuggestedRisksData);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleAddRisk = (newRisk) => {
    setActiveRisks(prev => [newRisk, ...prev]);
  };

  const promoteRisk = (suggestedRisk) => {
    const newRisk = {
      id: `RSK-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      title: suggestedRisk.title,
      description: suggestedRisk.description,
      projectId: suggestedRisk.projectId,
      projectName: projects.find(p => p.id === suggestedRisk.projectId)?.name || 'N/A',
      status: 'New',
      impact: 'Medium', // Default impact
      probability: 'Medium', // Default probability
      score: 12, // Default score
      mitigationPlan: suggestedRisk.suggestedAction,
      lastUpdate: new Date().toISOString().split('T')[0],
    };
    handleAddRisk(newRisk);
    setSuggested(prev => prev.filter(s => s.id !== suggestedRisk.id));
  };

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
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Add New Risk</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Risk</DialogTitle>
            </DialogHeader>
            <AddRiskForm onAddRisk={handleAddRisk} />
          </DialogContent>
        </Dialog>
      </div>

      {/* AI Analysis Section */}
      <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center"><Bot className="w-6 h-6 mr-2 text-purple-600" />AI-Powered Risk Analysis</CardTitle>
          <CardDescription>Use Gemini to analyze all project data and uncover hidden risks.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleAnalyze} disabled={isAnalyzing || suggested.length > 0}>
            {isAnalyzing ? (
              <><LoaderCircle className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
            ) : (
              <><Sparkles className="w-4 h-4 mr-2" /> Analyze Potential Risks</>
            )}
          </Button>

          {suggested.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-4">AI Suggested Risks:</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {suggested.map(risk => (
                  <Card key={risk.id} className="shadow-lg">
                    <CardHeader><CardTitle className="text-base">{risk.title}</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{risk.description}</p>
                      <p className="text-xs italic text-gray-500"><b>Reasoning:</b> {risk.reasoning}</p>
                      <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => promoteRisk(risk)}>Promote to Active Risk</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Existing Risk Register */}
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
              {activeRisks.map((risk) => (
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