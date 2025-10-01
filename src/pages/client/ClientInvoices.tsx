import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { invoices, projects } from '@/lib/mock-data';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
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
import { DollarSign, FileWarning, FileCheck2 } from 'lucide-react';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const InvoiceRow = ({ invoice }: { invoice: (typeof invoices)[0] }) => {
  const navigate = useNavigate();
  
  const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'Paid': 'default',
    'Pending': 'secondary',
    'Overdue': 'destructive',
    'Draft': 'outline',
  };

  return (
    <TableRow 
      className="cursor-pointer"
      onClick={() => navigate(`/dashboard/client/invoices/${invoice.id}`)}
    >
      <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
      <TableCell className="hidden sm:table-cell">{invoice.projectName}</TableCell>
      <TableCell className="hidden md:table-cell">{invoice.issuedAt}</TableCell>
      <TableCell className="hidden md:table-cell">{invoice.dueDate}</TableCell>
      <TableCell><Badge variant={statusVariant[invoice.status] || 'outline'}>{invoice.status}</Badge></TableCell>
      <TableCell className="text-right font-medium">{formatCurrency(invoice.amount)}</TableCell>
    </TableRow>
  );
};

const ClientInvoices = () => {
  const [statusFilter, setStatusFilter] = useState('all');

  // Assume logged-in client is 'TechCorp Inc.' (CLI-001) for demo
  const currentClientId = 'CLI-001';
  
  const clientProjectIds = useMemo(() => 
    new Set(projects.filter(p => p.clientId === currentClientId).map(p => p.id))
  , [currentClientId]);

  const clientInvoices = useMemo(() => 
    invoices.filter(inv => clientProjectIds.has(inv.projectId))
  , [clientProjectIds]);

  const filteredInvoices = useMemo(() => {
    if (statusFilter === 'all') return clientInvoices;
    return clientInvoices.filter(inv => inv.status === statusFilter);
  }, [clientInvoices, statusFilter]);

  const invoiceStats = useMemo(() => {
    const totalBilled = clientInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const amountDue = clientInvoices
      .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
      .reduce((sum, inv) => sum + inv.amount, 0);
    const overdueCount = clientInvoices.filter(inv => inv.status === 'Overdue').length;
    return { totalBilled, amountDue, overdueCount };
  }, [clientInvoices]);

  const kpiData = [
    { title: 'Total Billed', value: formatCurrency(invoiceStats.totalBilled), icon: DollarSign },
    { title: 'Amount Due', value: formatCurrency(invoiceStats.amountDue), icon: FileWarning },
    { title: 'Paid Invoices', value: clientInvoices.filter(i => i.status === 'Paid').length, icon: FileCheck2 },
  ];

  const invoiceStatuses = ['Paid', 'Pending', 'Overdue', 'Draft'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Invoices</h1>
        <p className="text-muted-foreground">Review your billing history and make payments.</p>
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
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>Click an invoice to view details or make a payment.</CardDescription>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {invoiceStatuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead className="hidden sm:table-cell">Project</TableHead>
                <TableHead className="hidden md:table-cell">Issued</TableHead>
                <TableHead className="hidden md:table-cell">Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map(inv => <InvoiceRow key={inv.id} invoice={inv} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientInvoices;
