
import { useOutletContext } from "react-router-dom";
import type { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UploadCloud } from "lucide-react";

interface ProjectContext {
  project: Project;
}

// Placeholder data
const files = [
  { name: "brand-guidelines.pdf", size: "2.5 MB", date: "2023-11-10" },
  { name: "logo-concepts.ai", size: "15.2 MB", date: "2023-11-08" },
  { name: "marketing-assets.zip", size: "54.1 MB", date: "2023-11-12" },
  { name: "meeting-notes.docx", size: "128 KB", date: "2023-11-15" },
];

const ProjectFiles = () => {
  const { project } = useOutletContext<ProjectContext>();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Files & Documents</CardTitle>
        <Button size="sm">
          <UploadCloud className="h-4 w-4 mr-2" />
          Upload File
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Date Added</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.name}>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>{file.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProjectFiles;
