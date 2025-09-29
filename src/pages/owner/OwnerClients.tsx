import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Search,
  Plus,
  Star,
  TrendingUp,
  Users,
  ArrowUpDown,
  DollarSign,
} from "lucide-react";
import { clients as initialClients } from "@/lib/mock-data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface Client {
  id: string;
  name: string;
  industry: string;
  contact: string;
  email: string;
  status: string;
  avatar: string;
  projects: number;
  totalBilled: number;
  satisfaction: number;
  joinDate: string;
  lastContact: string;
}

// ==== Add Client Form ====
const AddClientForm = ({ onAddClient }: { onAddClient: (c: Client) => void }) => {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!name || !industry || !contact || !email) return;
    const newClient = {
      id: `CLI-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      name,
      industry,
      contact,
      email,
      status: "Onboarding",
      avatar: "/api/placeholder/40/40",
      projects: 0,
      totalBilled: 0,
      satisfaction: 0,
      joinDate: new Date().toISOString().split("T")[0],
      lastContact: new Date().toISOString().split("T")[0],
    };
    onAddClient(newClient);
  };

  return (
    <div className="grid gap-4 py-4">
      <Input
        placeholder="Client Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Industry"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
      />
      <Input
        placeholder="Contact Person"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={handleSubmit}>Add Client</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
};

// ==== Main Component ====
const OwnerClients = () => {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof typeof initialClients[0];
    direction: "asc" | "desc";
  }>({ key: "totalBilled", direction: "desc" });

  const handleAddClient = (newClient: Client) => {
    setClients((prev) => [newClient, ...prev]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Onboarding":
        return "bg-blue-100 text-blue-700";
      case "Churn Risk":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const sortedClients = useMemo(() => {
    return [...clients].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [clients, sortConfig]);

  const filteredClients = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return sortedClients.filter(
      (client) =>
        term === "" ||
        client.name.toLowerCase().includes(term) ||
        client.contact.toLowerCase().includes(term) ||
        client.industry.toLowerCase().includes(term)
    );
  }, [sortedClients, searchTerm]);

  const handleSort = (key: keyof typeof initialClients[0]) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  const industryData = useMemo(
    () =>
      Object.values(
        clients.reduce((acc: { [key: string]: { name: string; value: number; color: string } }, client: Client) => {
          const industry = client.industry;
          if (!acc[industry]) {
            acc[industry] = {
              name: industry,
              value: 0,
              color: `hsl(${Object.keys(acc).length * 60}, 70%, 50%)`,
            };
          }
          acc[industry].value += 1;
          return acc;
        }, {})
      ),
    [clients]
  );

  const summaryStats = useMemo(() => {
    const avg =
      clients.length > 0
        ? (clients.reduce((sum, c) => sum + c.satisfaction, 0) /
            clients.length).toFixed(1)
        : "0";
    return {
      totalClients: clients.length,
      avgSatisfaction: avg,
    };
  }, [clients]);

  const isMobile = window.innerWidth < 640;

  return (
    <main className="flex-1 px-4 sm:px-6 py-4 sm:py-8 bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Client Relations</h1>
          <p className="text-sm text-muted-foreground">
            Manage and grow client partnerships
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Fill in the details for the new client.
              </DialogDescription>
            </DialogHeader>
            <AddClientForm onAddClient={handleAddClient} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryStats.totalClients}
            </div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryStats.avgSatisfaction}/5
            </div>
            <p className="text-xs text-muted-foreground">
              {clients.length} reviews
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Retention</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">+3% YoY</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Lifetime Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$82K</div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts + Key Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Key Accounts</CardTitle>
            <CardDescription>Top clients by billed amount</CardDescription>
          </CardHeader>
          <CardContent>
            {sortedClients.slice(0, 3).map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-3 border rounded-lg mb-3 hover:bg-muted/50"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={client.avatar} />
                    <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{client.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {client.industry}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">
                    ${client.totalBilled.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {client.projects} projects
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Client Segmentation</CardTitle>
            <CardDescription>By industry</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-64 w-full" config={{}}>
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={industryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={isMobile ? 60 : 80}
                  label
                >
                  {industryData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Directory */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Client Directory</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("name")}
                      className="text-sm"
                    >
                      Client <ArrowUpDown className="w-3 h-3 ml-1" />
                    </Button>
                  </th>
                  <th className="text-left p-3">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("status")}
                      className="text-sm"
                    >
                      Status <ArrowUpDown className="w-3 h-3 ml-1" />
                    </Button>
                  </th>
                  <th className="text-left p-3 hidden sm:table-cell">Contact</th>
                  <th className="text-left p-3">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("totalBilled")}
                      className="text-sm"
                    >
                      Billed <ArrowUpDown className="w-3 h-3 ml-1" />
                    </Button>
                  </th>
                  <th className="text-left p-3 hidden lg:table-cell">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("satisfaction")}
                      className="text-sm"
                    >
                      Rating <ArrowUpDown className="w-3 h-3 ml-1" />
                    </Button>
                  </th>
                  <th className="text-right p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={client.avatar} />
                          <AvatarFallback>
                            {client.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{client.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {client.industry}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusBadge(client.status)}>
                        {client.status}
                      </Badge>
                    </td>
                    <td className="p-3 hidden sm:table-cell">
                      <p className="font-medium">{client.contact}</p>
                      <p className="text-xs text-muted-foreground">
                        {client.email}
                      </p>
                    </td>
                    <td className="p-3">
                      <p className="font-medium">
                        ${client.totalBilled.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {client.projects} projects
                      </p>
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span>{client.satisfaction}</span>
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/dashboard/owner/clients/${client.id}`}>
                          View
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default OwnerClients;