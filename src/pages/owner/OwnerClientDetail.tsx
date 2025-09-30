import { useParams } from "react-router-dom";
import { clients } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OwnerClientDetail = () => {
  const { clientId } = useParams();
  const client = clients.find((c) => c.id === clientId);

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{client.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{client.contact}</p>
        <p>{client.email}</p>
        <p>{client.phone}</p>
      </CardContent>
    </Card>
  );
};

export default OwnerClientDetail;
