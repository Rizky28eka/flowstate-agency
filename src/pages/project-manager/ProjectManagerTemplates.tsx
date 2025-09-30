import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Copy, Edit, Trash2, Folder } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialTemplates = [
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

const TemplateForm = ({ template, onSave, closeDialog }) => {
  const [formData, setFormData] = useState(template || {
    name: '',
    description: '',
    category: '',
    estimatedDuration: '',
    phases: '',
  });

  useEffect(() => {
    setFormData(template || {
      name: '',
      description: '',
      category: '',
      estimatedDuration: '',
      phases: '',
    });
  }, [template]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhasesChange = (e) => {
    setFormData(prev => ({ ...prev, phases: e.target.value.split(',').map(p => p.trim()) }));
  }

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2"><Label>Template Name</Label><Input name="name" value={formData.name} onChange={handleChange} /></div>
      <div className="space-y-2"><Label>Description</Label><Textarea name="description" value={formData.description} onChange={handleChange} /></div>
      <div className="space-y-2"><Label>Category</Label><Input name="category" value={formData.category} onChange={handleChange} /></div>
      <div className="space-y-2"><Label>Estimated Duration</Label><Input name="estimatedDuration" value={formData.estimatedDuration} onChange={handleChange} /></div>
      <div className="space-y-2"><Label>Phases (comma-separated)</Label><Input name="phases" value={Array.isArray(formData.phases) ? formData.phases.join(', ') : formData.phases} onChange={handlePhasesChange} /></div>
      <DialogFooter>
        <Button variant="outline" onClick={closeDialog}>Cancel</Button>
        <Button onClick={handleSubmit}>Save Template</Button>
      </DialogFooter>
    </div>
  );
};

const ProjectManagerTemplates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(initialTemplates);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const handleUseTemplate = (template) => {
    navigate('/dashboard/project-manager/projects', { state: { template } });
  };

  const openDialog = (template = null) => {
    setEditingTemplate(template);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingTemplate(null);
  };

  const handleSaveTemplate = (templateData) => {
    if (editingTemplate) {
      setTemplates(templates.map(t => t.id === editingTemplate.id ? { ...t, ...templateData } : t));
    } else {
      const newTemplate = { ...templateData, id: Date.now(), usageCount: 0, lastUsed: new Date().toISOString().split('T')[0] };
      setTemplates([newTemplate, ...templates]);
    }
    closeDialog();
  };

  const handleDeleteTemplate = (templateId) => {
    setTemplates(templates.filter(t => t.id !== templateId));
  };

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
        <Button onClick={() => openDialog()}>
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
                  {Array.isArray(template.phases) && template.phases.map((phase, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{phase}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" onClick={() => handleUseTemplate(template)}>
                  <Copy className="w-3 h-3 mr-1" />
                  Use Template
                </Button>
                <Button variant="outline" size="sm" onClick={() => openDialog(template)}>
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the template.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteTemplate(template.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <p className="text-xs text-muted-foreground">
                Last used: {new Date(template.lastUsed).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTemplate ? "Edit Template" : "Create New Template"}</DialogTitle>
            <DialogDescription>
              {editingTemplate ? "Update the details for your project template." : "Fill out the form to create a new reusable project template."}
            </DialogDescription>
          </DialogHeader>
          <TemplateForm template={editingTemplate} onSave={handleSaveTemplate} closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectManagerTemplates;