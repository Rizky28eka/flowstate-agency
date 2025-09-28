import { useState, useMemo, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { chatChannels as initialChannels, chatMessages as initialMessages } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Search, Send, Users, Hash } from "lucide-react";

const OwnerCommunication = () => {
  const [channels, setChannels] = useState(initialChannels);
  const [messages, setMessages] = useState(initialMessages);
  const [activeChannelId, setActiveChannelId] = useState(channels[0].id);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const activeChannel = useMemo(() => channels.find(c => c.id === activeChannelId), [channels, activeChannelId]);
  const activeMessages = useMemo(() => messages.filter(m => m.channelId === activeChannelId), [messages, activeChannelId]);

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
      avatar: '/api/placeholder/40/40',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMessageObj]);
    setNewMessage("");
  };

  return (
    <div className="h-screen flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1 border-t">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b"><Input placeholder="Search channels..." className="pl-8" /><Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/></div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Channels</h3>
                  {channels.filter(c => c.type === 'group').map(channel => (
                    <Button key={channel.id} variant={activeChannelId === channel.id ? "secondary" : "ghost"} className="w-full justify-start gap-2" onClick={() => setActiveChannelId(channel.id)}>
                      <Hash className="w-4 h-4" /> {channel.name}
                      {channel.unread > 0 && <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">{channel.unread}</span>}
                    </Button>
                  ))}
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Direct Messages</h3>
                  {channels.filter(c => c.type === 'dm').map(channel => (
                    <Button key={channel.id} variant={activeChannelId === channel.id ? "secondary" : "ghost"} className="w-full justify-start gap-2" onClick={() => setActiveChannelId(channel.id)}>
                      <Avatar className="w-6 h-6"><AvatarImage src={channel.avatar} /><AvatarFallback>{channel.name.charAt(0)}</AvatarFallback></Avatar>
                      {channel.name}
                      {channel.unread > 0 && <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">{channel.unread}</span>}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                {activeChannel?.type === 'group' ? <Hash className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                <h2 className="font-semibold text-lg">{activeChannel?.name}</h2>
              </div>
            </div>
            <ScrollArea className="flex-1 bg-muted/30">
              <div className="p-4 space-y-6">
                {activeMessages.map(message => (
                  <div key={message.id} className={cn("flex items-start gap-3", message.author === 'Owner' && "flex-row-reverse")}>
                    <Avatar><AvatarImage src={message.avatar} /><AvatarFallback>{message.author.charAt(0)}</AvatarFallback></Avatar>
                    <div className={cn("p-3 rounded-lg max-w-md", message.author === 'Owner' ? "bg-primary text-primary-foreground" : "bg-card border")}>
                      <p className="font-semibold text-sm">{message.author}</p>
                      <p className="text-sm mt-1">{message.content}</p>
                      <p className="text-xs opacity-70 mt-2 text-right">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <div className="p-4 border-t bg-card">
              <div className="relative">
                <Textarea placeholder={`Message ${activeChannel?.name}...`} value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())} className="pr-16" />
                <Button size="icon" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={handleSendMessage}><Send className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default OwnerCommunication;
