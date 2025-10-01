import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "@/lib/api";
import { securityRoles } from "@/lib/mock-data"; // Keep for role colors, can be moved to a config
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, User, Loader2, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import { useOrganization } from "@/hooks/useOrganization";
import { Link } from "react-router-dom";
import { canCreate } from "@/lib/SubscriptionManager";

// We need to adjust the Employee type based on what the API actually returns.
// Based on server/src/index.ts, the user object includes roles and teams.
type Employee = {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
  roles: { role: { name: string } }[];
  teams: { team: { name: string } }[];
};

const OwnerEmployees = () => {
  const { plan } = useOrganization();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const { data: employees = [], isLoading, isError, error } = useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });

  const canAddEmployee = canCreate(plan, 'users', employees.length);

  const getRoleColor = (roleName: string) => {
    const roleData = securityRoles.find(r => r.role === roleName);
    return roleData ? roleData.color : "bg-gray-100 text-gray-800";
  };

  const filteredEmployees = useMemo(() => {
    return employees
      .filter(employee => {
        const name = employee.name || '';
        const email = employee.email || '';
        return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               email.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .filter(employee => {
        if (roleFilter === "all") return true;
        return employee.roles.some(r => r.role.name === roleFilter);
      });
  }, [employees, searchTerm, roleFilter]);
  
  const uniqueRoles = useMemo(() => {
    const roles = new Set<string>();
    employees.forEach(emp => {
      emp.roles.forEach(r => roles.add(r.role.name));
    });
    return Array.from(roles);
  }, [employees]);

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
                {uniqueRoles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Employee</th>
                  <th className="text-left p-3">Role</th>
                  <th className="text-left p-3 hidden md:table-cell">Department/Team</th>
                  <th className="text-left p-3 hidden lg:table-cell">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div>
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32 mt-1" />
                          </div>
                        </div>
                      </td>
                      <td className="p-3"><Skeleton className="h-5 w-20" /></td>
                      <td className="p-3 hidden md:table-cell"><Skeleton className="h-5 w-24" /></td>
                      <td className="p-3 hidden lg:table-cell"><Skeleton className="h-5 w-28" /></td>
                    </tr>
                  ))
                ) : isError ? (
                  <tr>
                    <td colSpan={4} className="text-center text-red-500 p-6">
                      <div className="flex items-center justify-center gap-2">
                        <AlertCircle className="h-4 w-4" /> Error fetching data.
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee) => {
                    const mainRole = employee.roles[0]?.role.name || 'N/A';
                    const mainTeam = employee.teams[0]?.team.name || 'N/A';
                    const employeeName = employee.name || 'No Name';
                    
                    return (
                      <tr key={employee.id} className="border-b hover:bg-muted/50 cursor-pointer" onClick={() => navigate(`/dashboard/owner/employees/${employee.id}`)}>
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={employee.avatarUrl || undefined} alt={employeeName} />
                              <AvatarFallback>{employeeName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{employeeName}</p>
                              <p className="text-sm text-muted-foreground">{employee.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={getRoleColor(mainRole)}>{mainRole}</Badge>
                        </td>
                        <td className="p-3 hidden md:table-cell">{mainTeam}</td>
                        <td className="p-3 hidden lg:table-cell">{new Date(employee.createdAt).toLocaleDateString()}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerEmployees;
