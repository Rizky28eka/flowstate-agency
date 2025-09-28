import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Clock, Users, Video } from "lucide-react";
import { meetings } from "@/lib/mock-data";

const ProjectManagerCalendar = () => {
  const upcomingMeetings = meetings.filter(m => new Date(m.date) >= new Date());

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Project Calendar</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Project deadlines, meetings, and milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Calendar component will be implemented here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next meetings and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{meeting.title}</h4>
                    <span className="text-xs text-muted-foreground">{meeting.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>{meeting.date}</span>
                    <Clock className="w-3 h-3 ml-2" />
                    <span>{meeting.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{meeting.attendees.length} attendees</span>
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

export default ProjectManagerCalendar;