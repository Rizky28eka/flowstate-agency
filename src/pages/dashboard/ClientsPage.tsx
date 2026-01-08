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
    Mail,
    Phone,
    Globe,
    Building2,
    Calendar,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ClientDialog from "@/components/dashboard/ClientDialog";

interface Client {
    id: string;
    name: string;
    email: string;
    phone?: string;
    website?: string;
    companyName?: string;
    status: string;
    createdAt: string;
    activeProjects?: number;
}

const ClientsPage = () => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const { data: response, isLoading } = useQuery({
        queryKey: ["clients"],
        queryFn: () => api.get("/clients"),
    });

    const clients = response?.data || [];

    const createMutation = useMutation({
        mutationFn: (data: Partial<Client>) => api.post("/clients", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            toast.success("Client added successfully");
            setIsCreateModalOpen(false);
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<Client> }) => api.patch(`/clients/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            toast.success("Client updated successfully");
            setIsEditModalOpen(false);
            setSelectedClient(null);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/clients/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            toast.success("Client deleted successfully");
        }
    });

    const filteredClients = clients.filter((c: Client) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.companyName?.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    const openEditModal = (client: Client) => {
        setSelectedClient(client);
        setIsEditModalOpen(true);
    };

    return (
        <DashboardLayout>
            <DashboardPageHeader
                title="Clients"
                description="Manage your customer relationships and contact information."
                actionLabel="Add Client"
                onAction={() => setIsCreateModalOpen(true)}
            />

            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, company or email..."
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
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Skeleton key={i} className="h-48 w-full rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredClients.map((client: Client) => (
                            <Card key={client.id} className="group border-border/50 hover:border-primary/50 transition-all hover:shadow-lg bg-background/50 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
                                                <AvatarImage src={`https://avatar.vercel.sh/${client.email}`} />
                                                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                                    {client.name.substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{client.name}</h3>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                                    <Badge variant="secondary" className="px-1.5 py-0 font-bold text-[9px] uppercase">
                                                        {client.status}
                                                    </Badge>
                                                    <span>•</span>
                                                    <span>{client.activeProjects || 0} active projects</span>
                                                </div>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => openEditModal(client)}>Edit Profile</DropdownMenuItem>
                                                <DropdownMenuItem>View Projects</DropdownMenuItem>
                                                <DropdownMenuItem>Send Message</DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive"
                                                    onClick={() => {
                                                        if (confirm("Are you sure?")) deleteMutation.mutate(client.id);
                                                    }}
                                                >
                                                    Delete Client
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Building2 className="w-4 h-4 shrink-0" />
                                            <span className="truncate">{client.companyName || 'Freelance / Individual'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Mail className="w-4 h-4 shrink-0" />
                                            <span className="truncate">{client.email}</span>
                                        </div>
                                        {client.phone && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Phone className="w-4 h-4 shrink-0" />
                                                <span>{client.phone}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                                            <Calendar className="w-3 h-3" />
                                            Since {new Date(client.createdAt).toLocaleDateString()}
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 text-[11px] font-bold uppercase tracking-wider hover:bg-primary/10 hover:text-primary" onClick={() => openEditModal(client)}>
                                            View Profile
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            <ClientDialog
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                onSubmit={(values) => createMutation.mutate(values)}
                title="Add New Client"
            />

            <ClientDialog
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                onSubmit={(values) => updateMutation.mutate({ id: selectedClient!.id, data: values })}
                initialData={selectedClient}
                title="Edit Client Details"
            />
        </DashboardLayout>
    );
};

export default ClientsPage;

