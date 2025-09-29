import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClientDetails, ClientDetails } from '@/lib/client-detail';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, DollarSign, TrendingUp, FolderKanban, Smile, Phone, Mail, Globe, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const OwnerClientDetail = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();

  const client = useMemo(() => 
    clientId ? getClientDetails(clientId) : null
  , [clientId]);

  useEffect(() => {
    if (!client) {
      // navigate('/dashboard/owner/clients');
    }
  }, [client, navigate]);

  if (!client) {
    return <div>Loading client details...</div>;
  }

  const kpiData = [
    { title: 'Lifetime Value', value: formatCurrency(client.kpis.lifetimeValue), icon: DollarSign },
    { title: 'Avg. Profit Margin', value: `${client.kpis.avgProfitMargin.toFixed(1)}%`, icon: TrendingUp },
    { title: 'Active Projects', value: client.kpis.activeProjectsCount, icon: FolderKanban },
    { title: 'Satisfaction Score', value: client.kpis.satisfactionScore.toFixed(1), icon: Smile },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/owner/clients')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-12 w-12">
            <AvatarImage src={client.avatar} alt={client.name} />
            <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{client.name}</h1>
            <p className="text-muted-foreground">{client.industry}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit Client</Button>
          <Button>Add New Project</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Client Information</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center"><Mail className="h-4 w-4 mr-3 text-muted-foreground"/><span>{client.email}</span></div>
              <div className="flex items-center"><Phone className="h-4 w-4 mr-3 text-muted-foreground"/><span>{client.phone}</span></div>
              <div className="flex items-center"><Globe className="h-4 w-4 mr-3 text-muted-foreground"/><span>{client.website}</span></div>
              <div className="flex items-center"><MapPin className="h-4 w-4 mr-3 text-muted-foreground"/><span>{client.address}</span></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Projects</CardTitle><CardDescription>All projects associated with {client.name}.</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead className="text-right">End Date</TableHead></TableRow></TableHeader>
                <TableBody>
                  {client.projects.map(p => (
                    <TableRow key={p.id} className="cursor-pointer" onClick={() => navigate(`/dashboard/owner/projects/${p.id}`)}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell><Badge variant={p.status === 'Completed' ? 'secondary' : 'default'}>{p.status}</Badge></TableCell>
                      <TableCell className="text-right">{p.endDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Financials</CardTitle><CardDescription>All invoices sent to {client.name}.</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Status</TableHead><TableHead>Due Date</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                <TableBody>
                  {client.invoices.map(inv => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.invoiceNumber}</TableCell>
                      <TableCell><Badge variant={inv.status === 'Paid' ? 'default' : 'destructive'}>{inv.status}</Badge></TableCell>
                      <TableCell>{inv.dueDate}</TableCell>
                      <TableCell className="text-right">{formatCurrency(inv.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Contracts</CardTitle><CardDescription>All legal agreements with {client.name}.</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Value</TableHead></TableRow></TableHeader>
                <TableBody>
                  {client.contracts.map(c => (
                    <TableRow key={c.id} className="cursor-pointer" onClick={() => navigate(`/dashboard/owner/contract-management/${c.id}`)}>
                      <TableCell className="font-medium">{c.title}</TableCell>
                      <TableCell><Badge variant={c.status === 'Active' ? 'default' : 'destructive'}>{c.status}</Badge></TableCell>
                      <TableCell className="text-right">{formatCurrency(c.value)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OwnerClientDetail;