
import { useOutletContext } from "react-router-dom";
import type { TeamMember } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface UserContext {
  user: TeamMember;
}

// Placeholder data
const utilizationData = [
  { month: "Jan", utilization: 85 },
  { month: "Feb", utilization: 88 },
  { month: "Mar", utilization: 90 },
  { month: "Apr", utilization: 87 },
  { month: "May", utilization: 92 },
  { month: "Jun", utilization: 95 },
];

const reviews = [
  { date: "2023-12-15", reviewer: "Sarah Wilson", summary: "Exceeded expectations on the TechCorp project.", rating: 4.8 },
  { date: "2023-06-20", reviewer: "Mike Johnson", summary: "Excellent work on the backend architecture.", rating: 4.6 },
  { date: "2022-12-10", reviewer: "Sarah Wilson", summary: "Consistently delivers high-quality work.", rating: 4.5 },
];

const UserPerformance = () => {
  const { user } = useOutletContext<UserContext>();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Utilization Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="utilization" stroke="#8884d8" name="Utilization (%)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Summary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.date}>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>{review.reviewer}</TableCell>
                  <TableCell>{review.rating}/5.0</TableCell>
                  <TableCell className="font-medium">{review.summary}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPerformance;
