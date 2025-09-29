import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { HardDrive, Download, Upload, Calendar, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Database, FileText } from "lucide-react";

import { backupHistory } from "@/lib/mock-data";

const AdminBackup = () => {

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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Backup & Recovery</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Last Backup</CardTitle>
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">2 hours ago</div>
            <p className="text-xs text-muted-foreground">Full backup completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Backup Size</CardTitle>
            <Database className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">2.4 GB</div>
            <p className="text-xs text-muted-foreground">Latest backup size</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">24.8 GB</div>
            <p className="text-xs text-muted-foreground">of 100 GB available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Retention</CardTitle>
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">30 days</div>
            <p className="text-xs text-muted-foreground">Backup retention period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Backup Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Backup Configuration</CardTitle>
            <CardDescription>Manage backup settings and schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Automatic Backups</p>
                  <p className="text-sm text-muted-foreground">Enable scheduled backups</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Daily Incremental</p>
                  <p className="text-sm text-muted-foreground">Daily incremental backups at 2:00 AM</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Weekly Full Backup</p>
                  <p className="text-sm text-muted-foreground">Full backup every Sunday</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Backup Notifications</p>
                  <p className="text-sm text-muted-foreground">Email alerts for backup status</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between gap-4">
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
            <CardTitle className="text-lg sm:text-xl">Backup History</CardTitle>
            <CardDescription>Recent backup operations and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {backupHistory.map((backup) => (
                <div key={backup.id} className="border rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 min-w-0">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium text-sm sm:text-base truncate">{backup.type}</span>
                    </div>
                    <Badge className={getStatusColor(backup.status)}>
                      {backup.status}
                    </Badge>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <p className="truncate">Created: {formatTimestamp(backup.timestamp)}</p>
                    <p>Size: {backup.size} • Duration: {backup.duration}</p>
                    {backup.error && (
                      <p className="text-red-600">Error: {backup.error}</p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-3">
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
    </div>
  );
};

export default AdminBackup;