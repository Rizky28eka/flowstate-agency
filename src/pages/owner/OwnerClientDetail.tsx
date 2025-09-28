
import { useParams } from "react-router-dom";
import { clients, projects, invoices } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, Mail, Phone, Globe, Briefcase, DollarSign, Star, Calendar, FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

const OwnerClientDetail = () => {
  const { clientId } = useParams();
  const client = clients.find(c => c.id === clientId);
  const clientProjects = projects.filter(p => p.clientId === clientId);
  const clientInvoices = invoices.filter(i => i.clientId === clientId);

  if (!client) {
    return <div className="p-8">Client not found.</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Onboarding": return "bg-blue-100 text-blue-800";
      case "Churned": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="flex-1 px-6 py-8 bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
        <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border">
                <AvatarFallback className="text-2xl">{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
                <div className="flex items-center space-x-2">
                    <h1 className="text-3xl font-bold text-foreground">{client.name}</h1>
                    <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                </div>
                <p className="text-muted-foreground">{client.industry}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${client.email}`} className="hover:text-primary">{client.email}</a>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Globe className="w-4 h-4" />
                        <a href={`https://${client.website}`} target="_blank" rel="noreferrer" className="hover:text-primary">{client.website}</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline"><Edit className="w-4 h-4 mr-2"/> Edit Client</Button>
            <Button variant="destructive"><Trash2 className="w-4 h-4 mr-2"/> Delete Client</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Billed</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${client.totalBilled.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">from {client.projects} projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{client.activeProjects}</div>
            <p className="text-xs text-muted-foreground">out of {client.projects} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Client Since</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(client.joinDate).toLocaleDateString()}</div>
            <p className="text-xs text-muted-foreground">Last contact: {new Date(client.lastContact).toLocaleDateString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Star className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{client.satisfaction} / 5.0</div>
            <p className="text-xs text-muted-foreground">Based on project feedback</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {/* Projects */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Projects ({clientProjects.length})</CardTitle>
                    <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-2"/>Add Project</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Budget</TableHead>
                                <TableHead>End Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clientProjects.map(project => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        <Link to={`/dashboard/owner/projects/${project.id}`} className="font-medium text-primary hover:underline">{project.name}</Link>
                                    </TableCell>
                                    <TableCell><Badge className={getStatusColor(project.status)}>{project.status}</Badge></TableCell>
                                    <TableCell>{project.budget}</TableCell>
                                    <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Invoices */}
            <Card>
                <CardHeader>
                    <CardTitle>Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice #</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Due Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clientInvoices.map(invoice => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                                    <TableCell><Badge variant={invoice.status === 'Paid' ? 'default' : 'secondary'}>{invoice.status}</Badge></TableCell>
                                    <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                                    <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

        {/* Contact Person & Details */}
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Person</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                            <AvatarFallback>{client.contact.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-lg">{client.contact}</p>
                            <p className="text-sm text-muted-foreground">Primary Contact</p>
                        </div>
                    </div>
                    <div className="text-sm space-y-2">
                        <p><strong className="font-medium">Address:</strong><br/>{client.address}</p>
                        <p><strong className="font-medium">Payment Terms:</strong> {client.paymentTerms}</p>
                        <p><strong className="font-medium">Contract Value:</strong> {client.contractValue}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
};

export default OwnerClientDetail;
