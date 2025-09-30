import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Phone, Mail, Clock, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle } from "lucide-react";

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdDate: string;
  lastUpdate: string;
  assignedTo: string;
  project?: string; // Make project optional
  resolution?: string;
}

const ClientSupport = () => {
  const supportTickets: SupportTicket[] = [
    {
      id: "SUP-001",
      title: "Question about project timeline",
      description: "I have some questions about the revised timeline for the website project",
      status: "Open",
      priority: "Medium",
      createdDate: "2024-12-08",
      lastUpdate: "2024-12-09",
      assignedTo: "Tom Rodriguez"
    },
    {
      id: "SUP-002",
      title: "Access to project files",
      description: "I'm unable to download the latest design files from the portal",
      status: "Resolved",
      priority: "High",
      createdDate: "2024-12-05",
      lastUpdate: "2024-12-06",
      assignedTo: "Sarah Wilson",
      resolution: "Access permissions have been updated. You should now be able to download all files."
    },
    {
      id: "SUP-003",
      title: "Invoice payment question",
      description: "I need clarification on the payment terms for the latest invoice",
      status: "In Progress",
      priority: "Low",
      createdDate: "2024-12-07",
      lastUpdate: "2024-12-08",
      assignedTo: "Finance Team"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-amber-100 text-amber-800";
      case "Resolved": return "bg-green-100 text-green-800";
      case "Closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open": return <AlertTriangle className="w-4 h-4 text-blue-600" />;
      case "In Progress": return <Clock className="w-4 h-4 text-amber-600" />;
      case "Resolved": return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-600";
      case "Medium": return "text-amber-600";
      case "Low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Support Center</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Support Ticket
        </Button>
      </div>

      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {supportTickets.filter(t => t.status === "Open").length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {supportTickets.filter(t => t.status === "Resolved").length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2h</div>
            <p className="text-xs text-muted-foreground">Response time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <CheckCircle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">4.8</div>
            <p className="text-xs text-muted-foreground">Support rating</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create New Ticket */}
        <Card>
          <CardHeader>
            <CardTitle>Create Support Ticket</CardTitle>
            <CardDescription>Get help from our support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Brief description of your issue" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <select className="w-full p-2 border rounded-md">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Provide detailed information about your issue or question" rows={4} />
            </div>

            <Button className="w-full">
              <MessageSquare className="w-4 h-4 mr-2" />
              Submit Ticket
            </Button>

            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-2">Need immediate help?</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="w-3 h-3 mr-1" />
                  Call Support
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="w-3 h-3 mr-1" />
                  Email Us
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>My Support Tickets</CardTitle>
            <CardDescription>Track your support requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(ticket.status)}
                      <div>
                        <h4 className="font-semibold">{ticket.title}</h4>
                        <p className="text-sm text-muted-foreground">{ticket.project || 'General Support'}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                      <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{ticket.description}</p>

                  {ticket.resolution && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                      <p className="text-sm font-medium text-green-800 mb-1">Resolution:</p>
                      <p className="text-sm text-green-700">{ticket.resolution}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Created: {new Date(ticket.createdDate).toLocaleDateString()}</span>
                    <span>Assigned to: {ticket.assignedTo}</span>
                  </div>

                  {ticket.status !== "Resolved" && (
                    <Button variant="outline" size="sm" className="mt-3">
                      Add Comment
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ClientSupport;