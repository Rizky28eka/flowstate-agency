import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, Plus, TrendingUp, Users, Award } from "lucide-react";

const TeamLeadGoals = () => {
  const teamGoals = [
    {
      id: 1,
      title: "Increase Team Productivity by 15%",
      description: "Improve overall team efficiency and output quality",
      progress: 78,
      target: 100,
      deadline: "2024-12-31",
      owner: "Team Lead",
      status: "On Track"
    },
    {
      id: 2,
      title: "Reduce Project Delivery Time",
      description: "Streamline workflows to deliver projects 20% faster",
      progress: 45,
      target: 100,
      deadline: "2025-01-15",
      owner: "Team Lead",
      status: "In Progress"
    },
    {
      id: 3,
      title: "Improve Code Quality Score",
      description: "Achieve 95% code quality score across all projects",
      progress: 82,
      target: 100,
      deadline: "2024-12-20",
      owner: "Development Team",
      status: "On Track"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track": return "text-green-600";
      case "In Progress": return "text-blue-600";
      case "At Risk": return "text-amber-600";
      case "Delayed": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Team Goals</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Set New Goal
        </Button>
      </div>

      {/* Goal Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamGoals.length}</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Track</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {teamGoals.filter(g => g.status === "On Track").length}
            </div>
            <p className="text-xs text-muted-foreground">Goals progressing well</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <Award className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(teamGoals.reduce((sum, g) => sum + g.progress, 0) / teamGoals.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Engagement</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">94%</div>
            <p className="text-xs text-muted-foreground">Goal participation</p>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamGoals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{goal.title}</CardTitle>
                <span className={`text-sm font-semibold ${getStatusColor(goal.status)}`}>
                  {goal.status}
                </span>
              </div>
              <CardDescription>{goal.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Owner</p>
                  <p className="font-medium">{goal.owner}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Deadline</p>
                  <p className="font-medium">{new Date(goal.deadline).toLocaleDateString()}</p>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TeamLeadGoals;