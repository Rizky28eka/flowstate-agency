import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { clients as initialClients, projects as initialProjects, invoices as initialInvoices } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, Mail, Phone, Globe, Briefcase, DollarSign, Star, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EditClientForm = ({ client, onSave }) => {
    const [formData, setFormData] = useState(client);
    const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

    return (
        <div className="grid gap-4 py-4">
            <Input placeholder="Client Name" value={formData.name} onChange={e => handleChange('name', e.target.value)} />
            <Input placeholder="Industry" value={formData.industry} onChange={e => handleChange('industry', e.target.value)} />
            <Input placeholder="Contact Person" value={formData.contact} onChange={e => handleChange('contact', e.target.value)} />
            <Input placeholder="Email" type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} />
            <DialogFooter><DialogClose asChild><Button onClick={() => onSave(formData)}>Save Changes</Button></DialogClose></DialogFooter>
        </div>
    );
};

const AddProjectForm = ({ clientId, onAddProject }) => {
    const [name, setName] = useState('');
    const [budget, setBudget] = useState('');

    const handleSubmit = () => {
        if (!name || !budget) return;
        const newProject = { id: `PRJ-${Math.random().toString(36).substr(2, 3).toUpperCase()}`, name, budget: `$${parseInt(budget).toLocaleString()}`, clientId, status: 'Planning', endDate: new Date().toLocaleDateString() };
        onAddProject(newProject);
    };

    return (
        <div className="grid gap-4 py-4">
            <Input placeholder="Project Name" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="Budget" type="number" value={budget} onChange={e => setBudget(e.target.value)} />
            <DialogFooter><DialogClose asChild><Button onClick={handleSubmit}>Add Project</Button></DialogClose></DialogFooter>
        </div>
    );
};

const OwnerClientDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState(initialClients.find(c => c.id === clientId));
  const [clientProjects, setClientProjects] = useState(initialProjects.filter(p => p.clientId === clientId));
  const [clientInvoices, setClientInvoices] = useState(initialInvoices.filter(i => i.clientId === clientId));

  if (!client) return <div className="p-8">Client not found.</div>;

  const handleSaveClient = (updatedClient) => setClient(updatedClient);
  const handleDeleteClient = () => {
    console.log(`Client ${clientId} deleted!`);
    navigate("/dashboard/owner/clients");
  };
  const handleAddProject = (newProject) => setClientProjects(prev => [newProject, ...prev]);

  const getStatusColor = (status) => {
    if (status === "Active") return "bg-green-100 text-green-800";
    if (status === "Churned") return "bg-gray-100 text-gray-800";
    return "bg-blue-100 text-blue-800";
  };

  return (
    <main className="flex-1 px-6 py-8 bg-background">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
        <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border"><AvatarFallback className="text-2xl">{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
            <div>
                <div className="flex items-center space-x-2"><h1 className="text-3xl font-bold">{client.name}</h1><Badge className={getStatusColor(client.status)}>{client.status}</Badge></div>
                <p className="text-muted-foreground">{client.industry}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                    <a href={`mailto:${client.email}`} className="hover:text-primary flex items-center space-x-1"><Mail className="w-4 h-4" /><span>{client.email}</span></a>
                    <div className="flex items-center space-x-1"><Phone className="w-4 h-4" /><span>{client.phone}</span></div>
                </div>
            </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
            <Dialog><DialogTrigger asChild><Button variant="outline"><Edit className="w-4 h-4 mr-2"/> Edit Client</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Edit Client</DialogTitle></DialogHeader><EditClientForm client={client} onSave={handleSaveClient} /></DialogContent></Dialog>
            <AlertDialog><AlertDialogTrigger asChild><Button variant="destructive"><Trash2 className="w-4 h-4 mr-2"/> Delete Client</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the client and all their associated data.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDeleteClient}>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Projects ({clientProjects.length})</CardTitle><Dialog><DialogTrigger asChild><Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-2"/>Add Project</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Add New Project</DialogTitle></DialogHeader><AddProjectForm clientId={client.id} onAddProject={handleAddProject} /></DialogContent></Dialog></CardHeader>
                <CardContent><Table><TableHeader><TableRow><TableHead>Project Name</TableHead><TableHead>Status</TableHead><TableHead>Budget</TableHead><TableHead>End Date</TableHead></TableRow></TableHeader><TableBody>{clientProjects.map(p => (<TableRow key={p.id}><TableCell><Link to={`/dashboard/owner/projects/${p.id}`} className="font-medium text-primary hover:underline">{p.name}</Link></TableCell><TableCell><Badge>{p.status}</Badge></TableCell><TableCell>{p.budget}</TableCell><TableCell>{p.endDate}</TableCell></TableRow>))}</TableBody></Table></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Invoices</CardTitle></CardHeader>
                <CardContent><Table><TableHeader><TableRow><TableHead>Invoice #</TableHead><TableHead>Status</TableHead><TableHead>Amount</TableHead><TableHead>Due Date</TableHead></TableRow></TableHeader><TableBody>{clientInvoices.map(i => (<TableRow key={i.id}><TableCell>{i.invoiceNumber}</TableCell><TableCell><Badge variant={i.status === 'Paid' ? 'default' : 'secondary'}>{i.status}</Badge></TableCell><TableCell>${i.amount.toLocaleString()}</TableCell><TableCell>{i.dueDate}</TableCell></TableRow>))}</TableBody></Table></CardContent>
            </Card>
        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader><CardTitle>Contact Person</CardTitle></CardHeader>
                <CardContent className="space-y-4"><div className="flex items-center space-x-3"><Avatar className="w-12 h-12"><AvatarFallback>{client.contact.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar><div><p className="font-semibold text-lg">{client.contact}</p><p className="text-sm text-muted-foreground">Primary Contact</p></div></div></CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
};

export default OwnerClientDetail;
