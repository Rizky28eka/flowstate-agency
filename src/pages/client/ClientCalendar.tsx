import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Clock, Users, Video, MapPin } from "lucide-react";
import { meetings, projects } from "@/lib/mock-data";

const ClientCalendar = () => {
  const upcomingMeetings = meetings.filter(m => new Date(m.date) >= new Date());

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Meetings & Calendar</h2>
        <Button className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Request Meeting
        </Button>
      </div>

      {/* Calendar Stats - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">{upcomingMeetings.length}</div>
            <p className="text-xs text-muted-foreground">Meetings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">
              {upcomingMeetings.reduce((sum, m) => sum + m.duration, 0) / 60}h
            </div>
            <p className="text-xs text-muted-foreground">Time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Team</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Group</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Virtual</CardTitle>
            <Video className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Online</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Calendar View */}
        <Card className="order-2 xl:order-1">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Calendar View</CardTitle>
            <CardDescription>Your meeting schedule</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="h-64 sm:h-80 lg:h-96 bg-muted/30 rounded-lg flex items-center justify-center">
              <p className="text-sm sm:text-base text-muted-foreground text-center px-4">
                Calendar component will be implemented here
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card className="order-1 xl:order-2">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Upcoming Meetings</CardTitle>
            <CardDescription className="hidden sm:block">
              Your scheduled meetings with the team
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => {
                const project = projects.find(p => p.id === meeting.projectId);
                return (
                  <div key={meeting.id} className="border rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-2 mb-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base truncate">{meeting.title}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{project?.name}</p>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">{meeting.type}</Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                        <span className="truncate">{new Date(meeting.date).toLocaleDateString()} at {meeting.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                        <span>{meeting.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:col-span-2">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                        <span className="truncate">{meeting.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:col-span-2">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                        <span className="truncate">{meeting.attendees.map(a => a.name).join(", ")}</span>
                      </div>
                    </div>

                    {/* Agenda - Collapsible on mobile */}
                    <div className="border-t pt-3">
                      <p className="text-xs text-muted-foreground mb-2">Agenda:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {meeting.agenda.map((item, index) => (
                          <li key={index} className="truncate sm:whitespace-normal">• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                        <Video className="w-3 h-3 mr-1" />
                        <span className="hidden sm:inline">Join Meeting</span>
                        <span className="sm:hidden">Join</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientCalendar;