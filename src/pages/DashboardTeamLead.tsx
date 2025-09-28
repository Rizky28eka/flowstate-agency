import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, MessageSquare, Calendar, Trophy, Clock } from "lucide-react";
import { RoleSidebar } from "@/components/RoleSidebar";
import { useState } from "react";

const DashboardTeamLead = () => {
  const [currentPath, setCurrentPath] = useState("/dashboard/team-lead");

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    console.log("Navigate to:", path);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <RoleSidebar 
        role="TEAM_LEAD" 
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Team Lead Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Team management & coordination</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">Team Meeting</Button>
                <Button>Performance Review</Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8 overflow-auto">
        {/* Team Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2 remote, 6 in-office</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goals Achieved</CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">This quarter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3h</div>
              <p className="text-xs text-muted-foreground">-15% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Satisfaction</CardTitle>
              <Trophy className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.6/5</div>
              <p className="text-xs text-muted-foreground">Latest survey</p>
            </CardContent>
          </Card>
        </div>

        {/* Team Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Current team status and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Alex Chen", role: "Senior Designer", status: "Available", workload: "75%", lastActive: "Just now" },
                  { name: "Maria Lopez", role: "Frontend Developer", status: "In Meeting", workload: "90%", lastActive: "30 min ago" },
                  { name: "David Kim", role: "UX Researcher", status: "Focused", workload: "60%", lastActive: "5 min ago" },
                  { name: "Sophie Turner", role: "Content Writer", status: "Available", workload: "80%", lastActive: "2 min ago" },
                  { name: "James Wilson", role: "Motion Designer", status: "Away", workload: "70%", lastActive: "1 hour ago" }
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        member.status === 'Available' ? 'bg-green-500' :
                        member.status === 'In Meeting' ? 'bg-red-500' :
                        member.status === 'Focused' ? 'bg-amber-500' :
                        'bg-gray-400'
                      }`}></div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{member.workload}</p>
                      <p className="text-xs text-muted-foreground">{member.lastActive}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Goals & Tasks</CardTitle>
              <CardDescription>Current objectives and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Q4 Design System</h4>
                    <span className="text-sm text-primary font-medium">85%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 mb-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Due Dec 31 • 3 team members</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">User Research Phase 2</h4>
                    <span className="text-sm text-primary font-medium">60%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 mb-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Due Jan 15 • 2 team members</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Brand Guidelines Update</h4>
                    <span className="text-sm text-primary font-medium">95%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 mb-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Due Dec 20 • 4 team members</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communication Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Team Communication</CardTitle>
              <CardDescription>Recent updates and announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "announcement", author: "You", message: "Team standup moved to 10 AM tomorrow", time: "2 hours ago" },
                  { type: "update", author: "Alex Chen", message: "Completed wireframes for mobile app", time: "4 hours ago" },
                  { type: "question", author: "Maria Lopez", message: "Need feedback on the new component library", time: "6 hours ago" },
                  { type: "achievement", author: "David Kim", message: "User testing results are in - 95% satisfaction!", time: "1 day ago" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <MessageSquare className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{item.author}</span>
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardTeamLead;