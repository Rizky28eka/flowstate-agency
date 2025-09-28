import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Eye, MessageCircle, Download, Clock, CheckCircle2 } from "lucide-react";

const DashboardClient = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Handshake className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Client Portal</h1>
                <p className="text-sm text-muted-foreground">Track your projects & collaborate</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">New Request</Button>
              <Button>Contact Team</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Project Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">In development</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Awaiting feedback</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Unread</p>
            </CardContent>
          </Card>
        </div>

        {/* Project Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Projects</CardTitle>
              <CardDescription>Current project status and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Website Redesign", status: "In Progress", progress: 75, phase: "Development", nextDelivery: "Dec 15" },
                  { name: "Brand Identity", status: "Review", progress: 90, phase: "Final Review", nextDelivery: "Dec 12" },
                  { name: "Mobile App UI", status: "Design", progress: 45, phase: "Wireframes", nextDelivery: "Dec 20" }
                ].map((project, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">Current phase: {project.phase}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'Review' ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">Next delivery: {project.nextDelivery}</p>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="ghost" size="sm">Leave Feedback</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>Latest project news and deliverables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    title: "Website wireframes completed", 
                    project: "Website Redesign", 
                    time: "2 hours ago", 
                    type: "delivery",
                    hasFile: true 
                  },
                  { 
                    title: "Brand logo concepts ready for review", 
                    project: "Brand Identity", 
                    time: "1 day ago", 
                    type: "review",
                    hasFile: true 
                  },
                  { 
                    title: "Project kickoff meeting scheduled", 
                    project: "Mobile App UI", 
                    time: "2 days ago", 
                    type: "meeting",
                    hasFile: false 
                  },
                  { 
                    title: "Final designs approved", 
                    project: "Brand Identity", 
                    time: "3 days ago", 
                    type: "approval",
                    hasFile: false 
                  }
                ].map((update, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{update.title}</h4>
                        <p className="text-xs text-muted-foreground">{update.project}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{update.time}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">View</Button>
                      {update.hasFile && (
                        <Button variant="ghost" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communication Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Messages & Communication</CardTitle>
              <CardDescription>Direct communication with your project team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    from: "Sarah Wilson - Project Manager", 
                    message: "The latest wireframes are ready for your review. Please let us know if you have any feedback.",
                    time: "3 hours ago",
                    unread: true 
                  },
                  { 
                    from: "Mike Johnson - Designer", 
                    message: "Thanks for the feedback on the color palette. I've made the adjustments you requested.",
                    time: "1 day ago",
                    unread: false 
                  },
                  { 
                    from: "Emily Davis - Account Manager", 
                    message: "Your project is ahead of schedule! We should be able to deliver 2 days early.",
                    time: "2 days ago",
                    unread: false 
                  }
                ].map((message, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${message.unread ? 'bg-blue-50 border-blue-200' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-sm">{message.from}</h4>
                        {message.unread && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{message.message}</p>
                    <Button variant="outline" size="sm">Reply</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardClient;