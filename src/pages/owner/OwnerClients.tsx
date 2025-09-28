import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Handshake, Search, Plus, Star, TrendingUp, Users, ArrowUpDown, DollarSign } from "lucide-react";
import { clients as initialClients } from "@/lib/mock-data";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useState, useMemo, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";

// ==== Types ====
// ... (Types remain the same)

const AddClientForm = ({ onAddClient }) => {
    const [name, setName] = useState('');
    const [industry, setIndustry] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        if (!name || !industry || !contact || !email) return;
        const newClient = {
            id: `CLI-${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
            name,
            industry,
            contact,
            email,
            status: 'Onboarding',
            avatar: '/api/placeholder/40/40',
            projects: 0,
            totalBilled: 0,
            satisfaction: 0,
            joinDate: new Date().toISOString().split('T')[0],
            lastContact: new Date().toISOString().split('T')[0],
        };
        onAddClient(newClient);
    };

    return (
        <div className="grid gap-4 py-4">
            <Input placeholder="Client Name" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="Industry" value={industry} onChange={e => setIndustry(e.target.value)} />
            <Input placeholder="Contact Person" value={contact} onChange={e => setContact(e.target.value)} />
            <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <DialogFooter><DialogClose asChild><Button onClick={handleSubmit}>Add Client</Button></DialogClose></DialogFooter>
        </div>
    );
};

// ==== Component ====
const OwnerClients = () => {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "totalBilled", direction: "desc" });

  const handleAddClient = (newClient) => {
    setClients(prev => [newClient, ...prev]);
  };

  const getStatusBadge = (status) => {
    // ... (same as before)
  };

  const sortedClients = useMemo(() => [...clients].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  }), [clients, sortConfig]);

  const filteredClients = useMemo(() => sortedClients.filter((client) => {
    const term = searchTerm.toLowerCase();
    return term === "" || client.name.toLowerCase().includes(term) || client.contact.toLowerCase().includes(term) || client.industry.toLowerCase().includes(term);
  }), [sortedClients, searchTerm]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const industryData = useMemo(() => Object.values(clients.reduce((acc, client) => {
      const industry = client.industry;
      if (!acc[industry]) acc[industry] = { name: industry, value: 0, color: `hsl(${Object.keys(acc).length * 60}, 70%, 50%)` };
      acc[industry].value += 1;
      return acc;
    }, {})), [clients]);

  const summaryStats = useMemo(() => ({
      totalClients: clients.length,
      avgSatisfaction: (clients.reduce((sum, client) => sum + client.satisfaction, 0) / clients.length).toFixed(1),
  }), [clients]);

  return (
    <main className="flex-1 px-4 sm:px-6 py-4 sm:py-8 bg-background">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Client Relations</h1>
          <p className="text-sm text-muted-foreground">Manage and grow client partnerships</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" /> 
              Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>Fill in the details for the new client.</DialogDescription>
            </DialogHeader>
            <AddClientForm onAddClient={handleAddClient} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">{summaryStats.totalClients}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Satisfaction</CardTitle>
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">{summaryStats.avgSatisfaction}/5</div>
            <p className="text-xs text-muted-foreground">{clients.length} reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Retention</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">+3% YoY</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Lifetime Value</CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">$82K</div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 sm:mb-8">
        <Card className="lg:col-span-2 order-2 lg:order-1">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Key Accounts</CardTitle>
            <CardDescription>Top clients by total billed amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {sortedClients.slice(0, 3).map((client) => (
                <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm sm:text-base truncate">{client.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{client.industry}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm sm:text-lg text-primary">${client.totalBilled.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{client.projects} projects</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="order-1 lg:order-2">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Client Segmentation</CardTitle>
            <CardDescription>Distribution by industry</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-48 sm:h-64 w-full" config={{}}>
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
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg sm:text-xl">Client Directory</CardTitle>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search clients..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="pl-10 w-full sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  <th className="text-left p-2 sm:p-3 font-medium min-w-[200px]">
                    <Button variant="ghost" onClick={() => handleSort("name")} className="text-xs sm:text-sm">
                      Client <ArrowUpDown className="w-3 h-3 ml-1" />
                    </Button>
                  </th>
                  <th className="text-left p-2 sm:p-3 font-medium">
                    <Button variant="ghost" onClick={() => handleSort("status")} className="text-xs sm:text-sm">
                      Status <ArrowUpDown className="w-3 h-3 ml-1" />
                    </Button>
                  </th>
                  <th className="text-left p-2 sm:p-3 font-medium hidden sm:table-cell">Contact</th>
                  <th className="text-left p-2 sm:p-3 font-medium">
                    <Button variant="ghost" onClick={() => handleSort("totalBilled")} className="text-xs sm:text-sm">
                      Billed <ArrowUpDown className="w-3 h-3 ml-1" />
                    </Button>
                  </th>
                  <th className="text-left p-2 sm:p-3 font-medium hidden lg:table-cell">
                    <Button variant="ghost" onClick={() => handleSort("satisfaction")} className="text-xs sm:text-sm">
                      Rating <ArrowUpDown className="w-3 h-3 ml-1" />
                    </Button>
                  </th>
                  <th className="text-right p-2 sm:p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="border-b hover:bg-muted/50">
                    <td className="p-2 sm:p-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                          <AvatarImage src={client.avatar} alt={client.name} />
                          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-xs sm:text-sm truncate">{client.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{client.industry}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 sm:p-3">
                      <Badge className={getStatusBadge(client.status)} variant="secondary">
                        {client.status}
                      </Badge>
                    </td>
                    <td className="p-2 sm:p-3 hidden sm:table-cell">
                      <div>
                        <p className="font-medium text-sm">{client.contact}</p>
                        <p className="text-xs text-muted-foreground truncate">{client.email}</p>
                      </div>
                    </td>
                    <td className="p-2 sm:p-3">
                      <p className="font-medium text-xs sm:text-sm">${client.totalBilled.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{client.projects} projects</p>
                    </td>
                    <td className="p-2 sm:p-3 hidden lg:table-cell">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                        <span className="font-medium text-sm">{client.satisfaction}</span>
                      </div>
                    </td>
                    <td className="p-2 sm:p-3 text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/dashboard/owner/clients/${client.id}`}>
                          <span className="hidden sm:inline">View Details</span>
                          <span className="sm:hidden">View</span>
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