import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { tasks, teamMembers, projects } from "@/lib/mock-data";
import { Task } from "@/types";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateTaskFormProps {
  onAddTask: (task: Task) => void;
}

export const CreateTaskForm = ({ onAddTask }: CreateTaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);
  const [dependsOn, setDependsOn] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!title || !projectId || !assignedTo) return;

    const newTask: Task = {
      id: `TSK-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      title,
      description,
      projectId,
      assignedTo,
      status: "To Do",
      priority: "Medium",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0],
      estimatedHours: 8,
      actualHours: 0,
      tags: [],
      parentId,
      dependsOn,
    };

    onAddTask(newTask);
  };

  const projectTasks = tasks.filter(task => task.projectId === projectId);

  return (
    <div className="grid gap-4 py-4">
      <Input placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Select onValueChange={setProjectId}>
        <SelectTrigger>
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={setAssignedTo}>
        <SelectTrigger>
          <SelectValue placeholder="Assign to" />
        </SelectTrigger>
        <SelectContent>
          {teamMembers.map((m) => (
            <SelectItem key={m.id} value={m.name}>
              {m.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setParentId(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Parent Task (optional)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="null">None</SelectItem>
          {projectTasks.filter(t => !t.parentId).map((task) => (
            <SelectItem key={task.id} value={task.id}>
              {task.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {dependsOn.length > 0
              ? `${dependsOn.length} dependencies selected`
              : "Select dependencies (optional)"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search tasks..." />
            <CommandEmpty>No tasks found.</CommandEmpty>
            <CommandGroup>
              {projectTasks.map((task) => (
                <CommandItem
                  key={task.id}
                  value={task.id}
                  onSelect={(currentValue) => {
                    setDependsOn((prev) =>
                      prev.includes(currentValue)
                        ? prev.filter((item) => item !== currentValue)
                        : [...prev, currentValue]
                    );
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      dependsOn.includes(task.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {task.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={handleSubmit}>Create Task</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
};
