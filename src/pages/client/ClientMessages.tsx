import { useState, useMemo, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Plus, Bell, Search, X, Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const initialConversations = [
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

const initialMessages = {
  1: [
    {
      id: 1,
      sender: "Sarah Wilson",
      message: "Hi! I wanted to update you on the website redesign project. We've completed the wireframes and are ready for your review.",
      timestamp: "2024-12-10T14:30:00Z",
      isMe: false,
      read: true
    },
    {
      id: 2,
      sender: "You",
      message: "That's great news! I'll review them today and get back to you with feedback.",
      timestamp: "2024-12-10T14:35:00Z",
      isMe: true,
      read: true
    },
    {
      id: 3,
      sender: "Sarah Wilson",
      message: "Perfect! Take your time. We're also preparing the next phase while we wait for your feedback.",
      timestamp: "2024-12-10T14:40:00Z",
      isMe: false,
      read: false
    },
    {
      id: 4,
      sender: "Sarah Wilson",
      message: "The latest wireframes are ready for your review",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isMe: false,
      read: false
    }
  ],
  2: [
    { 
      id: 4, 
      sender: "Lisa Chen", 
      message: "Here are the new color palettes.", 
      timestamp: "2024-12-09T11:00:00Z", 
      isMe: false,
      read: true
    }
  ],
  3: [
    { 
      id: 5, 
      sender: "Mike Johnson", 
      message: "Dev update: The staging server is now live.", 
      timestamp: "2024-12-08T16:20:00Z", 
      isMe: false,
      read: false
    }
  ],
};

const getRelativeTime = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return past.toLocaleDateString();
};

const ClientMessages = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [newConversationName, setNewConversationName] = useState("");
  const [newConversationRole, setNewConversationRole] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const activeConversation = useMemo(() => 
    conversations.find(c => c.id === activeConversationId)
  , [conversations, activeConversationId]);

  const activeMessages = useMemo(() => 
    messages[activeConversationId] || []
  , [messages, activeConversationId]);

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const query = searchQuery.toLowerCase();
    return conversations.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.role.toLowerCase().includes(query) ||
      c.lastMessage.toLowerCase().includes(query)
    );
  }, [conversations, searchQuery]);

  const unreadTotal = useMemo(() => 
    conversations.reduce((sum, c) => sum + c.unread, 0)
  , [conversations]);

  const avgResponseTime = useMemo(() => {
    let totalTime = 0;
    let count = 0;
    
    Object.values(messages).forEach(convMessages => {
      for (let i = 1; i < convMessages.length; i++) {
        if (convMessages[i].isMe && !convMessages[i-1].isMe) {
          const diff = new Date(convMessages[i].timestamp) - new Date(convMessages[i-1].timestamp);
          totalTime += diff;
          count++;
        }
      }
    });
    
    if (count === 0) return "2.4h";
    const avgMs = totalTime / count;
    const avgHours = avgMs / (1000 * 60 * 60);
    return avgHours < 1 ? `${Math.round(avgHours * 60)}m` : `${avgHours.toFixed(1)}h`;
  }, [messages]);

  const handleConversationSelect = (id) => {
    setActiveConversationId(id);
    setConversations(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, unread: 0 };
      }
      return c;
    }));
    setMessages(prev => ({
      ...prev,
      [id]: (prev[id] || []).map(msg => ({ ...msg, read: true }))
    }));
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const now = new Date();
    const newMessageObj = {
      id: Date.now(),
      sender: "You",
      message: newMessage.trim(),
      timestamp: now.toISOString(),
      isMe: true,
      read: false
    };
    
    setMessages(prev => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newMessageObj]
    }));
    
    setConversations(prev => prev.map(c => {
      if (c.id === activeConversationId) {
        return {
          ...c,
          lastMessage: newMessage.trim(),
          timestamp: getRelativeTime(now)
        };
      }
      return c;
    }));
    
    setNewMessage("");
    
    // Simulate typing indicator and auto-reply
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        simulateReply(activeConversationId);
      }, 2000);
    }, 1000);
  };

  const simulateReply = (convId) => {
    const replies = [
      "Thank you for your message! I'll look into this right away.",
      "Got it! I'll update you soon.",
      "Perfect, I'll get started on that.",
      "Thanks for the update! Let me know if you need anything else.",
      "Sounds good! I'll keep you posted on the progress."
    ];
    
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    const conv = conversations.find(c => c.id === convId);
    
    const replyMessage = {
      id: Date.now() + 1,
      sender: conv?.name || "User",
      message: randomReply,
      timestamp: new Date().toISOString(),
      isMe: false,
      read: false
    };
    
    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), replyMessage]
    }));
    
    if (convId !== activeConversationId) {
      setConversations(prev => prev.map(c => {
        if (c.id === convId) {
          return {
            ...c,
            lastMessage: randomReply,
            timestamp: "Just now",
            unread: c.unread + 1
          };
        }
        return c;
      }));
    } else {
      setConversations(prev => prev.map(c => {
        if (c.id === convId) {
          return {
            ...c,
            lastMessage: randomReply,
            timestamp: "Just now"
          };
        }
        return c;
      }));
    }
  };

  const handleCreateConversation = () => {
    if (!newConversationName.trim() || !newConversationRole.trim()) return;
    
    const newConv = {
      id: Date.now(),
      name: newConversationName.trim(),
      role: newConversationRole.trim(),
      lastMessage: "New conversation started",
      timestamp: "Just now",
      unread: 0,
      online: Math.random() > 0.5,
      avatar: "/api/placeholder/40/40"
    };
    
    setConversations(prev => [newConv, ...prev]);
    setMessages(prev => ({ ...prev, [newConv.id]: [] }));
    setActiveConversationId(newConv.id);
    setShowNewMessageModal(false);
    setNewConversationName("");
    setNewConversationRole("");
  };

  const handleMarkAllAsRead = () => {
    setConversations(prev => prev.map(c => ({ ...c, unread: 0 })));
    setMessages(prev => {
      const updated = {};
      Object.keys(prev).forEach(key => {
        updated[key] = prev[key].map(msg => ({ ...msg, read: true }));
      });
      return updated;
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setConversations(prev => prev.map(c => ({
        ...c,
        timestamp: getRelativeTime(messages[c.id]?.[messages[c.id].length - 1]?.timestamp || new Date())
      })));
    }, 60000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Messages</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your team communications</p>
        </div>
        <div className="flex gap-2">
          {unreadTotal > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          )}
          <Button onClick={() => setShowNewMessageModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Message
          </Button>
        </div>
      </div>

      {/* New Message Modal */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>New Conversation</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowNewMessageModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>Start a new conversation with a team member</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>
                <Input
                  placeholder="Enter person's name"
                  value={newConversationName}
                  onChange={(e) => setNewConversationName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Role</label>
                <Input
                  placeholder="Enter person's role"
                  value={newConversationRole}
                  onChange={(e) => setNewConversationRole(e.target.value)}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => setShowNewMessageModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleCreateConversation}
                  disabled={!newConversationName.trim() || !newConversationRole.trim()}
                >
                  Create
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <Bell className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{unreadTotal}</div>
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
            <div className="text-2xl font-bold">{avgResponseTime}</div>
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
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No conversations found</p>
              ) : (
                filteredConversations.map((conversation) => (
                  <div 
                    key={conversation.id} 
                    className={cn(
                      "flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors",
                      activeConversationId === conversation.id && "bg-muted border-primary"
                    )}
                    onClick={() => handleConversationSelect(conversation.id)}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{conversation.name}</p>
                          {conversation.online && <span className="text-xs text-green-600 flex-shrink-0">●</span>}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.role}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      {conversation.unread > 0 && (
                        <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-medium text-white bg-red-500 rounded-full mb-1">
                          {conversation.unread}
                        </span>
                      )}
                      <p className="text-xs text-muted-foreground whitespace-nowrap">{conversation.timestamp}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2 flex flex-col max-h-[700px]">
          {activeConversation ? (
            <>
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
                      <AvatarFallback>{activeConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{activeConversation.name}</CardTitle>
                      <CardDescription>
                        {activeConversation.role} • {activeConversation.online ? 'Online' : 'Offline'}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto pr-4 space-y-4 mb-4">
                  {activeMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    activeMessages.map((message, index) => (
                      <div key={message.id} className={`flex items-end gap-2 ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                        {!message.isMe && (
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarImage src={activeConversation.avatar} />
                            <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isMe 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm break-words">{message.message}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <p className={`text-xs ${
                              message.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {message.isMe && (
                              message.read ? 
                                <CheckCheck className="w-3 h-3 text-primary-foreground/70" /> : 
                                <Check className="w-3 h-3 text-primary-foreground/70" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {isTyping && (
                    <div className="flex items-end gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={activeConversation.avatar} />
                        <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="bg-muted px-4 py-2 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="flex space-x-2 pt-4 border-t flex-shrink-0">
                  <Input 
                    placeholder="Type your message..." 
                    className="flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default ClientMessages;