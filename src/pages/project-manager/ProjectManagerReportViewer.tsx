import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_REPORTS, generateReportData } from '@/lib/reports';
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
import { ArrowLeft, Download } from 'lucide-react';

const ProjectManagerReportViewer = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();

  const report = useMemo(() => 
    MOCK_REPORTS.find(r => r.id === reportId)
  , [reportId]);

  const reportData = useMemo(() => 
    report ? generateReportData(report) : []
  , [report]);

  const handleExport = () => {
    if (!report || reportData.length === 0) return;

    const headers = report.columns.join(',');
    const rows = reportData.map(row => 
      report.columns.map(col => {
        const value = row[col];
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`; // Handle commas in strings
        }
        return value;
      }).join(',')
    );

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${report.name.replace(/ /g, '_')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!report) {
    return <div>Report not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/project-manager/reports')}><ArrowLeft className="h-4 w-4" /></Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{report.name}</h1>
            <p className="text-muted-foreground">{report.description}</p>
          </div>
        </div>
        <Button onClick={handleExport} disabled={reportData.length === 0}>
          <Download className="h-4 w-4 mr-2" />
          Export to CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Results</CardTitle>
          <CardDescription>{reportData.length} rows found.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {report.columns.map(col => <TableHead key={col}>{col.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.length > 0 ? (
                reportData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {report.columns.map(col => <TableCell key={col}>{row[col]}</TableCell>)}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={report.columns.length} className="h-24 text-center">No results found for this report's criteria.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectManagerReportViewer;
