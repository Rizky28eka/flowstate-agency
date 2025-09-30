
import { useOutletContext } from "react-router-dom";
import type { Client, Project } from "@/types";
import { projects as allProjects } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ClientContext {
  client: Client;
}

const ClientProjects = () => {
  const { client } = useOutletContext<ClientContext>();
  const clientProjects = allProjects.filter((p) => p.clientId === client.id);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "In Progress": return "default";
      case "Planning": return "secondary";
      case "Review": return "warning";
      default: return "outline";
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects for {client.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[200px]">Progress</TableHead>
              <TableHead>End Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientProjects.length > 0 ? (
              clientProjects.map((project: Project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="w-[60%]" />
                      <span>{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{project.endDate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">No projects found for this client.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClientProjects;
