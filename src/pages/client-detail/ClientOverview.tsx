
import { useOutletContext } from "react-router-dom";
import type { Client } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, DollarSign, Mail, Phone, Star, CheckCircle, XCircle } from "lucide-react";

interface ClientContext {
  client: Client;
}

const ClientOverview = () => {
  const { client } = useOutletContext<ClientContext>();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  }

  const stats = [
    { title: "Status", value: <Badge variant={client.status === 'Active' ? 'success' : 'secondary'}>{client.status}</Badge>, icon: client.status === 'Active' ? <CheckCircle className="h-4 w-4 text-muted-foreground" /> : <XCircle className="h-4 w-4 text-muted-foreground" /> },
    { title: "Total Billed", value: formatCurrency(client.totalBilled), icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
    { title: "Active Projects", value: client.activeProjects, icon: <Briefcase className="h-4 w-4 text-muted-foreground" /> },
    { title: "Satisfaction", value: `${client.satisfaction}/5.0`, icon: <Star className="h-4 w-4 text-muted-foreground" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="font-semibold">Primary Contact</div>
                <div>{client.contact}</div>
            </div>
            <div className="flex items-center gap-4">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${client.email}`} className="text-sm text-primary hover:underline">{client.email}</a>
            </div>
            <div className="flex items-center gap-4">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{client.phone}</span>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientOverview;
