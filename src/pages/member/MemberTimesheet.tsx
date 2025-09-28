import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, Calendar, DollarSign, Play, Pause, Square } from "lucide-react";
import { useState } from "react";
import { timeEntries } from "@/lib/mock-data";

const MemberTimesheet = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  const myTimeEntries = timeEntries.filter(e => e.employeName === "Sarah Wilson" || e.employeName === "Mike Johnson");
  const totalHoursThisWeek = myTimeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const billableHours = myTimeEntries.filter(e => e.billable).reduce((sum, entry) => sum + entry.hours, 0);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Time Tracking</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Manual Entry
        </Button>
      </div>

      {/* Time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHoursThisWeek}h</div>
            <p className="text-xs text-muted-foreground">Total logged</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{billableHours}h</div>
            <p className="text-xs text-muted-foreground">{Math.round((billableHours / totalHoursThisWeek) * 100)}% billable</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.5h</div>
            <p className="text-xs text-muted-foreground">Logged today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">40h</div>
            <p className="text-xs text-muted-foreground">Weekly target</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Time Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Time Tracker</CardTitle>
            <CardDescription>Track time for your current task</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-mono font-bold mb-4">{elapsedTime}</div>
              <Input 
                placeholder="What are you working on?"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                className="mb-4"
              />
              <div className="flex space-x-2 justify-center">
                {!isTracking ? (
                  <Button onClick={() => setIsTracking(true)} className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Start Timer
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setIsTracking(false)}>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                    <Button variant="destructive" onClick={() => {
                      setIsTracking(false);
                      setElapsedTime("00:00:00");
                      setCurrentTask("");
                    }}>
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Time Entries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
            <CardDescription>Your latest time tracking entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myTimeEntries.map((entry) => (
                <div key={entry.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{entry.taskName}</h4>
                      <p className="text-xs text-muted-foreground">{entry.projectName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{entry.hours}h</p>
                      <Badge variant={entry.billable ? "default" : "secondary"} className="text-xs">
                        {entry.billable ? "Billable" : "Non-billable"}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{entry.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">{entry.date}</span>
                    {entry.billable && (
                      <span className="text-xs font-medium text-green-600">
                        ${(entry.hours * entry.hourlyRate).toFixed(0)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MemberTimesheet;