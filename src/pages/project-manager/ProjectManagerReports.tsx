import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_REPORTS, Report } from '@/lib/reports';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const ReportRow = ({ report }: { report: Report }) => {
  const navigate = useNavigate();

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{report.name}</div>
        <div className="text-xs text-muted-foreground hidden sm:table-cell">{report.description}</div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline">{report.dataSource}</Badge>
      </TableCell>
      <TableCell className="hidden sm:table-cell">{report.columns.length}</TableCell>
      <TableCell className="hidden sm:table-cell">{report.filters.length}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigate(`/dashboard/project-manager/reports/${report.id}/view`)}>
              View Report
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/dashboard/project-manager/reports/${report.id}/edit`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

const ProjectManagerReports = () => {
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Custom Reports</h1>
          <p className="text-muted-foreground">Create, view, and manage your custom reports.</p>
        </div>
        <Button onClick={() => navigate('/dashboard/project-manager/reports/new')}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create New Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Saved Reports</CardTitle>
          <CardDescription>A list of all your saved report templates.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead className="hidden md:table-cell">Data Source</TableHead>
                <TableHead className="hidden sm:table-cell">Columns</TableHead>
                <TableHead className="hidden sm:table-cell">Filters</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map(report => <ReportRow key={report.id} report={report} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectManagerReports;
