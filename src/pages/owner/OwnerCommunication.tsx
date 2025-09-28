import { useState, useMemo, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Search, Send, Users, Hash, Settings, Bell, MoreVertical, Phone, Video, UserPlus } from "lucide-react";

// Enhanced mock data
const chatChannels = [
  {
    id: "C1",
    name: "general",
    type: "group",
    unread: 3,
    avatar: null,
    description: "General discussions for all team members",
    memberCount: 24
  },
  {
    id: "C2", 
    name: "marketing",
    type: "group",
    unread: 0,
    avatar: null,
    description: "Marketing team collaboration",
    memberCount: 8
  },
  {
    id: "C3",
    name: "development",
    type: "group", 
    unread: 1,
    avatar: null,
    description: "Development team discussions",
    memberCount: 12
  },
  {
    id: "C4",
    name: "Sarah Chen",
    type: "dm",
    unread: 2,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    status: "online",
    role: "Marketing Manager"
  },
  {
    id: "C5",
    name: "Alex Rodriguez",
    type: "dm",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    status: "away",
    role: "Lead Developer"
  },
  {
    id: "C6",
    name: "Emma Wilson",
    type: "dm",
    unread: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    status: "online",
    role: "Project Manager"
  }
];

const chatMessages = [
  {
    id: "M1",
    channelId: "C1",
    author: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content: "Good morning everyone! Just wanted to share the latest marketing campaign results. We've exceeded our Q3 targets by 15%! 🎉",
    timestamp: "09:15",
    reactions: ["👏", "🎉", "💪"]
  },
  {
    id: "M2", 
    channelId: "C1",
    author: "Owner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "That's fantastic news, Sarah! Congratulations to the entire marketing team. This is exactly the kind of momentum we need heading into Q4.",
    timestamp: "09:18"
  },
  {
    id: "M3",
    channelId: "C1", 
    author: "Alex Rodriguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Amazing work! The new website optimizations we implemented last month are really paying off.",
    timestamp: "09:20"
  },
  {
    id: "M4",
    channelId: "C4",
    author: "Sarah Chen", 
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content: "Hi! I wanted to discuss the upcoming product launch strategy. Do you have time for a quick call this afternoon?",
    timestamp: "10:30"
  },
  {
    id: "M5",
    channelId: "C4",
    author: "Owner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", 
    content: "Absolutely! How about 2 PM? I'm particularly interested in hearing your thoughts on the target audience segmentation.",
    timestamp: "10:35"
  },
  {
    id: "M6",
    channelId: "C6",
    author: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "The Q4 project timeline is ready for your review. I've included all the key milestones and resource allocations we discussed.",
    timestamp: "11:15"
  },
  {
    id: "M7",
    channelId: "C6",
    author: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "Also, I wanted to get your approval on the new project management tool implementation. The team is excited about the productivity improvements it will bring.",
    timestamp: "11:18"
  },
  {
    id: "M8",
    channelId: "C3",
    author: "Alex Rodriguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Code review for the authentication system update is complete. Everything looks good and ready for deployment this Friday.",
    timestamp: "14:20"
  }
];

const OwnerCommunication = () => {
  const [channels, setChannels] = useState(chatChannels);
  const [messages, setMessages] = useState(chatMessages);
  const [activeChannelId, setActiveChannelId] = useState(channels[0].id);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const activeChannel = useMemo(() => channels.find(c => c.id === activeChannelId), [channels, activeChannelId]);
  const activeMessages = useMemo(() => messages.filter(m => m.channelId === activeChannelId), [messages, activeChannelId]);
  
  const filteredChannels = useMemo(() => {
    if (!searchQuery) return channels;
    return channels.filter(channel => 
      channel.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [channels, searchQuery]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const newMessageObj = {
      id: `M${messages.length + 1}`,
      channelId: activeChannelId,
      author: 'Owner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMessageObj]);
    setNewMessage("");
    
    // Clear unread count for current channel
    setChannels(prev => prev.map(channel => 
      channel.id === activeChannelId ? { ...channel, unread: 0 } : channel
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Owner Dashboard</h1>
              <p className="text-sm text-muted-foreground">Team Communication Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <div className="flex flex-col h-full bg-card/30">
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search channels..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-6">
                {/* Channels */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Channels
                    </h3>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <UserPlus className="w-3 h-3" />
                    </Button>
                  </div>
                  {filteredChannels.filter(c => c.type === 'group').map(channel => (
                    <Button 
                      key={channel.id}
                      variant={activeChannelId === channel.id ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 h-auto py-3 px-3 mb-1",
                        activeChannelId === channel.id && "bg-primary/10 border-l-2 border-l-primary"
                      )}
                      onClick={() => setActiveChannelId(channel.id)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Hash className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1 text-left">
                          <div className="font-medium">{channel.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {channel.memberCount} members
                          </div>
                        </div>
                        {channel.unread > 0 && (
                          <Badge variant="default" className="h-5 min-w-5 text-xs px-1.5">
                            {channel.unread}
                          </Badge>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>

                {/* Direct Messages */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Direct Messages
                    </h3>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <UserPlus className="w-3 h-3" />
                    </Button>
                  </div>
                  {filteredChannels.filter(c => c.type === 'dm').map(channel => (
                    <Button 
                      key={channel.id}
                      variant={activeChannelId === channel.id ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 h-auto py-3 px-3 mb-1",
                        activeChannelId === channel.id && "bg-primary/10 border-l-2 border-l-primary"
                      )}
                      onClick={() => setActiveChannelId(channel.id)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="relative">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={channel.avatar} />
                            <AvatarFallback className="text-xs">
                              {channel.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {channel.status && (
                            <div className={cn("absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background", getStatusColor(channel.status))} />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">{channel.name}</div>
                          <div className="text-xs text-muted-foreground">{channel.role}</div>
                        </div>
                        {channel.unread > 0 && (
                          <Badge variant="default" className="h-5 min-w-5 text-xs px-1.5">
                            {channel.unread}
                          </Badge>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={75}>
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 border-b bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {activeChannel?.type === 'group' ? (
                    <div className="flex items-center gap-3">
                      <Hash className="w-5 h-5 text-primary" />
                      <div>
                        <h2 className="font-semibold text-lg">{activeChannel?.name}</h2>
                        <p className="text-sm text-muted-foreground">
                          {activeChannel?.memberCount} members • {activeChannel?.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={activeChannel?.avatar} />
                          <AvatarFallback>
                            {activeChannel?.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {activeChannel?.status && (
                          <div className={cn("absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background", getStatusColor(activeChannel.status))} />
                        )}
                      </div>
                      <div>
                        <h2 className="font-semibold text-lg">{activeChannel?.name}</h2>
                        <p className="text-sm text-muted-foreground">{activeChannel?.role}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {activeChannel?.type === 'dm' && (
                    <>
                      <Button variant="ghost" size="icon">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 bg-gradient-to-b from-background to-muted/20">
              <div className="p-6 space-y-4">
                {activeMessages.map((message, index) => {
                  const isOwner = message.author === 'Owner';
                  const showAvatar = index === 0 || activeMessages[index - 1]?.author !== message.author;
                  
                  return (
                    <div key={message.id} className={cn("flex gap-4", isOwner && "flex-row-reverse")}>
                      <div className="flex-shrink-0">
                        {showAvatar ? (
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={message.avatar} />
                            <AvatarFallback className="text-sm">
                              {message.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-10 h-10" />
                        )}
                      </div>
                      <div className={cn("flex-1 max-w-2xl", isOwner && "flex flex-col items-end")}>
                        {showAvatar && (
                          <div className={cn("flex items-center gap-2 mb-1", isOwner && "flex-row-reverse")}>
                            <span className="font-semibold text-sm">{message.author}</span>
                            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          </div>
                        )}
                        <div className={cn(
                          "p-4 rounded-2xl shadow-sm",
                          isOwner 
                            ? "bg-primary text-primary-foreground rounded-br-md" 
                            : "bg-card border rounded-bl-md"
                        )}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          {message.reactions && (
                            <div className="flex gap-1 mt-2">
                              {message.reactions.map((reaction, idx) => (
                                <span key={idx} className="text-lg">{reaction}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-card/50 backdrop-blur-sm">
              <div className="relative">
                <Textarea 
                  placeholder={`Message ${activeChannel?.name}...`}
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="pr-16 resize-none bg-background/50 border-primary/20 focus:border-primary/40"
                  rows={1}
                />
                <Button 
                  size="icon" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8" 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default OwnerCommunication;