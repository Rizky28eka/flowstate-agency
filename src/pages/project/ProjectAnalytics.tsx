
import { useOutletContext } from "react-router-dom";
import type { Project } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ProjectContext {
  project: Project;
}

// Placeholder data for charts
const burndownData = [
  { name: 'Sprint 1', remaining: 80, committed: 100 },
  { name: 'Sprint 2', remaining: 60, committed: 90 },
  { name: 'Sprint 3', remaining: 45, committed: 80 },
  { name: 'Sprint 4', remaining: 20, committed: 60 },
  { name: 'Sprint 5', remaining: 5, committed: 40 },
];

const budgetData = [
  { name: 'Design', spent: 8000, budgeted: 10000 },
  { name: 'Development', spent: 15000, budgeted: 20000 },
  { name: 'Marketing', spent: 5000, budgeted: 7000 },
  { name: 'Testing', spent: 3000, budgeted: 5000 },
];

const ProjectAnalytics = () => {
  const { project } = useOutletContext<ProjectContext>();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Burndown Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={burndownData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="committed" fill="#8884d8" name="Committed Points" />
              <Bar dataKey="remaining" fill="#82ca9d" name="Remaining Points" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget vs. Spent</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="budgeted" fill="#ccc" name="Budgeted" />
              <Bar dataKey="spent" fill="#4ade80" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectAnalytics;
