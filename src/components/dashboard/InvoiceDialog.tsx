import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useEffect } from "react";
import { Trash2, Plus } from "lucide-react";

import { Project, Client, Invoice } from "@/types";

const invoiceSchema = z.object({
    invoiceNumber: z.string().min(1, "Invoice number is required"),
    projectId: z.string().min(1, "Project is required"),
    clientId: z.string().min(1, "Client is required"),
    status: z.enum(["DRAFT", "SENT", "VIEWED", "PAID", "OVERDUE", "CANCELLED"]),
    dueDate: z.string().min(1, "Due date is required"),
    items: z.array(z.object({
        description: z.string().min(1, "Description is required"),
        quantity: z.coerce.number().min(1),
        unitPrice: z.coerce.number().min(0),
    })).min(1, "At least one item is required"),
    notes: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

interface InvoiceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: InvoiceFormValues) => void;
    initialData?: Invoice;
    title: string;
}

const InvoiceDialog = ({ open, onOpenChange, onSubmit, initialData, title }: InvoiceDialogProps) => {
    const form = useForm<InvoiceFormValues>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
            projectId: "",
            clientId: "",
            status: "DRAFT",
            dueDate: new Date().toISOString().split('T')[0],
            items: [{ description: "", quantity: 1, unitPrice: 0 }],
            notes: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const { data: projectsRes } = useQuery({ queryKey: ["projects"], queryFn: () => api.get("/projects") });
    const { data: clientsRes } = useQuery({ queryKey: ["clients"], queryFn: () => api.get("/clients") });

    useEffect(() => {
        if (initialData) {
            form.reset({
                invoiceNumber: initialData.invoiceNumber,
                projectId: initialData.projectId,
                clientId: initialData.clientId,
                status: initialData.status,
                dueDate: new Date(initialData.dueDate).toISOString().split('T')[0],
                items: initialData.items?.length ? initialData.items : [{ description: "", quantity: 1, unitPrice: 0 }],
                notes: initialData.notes || "",
            });
        }
    }, [initialData, form, open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] border-border/50 bg-background/95 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black tracking-tight">{title}</DialogTitle>
                    <DialogDescription>
                        Create professional invoices for your clients.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="invoiceNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Invoice #</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="bg-background/50" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-background/50">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="DRAFT">Draft</SelectItem>
                                                <SelectItem value="SENT">Sent</SelectItem>
                                                <SelectItem value="VIEWED">Viewed</SelectItem>
                                                <SelectItem value="PAID">Paid</SelectItem>
                                                <SelectItem value="OVERDUE">Overdue</SelectItem>
                                                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="clientId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Client</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-background/50">
                                                    <SelectValue placeholder="Select client" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {clientsRes?.data?.map((c: Client) => (
                                                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="projectId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Project</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-background/50">
                                                    <SelectValue placeholder="Select project" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {projectsRes?.data?.map((p: Project) => (
                                                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Due Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} className="bg-background/50 w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Items Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black uppercase tracking-widest text-primary">Invoice Items</h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="h-7 text-[10px] font-bold uppercase tracking-wider"
                                    onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })}
                                >
                                    <Plus className="w-3 h-3 mr-1" /> Add Item
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="grid grid-cols-12 gap-3 items-start bg-muted/20 p-3 rounded-lg border border-border/50">
                                        <div className="col-span-6">
                                            <FormField
                                                control={form.control}
                                                name={`items.${index}.description`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder="Description" {...field} className="h-8 text-xs bg-background/50" />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <FormField
                                                control={form.control}
                                                name={`items.${index}.quantity`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input type="number" placeholder="Qty" {...field} className="h-8 text-xs bg-background/50" />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <FormField
                                                control={form.control}
                                                name={`items.${index}.unitPrice`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input type="number" placeholder="Price" {...field} className="h-8 text-xs bg-background/50" />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="col-span-1 flex justify-end pt-1">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 text-destructive"
                                                onClick={() => remove(index)}
                                                disabled={fields.length === 1}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <DialogFooter className="pt-4">
                            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                            <Button type="submit" className="font-black px-8">
                                {initialData ? "Update Invoice" : "Create Invoice"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default InvoiceDialog;
