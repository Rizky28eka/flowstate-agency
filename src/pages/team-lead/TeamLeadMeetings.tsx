import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Users, Clock, Video, MapPin } from "lucide-react";
import { meetings } from "@/lib/mock-data";

const TeamLeadMeetings = () => {
  const teamMeetings = meetings.filter(m => 
    m.type === "Team Meeting" || 
    m.attendees.some(a => a.role.includes("Lead") || a.role.includes("Director"))
  );

  const upcomingMeetings = teamMeetings.filter(m => new Date(m.date) >= new Date());
  const pastMeetings = teamMeetings.filter(m => new Date(m.date) < new Date());

return (    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Team Meetings</h2>
        <Button className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Meeting Stats - Responsive Grid */}
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
            <CardTitle className="text-xs sm:text-sm font-medium">Team Standups</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Weekly</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">45min</div>
            <p className="text-xs text-muted-foreground">Efficiency</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Attendance</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold text-purple-600">96%</div>
            <p className="text-xs text-muted-foreground">Rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Upcoming Meetings */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Upcoming Meetings</CardTitle>
            <CardDescription className="hidden sm:block">Scheduled team meetings and 1:1s</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="border rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base truncate">{meeting.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{meeting.type}</p>
                    </div>
                    <Badge variant={meeting.status === "Scheduled" ? "default" : "secondary"} className="text-xs shrink-0">
                      {meeting.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                      <span className="truncate">{meeting.date} at {meeting.time}</span>
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
                      <span className="truncate">{meeting.attendees.length} attendees</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      <Video className="w-3 h-3 mr-1" />
                      Join
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Meeting History */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Recent Meetings</CardTitle>
            <CardDescription className="hidden sm:block">Past team meetings and outcomes</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4">
              {pastMeetings.map((meeting) => (
                <div key={meeting.id} className="border rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base truncate">{meeting.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{meeting.type}</p>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">Completed</Badge>
                  </div>

                  <div className="text-xs sm:text-sm text-muted-foreground mb-3">
                    <p>{meeting.date} • {meeting.duration} minutes</p>
                    <p>{meeting.attendees.length} attendees</p>
                  </div>

                  {meeting.notes && (
                    <div className="bg-muted/50 rounded-lg p-3 mb-3">
                      <p className="text-sm">{meeting.notes}</p>
                    </div>
                  )}

                  <Button variant="outline" size="sm">
                    View Notes
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamLeadMeetings;