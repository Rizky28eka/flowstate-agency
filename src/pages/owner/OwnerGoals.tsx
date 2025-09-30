import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Target, TrendingUp, DollarSign, Users } from "lucide-react";
import { goals as initialGoals } from "@/lib/mock-data";

const getStatus = (progress) => {
  if (progress < 50) return "Off Track";
  if (progress < 80) return "At Risk";
  return "On Track";
};

const getStatusColor = (status) => {
    if (status === "On Track") return "text-green-500";
    if (status === "At Risk") return "text-amber-500";
    if (status === "Off Track") return "text-red-500";
    return "text-muted-foreground";
}

const iconMap = {
  DollarSign,
  Users,
  TrendingUp,
  Target,
};

const AddGoalForm = ({ onAddGoal }) => {
  const [title, setTitle] = useState('');
  const [metric, setMetric] = useState('Revenue');
  const [target, setTarget] = useState(100000);
  const [owner, setOwner] = useState('Sales Team');

  const handleSubmit = () => {
    if (!title) return;
    const newGoal = {
      id: `G-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      title,
      metric,
      target,
      current: 0,
      owner,
      status: 'Off Track',
      icon: 'DollarSign',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
      progress: 0,
      milestones: [],
      comments: [],
    };
    onAddGoal(newGoal);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">Title</Label>
        <Input id="title" value={title} onChange={e => setTitle(e.target.value)} className="col-span-3" placeholder="e.g., Increase Q3 Revenue" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="owner" className="text-right">Owner</Label>
        <Input id="owner" value={owner} onChange={e => setOwner(e.target.value)} className="col-span-3" placeholder="e.g., Sales Team" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="metric" className="text-right">Metric</Label>
        <Select onValueChange={setMetric} defaultValue={metric}>
          <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Revenue">Revenue</SelectItem>
            <SelectItem value="Retention Rate">Retention Rate</SelectItem>
            <SelectItem value="Profit Margin">Profit Margin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="target" className="text-right">Target Value</Label>
        <Input id="target" type="number" value={target} onChange={e => setTarget(parseFloat(e.target.value))} className="col-span-3" />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={handleSubmit}>Add Goal</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
};

import { useOrganization } from "@/hooks/useOrganization";
import { Link } from "react-router-dom";
import { canCreate, getPlanFeatures } from "@/lib/SubscriptionManager";

const OwnerGoals = () => {
  const { plan } = useOrganization();
  const [goals, setGoals] = useState(initialGoals);

  const canAddGoal = canCreate(plan, 'goals', goals.length);

  const handleAddGoal = (newGoal) => {
    setGoals(prev => [newGoal, ...prev]);
  };

  const handleProgressChange = (goalId, newCurrent) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => {
        if (goal.id === goalId) {
          const newProgress = (newCurrent / goal.target) * 100;
          return { ...goal, current: newCurrent, progress: newProgress, status: getStatus(newProgress) };
        }
        return goal;
      })
    );
  };

  return (
    <main className="flex-1 px-6 py-8 bg-background">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Target className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Company Goals</h1>
            <p className="text-sm text-muted-foreground">Tracking progress for Q4 2025</p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={!canAddGoal}><Plus className="w-4 h-4 mr-2" /> Add New Goal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Company Goal</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new goal for the organization.
              </DialogDescription>
            </DialogHeader>
            <AddGoalForm onAddGoal={handleAddGoal} />
          </DialogContent>
        </Dialog>
      </div>

      {!canAddGoal && (
        <div className="text-sm text-red-500 mb-8">
          You have reached the maximum number of goals for the {plan} plan. 
          <Link to="/dashboard/owner/settings" className="underline">Upgrade your plan</Link> to add more goals.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const Icon = iconMap[goal.icon as keyof typeof iconMap] || Target;
          const formatValue = (value) => goal.metric === 'Revenue' ? `$${Math.round(value).toLocaleString()}` : `${Math.round(value)}%`;

          return (
            <Card key={goal.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle>{goal.title}</CardTitle>
                    </div>
                    <span className={`text-sm font-semibold ${getStatusColor(goal.status)}`}>{goal.status}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-bold">{formatValue(goal.current)}</span>
                        <span className="text-sm text-muted-foreground">Target: {formatValue(goal.target)}</span>
                    </div>
                    <Progress value={goal.progress} />
                    <div className="pt-4">
                      <Label className="text-xs text-muted-foreground">Update Progress</Label>
                      <Slider
                        value={[goal.current]}
                        max={goal.target}
                        step={goal.metric === 'Revenue' ? 1000 : 1}
                        onValueChange={(value) => handleProgressChange(goal.id, value[0])}
                      />
                    </div>
                </div>
                <div className="text-xs text-muted-foreground pt-4">
                  Owned by: <span className="font-medium text-foreground">{goal.owner}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default OwnerGoals;
