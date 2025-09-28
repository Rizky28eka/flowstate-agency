import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contracts as initialContracts, clients } from '@/lib/mock-data';
import { FileText, Download, CircleAlert, CheckCircle, Archive, Plus } from 'lucide-react';

const statusConfig = {
  Active: { icon: CheckCircle, color: "bg-green-100 text-green-800" },
  "Expiring Soon": { icon: CircleAlert, color: "bg-yellow-100 text-yellow-800" },
  Expired: { icon: Archive, color: "bg-gray-100 text-gray-800" },
};

const AddContractForm = ({ onAddContract }) => {
  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [value, setValue] = useState(0);
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    if (!title || !clientId || !endDate) return;
    const client = clients.find(c => c.id === clientId);
    const newContract = {
      id: `CTR-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      title,
      clientName: client?.name || 'N/A',
      clientId,
      status: 'Active',
      startDate: new Date().toISOString().split('T')[0],
      endDate,
      renewalDate: new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 30)).toISOString().split('T')[0],
      value,
      documentUrl: "/mock-document.pdf",
    };
    onAddContract(newContract);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">Contract Title</Label>
        <Input id="title" value={title} onChange={e => setTitle(e.target.value)} className="col-span-3" placeholder="e.g., Master Service Agreement" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="client" className="text-right">Client</Label>
        <Select onValueChange={setClientId} defaultValue={clientId}>
          <SelectTrigger className="col-span-3"><SelectValue placeholder="Select a client" /></SelectTrigger>
          <SelectContent>
            {clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="value" className="text-right">Value ($)</Label>
        <Input id="value" type="number" value={value} onChange={e => setValue(parseFloat(e.target.value))} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="end-date" className="text-right">End Date</Label>
        <Input id="end-date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="col-span-3" />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={handleSubmit}>Add Contract</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const OwnerContractManagement = () => {
  const [contracts, setContracts] = useState(initialContracts);

  const summary = useMemo(() => {
    const activeContracts = contracts.filter(c => c.status === 'Active').length;
    const expiringSoon = contracts.filter(c => c.status === 'Expiring Soon').length;
    const totalValue = contracts.reduce((sum, c) => c.status === 'Active' ? sum + c.value : sum, 0);
    return { activeContracts, expiringSoon, totalValue };
  }, [contracts]);

  const handleAddContract = (newContract) => {
    setContracts(prev => [newContract, ...prev]);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Contract Management</h1>
          <p className="text-gray-500">A central repository for all client and vendor contracts.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Add New Contract</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Contract</DialogTitle></DialogHeader>
            <AddContractForm onAddContract={handleAddContract} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <StatCard title="Active Contracts" value={summary.activeContracts} icon={FileText} />
        <StatCard title="Expiring Soon" value={summary.expiringSoon} icon={CircleAlert} />
        <StatCard 
          title="Total Active Contract Value"
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(summary.totalValue)}
          icon={FileText}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contract Repository</CardTitle>
          <CardDescription>List of all legal agreements.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract Title</TableHead>
                <TableHead>Client / Vendor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => {
                const config = statusConfig[contract.status] || { icon: FileText, color: "bg-gray-100 text-gray-800" };
                const Icon = config.icon;
                return (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.title}</TableCell>
                    <TableCell>{contract.clientName}</TableCell>
                    <TableCell>
                      <Badge className={config.color}>
                        <Icon className="h-3 w-3 mr-1" />
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{contract.endDate}</TableCell>
                    <TableCell>{contract.renewalDate || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <a href={contract.documentUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2"/> View
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerContractManagement;
