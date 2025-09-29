import { useState, useMemo } from 'react';
import { tasks, teamMembers } from '@/lib/mock-data';
import { getTaskDetails, TaskDetails, SubTask, TaskComment } from '@/lib/task-detail';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Search, Paperclip, MessageSquare, CheckSquare } from 'lucide-react';

const TaskDetailSheet = ({ task, isOpen, onOpenChange }: { task: TaskDetails | null, isOpen: boolean, onOpenChange: (open: boolean) => void }) => {
  if (!task) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl w-[90vw] flex flex-col">
        <SheetHeader className="p-6">
          <SheetTitle className="text-2xl">{task.title}</SheetTitle>
          <SheetDescription>In project: {task.projectId}</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div><span className="font-medium">Due Date:</span> <span className="text-muted-foreground">{task.dueDate}</span></div>
            <div><span className="font-medium">Priority:</span> <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>{task.priority}</Badge></div>
            <div><span className="font-medium">Status:</span> <Badge variant="outline">{task.status}</Badge></div>
          </div>
          <Separator />
          
          {task.subTasks.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="flex items-center"><CheckSquare className="h-5 w-5 mr-2"/>Sub-Tasks</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {task.subTasks.map(sub => (
                  <div key={sub.id} className="flex items-center gap-3">
                    <Checkbox id={`sub-${sub.id}`} defaultChecked={sub.isCompleted} />
                    <label htmlFor={`sub-${sub.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{sub.title}</label>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {task.attachments.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="flex items-center"><Paperclip className="h-5 w-5 mr-2"/>Attachments</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {task.attachments.map(att => (
                  <div key={att.id} className="flex items-center justify-between p-2 border rounded-md">
                    <p className="text-sm font-medium">{att.fileName}</p>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader><CardTitle className="flex items-center"><MessageSquare className="h-5 w-5 mr-2"/>Comments</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {task.comments.map(comment => (
                <div key={comment.id} className="flex items-start gap-4">
                  <Avatar className="h-9 w-9"><AvatarImage src={comment.avatar} /><AvatarFallback>{comment.author.charAt(0)}</AvatarFallback></Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.text}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9"><AvatarFallback>You</AvatarFallback></Avatar>
                <div className="flex-1">
                  <Textarea placeholder="Write a comment..." />
                  <Button className="mt-2">Post Comment</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const MemberTasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState<TaskDetails | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Assuming the logged-in member is 'Sarah Wilson' for demo purposes
  const currentUser = 'Sarah Wilson';
  const memberTasks = useMemo(() => tasks.filter(t => t.assignedTo === currentUser), [currentUser]);

  const filteredTasks = useMemo(() => {
    return memberTasks.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [memberTasks, searchTerm]);

  const handleTaskClick = (taskId: string) => {
    const details = getTaskDetails(taskId);
    setSelectedTask(details);
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Tasks</h1>
          <p className="text-muted-foreground">All tasks assigned to you.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tasks..." 
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map(task => (
                <TableRow key={task.id} onClick={() => handleTaskClick(task.id)} className="cursor-pointer">
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.projectId}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell><Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>{task.priority}</Badge></TableCell>
                  <TableCell><Badge variant="outline">{task.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <TaskDetailSheet task={selectedTask} isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  );
};

export default MemberTasks;
