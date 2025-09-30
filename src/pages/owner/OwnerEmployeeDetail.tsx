import { useParams } from "react-router-dom";
import { teamMembers } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const OwnerEmployeeDetail = () => {
  const { employeeId } = useParams();
  const employee = teamMembers.find((member) => member.id === parseInt(employeeId || '', 10));

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{employee.name}</CardTitle>
            <p className="text-muted-foreground">{employee.role}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Email</h3>
            <p>{employee.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">Department</h3>
            <p>{employee.department}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status</h3>
            <p>{employee.status}</p>
          </div>
          <div>
            <h3 className="font-semibold">Projects</h3>
            <p>{employee.projects}</p>
          </div>
          <div>
            <h3 className="font-semibold">Joined Date</h3>
            <p>{new Date(employee.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OwnerEmployeeDetail;
