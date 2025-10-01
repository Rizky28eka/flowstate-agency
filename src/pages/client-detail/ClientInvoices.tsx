
import { useOutletContext } from "react-router-dom";
import type { Client, Invoice } from "@/types";
import { invoices as allInvoices, projects } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ClientContext {
  client: Client;
}

const ClientInvoices = () => {
  const { client } = useOutletContext<ClientContext>();
  const clientProjectIds = new Set(projects.filter(p => p.clientId === client.id).map(p => p.id));
  const clientInvoices = allInvoices.filter((inv) => clientProjectIds.has(inv.projectId));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Paid": return "default";
      case "Pending": return "secondary";
      case "Draft": return "outline";
      default: return "outline";
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoices for {client.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Issued At</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientInvoices.length > 0 ? (
              clientInvoices.map((invoice: Invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(invoice.status)}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>{invoice.issuedAt}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">No invoices found for this client.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClientInvoices;
