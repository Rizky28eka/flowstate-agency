import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Hash, Users, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MemberCommunication = () => {
  const channels = [
    { id: 1, name: "general", description: "General team discussions", unread: 3 },
    { id: 2, name: "project-updates", description: "Project status updates", unread: 7 },
    { id: 3, name: "random", description: "Casual conversations", unread: 0 },
    { id: 4, name: "help", description: "Ask questions and get help", unread: 2 }
  ];

  const directMessages = [
    { id: 1, name: "Sarah Wilson", role: "Creative Director", lastMessage: "Great work on the designs!", unread: 1, online: true },
    { id: 2, name: "Mike Johnson", role: "Lead Developer", lastMessage: "Can you review the code?", unread: 0, online: true },
    { id: 3, name: "Tom Rodriguez", role: "Account Director", lastMessage: "Client feedback is ready", unread: 2, online: false }
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Team Communication</h2>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <Bell className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {channels.reduce((sum, c) => sum + c.unread, 0) + directMessages.reduce((sum, dm) => sum + dm.unread, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all channels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Channels</CardTitle>
            <Hash className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channels.length}</div>
            <p className="text-xs text-muted-foreground">Team channels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{directMessages.filter(dm => dm.online).length}</div>
            <p className="text-xs text-muted-foreground">Online now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Sent and received</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Channels */}
        <Card>
          <CardHeader>
            <CardTitle>Team Channels</CardTitle>
            <CardDescription>Join team conversations</CardDescription>
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
                  {channel.unread > 0 && (
                    <Badge variant="secondary">
                      {channel.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Direct Messages */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Direct Messages</CardTitle>
            <CardDescription>Private conversations with team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {directMessages.map((dm) => (
                <div key={dm.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={`/api/placeholder/40/40`} alt={dm.name} />
                        <AvatarFallback>{dm.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {dm.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{dm.name}</p>
                        {dm.online && <span className="text-xs text-green-600">Online</span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{dm.role}</p>
                      <p className="text-xs text-muted-foreground">{dm.lastMessage}</p>
                    </div>
                  </div>
                  {dm.unread > 0 && (
                    <Badge variant="secondary">
                      {dm.unread}
                    </Badge>
                  )}
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

export default MemberCommunication;