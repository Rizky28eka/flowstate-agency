import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Target, TrendingUp, Calendar, Award, Clock, CircleCheck as CheckCircle } from "lucide-react";
import { teamMembers, projects } from "@/lib/mock-data";

const TeamLeadDashboard = () => {
  const myTeam = teamMembers.filter(m => 
    m.department === "Creative Team" || 
    m.department === "Development Team"
  );

  const teamProjects = projects.filter(p => 
    myTeam.some(member => p.team.includes(member.name))
  );

  const avgUtilization = Math.round(myTeam.reduce((sum, m) => sum + m.utilization, 0) / myTeam.length);
  const avgRating = (myTeam.reduce((sum, m) => sum + m.rating, 0) / myTeam.length).toFixed(1);

  return (
    <>
      {/* Team Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myTeam.length}</div>
            <p className="text-xs text-muted-foreground">Direct reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{avgUtilization}%</div>
            <p className="text-xs text-muted-foreground">Team productivity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Rating</CardTitle>
            <Award className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{avgRating}</div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamProjects.length}</div>
            <p className="text-xs text-muted-foreground">Team involvement</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Individual team member productivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myTeam.map((member) => (
                <div key={member.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{member.name}</span>
                    <span className={`font-bold ${
                      member.utilization > 90 ? 'text-red-600' : 
                      member.utilization > 75 ? 'text-green-600' : 
                      'text-amber-600'
                    }`}>
                      {member.utilization}%
                    </span>
                  </div>
                  <Progress value={member.utilization} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{member.role}</span>
                    <span>{member.projects} projects</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Team Goals</CardTitle>
            <CardDescription>Current quarter objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Increase Team Productivity</h4>
                  <span className="text-sm font-bold text-green-600">92%</span>
                </div>
                <Progress value={92} />
                <p className="text-xs text-muted-foreground mt-2">Target: 90% average utilization</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Improve Code Quality</h4>
                  <span className="text-sm font-bold text-blue-600">78%</span>
                </div>
                <Progress value={78} />
                <p className="text-xs text-muted-foreground mt-2">Target: Reduce bugs by 25%</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Team Satisfaction</h4>
                  <span className="text-sm font-bold text-purple-600">85%</span>
                </div>
                <Progress value={85} />
                <p className="text-xs text-muted-foreground mt-2">Target: 4.5/5.0 rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TeamLeadDashboard;