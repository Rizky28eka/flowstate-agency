
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Users, TrendingUp, Target, Edit, CheckCircle, MessageSquare } from "lucide-react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { goals } from "@/lib/mock-data";

const iconMap = {
  DollarSign,
  Users,
  TrendingUp,
  Target,
};

const getStatusColor = (status) => {
    if (status === "On Track") return "text-green-500";
    if (status === "At Risk") return "text-amber-500";
    if (status === "Off Track") return "text-red-500";
    return "text-muted-foreground";
}

const OwnerGoalDetail = () => {
  const { goalId } = useParams();
  const goal = goals.find(g => g.id === goalId);

  if (!goal) {
    return <main className="flex-1 px-6 py-8 bg-background">Goal not found.</main>;
  }

  const progress = (goal.current / goal.target) * 100;
  const Icon = iconMap[goal.icon as keyof typeof iconMap] || Target;

  return (
    <main className="flex-1 px-6 py-8 bg-background">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Icon className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">{goal.title}</h1>
            <p className="text-sm text-muted-foreground">Goal owned by {goal.owner}</p>
          </div>
        </div>
        <Button variant="outline">
          <Edit className="w-4 h-4 mr-2" />
          Edit Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Goal Overview</CardTitle>
            <CardDescription>Current status and progress towards the goal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                    <span className="text-4xl font-bold">{goal.metric === "Revenue" ? `$${goal.current.toLocaleString()}` : `${goal.current}%`}</span>
                    <span className="text-lg text-muted-foreground">Target: {goal.metric === "Revenue" ? `$${goal.target.toLocaleString()}` : `${goal.target}%`}</span>
                </div>
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-muted-foreground">{progress.toFixed(1)}% of target achieved</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className={`font-semibold ${getStatusColor(goal.status)}`}>{goal.status}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <p className="font-semibold">{goal.owner}</p>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Key Milestones</h3>
                <div className="space-y-3">
                    {goal.milestones.map(milestone => (
                        <div key={milestone.id} className="flex items-center space-x-3">
                            <CheckCircle className={`w-5 h-5 ${milestone.completed ? "text-green-500" : "text-muted-foreground"}`} />
                            <p className={milestone.completed ? "line-through text-muted-foreground" : "text-foreground"}>{milestone.description}</p>
                        </div>
                    ))}
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Updates & Comments</CardTitle>
            <CardDescription>Recent activity and discussions on this goal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {goal.comments.map(comment => (
                <div key={comment.id} className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8"><AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                    <div>
                        <p className="font-medium">{comment.author} <span className="text-xs text-muted-foreground">on {comment.date}</span></p>
                        <p className="text-sm text-muted-foreground">{comment.text}</p>
                    </div>
                </div>
            ))}
            <Button variant="outline" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Comment
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default OwnerGoalDetail;
