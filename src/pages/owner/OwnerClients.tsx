import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { clients } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, DollarSign, Smile, Search, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const ClientRow = ({ client }: { client: (typeof clients)[0] }) => {
  const navigate = useNavigate();
  
  const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'Active': 'default',
    'Onboarding': 'secondary',
    'Churned': 'destructive',
  };

  const satisfactionColor = client.satisfaction >= 4.5 ? 'bg-green-500' : client.satisfaction >= 4.0 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <TableRow 
      className="cursor-pointer"
      onClick={() => navigate(`/client/${client.id}`)}
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={client.avatar} alt={client.name} />
            <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{client.name}</div>
            <div className="text-xs text-muted-foreground hidden sm:table-cell">{client.contact}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={statusVariant[client.status] || 'outline'}>{client.status}</Badge>
      </TableCell>
      <TableCell className="hidden sm:table-cell text-center">{client.activeProjects}</TableCell>
      <TableCell className="hidden lg:table-cell text-right">{formatCurrency(client.totalBilled)}</TableCell>
      <TableCell className="hidden md:table-cell text-right">
        <Badge className={cn("text-white", satisfactionColor)}>{client.satisfaction.toFixed(1)}</Badge>
      </TableCell>
    </TableRow>
  );
};

const OwnerClients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      const searchMatch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.contact.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === 'all' || c.status === statusFilter;
      return searchMatch && statusMatch;
    });
  }, [searchTerm, statusFilter]);

  const portfolioStats = useMemo(() => {
    const activeClients = clients.filter(c => c.status === 'Active');
    const totalBilled = clients.reduce((sum, c) => sum + c.totalBilled, 0);
    const avgSatisfaction = clients.length > 0 ? clients.reduce((sum, c) => sum + c.satisfaction, 0) / clients.length : 0;
    return { activeCount: activeClients.length, totalBilled, avgSatisfaction };
  }, []);

  const kpiData = [
    { title: 'Active Clients', value: portfolioStats.activeCount, icon: Users },
    { title: 'Total Billed (All Time)', value: formatCurrency(portfolioStats.totalBilled), icon: DollarSign },
    { title: 'Avg. Client Satisfaction', value: portfolioStats.avgSatisfaction.toFixed(2), icon: Smile },
  ];

  const clientStatuses = ['Active', 'Onboarding', 'Churned'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Client Management</h1>
          <p className="text-muted-foreground">View and manage your client portfolio.</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
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

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>All Clients</CardTitle>
            <CardDescription>A list of all clients. Click a row for details.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search client or contact..." 
                className="pl-8 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {clientStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell text-center">Active Projects</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Total Billed</TableHead>
                <TableHead className="hidden md:table-cell text-right">Satisfaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map(c => <ClientRow key={c.id} client={c} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerClients;
