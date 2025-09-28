import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Clock, Users, Video } from "lucide-react";

const MemberCalendar = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Calendar</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Your schedule, meetings, and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Calendar component will be implemented here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your agenda for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-3">
                <h4 className="font-medium">Daily Standup</h4>
                <p className="text-sm text-muted-foreground">9:00 AM - 9:30 AM</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Users className="w-3 h-3" />
                  <span className="text-xs">Team meeting</span>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-medium">Client Review</h4>
                <p className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Video className="w-3 h-3" />
                  <span className="text-xs">Virtual meeting</span>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-medium">Project Deadline</h4>
                <p className="text-sm text-muted-foreground">End of day</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">Task delivery</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MemberCalendar;