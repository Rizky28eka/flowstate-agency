import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Lock, Key, AlertTriangle, Eye, Download, Settings, Users, Globe, Server, Database, Wifi } from "lucide-react";
import { RoleSidebar } from "@/components/RoleSidebar";
import { useState } from "react";

const AdminSecurity = () => {
  const [currentPath, setCurrentPath] = useState("/security");

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    console.log("Navigate to:", path);
  };

  const securityEvents = [
    {
      id: 1,
      type: "login_failure",
      severity: "high",
      message: "Multiple failed login attempts detected",
      user: "unknown",
      ip: "192.168.1.100",
      timestamp: "2024-12-10T10:30:00Z",
      status: "blocked"
    },
    {
      id: 2,
      type: "permission_change",
      severity: "medium",
      message: "User role permissions modified",
      user: "admin@agencyflow.com",
      ip: "10.0.0.5",
      timestamp: "2024-12-10T09:15:00Z",
      status: "approved"
    },
    {
      id: 3,
      type: "data_access",
      severity: "low",
      message: "Bulk data export performed",
      user: "sarah.wilson@agencyflow.com",
      ip: "10.0.0.12",
      timestamp: "2024-12-10T08:45:00Z",
      status: "completed"
    },
    {
      id: 4,
      type: "system_access",
      severity: "high",
      message: "Administrative system access from new location",
      user: "admin@agencyflow.com",
      ip: "203.0.113.45",
      timestamp: "2024-12-09T22:30:00Z",
      status: "investigating"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-amber-100 text-amber-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "blocked": return "bg-red-100 text-red-800";
      case "approved": return "bg-green-100 text-green-800";
      case "investigating": return "bg-amber-100 text-amber-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background flex">
      <RoleSidebar 
        role="ADMIN" 
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      <div className="flex-1 flex flex-col">
        <header className="border-b bg-card">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Security & Permissions</h1>
                  <p className="text-sm text-muted-foreground">Manage system security, access controls, and monitoring</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Logs
                </Button>
                <Button>
                  <Settings className="w-4 h-4 mr-2" />
                  Security Settings
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 overflow-auto">
          {/* Security Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                <Shield className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">94/100</div>
                <p className="text-xs text-muted-foreground">Excellent security posture</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">2</div>
                <p className="text-xs text-muted-foreground">Require immediate attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
                <Lock className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">2FA Enabled</CardTitle>
                <Key className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">Of all users</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Security Overview</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Configuration</CardTitle>
                    <CardDescription>Core security settings and policies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Password Complexity</p>
                          <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Session Timeout</p>
                          <p className="text-sm text-muted-foreground">Auto-logout after 30 minutes</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">IP Whitelisting</p>
                          <p className="text-sm text-muted-foreground">Restrict access to approved IPs</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Login Notifications</p>
                          <p className="text-sm text-muted-foreground">Email alerts for new device logins</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Data Encryption</p>
                          <p className="text-sm text-muted-foreground">Encrypt sensitive data at rest</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Security Events</CardTitle>
                    <CardDescription>Latest security alerts and activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {securityEvents.slice(0, 5).map((event) => (
                        <div key={event.id} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Badge className={getSeverityColor(event.severity)}>
                                {event.severity}
                              </Badge>
                              <Badge className={getStatusColor(event.status)} variant="outline">
                                {event.status}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(event.timestamp)}
                            </span>
                          </div>
                          <p className="font-medium text-sm mb-1">{event.message}</p>
                          <div className="text-xs text-muted-foreground">
                            <span>User: {event.user}</span> • <span>IP: {event.ip}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Role-Based Access Control</CardTitle>
                    <CardDescription>Manage permissions for different user roles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { role: "Owner", permissions: ["All Access"], users: 1, color: "bg-purple-100 text-purple-800" },
                        { role: "Admin", permissions: ["User Management", "Security", "System"], users: 2, color: "bg-red-100 text-red-800" },
                        { role: "Project Manager", permissions: ["Projects", "Team", "Clients"], users: 5, color: "bg-blue-100 text-blue-800" },
                        { role: "Team Lead", permissions: ["Team", "Projects"], users: 4, color: "bg-green-100 text-green-800" },
                        { role: "Member", permissions: ["Tasks", "Projects"], users: 18, color: "bg-gray-100 text-gray-800" },
                        { role: "Finance", permissions: ["Finance", "Reports"], users: 2, color: "bg-amber-100 text-amber-800" },
                        { role: "Client", permissions: ["Client Portal"], users: 8, color: "bg-teal-100 text-teal-800" }
                      ].map((role, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <Badge className={role.color}>{role.role}</Badge>
                            <span className="text-sm text-muted-foreground">{role.users} users</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {role.permissions.map((permission, pIndex) => (
                              <Badge key={pIndex} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                          <Button variant="outline" size="sm">
                            Edit Permissions
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Permission Matrix</CardTitle>
                    <CardDescription>Detailed access control matrix</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Permission</th>
                            <th className="text-center p-2">Owner</th>
                            <th className="text-center p-2">Admin</th>
                            <th className="text-center p-2">PM</th>
                            <th className="text-center p-2">Lead</th>
                            <th className="text-center p-2">Member</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { permission: "User Management", owner: true, admin: true, pm: false, lead: false, member: false },
                            { permission: "Project Creation", owner: true, admin: true, pm: true, lead: false, member: false },
                            { permission: "Team Management", owner: true, admin: true, pm: true, lead: true, member: false },
                            { permission: "Financial Data", owner: true, admin: false, pm: false, lead: false, member: false },
                            { permission: "Client Portal", owner: true, admin: true, pm: true, lead: false, member: false },
                            { permission: "System Settings", owner: true, admin: true, pm: false, lead: false, member: false }
                          ].map((row, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2 font-medium">{row.permission}</td>
                              <td className="text-center p-2">
                                {row.owner ? <span className="text-green-600">✓</span> : <span className="text-red-600">✗</span>}
                              </td>
                              <td className="text-center p-2">
                                {row.admin ? <span className="text-green-600">✓</span> : <span className="text-red-600">✗</span>}
                              </td>
                              <td className="text-center p-2">
                                {row.pm ? <span className="text-green-600">✓</span> : <span className="text-red-600">✗</span>}
                              </td>
                              <td className="text-center p-2">
                                {row.lead ? <span className="text-green-600">✓</span> : <span className="text-red-600">✗</span>}
                              </td>
                              <td className="text-center p-2">
                                {row.member ? <span className="text-green-600">✓</span> : <span className="text-red-600">✗</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Real-time Monitoring</CardTitle>
                    <CardDescription>Live security monitoring and alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="font-medium">System Status</p>
                            <p className="text-sm text-muted-foreground">All systems operational</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                          <div>
                            <p className="font-medium">Failed Login Attempts</p>
                            <p className="text-sm text-muted-foreground">15 attempts in last hour</p>
                          </div>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800">Warning</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div>
                            <p className="font-medium">Active Sessions</p>
                            <p className="text-sm text-muted-foreground">32 users currently online</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Normal</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div>
                            <p className="font-medium">Suspicious Activity</p>
                            <p className="text-sm text-muted-foreground">2 alerts require review</p>
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-800">Critical</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Network Security</CardTitle>
                    <CardDescription>Network monitoring and firewall status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <p className="font-medium">Firewall</p>
                          <p className="text-sm text-green-600">Active</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <Server className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <p className="font-medium">SSL/TLS</p>
                          <p className="text-sm text-green-600">Secured</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <p className="font-medium">Database</p>
                          <p className="text-sm text-green-600">Encrypted</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <Wifi className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                          <p className="font-medium">VPN</p>
                          <p className="text-sm text-amber-600">Optional</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="policies" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Policies</CardTitle>
                    <CardDescription>Configure security policies and rules</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Password Policy</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Minimum Length</span>
                            <span>8 characters</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Complexity</span>
                            <span>High</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Expiry</span>
                            <span>90 days</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-3">
                          Edit Policy
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Access Control Policy</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Session Timeout</span>
                            <span>30 minutes</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Max Failed Attempts</span>
                            <span>5 attempts</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Account Lockout</span>
                            <span>15 minutes</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-3">
                          Edit Policy
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Data Protection Policy</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Encryption</span>
                            <span>AES-256</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Backup Retention</span>
                            <span>30 days</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Data Classification</span>
                            <span>Enabled</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-3">
                          Edit Policy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Status</CardTitle>
                    <CardDescription>Security compliance and certifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { standard: "GDPR", status: "Compliant", score: "98%", color: "text-green-600" },
                        { standard: "SOC 2", status: "Compliant", score: "95%", color: "text-green-600" },
                        { standard: "ISO 27001", status: "In Progress", score: "87%", color: "text-amber-600" },
                        { standard: "HIPAA", status: "Not Applicable", score: "N/A", color: "text-gray-600" }
                      ].map((compliance, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{compliance.standard}</p>
                            <p className="text-sm text-muted-foreground">{compliance.status}</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${compliance.color}`}>{compliance.score}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="audit" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Security Audit Logs</CardTitle>
                      <CardDescription>Comprehensive security event logging</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Events</SelectItem>
                          <SelectItem value="login">Login Events</SelectItem>
                          <SelectItem value="permission">Permission Changes</SelectItem>
                          <SelectItem value="data">Data Access</SelectItem>
                          <SelectItem value="system">System Events</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Timestamp</th>
                          <th className="text-left p-3">Event Type</th>
                          <th className="text-left p-3">User</th>
                          <th className="text-left p-3">IP Address</th>
                          <th className="text-left p-3">Description</th>
                          <th className="text-left p-3">Severity</th>
                          <th className="text-left p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {securityEvents.map((event) => (
                          <tr key={event.id} className="border-b hover:bg-muted/50">
                            <td className="p-3 text-sm">
                              {formatTimestamp(event.timestamp)}
                            </td>
                            <td className="p-3">
                              <Badge variant="outline">
                                {event.type.replace('_', ' ')}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm">{event.user}</td>
                            <td className="p-3 text-sm font-mono">{event.ip}</td>
                            <td className="p-3 text-sm">{event.message}</td>
                            <td className="p-3">
                              <Badge className={getSeverityColor(event.severity)}>
                                {event.severity}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <Badge className={getStatusColor(event.status)} variant="outline">
                                {event.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminSecurity;