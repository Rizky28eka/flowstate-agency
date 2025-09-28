import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Clock, Users, Video } from "lucide-react";

const MemberCalendar = () => {
return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">My Calendar</h2>
        <Button className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <Card className="lg:col-span-2">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Calendar View</CardTitle>
            <CardDescription>Your schedule, meetings, and deadlines</CardDescription>
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
            <CardTitle className="text-lg sm:text-xl">Today's Schedule</CardTitle>
            <CardDescription>Your agenda for today</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4">
              <div className="border rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-sm sm:text-base">Daily Standup</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">9:00 AM - 9:30 AM</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs">Team meeting</span>
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-sm sm:text-base">Client Review</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Video className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs">Virtual meeting</span>
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-sm sm:text-base">Project Deadline</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">End of day</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs">Task delivery</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberCalendar;