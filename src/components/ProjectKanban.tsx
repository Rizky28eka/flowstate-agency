import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const getPriorityColor = (priority) => {
  if (priority === 'High') return 'bg-red-100 text-red-800';
  if (priority === 'Medium') return 'bg-amber-100 text-amber-800';
  return 'bg-green-100 text-green-800';
};

export const DraggableProjectCard = ({ project }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: project.id });
  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card className="bg-card hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
        <CardContent className="p-4">
          <h4 className="font-medium text-sm mb-2">{project.name}</h4>
          <p className="text-xs text-muted-foreground mb-3">{project.client}</p>
          <div className="flex items-center justify-between mb-3">
            <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
            <span className="text-xs font-semibold">{project.progress}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{project.team.length}</span>
            </div>
            <Avatar className="w-6 h-6">
              <AvatarFallback>{project.manager.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const DroppableProjectColumn = ({ status, projects }) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className="bg-muted/50 rounded-lg">
      <div className="p-4 border-b">
        <h3 className="font-semibold">{status}</h3>
        <p className="text-sm text-muted-foreground">{projects.length} projects</p>
      </div>
      <div className="p-4 space-y-4 min-h-[200px]">
        {projects.map(project => (
          <DraggableProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
