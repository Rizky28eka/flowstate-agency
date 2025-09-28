import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { UserCheck, Search, Plus, Filter, Shield, Crown, User, Users, Code, DollarSign, Handshake, MoreHorizontal, Edit, Trash2, Lock, Unlock } from "lucide-react";
import { RoleSidebar } from "@/components/RoleSidebar";
import { useState } from "react";

const AdminUsers = () => {
  const [currentPath, setCurrentPath] = useState("/users");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    console.log("Navigate to:", path);
  };

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@agencyflow.com",
      role: "OWNER",
      department: "Executive",
      status: "Active",
      lastLogin: "2024-12-10T10:30:00Z",
      joinDate: "2021-01-15",
      permissions: ["all"],
      projects: 0,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.wilson@agencyflow.com",
      role: "PROJECT_MANAGER",
      department: "Creative Team",
      status: "Active",
      lastLogin: "2024-12-10T09:15:00Z",
      joinDate: "2022-01-15",
      permissions: ["projects", "team", "clients"],
      projects: 12,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@agencyflow.com",
      role: "TEAM_LEAD",
      department: "Development Team",
      status: "Active",
      lastLogin: "2024-12-10T08:45:00Z",
      joinDate: "2021-08-20",
      permissions: ["team", "projects"],
      projects: 8,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@agencyflow.com",
      role: "ADMIN",
      department: "IT",
      status: "Active",
      lastLogin: "2024-12-10T11:20:00Z",
      joinDate: "2022-03-10",
      permissions: ["users", "security", "system"],
      projects: 0,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 5,
      name: "Tom Rodriguez",
      email: "tom.rodriguez@agencyflow.com",
      role: "FINANCE",
      department: "Finance",
      status: "Active",
      lastLogin: "2024-12-09T16:30:00Z",
      joinDate: "2021-11-05",
      permissions: ["finance", "reports"],
      projects: 0,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 6,
      name: "Lisa Chen",
      email: "lisa.chen@agencyflow.com",
      role: "MEMBER",
      department: "Creative Team",
      status: "Active",
      lastLogin: "2024-12-10T07:30:00Z",
      joinDate: "2022-06-12",
      permissions: ["tasks", "projects"],
      projects: 5,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 7,
      name: "Alex Thompson",
      email: "alex.thompson@agencyflow.com",
      role: "MEMBER",
      department: "Development Team",
      status: "Inactive",
      lastLogin: "2024-12-05T14:20:00Z",
      joinDate: "2023-02-28",
      permissions: ["tasks", "projects"],
      projects: 3,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 8,
      name: "TechCorp Client",
      email: "contact@techcorp.com",
      role: "CLIENT",
      department: "External",
      status: "Active",
      lastLogin: "2024-12-09T12:15:00Z",
      joinDate: "2023-05-20",
      permissions: ["client_portal"],
      projects: 2,
      avatar: "/api/placeholder/40/40"
    }
  ];

  const roleIcons = {
    OWNER: Crown,
    ADMIN: Shield,
    PROJECT_MANAGER: User,
    TEAM_LEAD: Users,
    MEMBER: Code,
    FINANCE: DollarSign,
    CLIENT: Handshake
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "OWNER": return "bg-purple-100 text-purple-800";
      case "ADMIN": return "bg-red-100 text-red-800";
      case "PROJECT_MANAGER": return "bg-blue-100 text-blue-800";
      case "TEAM_LEAD": return "bg-green-100 text-green-800";
      case "MEMBER": return "bg-gray-100 text-gray-800";
      case "FINANCE": return "bg-amber-100 text-amber-800";
      case "CLIENT": return "bg-teal-100 text-teal-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      case "Suspended": return "bg-red-100 text-red-800";
      case "Pending": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
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
                <UserCheck className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">User Management</h1>
                  <p className="text-sm text-muted-foreground">Manage user accounts, roles, and permissions</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 overflow-auto">
          {/* User Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">+2 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {users.filter(u => u.status === "Active").length}
                </div>
                <p className="text-xs text-muted-foreground">Currently online</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <Code className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {users.filter(u => !["CLIENT"].includes(u.role)).length}
                </div>
                <p className="text-xs text-muted-foreground">Internal staff</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Client Users</CardTitle>
                <Handshake className="h-4 w-4 text-teal-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {users.filter(u => u.role === "CLIENT").length}
                </div>
                <p className="text-xs text-muted-foreground">External clients</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList>
              <TabsTrigger value="users">All Users</TabsTrigger>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
              <TabsTrigger value="activity">User Activity</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="OWNER">Owner</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="PROJECT_MANAGER">Project Manager</SelectItem>
                    <SelectItem value="TEAM_LEAD">Team Lead</SelectItem>
                    <SelectItem value="MEMBER">Member</SelectItem>
                    <SelectItem value="FINANCE">Finance</SelectItem>
                    <SelectItem value="CLIENT">Client</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              <Card>
                <CardHeader>
                  <CardTitle>User Directory</CardTitle>
                  <CardDescription>Manage all user accounts and their access levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">User</th>
                          <th className="text-left p-3">Role</th>
                          <th className="text-left p-3">Department</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Last Login</th>
                          <th className="text-left p-3">Projects</th>
                          <th className="text-left p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => {
                          const RoleIcon = roleIcons[user.role as keyof typeof roleIcons];
                          return (
                            <tr key={user.id} className="border-b hover:bg-muted/50">
                              <td className="p-3">
                                <div className="flex items-center space-x-3">
                                  <Avatar className="w-10 h-10">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center space-x-2">
                                  <RoleIcon className="w-4 h-4" />
                                  <Badge className={getRoleColor(user.role)}>
                                    {user.role.replace('_', ' ')}
                                  </Badge>
                                </div>
                              </td>
                              <td className="p-3">{user.department}</td>
                              <td className="p-3">
                                <Badge className={getStatusColor(user.status)}>
                                  {user.status}
                                </Badge>
                              </td>
                              <td className="p-3 text-sm text-muted-foreground">
                                {formatLastLogin(user.lastLogin)}
                              </td>
                              <td className="p-3">{user.projects}</td>
                              <td className="p-3">
                                <div className="flex space-x-1">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    {user.status === "Active" ? (
                                      <Lock className="w-4 h-4" />
                                    ) : (
                                      <Unlock className="w-4 h-4" />
                                    )}
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roles" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(roleIcons).map(([role, Icon]) => (
                  <Card key={role}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Icon className="w-6 h-6 text-primary" />
                        <CardTitle className="text-lg">{role.replace('_', ' ')}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Users</span>
                          <span className="font-medium">
                            {users.filter(u => u.role === role).length}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Permissions:</p>
                          <div className="flex flex-wrap gap-1">
                            {users.find(u => u.role === role)?.permissions.map((permission, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button variant="outline" size="sm" className="w-full">
                          Manage Permissions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent User Activity</CardTitle>
                    <CardDescription>Latest user actions and login activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.slice(0, 6).map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="text-xs">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{user.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Last login: {formatLastLogin(user.lastLogin)}
                              </p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(user.status)} variant="secondary">
                            {user.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Login Statistics</CardTitle>
                    <CardDescription>User engagement and activity metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Daily Active Users</span>
                        <span className="font-bold text-green-600">
                          {users.filter(u => u.status === "Active").length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Weekly Active Users</span>
                        <span className="font-bold text-blue-600">
                          {users.filter(u => u.status === "Active").length + 2}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Average Session Duration</span>
                        <span className="font-bold">4.2 hours</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Failed Login Attempts</span>
                        <span className="font-bold text-red-600">3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Global security policies and configurations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Password Complexity</p>
                          <p className="text-sm text-muted-foreground">Enforce strong passwords</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Session Timeout</p>
                          <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Login Notifications</p>
                          <p className="text-sm text-muted-foreground">Email alerts for new logins</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Alerts</CardTitle>
                    <CardDescription>Recent security events and notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-3 border border-red-200 rounded-lg bg-red-50">
                        <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-800">Failed Login Attempts</p>
                          <p className="text-sm text-red-600">3 failed attempts from IP 192.168.1.100</p>
                          <p className="text-xs text-red-500">2 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 border border-amber-200 rounded-lg bg-amber-50">
                        <UserCheck className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-amber-800">New User Registration</p>
                          <p className="text-sm text-amber-600">Pending approval for new client user</p>
                          <p className="text-xs text-amber-500">5 hours ago</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 border border-blue-200 rounded-lg bg-blue-50">
                        <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-800">Password Changed</p>
                          <p className="text-sm text-blue-600">User Sarah Wilson updated password</p>
                          <p className="text-xs text-blue-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;