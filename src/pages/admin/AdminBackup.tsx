import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { HardDrive, Download, Upload, Calendar, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Database, FileText } from "lucide-react";

const AdminBackup = () => {
  const backupHistory = [
    {
      id: "BKP-001",
      type: "Full Backup",
      timestamp: "2024-12-10T02:00:00Z",
      size: "2.4 GB",
      status: "Completed",
      duration: "45 minutes"
    },
    {
      id: "BKP-002",
      type: "Incremental",
      timestamp: "2024-12-09T02:00:00Z",
      size: "156 MB",
      status: "Completed",
      duration: "8 minutes"
    },
    {
      id: "BKP-003",
      type: "Database Only",
      timestamp: "2024-12-08T14:30:00Z",
      size: "89 MB",
      status: "Completed",
      duration: "3 minutes"
    },
    {
      id: "BKP-004",
      type: "Full Backup",
      timestamp: "2024-12-07T02:00:00Z",
      size: "2.3 GB",
      status: "Failed",
      duration: "N/A",
      error: "Storage quota exceeded"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Failed": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Backup & Recovery</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Restore from Backup
          </Button>
          <Button>
            <HardDrive className="w-4 h-4 mr-2" />
            Create Backup Now
          </Button>
        </div>
      </div>

      {/* Backup Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 hours ago</div>
            <p className="text-xs text-muted-foreground">Full backup completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backup Size</CardTitle>
            <Database className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
            <p className="text-xs text-muted-foreground">Latest backup size</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8 GB</div>
            <p className="text-xs text-muted-foreground">of 100 GB available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention</CardTitle>
            <Calendar className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30 days</div>
            <p className="text-xs text-muted-foreground">Backup retention period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Backup Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Backup Configuration</CardTitle>
            <CardDescription>Manage backup settings and schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Automatic Backups</p>
                  <p className="text-sm text-muted-foreground">Enable scheduled backups</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily Incremental</p>
                  <p className="text-sm text-muted-foreground">Daily incremental backups at 2:00 AM</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Full Backup</p>
                  <p className="text-sm text-muted-foreground">Full backup every Sunday</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Backup Notifications</p>
                  <p className="text-sm text-muted-foreground">Email alerts for backup status</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Encryption</p>
                  <p className="text-sm text-muted-foreground">Encrypt backup files</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Backup History */}
        <Card>
          <CardHeader>
            <CardTitle>Backup History</CardTitle>
            <CardDescription>Recent backup operations and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {backupHistory.map((backup) => (
                <div key={backup.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium">{backup.type}</span>
                    </div>
                    <Badge className={getStatusColor(backup.status)}>
                      {backup.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Created: {formatTimestamp(backup.timestamp)}</p>
                    <p>Size: {backup.size} • Duration: {backup.duration}</p>
                    {backup.error && (
                      <p className="text-red-600">Error: {backup.error}</p>
                    )}
                  </div>
                  <div className="flex space-x-2 mt-3">
                    {backup.status === "Completed" && (
                      <>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          Restore
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminBackup;