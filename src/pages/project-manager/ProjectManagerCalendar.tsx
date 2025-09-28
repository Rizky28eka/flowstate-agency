import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Clock, Users, Video } from "lucide-react";
import { meetings } from "@/lib/mock-data";

const ProjectManagerCalendar = () => {
  const upcomingMeetings = meetings.filter(m => new Date(m.date) >= new Date());

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Project Calendar</h2>
        <Button className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <Card className="lg:col-span-2">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Calendar View</CardTitle>
            <CardDescription>Project deadlines, meetings, and milestones</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="h-64 sm:h-80 lg:h-96 bg-muted/30 rounded-lg flex items-center justify-center">
              <p className="text-sm sm:text-base text-muted-foreground text-center px-4">
                Calendar component will be implemented here
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Upcoming Events</CardTitle>
            <CardDescription>Next meetings and deadlines</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="border rounded-lg p-3 sm:p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm truncate">{meeting.title}</h4>
                    <span className="text-xs text-muted-foreground shrink-0">{meeting.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="w-3 h-3" />
                    <span className="truncate">{meeting.date}</span>
                    <Clock className="w-3 h-3 ml-2" />
                    <span>{meeting.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span className="truncate">{meeting.attendees.length} attendees</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectManagerCalendar;