import { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInvoiceDetails, InvoiceDetails } from '@/lib/invoice-detail';
import { Button } from '@/components/ui/button';
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
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Printer, Download, CreditCard } from 'lucide-react';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const ClientInvoiceDetail = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();

  const invoice = useMemo(() => 
    invoiceId ? getInvoiceDetails(invoiceId) : null
  , [invoiceId]);

  useEffect(() => {
    if (!invoice) {
      // navigate('/dashboard/client/invoices');
    }
  }, [invoice, navigate]);

  if (!invoice) {
    return <div>Loading invoice...</div>;
  }

  const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = subtotal * 0.11; // Mock 11% tax
  const total = subtotal + taxAmount;

  const isPaid = invoice.status === 'Paid';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/client/invoices')}><ArrowLeft className="h-4 w-4" /></Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Invoice {invoice.invoiceNumber}</h1>
            <p className="text-muted-foreground">Issued on {invoice.issuedAt}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4 mr-2"/>Print</Button>
          <Button variant="outline"><Download className="h-4 w-4 mr-2"/>Download PDF</Button>
          <Button onClick={() => alert('Redirecting to payment gateway...')} disabled={isPaid}>
            <CreditCard className="h-4 w-4 mr-2"/> {isPaid ? 'Already Paid' : 'Pay Now'}
          </Button>
        </div>
      </div>

      <Card className="p-8 print:shadow-none print:border-none">
        {/* Invoice Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold">{invoice.agencyDetails.name}</h2>
            <p className="text-muted-foreground">{invoice.agencyDetails.address}</p>
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-extrabold uppercase text-primary">Invoice</h1>
            <p className="text-muted-foreground"># {invoice.invoiceNumber}</p>
            <Badge variant={isPaid ? 'default' : 'destructive'} className="mt-2 text-base">{invoice.status}</Badge>
          </div>
        </div>

        {/* Bill To & Dates */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <p className="text-muted-foreground font-semibold">BILL TO</p>
            <p className="font-medium">{invoice.clientDetails.name}</p>
            <p>{invoice.clientDetails.address}</p>
          </div>
          <div className="text-right space-y-1">
            <p><span className="font-semibold">Issue Date:</span> {invoice.issuedAt}</p>
            <p><span className="font-semibold">Due Date:</span> {invoice.dueDate}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-right">Rate</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.description}</TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.rate)}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Separator className="my-8" />

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span>Tax (11%)</span><span>{formatCurrency(taxAmount)}</span></div>
            <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Grand Total</span><span>{formatCurrency(total)}</span></div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-muted-foreground text-sm">
          <p>Thank you for your business!</p>
          <p>Payment is due within 30 days. Please make payments to Bank Central Asia 123-456-7890.</p>
        </div>
      </Card>
    </div>
  );
};

export default ClientInvoiceDetail;
