import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { contracts } from '@/lib/mock-data';
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
import { DollarSign, FileText, FileClock, Search, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const ContractRow = ({ contract }: { contract: (typeof contracts)[0] }) => {
  const navigate = useNavigate();
  
  const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'Active': 'default',
    'Expiring Soon': 'secondary',
    'Expired': 'destructive',
    'Draft': 'outline',
  };

  return (
    <TableRow 
      className="cursor-pointer"
      onClick={() => navigate(`/dashboard/owner/contract-management/${contract.id}`)}
    >
      <TableCell>
        <div className="font-medium">{contract.title}</div>
        <div className="text-xs text-muted-foreground hidden sm:table-cell">{contract.id}</div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{contract.clientName}</TableCell>
      <TableCell>
        <Badge variant={statusVariant[contract.status] || 'outline'}>{contract.status}</Badge>
      </TableCell>
      <TableCell className="hidden sm:table-cell text-right font-medium">{formatCurrency(contract.value)}</TableCell>
      <TableCell className="hidden lg:table-cell text-right">{contract.endDate || 'N/A'}</TableCell>
    </TableRow>
  );
};

const OwnerContractManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredContracts = useMemo(() => {
    return contracts.filter(c => {
      const searchMatch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.clientName.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === 'all' || c.status === statusFilter;
      return searchMatch && statusMatch;
    });
  }, [searchTerm, statusFilter]);

  const portfolioStats = useMemo(() => {
    const activeContracts = contracts.filter(c => c.status === 'Active' || c.status === 'Expiring Soon');
    const totalValue = activeContracts.reduce((sum, c) => sum + c.value, 0);
    const expiringSoonCount = contracts.filter(c => c.status === 'Expiring Soon').length;
    return { totalValue, activeCount: activeContracts.length, expiringSoonCount };
  }, []);

  const kpiData = [
    { title: 'Total Active Contract Value', value: formatCurrency(portfolioStats.totalValue), icon: DollarSign },
    { title: 'Active Contracts', value: portfolioStats.activeCount, icon: FileText },
    { title: 'Expiring Soon', value: portfolioStats.expiringSoonCount, icon: FileClock },
  ];

  const contractStatuses = ['Active', 'Expiring Soon', 'Expired', 'Draft'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contract Management</h1>
          <p className="text-muted-foreground">Oversee all client and vendor contracts.</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Contract
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
            <CardTitle>All Contracts</CardTitle>
            <CardDescription>A list of all contracts. Click a row for details.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search title or client..." 
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
                {contractStatuses.map(status => (
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
                <TableHead>Contract Title</TableHead>
                <TableHead className="hidden md:table-cell">Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Value</TableHead>
                <TableHead className="hidden lg:table-cell text-right">End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map(c => <ContractRow key={c.id} contract={c} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerContractManagement;