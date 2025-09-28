import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { strategicRoadmap, goals } from "@/lib/mock-data";
import { Target } from "lucide-react";

const statusColors: Record<string, string> = {
  "On Track": "bg-green-100 text-green-700 border border-green-200",
  Delayed: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Completed: "bg-blue-100 text-blue-700 border border-blue-200",
  "Not Started": "bg-gray-100 text-gray-700 border border-gray-200",
};

const RoadmapItemCard = ({ item }) => {
  const relatedGoal = goals.find((g) => g.id === item.goalId);

  return (
    <Card className="rounded-xl border shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold text-gray-800 pr-4">
            {item.title}
          </CardTitle>
          <Badge className={`text-xs px-3 py-1 ${statusColors[item.status]}`}>
            {item.status}
          </Badge>
        </div>
        <CardDescription className="mt-2 text-sm text-gray-600">
          {item.description}
        </CardDescription>
      </CardHeader>
      {relatedGoal && (
        <CardContent className="p-4 border-t">
          <div className="flex items-center text-xs text-gray-500">
            <Target className="h-4 w-4 mr-2" />
            <span>Related Goal: {relatedGoal.title}</span>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const OwnerStrategicRoadmap = () => {
  const roadmapByQuarter = strategicRoadmap.reduce((acc, item) => {
    const key = `${item.quarter} ${item.year}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, typeof strategicRoadmap>);

  const sortedQuarters = Object.keys(roadmapByQuarter).sort((a, b) => {
    const [qA, yA] = a.split(" ");
    const [qB, yB] = b.split(" ");
    if (yA !== yB) return parseInt(yA) - parseInt(yB);
    return parseInt(qA.slice(1)) - parseInt(qB.slice(1));
  });

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Strategic Roadmap</h1>
        <p className="text-gray-500">
          Visualize the company&apos;s high-level initiatives and long-term
          goals across quarters.
        </p>
      </header>

      <div className="space-y-10">
        {sortedQuarters.map((quarterKey) => (
          <section key={quarterKey}>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              {quarterKey}
            </h2>
            {/* Grid 2 kolom di tablet, 3 kolom di desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmapByQuarter[quarterKey].map((item) => (
                <RoadmapItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default OwnerStrategicRoadmap;