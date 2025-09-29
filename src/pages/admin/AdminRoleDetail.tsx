import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_ROLES, PERMISSION_GROUPS, Permission, Role } from '@/lib/permissions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';

const AdminRoleDetail = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role | null>(null);
  const [isNewRole, setIsNewRole] = useState(false);

  useEffect(() => {
    if (roleId === 'new') {
      setIsNewRole(true);
      setRole({
        id: `new_role_${Date.now()}`,
        name: '',
        description: '',
        permissions: [],
      });
    } else {
      const existingRole = MOCK_ROLES.find(r => r.id === roleId);
      if (existingRole) {
        setRole(JSON.parse(JSON.stringify(existingRole))); // Deep copy to avoid direct mutation
      } else {
        // Handle role not found, maybe redirect
      }
    }
  }, [roleId]);

  const handlePermissionChange = (permission: Permission, checked: boolean) => {
    if (!role) return;
    const newPermissions = checked
      ? [...role.permissions, permission]
      : role.permissions.filter(p => p !== permission);
    setRole({ ...role, permissions: newPermissions });
  };

  const handleGroupPermissionChange = (groupPermissions: Permission[], checked: boolean) => {
    if (!role) return;
    let newPermissions = [...role.permissions];
    if (checked) {
      groupPermissions.forEach(p => {
        if (!newPermissions.includes(p)) {
          newPermissions.push(p);
        }
      });
    } else {
      newPermissions = newPermissions.filter(p => !groupPermissions.includes(p));
    }
    setRole({ ...role, permissions: newPermissions });
  };

  const handleSave = () => {
    // In a real app, this would be an API call to save the role.
    console.log('Saving role:', role);
    alert(`Role "${role?.name}" saved successfully!`);
    navigate('/dashboard/admin/roles');
  };

  if (!role) {
    return <div>Loading...</div>; // Or a proper skeleton loader
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/admin/roles')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isNewRole ? 'Create New Role' : `Edit Role: ${role.name}`}
          </h1>
          <p className="text-muted-foreground">
            Modify the details and permissions for this role.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role Details</CardTitle>
              <CardDescription>Name and description for this role.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input 
                  id="role-name" 
                  value={role.name} 
                  onChange={(e) => setRole({ ...role, name: e.target.value })}
                  placeholder="e.g., Content Moderator"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-description">Description</Label>
                <Input 
                  id="role-description" 
                  value={role.description} 
                  onChange={(e) => setRole({ ...role, description: e.target.value })}
                  placeholder="e.g., Can view and edit project content"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Grant access to specific features.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(PERMISSION_GROUPS).map(([groupName, permissions]) => {
                const allInGroupSelected = permissions.every(p => role.permissions.includes(p));
                const someInGroupSelected = permissions.some(p => role.permissions.includes(p));

                return (
                  <div key={groupName} className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-t-lg border-b">
                        <h3 className="font-semibold">{groupName}</h3>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`select-all-${groupName}`} className="text-sm font-normal">Select All</Label>
                          <Checkbox 
                            id={`select-all-${groupName}`}
                            checked={allInGroupSelected}
                            onCheckedChange={(checked) => handleGroupPermissionChange(permissions, !!checked)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border border-t-0 rounded-b-lg">
                        {permissions.map(permission => (
                          <div key={permission} className="flex items-center space-x-2">
                            <Checkbox 
                              id={permission}
                              checked={role.permissions.includes(permission)}
                              onCheckedChange={(checked) => handlePermissionChange(permission, !!checked)}
                            />
                            <Label htmlFor={permission} className="font-normal text-sm leading-snug">
                              {permission.replace(/:/g, ' ')}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate('/dashboard/admin/roles')}>Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default AdminRoleDetail;
