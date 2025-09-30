import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { teamMembers, securityRoles } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, User } from "lucide-react";

import { useOrganization } from "@/hooks/useOrganization";
import { Link } from "react-router-dom";
import { canCreate, getPlanFeatures } from "@/lib/SubscriptionManager";

const OwnerEmployees = () => {
  const { plan } = useOrganization();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const employees = teamMembers.filter(member => member.role !== 'Client');
  const canAddEmployee = canCreate(plan, 'users', employees.length);

  const getRoleColor = (role: string) => {
    const roleData = securityRoles.find(r => r.role === role);
    return roleData ? roleData.color : "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      case "On Leave": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEmployees = employees
    .filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((employee) => roleFilter === "all" || employee.role === roleFilter)
    .filter((employee) => statusFilter === "all" || employee.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employees</h2>
        <div className="flex flex-col items-end">
          <Button onClick={() => alert("Navigate to new employee page")} disabled={!canAddEmployee}>
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
          {!canAddEmployee && (
            <div className="text-sm text-red-500 mt-2">
              You have reached the maximum number of employees for the {plan} plan. 
              <Link to="/dashboard/owner/settings" className="underline">Upgrade your plan</Link> to add more employees.
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>Manage all employee information and roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {securityRoles
                  .filter(role => role.id !== 'CLIENT')
                  .map(role => (
                  <SelectItem key={role.id} value={role.role}>{role.role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Employee</th>
                  <th className="text-left p-3">Role</th>
                  <th className="text-left p-3 hidden md:table-cell">Department</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3 hidden lg:table-cell">Join Date</th>
                  <th className="text-left p-3 hidden sm:table-cell">Projects</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-muted/50 cursor-pointer" onClick={() => navigate(`/dashboard/owner/employees/${employee.id}`)}>
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getRoleColor(employee.role)}>{employee.role}</Badge>
                    </td>
                    <td className="p-3 hidden md:table-cell">{employee.department}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(employee.status)}>{employee.status}</Badge>
                    </td>
                    <td className="p-3 hidden lg:table-cell">{new Date(employee.joinDate).toLocaleDateString()}</td>
                    <td className="p-3 hidden sm:table-cell">{employee.projects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerEmployees;