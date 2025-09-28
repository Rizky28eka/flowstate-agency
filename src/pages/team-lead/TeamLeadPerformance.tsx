import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, Award, Clock, Target, FileText, Calendar } from "lucide-react";
import { teamMembers } from "@/lib/mock-data";

const TeamLeadPerformance = () => {
  const myTeam = teamMembers.filter(m => 
    m.department === "Creative Team" || 
    m.department === "Development Team"
  );

  const performanceReviews = [
    {
      id: 1,
      employeeId: 1,
      employeeName: "Sarah Wilson",
      period: "Q4 2024",
      status: "Completed",
      overallScore: 4.8,
      nextReview: "2025-03-01"
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: "Mike Johnson",
      period: "Q4 2024",
      status: "Scheduled",
      overallScore: null,
      nextReview: "2024-12-15"
    },
    {
      id: 3,
      employeeId: 5,
      employeeName: "Lisa Chen",
      period: "Q4 2024",
      status: "In Progress",
      overallScore: null,
      nextReview: "2024-12-12"
    }
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Performance Reviews</h2>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Schedule Review
        </Button>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Due</CardTitle>
            <Calendar className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">2</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Team Score</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">4.6</div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">+12%</div>
            <p className="text-xs text-muted-foreground">From last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Achievement</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">89%</div>
            <p className="text-xs text-muted-foreground">Goals met on time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance Overview</CardTitle>
            <CardDescription>Current performance metrics for each team member</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myTeam.map((member) => (
                <div key={member.id} className="border rounded-lg p-4">
                  <div className="flex items-center space-x-4 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{member.rating}</p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Utilization</span>
                      <span>{member.utilization}%</span>
                    </div>
                    <Progress value={member.utilization} />
                  </div>

                  <div className="flex justify-between text-sm mt-3">
                    <span>Active Projects: {member.projects}</span>
                    <Button variant="outline" size="sm">
                      Review Performance
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Reviews</CardTitle>
            <CardDescription>Scheduled and completed performance evaluations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceReviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{review.employeeName}</h4>
                      <p className="text-sm text-muted-foreground">{review.period}</p>
                    </div>
                    <Badge variant={
                      review.status === "Completed" ? "default" :
                      review.status === "Scheduled" ? "secondary" :
                      "outline"
                    }>
                      {review.status}
                    </Badge>
                  </div>

                  {review.overallScore && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Score</span>
                        <span className="font-bold">{review.overallScore}/5.0</span>
                      </div>
                      <Progress value={review.overallScore * 20} />
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      Next review: {new Date(review.nextReview).toLocaleDateString()}
                    </p>
                    <Button variant="outline" size="sm">
                      {review.status === "Completed" ? "View Report" : "Conduct Review"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TeamLeadPerformance;