import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Plus, Star, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

const ClientFeedback = () => {
  const feedbackRequests = [
    {
      id: 1,
      title: "Website Wireframes Review",
      project: "Website Redesign",
      description: "Please review the wireframes and provide feedback on layout and navigation",
      status: "Pending",
      dueDate: "2024-12-12",
      submittedBy: "Lisa Chen",
      priority: "High"
    },
    {
      id: 2,
      title: "Brand Logo Concepts",
      project: "Brand Identity",
      description: "Review the three logo concepts and select your preferred direction",
      status: "Completed",
      dueDate: "2024-12-08",
      submittedBy: "Sarah Wilson",
      priority: "Medium",
      feedback: "Love concept #2! The typography is perfect for our brand."
    },
    {
      id: 3,
      title: "Color Palette Approval",
      project: "Brand Identity",
      description: "Approve the final color palette for the brand refresh",
      status: "In Review",
      dueDate: "2024-12-10",
      submittedBy: "Lisa Chen",
      priority: "Medium"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-amber-100 text-amber-800";
      case "In Review": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
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
        <h2 className="text-2xl font-bold">Feedback & Reviews</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Provide General Feedback
        </Button>
      </div>

      {/* Feedback Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {feedbackRequests.filter(f => f.status === "Pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting your feedback</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {feedbackRequests.filter(f => f.status === "Completed").length}
            </div>
            <p className="text-xs text-muted-foreground">Reviews completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Star className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 days</div>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">4.9</div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {feedbackRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{request.title}</CardTitle>
                  <CardDescription className="mt-1">{request.project}</CardDescription>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                  <span className={`text-xs font-medium ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{request.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Submitted by</p>
                  <p className="font-medium">{request.submittedBy}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Due date</p>
                  <p className="font-medium">{new Date(request.dueDate).toLocaleDateString()}</p>
                </div>
              </div>

              {request.status === "Completed" && request.feedback ? (
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium mb-1">Your Feedback:</p>
                  <p className="text-sm">{request.feedback}</p>
                </div>
              ) : request.status === "Pending" ? (
                <div className="space-y-3">
                  <Textarea placeholder="Provide your feedback here..." />
                  <div className="flex space-x-2">
                    <Button size="sm">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Request Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-800">Under review by the team</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ClientFeedback;