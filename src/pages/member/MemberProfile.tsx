import { useState, useMemo } from 'react';
import { teamMembers } from '@/lib/mock-data';
import { AVAILABLE_SKILLS, Skill } from '@/lib/skills';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import { Mail, Phone, MapPin, PlusCircle, X } from 'lucide-react';

const AddSkillDialog = ({ currentSkills, onAddSkill }: { currentSkills: string[], onAddSkill: (skill: string) => void }) => {
  const [open, setOpen] = useState(false);

  const unselectedSkills = useMemo(() => 
    AVAILABLE_SKILLS.filter(skill => !currentSkills.includes(skill.name))
  , [currentSkills]);

  const handleSelect = (skillName: string) => {
    onAddSkill(skillName);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm"><PlusCircle className="h-4 w-4 mr-2"/>Add Skill</Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <Command>
          <CommandInput placeholder="Search for a skill..." />
          <CommandList>
            <CommandEmpty>No skills found.</CommandEmpty>
            {Object.entries(
              unselectedSkills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill);
                return acc;
              }, {} as Record<string, Skill[]>)
            ).map(([category, skills]) => (
              <CommandGroup key={category} heading={category}>
                {skills.map(skill => (
                  <CommandItem key={skill.id} onSelect={() => handleSelect(skill.name)}>
                    {skill.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const MemberProfile = () => {
  // Assume logged-in member is Sarah Wilson (ID 1) for demo
  const member = teamMembers.find(m => m.id === 1);
  const [currentSkills, setCurrentSkills] = useState(member?.skills || []);

  if (!member) {
    return <div>Member not found.</div>;
  }

  const addSkill = (skill: string) => {
    if (!currentSkills.includes(skill)) {
      setCurrentSkills([...currentSkills, skill]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setCurrentSkills(currentSkills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">View and manage your personal information and skills.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Profile Info */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-3xl">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-muted-foreground">{member.role}</p>
            <p className="text-sm text-muted-foreground">{member.department}</p>
          </CardContent>
          <CardContent className="text-sm space-y-3 border-t pt-4">
            <div className="flex items-center"><Mail className="h-4 w-4 mr-3 text-muted-foreground"/><span>{member.email}</span></div>
            <div className="flex items-center"><Phone className="h-4 w-4 mr-3 text-muted-foreground"/><span>{member.phone}</span></div>
            <div className="flex items-center"><MapPin className="h-4 w-4 mr-3 text-muted-foreground"/><span>{member.location}</span></div>
          </CardContent>
        </Card>

        {/* Right Column: Skills & Other Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Skills</CardTitle>
                <CardDescription>Keep your skills up to date for better project matching.</CardDescription>
              </div>
              <AddSkillDialog currentSkills={currentSkills} onAddSkill={addSkill} />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentSkills.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-base py-1 pl-3 pr-2">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {currentSkills.length === 0 && <p className="text-sm text-muted-foreground">No skills added yet.</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Performance Snapshot</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between"><span>Average Utilization:</span><span className="font-medium">{member.utilization}%</span></div>
              <div className="flex justify-between"><span>Completed Projects:</span><span className="font-medium">{member.projects}</span></div>
              <div className="flex justify-between"><span>Average Rating:</span><span className="font-medium">{member.rating}/5.0</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
