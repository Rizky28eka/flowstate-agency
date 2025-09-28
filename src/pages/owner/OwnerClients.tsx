
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Handshake, Search, Plus, Star, TrendingUp, Users, MessageSquare, Filter, Mail, Phone, Globe, ArrowUpDown, DollarSign } from "lucide-react";
import { useState } from "react";
import { clients } from "@/lib/mock-data";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

const OwnerClients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'totalBilled', direction: 'desc' });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Onboarding": return "bg-blue-100 text-blue-800";
      case "Churned": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const sortedClients = [...clients].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredClients = sortedClients.filter(client => {
    const searchTermLower = searchTerm.toLowerCase();
    return searchTermLower === "" ||
      client.name.toLowerCase().includes(searchTermLower) ||
      client.contact.toLowerCase().includes(searchTermLower) ||
      client.industry.toLowerCase().includes(searchTermLower);
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const industryData = clients.reduce((acc, client) => {
    const industry = client.industry;
    if (!acc[industry]) {
      acc[industry] = { name: industry, value: 1, color: `hsl(${Object.keys(acc).length * 60}, 70%, 50%)` };
    } else {
      acc[industry].value += 1;
    }
    return acc;
  }, {});

  return (
    <main className="flex-1 px-6 py-8 overflow-auto bg-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Handshake className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Client Relations</h1>
            <p className="text-sm text-muted-foreground">Manage and grow client partnerships</p>
          </div>
        </div>
        <Button><Plus className="w-4 h-4 mr-2" /> Add New Client</Button>
      </div>

      {/* Client Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Clients</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{clients.length}</div><p className="text-xs text-muted-foreground">+2 this month</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Avg. Satisfaction</CardTitle><Star className="h-4 w-4 text-amber-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{(clients.reduce((sum, client) => sum + client.satisfaction, 0) / clients.length).toFixed(1)} / 5.0</div><p className="text-xs text-muted-foreground">Based on {clients.length} reviews</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Retention Rate</CardTitle><TrendingUp className="h-4 w-4 text-green-600" /></CardHeader><CardContent><div className="text-2xl font-bold">89%</div><p className="text-xs text-muted-foreground">Up 3% from last year</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Avg. Lifetime Value</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">$82,450</div><p className="text-xs text-muted-foreground">Increasing Y-o-Y</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Key Accounts</CardTitle>
                <CardDescription>Top clients by total billed amount.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {filteredClients.slice(0, 3).map(client => (
                        <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                            <div className="flex items-center space-x-4">
                                <Avatar className="w-10 h-10"><AvatarImage src={client.avatar} /><AvatarFallback>{client.name.charAt(0)}</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-semibold">{client.name}</p>
                                    <p className="text-sm text-muted-foreground">{client.industry}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-primary">${client.totalBilled.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">{client.projects} projects</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Client Segmentation</CardTitle>
                <CardDescription>Distribution by industry.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer className="h-64 w-full" config={{}}>
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie data={Object.values(industryData)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                            {Object.values(industryData).map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

      {/* Client List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <CardTitle>Client Directory</CardTitle>
            <div className="relative mt-4 sm:mt-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search clients..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-full sm:w-64"/>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  <th className="text-left p-3 font-medium"><Button variant="ghost" onClick={() => handleSort('name')}>Client <ArrowUpDown className="w-3 h-3 ml-1"/></Button></th>
                  <th className="text-left p-3 font-medium"><Button variant="ghost" onClick={() => handleSort('status')}>Status <ArrowUpDown className="w-3 h-3 ml-1"/></Button></th>
                  <th className="text-left p-3 font-medium">Contact Person</th>
                  <th className="text-left p-3 font-medium"><Button variant="ghost" onClick={() => handleSort('totalBilled')}>Total Billed <ArrowUpDown className="w-3 h-3 ml-1"/></Button></th>
                  <th className="text-left p-3 font-medium"><Button variant="ghost" onClick={() => handleSort('satisfaction')}>Satisfaction <ArrowUpDown className="w-3 h-3 ml-1"/></Button></th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10"><AvatarImage src={client.avatar} alt={client.name} /><AvatarFallback>{client.name.charAt(0)}</AvatarFallback></Avatar>
                        <div><p className="font-semibold">{client.name}</p><p className="text-xs text-muted-foreground">{client.industry}</p></div>
                      </div>
                    </td>
                    <td className="p-3"><Badge className={getStatusBadge(client.status)}>{client.status}</Badge></td>
                    <td className="p-3"><div><p className="font-medium">{client.contact}</p><p className="text-xs text-muted-foreground">{client.email}</p></div></td>
                    <td className="p-3"><p className="font-medium">${client.totalBilled.toLocaleString()}</p><p className="text-xs text-muted-foreground">{client.projects} projects</p></td>
                    <td className="p-3"><div className="flex items-center space-x-1"><Star className="w-4 h-4 text-amber-500" /><span className="font-medium">{client.satisfaction}</span></div></td>
                    <td className="p-3 text-right"><Button variant="outline" size="sm">View Details</Button></td>
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
