import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Folder, FileText, Image, Video, Archive } from "lucide-react";
import { useState } from "react";

const ClientFiles = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const files = [
    {
      id: 1,
      name: "Website_Wireframes_v2.pdf",
      type: "PDF",
      size: "2.4 MB",
      project: "Website Redesign",
      uploadedBy: "Lisa Chen",
      uploadDate: "2024-12-08",
      category: "Design",
      version: "v2.0"
    },
    {
      id: 2,
      name: "Brand_Guidelines_Final.pdf",
      type: "PDF",
      size: "5.1 MB",
      project: "Brand Identity",
      uploadedBy: "Sarah Wilson",
      uploadDate: "2024-12-05",
      category: "Brand",
      version: "Final"
    },
    {
      id: 3,
      name: "Logo_Concepts.zip",
      type: "Archive",
      size: "12.8 MB",
      project: "Brand Identity",
      uploadedBy: "Lisa Chen",
      uploadDate: "2024-11-28",
      category: "Design",
      version: "v1.0"
    },
    {
      id: 4,
      name: "App_Mockups.fig",
      type: "Figma",
      size: "8.3 MB",
      project: "Mobile App",
      uploadedBy: "Mike Johnson",
      uploadDate: "2024-12-01",
      category: "Design",
      version: "v1.5"
    },
    {
      id: 5,
      name: "Project_Proposal.docx",
      type: "Document",
      size: "1.2 MB",
      project: "Website Redesign",
      uploadedBy: "Tom Rodriguez",
      uploadDate: "2024-10-15",
      category: "Documentation",
      version: "Final"
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF": return <FileText className="w-5 h-5 text-red-600" />;
      case "Archive": return <Archive className="w-5 h-5 text-purple-600" />;
      case "Figma": return <Image className="w-5 h-5 text-blue-600" />;
      case "Document": return <FileText className="w-5 h-5 text-blue-600" />;
      case "Video": return <Video className="w-5 h-5 text-green-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Design": return "bg-purple-100 text-purple-800";
      case "Brand": return "bg-blue-100 text-blue-800";
      case "Documentation": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Project Files</h2>
      </div>

      {/* File Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{files.length}</div>
            <p className="text-xs text-muted-foreground">Available for download</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Size</CardTitle>
            <Archive className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">29.8 MB</div>
            <p className="text-xs text-muted-foreground">All project files</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
            <Download className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">File Types</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Different formats</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file) => (
          <Card key={file.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start space-x-3">
                {getFileIcon(file.type)}
                <div className="flex-1">
                  <CardTitle className="text-lg">{file.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {file.size} • {file.type}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getCategoryColor(file.category)}>{file.category}</Badge>
                <Badge variant="outline">{file.version}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Project</p>
                  <p className="font-medium">{file.project}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Uploaded by</p>
                  <p className="font-medium">{file.uploadedBy}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  Preview
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ClientFiles;