
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, TrendingUp, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { goals } from "@/lib/mock-data";

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

const OwnerGoals = () => {
  return (
    <main className="flex-1 px-6 py-8 overflow-auto bg-muted/20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Target className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Company Goals</h1>
            <p className="text-sm text-muted-foreground">Tracking progress for Q4 2025</p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          const Icon = iconMap[goal.icon as keyof typeof iconMap] || Target;
          return (
            <Link to={`/goals/${goal.id}`} key={goal.id}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
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
              <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-bold">{goal.metric === "Revenue" ? `$${goal.current.toLocaleString()}` : `${goal.current}%`}</span>
                        <span className="text-sm text-muted-foreground">Target: {goal.metric === "Revenue" ? `$${goal.target.toLocaleString()}` : `${goal.target}%`}</span>
                    </div>
                    <Progress value={progress} />
                </div>
                <div className="text-xs text-muted-foreground">
                  Owned by: <span className="font-medium text-foreground">{goal.owner}</span>
                </div>
              </CardContent>
            </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default OwnerGoals;
