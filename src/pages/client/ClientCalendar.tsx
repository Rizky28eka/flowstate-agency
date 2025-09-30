import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Plus, Clock, Users, Video, MapPin, X, ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const initialProjects = [
  { id: 1, name: "Website Redesign", color: "bg-blue-500" },
  { id: 2, name: "Mobile App Development", color: "bg-purple-500" },
  { id: 3, name: "Brand Identity", color: "bg-green-500" }
];

const initialMeetings = [
  {
    id: 1,
    title: "Project Kickoff Meeting",
    projectId: 1,
    date: "2025-10-02",
    time: "10:00 AM",
    duration: 60,
    type: "Virtual",
    location: "Zoom Meeting",
    attendees: [
      { name: "Sarah Wilson", role: "Project Manager" },
      { name: "You", role: "Client" }
    ],
    agenda: [
      "Project overview and objectives",
      "Timeline discussion",
      "Resource allocation"
    ],
    status: "upcoming",
    meetingLink: "https://zoom.us/j/meeting-123"
  },
  {
    id: 2,
    title: "Design Review",
    projectId: 1,
    date: "2025-10-03",
    time: "02:00 PM",
    duration: 45,
    type: "Virtual",
    location: "Google Meet",
    attendees: [
      { name: "Lisa Chen", role: "UI/UX Designer" },
      { name: "You", role: "Client" }
    ],
    agenda: [
      "Review wireframes",
      "Discuss color schemes",
      "Finalize design direction"
    ],
    status: "upcoming",
    meetingLink: "https://meet.google.com/abc-defg-hij"
  },
  {
    id: 3,
    title: "Sprint Planning",
    projectId: 2,
    date: "2025-10-04",
    time: "11:00 AM",
    duration: 90,
    type: "In-Person",
    location: "Office - Meeting Room A",
    attendees: [
      { name: "Mike Johnson", role: "Lead Developer" },
      { name: "Sarah Wilson", role: "Project Manager" },
      { name: "You", role: "Client" }
    ],
    agenda: [
      "Sprint goals review",
      "Task prioritization",
      "Resource planning",
      "Risk assessment"
    ],
    status: "upcoming"
  }
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const ClientCalendar = () => {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [projects] = useState(initialProjects);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  // New Meeting Form
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    projectId: 1,
    date: "",
    time: "",
    duration: 60,
    type: "Virtual",
    location: "",
    attendees: "",
    agenda: ""
  });

  const upcomingMeetings = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return meetings
      .filter(m => new Date(m.date) >= now)
      .filter(m => filterType === "all" || m.type === filterType)
      .filter(m => 
        searchQuery === "" ||
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [meetings, filterType, searchQuery]);

  const stats = useMemo(() => {
    const totalHours = upcomingMeetings.reduce((sum, m) => sum + m.duration, 0) / 60;
    const teamMeetings = upcomingMeetings.filter(m => m.attendees.length > 2).length;
    const virtualMeetings = upcomingMeetings.filter(m => m.type === "Virtual").length;
    
    return {
      totalMeetings: upcomingMeetings.length,
      totalHours: totalHours.toFixed(1),
      teamMeetings,
      virtualMeetings
    };
  }, [upcomingMeetings]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getMeetingsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return meetings.filter(m => m.date === dateStr);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selected);
  };

  const handleCreateMeeting = () => {
    if (!newMeeting.title || !newMeeting.date || !newMeeting.time) {
      alert("Please fill in all required fields");
      return;
    }

    const meeting = {
      id: Date.now(),
      title: newMeeting.title,
      projectId: parseInt(newMeeting.projectId),
      date: newMeeting.date,
      time: newMeeting.time,
      duration: parseInt(newMeeting.duration),
      type: newMeeting.type,
      location: newMeeting.location || (newMeeting.type === "Virtual" ? "Online Meeting" : "Office"),
      attendees: newMeeting.attendees.split(',').map(name => ({
        name: name.trim(),
        role: "Team Member"
      })).filter(a => a.name),
      agenda: newMeeting.agenda.split('\n').filter(item => item.trim()),
      status: "upcoming",
      meetingLink: newMeeting.type === "Virtual" ? "https://meet.example.com/" + Date.now() : undefined
    };

    setMeetings([...meetings, meeting]);
    setShowMeetingModal(false);
    setNewMeeting({
      title: "",
      projectId: 1,
      date: "",
      time: "",
      duration: 60,
      type: "Virtual",
      location: "",
      attendees: "",
      agenda: ""
    });
  };

  const handleCancelMeeting = (meetingId) => {
    if (confirm("Are you sure you want to cancel this meeting?")) {
      setMeetings(meetings.filter(m => m.id !== meetingId));
    }
  };

  const handleJoinMeeting = (meeting) => {
    if (meeting.meetingLink) {
      window.open(meeting.meetingLink, '_blank');
    } else {
      alert(`Meeting location: ${meeting.location}`);
    }
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square p-1"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayMeetings = getMeetingsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={cn(
            "aspect-square p-1 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
            isToday && "border-primary bg-primary/5",
            isSelected && "bg-primary/10 border-primary",
            dayMeetings.length > 0 && "font-semibold"
          )}
        >
          <div className="text-xs sm:text-sm">{day}</div>
          {dayMeetings.length > 0 && (
            <div className="flex flex-wrap gap-0.5 mt-1">
              {dayMeetings.slice(0, 2).map((meeting, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    projects.find(p => p.id === meeting.projectId)?.color || "bg-gray-500"
                  )}
                />
              ))}
              {dayMeetings.length > 2 && (
                <div className="text-xs text-muted-foreground">+{dayMeetings.length - 2}</div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Meetings & Calendar</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your schedule and meetings</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => setShowMeetingModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Request Meeting
        </Button>
      </div>

      {/* Meeting Request Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Request New Meeting</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowMeetingModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>Fill in the meeting details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Meeting Title *</label>
                <Input
                  placeholder="e.g., Design Review Meeting"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Project</label>
                  <select
                    className="w-full h-10 px-3 border rounded-md"
                    value={newMeeting.projectId}
                    onChange={(e) => setNewMeeting({...newMeeting, projectId: e.target.value})}
                  >
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Meeting Type</label>
                  <select
                    className="w-full h-10 px-3 border rounded-md"
                    value={newMeeting.type}
                    onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value})}
                  >
                    <option value="Virtual">Virtual</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Date *</label>
                  <Input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Time *</label>
                  <Input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Duration (minutes)</label>
                <Input
                  type="number"
                  placeholder="60"
                  value={newMeeting.duration}
                  onChange={(e) => setNewMeeting({...newMeeting, duration: e.target.value})}
                  min="15"
                  step="15"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input
                  placeholder="e.g., Zoom, Google Meet, or Office Room"
                  value={newMeeting.location}
                  onChange={(e) => setNewMeeting({...newMeeting, location: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Attendees (comma-separated)</label>
                <Input
                  placeholder="e.g., Sarah Wilson, Mike Johnson"
                  value={newMeeting.attendees}
                  onChange={(e) => setNewMeeting({...newMeeting, attendees: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Agenda (one item per line)</label>
                <textarea
                  className="w-full min-h-24 px-3 py-2 border rounded-md"
                  placeholder="Project overview&#10;Timeline discussion&#10;Q&A session"
                  value={newMeeting.agenda}
                  onChange={(e) => setNewMeeting({...newMeeting, agenda: e.target.value})}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowMeetingModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleCreateMeeting}>
                  Create Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Calendar Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">{stats.totalMeetings}</div>
            <p className="text-xs text-muted-foreground">Meetings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">{stats.totalHours}h</div>
            <p className="text-xs text-muted-foreground">Time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Team</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">{stats.teamMeetings}</div>
            <p className="text-xs text-muted-foreground">Group</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Virtual</CardTitle>
            <Video className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">{stats.virtualMeetings}</div>
            <p className="text-xs text-muted-foreground">Online</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Calendar View */}
        <Card className="order-2 xl:order-1">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg sm:text-xl">Calendar View</CardTitle>
                <CardDescription>Your meeting schedule</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="text-sm font-medium min-w-32 text-center">
                  {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                </div>
                <Button variant="outline" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-2">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map(day => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground p-1">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            </div>

            {selectedDate && (
              <div className="mt-4 p-3 border rounded-lg bg-muted/30">
                <h4 className="font-semibold text-sm mb-2">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h4>
                {getMeetingsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-2">
                    {getMeetingsForDate(selectedDate).map(meeting => (
                      <div key={meeting.id} className="text-xs p-2 bg-background rounded">
                        <div className="font-medium">{meeting.title}</div>
                        <div className="text-muted-foreground">{meeting.time} • {meeting.duration} min</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No meetings scheduled</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card className="order-1 xl:order-2">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Upcoming Meetings</CardTitle>
            <CardDescription className="hidden sm:block">
              Your scheduled meetings with the team
            </CardDescription>
            
            {/* Search and Filter */}
            <div className="flex gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search meetings..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                >
                  <Filter className="w-4 h-4" />
                </Button>
                {showFilterMenu && (
                  <div className="absolute right-0 top-12 bg-background border rounded-lg shadow-lg p-2 z-10 min-w-40">
                    <button
                      className={cn("w-full text-left px-3 py-2 rounded text-sm hover:bg-muted", filterType === "all" && "bg-muted")}
                      onClick={() => { setFilterType("all"); setShowFilterMenu(false); }}
                    >
                      All Meetings
                    </button>
                    <button
                      className={cn("w-full text-left px-3 py-2 rounded text-sm hover:bg-muted", filterType === "Virtual" && "bg-muted")}
                      onClick={() => { setFilterType("Virtual"); setShowFilterMenu(false); }}
                    >
                      Virtual Only
                    </button>
                    <button
                      className={cn("w-full text-left px-3 py-2 rounded text-sm hover:bg-muted", filterType === "In-Person" && "bg-muted")}
                      onClick={() => { setFilterType("In-Person"); setShowFilterMenu(false); }}
                    >
                      In-Person Only
                    </button>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {upcomingMeetings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No upcoming meetings found</p>
                </div>
              ) : (
                upcomingMeetings.map((meeting) => {
                  const project = projects.find(p => p.id === meeting.projectId);
                  return (
                    <div key={meeting.id} className="border rounded-lg p-3 sm:p-4 hover:border-primary transition-colors">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-2 mb-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base">{meeting.title}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">{project?.name}</p>
                        </div>
                        <Badge variant="outline" className="text-xs shrink-0">{meeting.type}</Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                          <span>{new Date(meeting.date).toLocaleDateString()} at {meeting.time}</span>
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

                      {meeting.agenda && meeting.agenda.length > 0 && (
                        <div className="border-t pt-3 mb-3">
                          <p className="text-xs text-muted-foreground mb-2">Agenda:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {meeting.agenda.map((item, index) => (
                              <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleJoinMeeting(meeting)}
                        >
                          <Video className="w-3 h-3 mr-1" />
                          {meeting.type === "Virtual" ? "Join Meeting" : "View Details"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 sm:flex-none"
                          onClick={() => handleCancelMeeting(meeting.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientCalendar;