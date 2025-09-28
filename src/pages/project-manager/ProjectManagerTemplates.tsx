import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Copy, Edit, Trash2, Folder } from "lucide-react";

const ProjectManagerTemplates = () => {
  const templates = [
    {
      id: 1,
      name: "Brand Identity Project",
      description: "Complete brand identity development including logo, guidelines, and assets",
      category: "Design",
      estimatedDuration: "8-12 weeks",
      phases: ["Discovery", "Concept Development", "Design Refinement", "Final Delivery"],
      usageCount: 15,
      lastUsed: "2024-11-20"
    },
    {
      id: 2,
      name: "Website Development",
      description: "Full website development from design to deployment",
      category: "Development",
      estimatedDuration: "12-16 weeks",
      phases: ["Planning", "Design", "Development", "Testing", "Launch"],
      usageCount: 23,
      lastUsed: "2024-12-01"
    },
    {
      id: 3,
      name: "Marketing Campaign",
      description: "Digital marketing campaign with content creation and advertising",
      category: "Marketing",
      estimatedDuration: "6-8 weeks",
      phases: ["Strategy", "Content Creation", "Campaign Launch", "Optimization"],
      usageCount: 8,
      lastUsed: "2024-10-15"
    },
    {
      id: 4,
      name: "Mobile App Development",
      description: "Native or cross-platform mobile application development",
      category: "Development",
      estimatedDuration: "16-20 weeks",
      phases: ["Requirements", "UI/UX Design", "Development", "Testing", "App Store"],
      usageCount: 5,
      lastUsed: "2024-09-30"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Design": return "bg-purple-100 text-purple-800";
      case "Development": return "bg-blue-100 text-blue-800";
      case "Marketing": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Project Templates</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Template Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
            <p className="text-xs text-muted-foreground">Available templates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Used</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Website Development</div>
            <p className="text-xs text-muted-foreground">23 times used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Folder className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Design, Dev, Marketing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">96%</div>
            <p className="text-xs text-muted-foreground">Template success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription className="mt-2">{template.description}</CardDescription>
                </div>
                <Badge className={getCategoryColor(template.category)}>{template.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium">{template.estimatedDuration}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Usage</p>
                  <p className="font-medium">{template.usageCount} times</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Project Phases:</p>
                <div className="flex flex-wrap gap-1">
                  {template.phases.map((phase, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{phase}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm">
                  <Copy className="w-3 h-3 mr-1" />
                  Use Template
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Last used: {new Date(template.lastUsed).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProjectManagerTemplates;