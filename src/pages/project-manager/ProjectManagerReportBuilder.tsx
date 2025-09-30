import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Report, 
  DataSource, 
  FilterCondition, 
  AVAILABLE_DATA_SOURCES, 
  MOCK_REPORTS 
} from '@/lib/reports';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, PlusCircle, X } from 'lucide-react';

const ProjectManagerReportBuilder = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Partial<Report>>({ columns: [], filters: [] });

  const isNewReport = reportId === 'new';

  useEffect(() => {
    if (!isNewReport) {
      const existingReport = MOCK_REPORTS.find(r => r.id === reportId);
      if (existingReport) setReport(existingReport);
    } else {
      setReport({ name: 'New Custom Report', description: '', columns: [], filters: [] });
    }
  }, [reportId, isNewReport]);

  const selectedDataSource = useMemo(() => 
    AVAILABLE_DATA_SOURCES.find(ds => ds.id === report.dataSource)
  , [report.dataSource]);

  const handleDataSourceChange = (dsId: DataSource) => {
    setReport({ ...report, dataSource: dsId, columns: [], filters: [] });
  };

  const handleColumnToggle = (fieldId: string, checked: boolean) => {
    const newColumns = checked 
      ? [...(report.columns || []), fieldId] 
      : (report.columns || []).filter(col => col !== fieldId);
    setReport({ ...report, columns: newColumns });
  };

  const handleFilterChange = (index: number, field: keyof FilterCondition, value: string | number | boolean) => {
    const newFilters = [...(report.filters || [])];
    newFilters[index] = { ...newFilters[index], [field]: value };
    setReport({ ...report, filters: newFilters });
  };

  const addFilter = () => {
    const newFilter: FilterCondition = { field: selectedDataSource?.fields[0].id || '', operator: 'equals', value: '' };
    setReport({ ...report, filters: [...(report.filters || []), newFilter] });
  };

  const removeFilter = (index: number) => {
    const newFilters = (report.filters || []).filter((_, i) => i !== index);
    setReport({ ...report, filters: newFilters });
  };

  const handleSave = () => {
    console.log("Saving Report:", report);
    alert('Report saved successfully!');
    // In a real app, you would get back an ID and navigate to the view page
    navigate('/dashboard/project-manager/reports');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/project-manager/reports')}><ArrowLeft className="h-4 w-4" /></Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{isNewReport ? 'Create Report' : 'Edit Report'}</h1>
            <p className="text-muted-foreground">Build a custom report from your project data.</p>
          </div>
        </div>
        <Button onClick={handleSave}>Save & View</Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>1. General Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Report Name</Label><Input value={report.name || ''} onChange={e => setReport({...report, name: e.target.value})} /></div>
            <div className="space-y-2"><Label>Description</Label><Input value={report.description || ''} onChange={e => setReport({...report, description: e.target.value})} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>2. Data Source & Columns</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Data Source</Label>
              <Select value={report.dataSource} onValueChange={(v) => handleDataSourceChange(v as DataSource)}>
                <SelectTrigger><SelectValue placeholder="Select a data source..." /></SelectTrigger>
                <SelectContent>{AVAILABLE_DATA_SOURCES.map(ds => <SelectItem key={ds.id} value={ds.id}>{ds.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {selectedDataSource && (
              <div className="space-y-2">
                <Label>Columns</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-md">
                  {selectedDataSource.fields.map(field => (
                    <div key={field.id} className="flex items-center gap-2">
                      <Checkbox id={`col-${field.id}`} checked={report.columns?.includes(field.id)} onCheckedChange={(checked) => handleColumnToggle(field.id, !!checked)} />
                      <Label htmlFor={`col-${field.id}`} className="font-normal">{field.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>3. Filters</CardTitle><CardDescription>Narrow down your data to get specific results.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {(report.filters || []).map((filter, index) => (
              <div key={index} className="flex items-end gap-2 p-4 border rounded-md">
                <div className="flex-1 space-y-2">
                  <Label>Field</Label>
                  <Select value={filter.field} onValueChange={v => handleFilterChange(index, 'field', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{selectedDataSource?.fields.map(f => <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>)}</SelectContent></Select>
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Operator</Label>
                  <Select value={filter.operator} onValueChange={v => handleFilterChange(index, 'operator', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="equals">Equals</SelectItem><SelectItem value="not_equals">Not Equals</SelectItem><SelectItem value="contains">Contains</SelectItem><SelectItem value="greater_than">Greater Than</SelectItem><SelectItem value="less_than">Less Than</SelectItem></SelectContent></Select>
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Value</Label>
                  <Input value={filter.value} onChange={e => handleFilterChange(index, 'value', e.target.value)} />
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFilter(index)}><X className="h-4 w-4"/></Button>
              </div>
            ))}
            <Button variant="outline" onClick={addFilter} disabled={!selectedDataSource}><PlusCircle className="h-4 w-4 mr-2"/>Add Filter</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectManagerReportBuilder;
