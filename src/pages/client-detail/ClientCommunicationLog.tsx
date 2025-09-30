
import { useOutletContext } from "react-router-dom";
import type { Client } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Users } from "lucide-react";

interface ClientContext {
  client: Client;
}

// Placeholder data for communication log
const communicationLog = [
  {
    date: "2023-11-28",
    type: "Meeting",
    summary: "Weekly check-in on Project Alpha. Discussed timeline and budget.",
    attendees: ["Sarah W.", "John D."],
    icon: <Users className="h-4 w-4" />
  },
  {
    date: "2023-11-25",
    type: "Email",
    summary: "Sent over the revised brand guidelines for approval.",
    attendees: ["Lisa C."],
    icon: <Mail className="h-4 w-4" />
  },
  {
    date: "2023-11-22",
    type: "Call",
    summary: "Quick call to confirm feedback on the latest mockups.",
    attendees: ["Tom R."],
    icon: <Phone className="h-4 w-4" />
  },
  {
    date: "2023-11-15",
    type: "Meeting",
    summary: "Project kickoff for the new marketing campaign.",
    attendees: ["Sarah W.", "James W.", "John D."],
    icon: <Users className="h-4 w-4" />
  },
];

const ClientCommunicationLog = () => {
  const { client } = useOutletContext<ClientContext>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Communication Log</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Date</TableHead>
              <TableHead className="w-[120px]">Type</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Attendees</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {communicationLog.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.date}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="flex items-center w-fit">
                    {log.icon}
                    <span className="ml-2">{log.type}</span>
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{log.summary}</TableCell>
                <TableCell>{log.attendees.join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClientCommunicationLog;
