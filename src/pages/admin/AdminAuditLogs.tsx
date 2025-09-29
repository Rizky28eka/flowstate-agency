import { useState, useMemo } from 'react';
import { auditLogs as MOCK_AUDIT_LOGS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

// Define the type for an audit log entry, including the new payload
type AuditLog = (typeof MOCK_AUDIT_LOGS)[0];

const EventInspectorSheet = ({ log, isOpen, onOpenChange }: { log: AuditLog | null, isOpen: boolean, onOpenChange: (open: boolean) => void }) => {
  if (!log) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Log Event Details</SheetTitle>
          <SheetDescription>A detailed view of the recorded event.</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-6">
          <div className="text-sm space-y-2">
            <div className="flex justify-between"><span className="text-muted-foreground">Event ID</span><span className="font-mono text-xs">{log.id}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Timestamp</span><span>{new Date(log.timestamp).toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">User</span><span>{log.user}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Action</span><Badge variant="secondary">{log.action}</Badge></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Resource</span><span>{log.resource}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge variant={log.status === 'Success' ? 'default' : 'destructive'}>{log.status}</Badge></div>
            <div className="flex justify-between"><span className="text-muted-foreground">IP Address</span><span className="font-mono">{log.ip}</span></div>
          </div>
          <div>
            <h4 className="font-medium mb-2">User Agent</h4>
            <p className="text-xs text-muted-foreground bg-muted p-2 rounded-md">{log.userAgent}</p>
          </div>
          {log.payload && (
            <div>
              <h4 className="font-medium mb-2">Payload</h4>
              <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
                {JSON.stringify(log.payload, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const AdminAuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filteredLogs = useMemo(() => {
    return MOCK_AUDIT_LOGS.filter(log => {
      const logDate = new Date(log.timestamp);
      const dateMatch = !dateRange || (
        (dateRange.from ? logDate >= dateRange.from : true) &&
        (dateRange.to ? logDate <= dateRange.to : true)
      );

      const searchMatch = searchTerm === '' || 
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchTerm.toLowerCase());

      return dateMatch && searchMatch;
    });
  }, [searchTerm, dateRange]);

  const handleRowClick = (log: AuditLog) => {
    setSelectedLog(log);
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground">Track important activities and changes within the system.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by user, action, or resource..." 
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-[280px] justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>{format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}</>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Timestamp</TableHead>
                  <TableHead className="text-xs sm:text-sm">User</TableHead>
                  <TableHead className="text-xs sm:text-sm">Action</TableHead>
                  <TableHead className="hidden md:table-cell text-xs sm:text-sm">Resource</TableHead>
                  <TableHead className="hidden sm:table-cell text-xs sm:text-sm">IP Address</TableHead>
                  <TableHead className="text-right text-xs sm:text-sm">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} onClick={() => handleRowClick(log)} className="cursor-pointer">
                    <TableCell className="p-2 sm:p-4 text-xs sm:text-sm">{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell className="font-medium p-2 sm:p-4 text-xs sm:text-sm">{log.user}</TableCell>
                    <TableCell className="p-2 sm:p-4"><Badge variant="outline" className="text-xs">{log.action}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell p-2 sm:p-4 text-xs sm:text-sm">{log.resource}</TableCell>
                    <TableCell className="hidden sm:table-cell font-mono p-2 sm:p-4 text-xs">{log.ip}</TableCell>
                    <TableCell className="text-right p-2 sm:p-4">
                      <Badge variant={log.status === 'Success' ? 'default' : 'destructive'} className="text-xs">{log.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <EventInspectorSheet log={selectedLog} isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  );
};

export default AdminAuditLogs;
