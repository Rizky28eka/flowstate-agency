import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import api from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    Search,
    FileText,
    Download,
    Eye,
    CheckCircle2,
    Clock,
    AlertCircle,
    XCircle,
    Plus,
    Filter
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import InvoiceDialog from "@/components/dashboard/InvoiceDialog";

interface InvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
}

interface Invoice {
    id: string;
    invoiceNumber: string;
    total: number;
    status: string;
    dueDate: string;
    description?: string;
    clientId: string;
    projectId?: string;
    client: { name: string };
    project?: { name: string };
    items?: InvoiceItem[];
}

const InvoicesPage = () => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

    const { data: response, isLoading } = useQuery({
        queryKey: ["invoices"],
        queryFn: () => api.get("/invoices"),
    });

    const invoices = response?.data || [];

    const createMutation = useMutation({
        mutationFn: (data: Partial<Invoice>) => api.post("/invoices", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
            toast.success("Invoice created successfully");
            setIsCreateModalOpen(false);
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<Invoice> }) => api.patch(`/invoices/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
            toast.success("Invoice updated successfully");
            setIsEditModalOpen(false);
            setSelectedInvoice(null);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/invoices/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
            toast.success("Invoice deleted successfully");
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) =>
            api.patch(`/invoices/${id}/status`, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
            toast.success("Invoice status updated");
        }
    });

    const filteredInvoices = invoices.filter((inv: Invoice) =>
        inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
        inv.client?.name.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusStyle = (status: string) => {
        switch (status.toUpperCase()) {
            case 'PAID': return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case 'PENDING': return "bg-amber-500/10 text-amber-500 border-amber-500/20";
            case 'OVERDUE': return "bg-rose-500/10 text-rose-500 border-rose-500/20";
            case 'CANCELLED': return "bg-gray-500/10 text-gray-500 border-gray-500/20";
            default: return "bg-blue-500/10 text-blue-500 border-blue-500/20";
        }
    };

    const openEditModal = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setIsEditModalOpen(true);
    };

    const handleCreateInvoice = (values: Partial<Invoice>) => {
        createMutation.mutate(values);
    };

    const handleUpdateInvoice = (values: Partial<Invoice>) => {
        if (selectedInvoice) {
            updateMutation.mutate({ id: selectedInvoice.id, data: values });
        }
    };

    return (
        <DashboardLayout>
            <DashboardPageHeader
                title="Invoices"
                description="Manage billing and track payments."
                actionLabel="Create Invoice"
                onAction={() => setIsCreateModalOpen(true)}
            />

            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by invoice number or client..."
                            className="pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>
                </div>

                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton key={i} className="h-20 w-full rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <Card className="border-border/50 bg-background/50 backdrop-blur-sm shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Invoice</th>
                                        <th className="px-6 py-4 font-semibold">Client</th>
                                        <th className="px-6 py-4 font-semibold">Amount</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold">Due Date</th>
                                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {filteredInvoices.map((inv: Invoice) => (
                                        <tr key={inv.id} className="hover:bg-muted/20 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                                                        <FileText className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-foreground">#{inv.invoiceNumber}</p>
                                                        <p className="text-[10px] text-muted-foreground uppercase font-medium">{inv.project?.name || 'No Project'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-muted-foreground">{inv.client?.name}</td>
                                            <td className="px-6 py-4 font-bold text-foreground">
                                                ${inv.total?.toLocaleString() || '0'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant="outline" className={cn("px-2 py-0.5 font-bold text-[10px] uppercase border", getStatusStyle(inv.status))}>
                                                    {inv.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground font-medium">
                                                {new Date(inv.dueDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                        <Download className="w-4 h-4" />
                                                    </Button>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreHorizontal className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem className="gap-2" onClick={() => openEditModal(inv)}>
                                                                <Eye className="w-4 h-4" /> View / Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="gap-2 text-emerald-500 focus:text-emerald-500"
                                                                onClick={() => updateStatusMutation.mutate({ id: inv.id, status: 'PAID' })}
                                                            >
                                                                <CheckCircle2 className="w-4 h-4" /> Mark as Paid
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="gap-2 text-rose-500 focus:text-rose-500"
                                                                onClick={() => {
                                                                    if (confirm("Delete invoice?")) deleteMutation.mutate(inv.id);
                                                                }}
                                                            >
                                                                <XCircle className="w-4 h-4" /> Delete Invoice
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredInvoices.length === 0 && (
                            <div className="py-20 text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                                    <FileText className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-bold">No invoices found</h3>
                                <p className="text-muted-foreground max-w-xs mx-auto mt-1">
                                    {search ? "No results match your search criteria." : "Get started by creating your first invoice."}
                                </p>
                                {!search && (
                                    <Button className="mt-6 gap-2" onClick={() => setIsCreateModalOpen(true)}>
                                        <Plus className="w-4 h-4" />
                                        New Invoice
                                    </Button>
                                )}
                            </div>
                        )}
                    </Card>
                )}
            </div>

            {/* Modals */}
            <InvoiceDialog
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                onSubmit={handleCreateInvoice}
                title="Create New Invoice"
            />

            <InvoiceDialog
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                onSubmit={handleUpdateInvoice}
                initialData={selectedInvoice}
                title="Invoice Details"
            />
        </DashboardLayout>
    );
};

export default InvoicesPage;
