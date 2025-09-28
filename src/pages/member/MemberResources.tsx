import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, BookOpen, Video, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const MemberResources = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const resources = [
    {
      id: 1,
      title: "Company Handbook",
      description: "Complete guide to company policies, procedures, and culture",
      type: "Documentation",
      category: "General",
      size: "2.4 MB",
      lastUpdated: "2024-11-15"
    },
    {
      id: 2,
      title: "Design Guidelines",
      description: "Brand guidelines, design system, and visual standards",
      type: "Documentation",
      category: "Design",
      size: "5.1 MB",
      lastUpdated: "2024-12-01"
    },
    {
      id: 3,
      title: "Development Setup Guide",
      description: "Environment setup, tools, and development workflow",
      type: "Documentation",
      category: "Development",
      size: "1.8 MB",
      lastUpdated: "2024-11-28"
    },
    {
      id: 4,
      title: "Skill Development Training",
      description: "Online courses and training materials for professional growth",
      type: "Training",
      category: "Learning",
      size: "Video Series",
      lastUpdated: "2024-12-05"
    },
    {
      id: 5,
      title: "Project Templates",
      description: "Reusable templates for common project types and deliverables",
      type: "Templates",
      category: "Productivity",
      size: "Multiple Files",
      lastUpdated: "2024-11-20"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Documentation": return <FileText className="w-4 h-4" />;
      case "Training": return <Video className="w-4 h-4" />;
      case "Templates": return <BookOpen className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Documentation": return "bg-blue-100 text-blue-800";
      case "Training": return "bg-green-100 text-green-800";
      case "Templates": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Resources</h2>
      </div>

      {/* Resource Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Resources</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources.length}</div>
            <p className="text-xs text-muted-foreground">Documents & guides</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Courses</CardTitle>
            <Video className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Available courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Project templates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Downloads</CardTitle>
            <Download className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
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
                  <p className="text-muted-foreground">Size</p>
                  <p className="font-medium">{resource.size}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View Online
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

export default MemberResources;