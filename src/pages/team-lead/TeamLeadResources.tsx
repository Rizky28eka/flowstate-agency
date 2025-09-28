import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Plus, Download, BookOpen, Video, FileText, Link, ExternalLink, TrendingUp } from "lucide-react";

const TeamLeadResources = () => {
  const resources = [
    {
      id: 1,
      title: "Design System Guidelines",
      description: "Complete design system documentation and component library",
      type: "Documentation",
      category: "Design",
      lastUpdated: "2024-11-28",
      downloads: 45,
      url: "#"
    },
    {
      id: 2,
      title: "Development Best Practices",
      description: "Coding standards, review process, and deployment guidelines",
      type: "Documentation",
      category: "Development",
      lastUpdated: "2024-12-01",
      downloads: 32,
      url: "#"
    },
    {
      id: 3,
      title: "Project Management Training",
      description: "Video series on effective project management techniques",
      type: "Training",
      category: "Management",
      lastUpdated: "2024-11-15",
      downloads: 18,
      url: "#"
    },
    {
      id: 4,
      title: "Client Communication Templates",
      description: "Email templates and communication guidelines for client interactions",
      type: "Template",
      category: "Communication",
      lastUpdated: "2024-11-20",
      downloads: 67,
      url: "#"
    },
    {
      id: 5,
      title: "Software Licenses & Tools",
      description: "Access to team software licenses and development tools",
      type: "Tools",
      category: "Software",
      lastUpdated: "2024-12-05",
      downloads: 89,
      url: "#"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Documentation": return <FileText className="w-4 h-4" />;
      case "Training": return <Video className="w-4 h-4" />;
      case "Template": return <BookOpen className="w-4 h-4" />;
      case "Tools": return <Briefcase className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Documentation": return "bg-blue-100 text-blue-800";
      case "Training": return "bg-green-100 text-green-800";
      case "Template": return "bg-purple-100 text-purple-800";
      case "Tools": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Resources & Tools</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Resource Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources.length}</div>
            <p className="text-xs text-muted-foreground">Available to team</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
            <Download className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Software Licenses</div>
            <p className="text-xs text-muted-foreground">89 downloads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Resource categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usage Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">87%</div>
            <p className="text-xs text-muted-foreground">Team engagement</p>
          </CardContent>
        </Card>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(resource.type)}
                  <div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription className="mt-1">{resource.description}</CardDescription>
                  </div>
                </div>
                <Badge className={getTypeColor(resource.type)}>{resource.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Category</p>
                  <p className="font-medium">{resource.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Downloads</p>
                  <p className="font-medium">{resource.downloads}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm">
                  <Download className="w-3 h-3 mr-1" />
                  Access
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Share
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Last updated: {new Date(resource.lastUpdated).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TeamLeadResources;