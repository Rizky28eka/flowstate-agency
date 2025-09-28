import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Plus, Hash, Users, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { teamMembers } from "@/lib/mock-data";


const TeamLeadCommunication = () => {
  const myTeam = teamMembers.filter(m => 
    m.department === "Creative Team" || 
    m.department === "Development Team"
  );

  const channels = [
    { id: 1, name: "general", description: "General team discussions", members: myTeam.length, unread: 3 },
    { id: 2, name: "project-updates", description: "Project status updates", members: myTeam.length, unread: 7 },
    { id: 3, name: "design-feedback", description: "Design reviews and feedback", members: 4, unread: 2 },
    { id: 4, name: "dev-team", description: "Development team discussions", members: 3, unread: 1 }
  ];

  const recentMessages = [
    {
      id: 1,
      channel: "project-updates",
      author: "Sarah Wilson",
      message: "TechCorp project is ahead of schedule! Great work team 🎉",
      timestamp: "2 hours ago",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 2,
      channel: "design-feedback",
      author: "Lisa Chen",
      message: "Updated the mobile app wireframes based on client feedback",
      timestamp: "4 hours ago",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 3,
      channel: "dev-team",
      author: "Mike Johnson",
      message: "Database migration completed successfully",
      timestamp: "6 hours ago",
      avatar: "/api/placeholder/32/32"
    }
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Team Communication</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Channel
        </Button>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Channels</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channels.length}</div>
            <p className="text-xs text-muted-foreground">Team channels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <Bell className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {channels.reduce((sum, c) => sum + c.unread, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all channels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myTeam.length}</div>
            <p className="text-xs text-muted-foreground">Online now: {Math.floor(myTeam.length * 0.7)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94%</div>
            <p className="text-xs text-muted-foreground">Within 2 hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Channels */}
        <Card>
          <CardHeader>
            <CardTitle>Team Channels</CardTitle>
            <CardDescription>Communication channels for your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {channels.map((channel) => (
                <div key={channel.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">#{channel.name}</p>
                      <p className="text-xs text-muted-foreground">{channel.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {channel.unread > 0 && (
                      <Badge variant="secondary" className="mb-1">
                        {channel.unread}
                      </Badge>
                    )}
                    <p className="text-xs text-muted-foreground">{channel.members} members</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest messages across team channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={message.avatar} alt={message.author} />
                    <AvatarFallback>{message.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-sm">{message.author}</p>
                      <span className="text-xs text-muted-foreground">in #{message.channel}</span>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="mt-6 flex space-x-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TeamLeadCommunication;