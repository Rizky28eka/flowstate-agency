import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Eye, MessageSquare, Download, Clock, CheckCircle, Receipt } from "lucide-react";
import { projects, notifications, invoices } from "@/lib/mock-data";

const ClientDashboard = () => {
  const navigate = useNavigate();

  // Assuming a logged-in client, we'll filter for a specific client ID
  const clientId = "CLI-001"; // Example: TechCorp Inc.

  const { 
    clientProjects,
    activeProjects,
    completedProjects,
    pendingReviews,
    recentUpdates,
    dueInvoices
  } = useMemo(() => {
    const clientProjects = projects.filter((p) => p.clientId === clientId);
    const clientProjectIds = clientProjects.map((p) => p.id);
    const recentUpdates = notifications.filter(
      (n) => (n.projectId && clientProjectIds.includes(n.projectId)) || n.clientId === clientId
    );
    const dueInvoices = invoices.filter(inv => clientProjectIds.has(inv.projectId) && inv.status === 'Pending').length;

    return {
      clientProjects,
      activeProjects: clientProjects.filter((p) => p.status === "In Progress").length,
      completedProjects: clientProjects.filter((p) => p.status === "Completed").length,
      pendingReviews: clientProjects.filter((p) => p.status === "Review").length,
      recentUpdates,
      dueInvoices
    };
  }, [clientId]);

  const handleUpdateClick = (update) => {
    if (update.type === 'payment') {
      const invoice = invoices.find(inv => inv.projectId === update.projectId);
      if (invoice) navigate(`/dashboard/client/invoices/${invoice.id}`);
    } else if (update.projectId) {
      navigate(`/dashboard/client/projects/${update.projectId}`);
    }
  };

  return (
    <>
      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">In development</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProjects}</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Invoices Due</CardTitle>
            <Receipt className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dueInvoices}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Unread (static)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Status */}
        <Card>
          <CardHeader>
            <CardTitle>Your Projects</CardTitle>
            <CardDescription>Current project status and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Current phase: {project.status}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        project.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : project.status === "Review"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                    <p className="text-xs text-muted-foreground">
                      Next delivery: {new Date(project.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/client/projects/${project.id}`)}>
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/client/feedback')}>
                      Leave Feedback
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Latest project news and deliverables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUpdates.map((update) => (
                <div key={update.id} className="border rounded-lg p-3 cursor-pointer hover:bg-muted/50" onClick={() => handleUpdateClick(update)}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{update.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {projects.find((p) => p.id === update.projectId)?.name}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(update.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    {update.type === "payment" && (
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
    </>
  );
};

export default ClientDashboard;