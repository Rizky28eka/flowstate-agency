import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Clock, Users, Video, MapPin } from "lucide-react";

const ClientCalendar = () => {
  const upcomingMeetings = [
    {
      id: 1,
      title: "Project Review Meeting",
      type: "Project Review",
      date: "2024-12-12",
      time: "2:00 PM",
      duration: 60,
      attendees: ["Sarah Wilson", "Lisa Chen"],
      location: "Virtual - Zoom",
      project: "Website Redesign",
      agenda: ["Review wireframes", "Discuss timeline", "Next steps"]
    },
    {
      id: 2,
      title: "Brand Presentation",
      type: "Presentation",
      date: "2024-12-15",
      time: "10:00 AM",
      duration: 90,
      attendees: ["Sarah Wilson", "Tom Rodriguez"],
      location: "Client Office",
      project: "Brand Identity",
      agenda: ["Present final concepts", "Review guidelines", "Approval process"]
    },
    {
      id: 3,
      title: "Weekly Check-in",
      type: "Status Update",
      date: "2024-12-18",
      time: "3:00 PM",
      duration: 30,
      attendees: ["Mike Johnson"],
      location: "Virtual - Teams",
      project: "Mobile App",
      agenda: ["Progress update", "Address concerns", "Plan next sprint"]
    }
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Meetings & Calendar</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Request Meeting
        </Button>
      </div>

      {/* Calendar Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingMeetings.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled meetings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {upcomingMeetings.reduce((sum, m) => sum + m.duration, 0) / 60}h
            </div>
            <p className="text-xs text-muted-foreground">Meeting time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Meetings</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">With multiple attendees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Virtual Meetings</CardTitle>
            <Video className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Online sessions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Your meeting schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Calendar component will be implemented here</p>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
            <CardDescription>Your scheduled meetings with the team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{meeting.title}</h4>
                      <p className="text-sm text-muted-foreground">{meeting.project}</p>
                    </div>
                    <Badge variant="outline">{meeting.type}</Badge>
                  </div>

                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{meeting.date} at {meeting.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{meeting.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{meeting.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{meeting.attendees.join(", ")}</span>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-xs text-muted-foreground mb-2">Agenda:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {meeting.agenda.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" size="sm" className="mt-3">
                    <Video className="w-3 h-3 mr-1" />
                    Join Meeting
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ClientCalendar;