import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Plus, Bell, Badge } from "lucide-react";

const ClientMessages = () => {
  const conversations = [
    {
      id: 1,
      name: "Sarah Wilson",
      role: "Project Manager",
      lastMessage: "The latest wireframes are ready for your review",
      timestamp: "2 hours ago",
      unread: 2,
      online: true,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Lisa Chen",
      role: "UI/UX Designer",
      lastMessage: "I've updated the color palette based on your feedback",
      timestamp: "1 day ago",
      unread: 0,
      online: true,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Lead Developer",
      lastMessage: "The development phase is progressing well",
      timestamp: "2 days ago",
      unread: 1,
      online: false,
      avatar: "/api/placeholder/40/40"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Wilson",
      message: "Hi! I wanted to update you on the website redesign project. We've completed the wireframes and are ready for your review.",
      timestamp: "2024-12-10T14:30:00Z",
      isMe: false
    },
    {
      id: 2,
      sender: "You",
      message: "That's great news! I'll review them today and get back to you with feedback.",
      timestamp: "2024-12-10T14:35:00Z",
      isMe: true
    },
    {
      id: 3,
      sender: "Sarah Wilson",
      message: "Perfect! Take your time. We're also preparing the next phase while we wait for your feedback.",
      timestamp: "2024-12-10T14:40:00Z",
      isMe: false
    }
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Messages</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <Bell className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {conversations.reduce((sum, c) => sum + c.unread, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversations.length}</div>
            <p className="text-xs text-muted-foreground">With team members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Online</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {conversations.filter(c => c.online).length}
            </div>
            <p className="text-xs text-muted-foreground">Available now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Conversations List */}
        <Card>
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Your team communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conversations.map((conversation) => (
                <div key={conversation.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{conversation.name}</p>
                        {conversation.online && <span className="text-xs text-green-600">Online</span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{conversation.role}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-48">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {conversation.unread > 0 && (
                      <Badge variant="secondary" className="mb-1">
                        {conversation.unread}
                      </Badge>
                    )}
                    <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/api/placeholder/40/40" alt="Sarah Wilson" />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Sarah Wilson</CardTitle>
                <CardDescription>Project Manager • Online</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isMe 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex space-x-2">
              <Input placeholder="Type your message..." className="flex-1" />
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

export default ClientMessages;