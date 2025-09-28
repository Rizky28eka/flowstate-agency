import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Download, Filter, Calendar } from "lucide-react";
import { useState } from "react";

const AdminAuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const auditLogs = [
    {
      id: "LOG-001",
      timestamp: "2024-12-10T14:30:00Z",
      user: "admin@agencyflow.com",
      action: "User Created",
      resource: "User: john.doe@example.com",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: "Success"
    },
    {
      id: "LOG-002",
      timestamp: "2024-12-10T14:25:00Z",
      user: "sarah.wilson@agencyflow.com",
      action: "Project Updated",
      resource: "Project: TechCorp Brand Redesign",
      ip: "10.0.0.15",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      status: "Success"
    },
    {
      id: "LOG-003",
      timestamp: "2024-12-10T14:20:00Z",
      user: "unknown",
      action: "Login Failed",
      resource: "Authentication System",
      ip: "203.0.113.45",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64)",
      status: "Failed"
    },
    {
      id: "LOG-004",
      timestamp: "2024-12-10T14:15:00Z",
      user: "mike.johnson@agencyflow.com",
      action: "File Downloaded",
      resource: "File: project-specs.pdf",
      ip: "10.0.0.22",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: "Success"
    },
    {
      id: "LOG-005",
      timestamp: "2024-12-10T14:10:00Z",
      user: "admin@agencyflow.com",
      action: "Permission Changed",
      resource: "User: emma.davis@agencyflow.com",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: "Success"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success": return "bg-green-100 text-green-800";
      case "Failed": return "bg-red-100 text-red-800";
      case "Warning": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchTerm === "" ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction = actionFilter === "all" || 
      log.action.toLowerCase().includes(actionFilter.toLowerCase());

    return matchesSearch && matchesAction;
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Audit Logs</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search logs by user, action, or resource..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="login">Login Events</SelectItem>
            <SelectItem value="user">User Management</SelectItem>
            <SelectItem value="project">Project Changes</SelectItem>
            <SelectItem value="file">File Operations</SelectItem>
            <SelectItem value="permission">Permission Changes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>System Audit Trail</CardTitle>
          <CardDescription>Complete log of all system activities and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Timestamp</th>
                  <th className="text-left p-3 font-medium">User</th>
                  <th className="text-left p-3 font-medium">Action</th>
                  <th className="text-left p-3 font-medium">Resource</th>
                  <th className="text-left p-3 font-medium">IP Address</th>
                  <th className="text-left p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 text-sm">
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-sm">{log.user}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-32" title={log.userAgent}>
                          {log.userAgent.split(' ')[0]}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{log.action}</Badge>
                    </td>
                    <td className="p-3 text-sm">{log.resource}</td>
                    <td className="p-3 text-sm font-mono">{log.ip}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminAuditLogs;