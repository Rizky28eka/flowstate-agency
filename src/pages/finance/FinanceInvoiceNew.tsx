
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { clients, projects, settings } from "@/lib/mock-data";
import { Plus, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const FinanceInvoiceNew = () => {
  const navigate = useNavigate();
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [availableProjects, setAvailableProjects] = useState<typeof projects>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [issuedAt, setIssuedAt] = useState<Date | undefined>(new Date());
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [lineItems, setLineItems] = useState([{ description: "", quantity: 1, rate: 0, amount: 0 }]);

  useEffect(() => {
    if (selectedClientId) {
      setAvailableProjects(projects.filter(p => p.clientId === selectedClientId));
      setSelectedProjectId("");
    } else {
      setAvailableProjects([]);
    }
  }, [selectedClientId]);

  const handleLineItemChange = (index, field, value) => {
    const updatedLineItems = [...lineItems];
    const item = updatedLineItems[index];
    item[field] = value;
    if (field === 'quantity' || field === 'rate') {
        item.amount = (item.quantity || 0) * (item.rate || 0);
    }
    setLineItems(updatedLineItems);
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { description: "", quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeLineItem = (index) => {
    const updatedLineItems = lineItems.filter((_, i) => i !== index);
    setLineItems(updatedLineItems);
  };

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const taxRate = settings.billing.taxRate / 100;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const handleSaveInvoice = () => {
    // In a real app, this would send data to a server.
    // Here, we'll just log it and navigate back.
    const newInvoice = {
        id: `INV-${String(Math.random()).slice(2, 7)}`,
        projectId: selectedProjectId,
        projectName: projects.find(p => p.id === selectedProjectId)?.name,
        invoiceNumber: `AGF-2024-${String(Math.random()).slice(2, 6)}`,
        issuedAt: issuedAt ? format(issuedAt, "yyyy-MM-dd") : "",
        dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : "",
        status: "Draft",
        amount: total,
        items: lineItems,
    };
    console.log("New Invoice Created:", newInvoice);
    // We can't easily modify the mock data file, so we navigate back.
    // In a real app, you'd invalidate queries or update state.
    alert("New invoice created (see console for data). You would now see this in the list if we had a database.");
    navigate("/dashboard/finance/invoices");
  };

  return (
    <main className="flex-1 px-6 py-8 bg-background">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Create New Invoice</h1>
        <Button onClick={() => navigate("/dashboard/finance/invoices")} variant="outline">Cancel</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader><CardTitle>Invoice Details</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="font-medium">Client</label>
                        <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                            <SelectTrigger><SelectValue placeholder="Select a client..." /></SelectTrigger>
                            <SelectContent>
                                {clients.map(client => <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="font-medium">Project</label>
                        <Select value={selectedProjectId} onValueChange={setSelectedProjectId} disabled={!selectedClientId}>
                            <SelectTrigger><SelectValue placeholder="Select a project..." /></SelectTrigger>
                            <SelectContent>
                                {availableProjects.map(project => <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="font-medium">Issue Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant={"outline"} className="w-full justify-start font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {issuedAt ? format(issuedAt, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={issuedAt} onSelect={setIssuedAt} initialFocus /></PopoverContent>
                        </Popover>
                    </div>
                    <div>
                        <label className="font-medium">Due Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant={"outline"} className="w-full justify-start font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus /></PopoverContent>
                        </Popover>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Line Items</CardTitle>
                    <Button variant="outline" size="sm" onClick={addLineItem}><Plus className="w-4 h-4 mr-2"/>Add Item</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-2/5">Description</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Rate</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lineItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell><Input placeholder="Service description" value={item.description} onChange={e => handleLineItemChange(index, 'description', e.target.value)} /></TableCell>
                                    <TableCell><Input type="number" placeholder="1" value={item.quantity} onChange={e => handleLineItemChange(index, 'quantity', parseFloat(e.target.value))} /></TableCell>
                                    <TableCell><Input type="number" placeholder="100" value={item.rate} onChange={e => handleLineItemChange(index, 'rate', parseFloat(e.target.value))} /></TableCell>
                                    <TableCell className="text-right font-medium">${item.amount.toFixed(2)}</TableCell>
                                    <TableCell><Button variant="ghost" size="icon" onClick={() => removeLineItem(index)}><Trash2 className="w-4 h-4 text-destructive"/></Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
            <Card>
                <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between"><span>Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Tax ({settings.billing.taxRate}%)</span><span className="font-medium">${taxAmount.toFixed(2)}</span></div>
                    <div className="border-t my-2"></div>
                    <div className="flex justify-between text-lg font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </CardContent>
            </Card>
            <Button size="lg" className="w-full" onClick={handleSaveInvoice}>Save Invoice</Button>
        </div>
      </div>
    </main>
  );
};

export default FinanceInvoiceNew;
