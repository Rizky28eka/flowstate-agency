import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, CheckSquare, Clock, Star, FileText, Calendar } from "lucide-react";
import { RoleSidebar } from "@/components/RoleSidebar";
import { useState } from "react";

const DashboardMember = () => {
  const [currentPath, setCurrentPath] = useState("/dashboard/member");

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    console.log("Navigate to:", path);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <RoleSidebar 
        role="MEMBER" 
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
                <Code className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Member Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Your workspace & tasks</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">Time Tracker</Button>
                <Button>Submit Work</Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8 overflow-auto">
        {/* Personal Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Tasks</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">3 due this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Star className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Logged</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Performance</CardTitle>
              <Star className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Work Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>Current assignments and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { task: "Design mobile onboarding", project: "FinanceApp", priority: "High", due: "Dec 12", status: "In Progress" },
                  { task: "Update component library", project: "Design System", priority: "Medium", due: "Dec 15", status: "Not Started" },
                  { task: "Create landing page mockups", project: "TechCorp Rebrand", priority: "High", due: "Dec 10", status: "Review" },
                  { task: "User testing documentation", project: "E-commerce App", priority: "Low", due: "Dec 20", status: "In Progress" }
                ].map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{item.task}</h4>
                        <p className="text-sm text-muted-foreground">{item.project}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.priority === 'High' ? 'bg-red-100 text-red-800' :
                          item.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">Due {item.due}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'Review' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your work updates and submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Submitted wireframes", project: "Mobile App", time: "2 hours ago", type: "submit" },
                  { action: "Updated design files", project: "Website Redesign", time: "5 hours ago", type: "update" },
                  { action: "Completed user research", project: "E-commerce", time: "1 day ago", type: "complete" },
                  { action: "Started new task", project: "Brand Guidelines", time: "2 days ago", type: "start" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'submit' ? 'bg-green-500' :
                      activity.type === 'update' ? 'bg-blue-500' :
                      activity.type === 'complete' ? 'bg-purple-500' :
                      'bg-amber-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.project} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resources Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Resources & Tools</CardTitle>
              <CardDescription>Quick access to commonly used resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                  <FileText className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-medium">Brand Guidelines</h4>
                  <p className="text-sm text-muted-foreground">Current brand standards</p>
                </div>
                
                <div className="border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                  <Code className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-medium">Design System</h4>
                  <p className="text-sm text-muted-foreground">Component library & styles</p>
                </div>
                
                <div className="border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                  <Calendar className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-medium">Team Calendar</h4>
                  <p className="text-sm text-muted-foreground">Meetings & deadlines</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardMember;