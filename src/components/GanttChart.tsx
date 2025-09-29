import React, { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { Task } from '@/types';

interface GanttChartProps {
  tasks: Task[];
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks }) => {
  const ganttContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ganttContainer.current) {
      gantt.init(ganttContainer.current);

      const formattedTasks = tasks.map(task => ({
        id: task.id,
        text: task.title,
        start_date: task.dueDate, // Assuming dueDate is the start date
        duration: task.estimatedHours / 8, // Assuming 8 hours per day
        progress: task.actualHours / task.estimatedHours,
        parent: task.parentId || 0,
      }));

      const links = tasks
        .filter(task => task.dependsOn)
        .flatMap(task =>
          task.dependsOn!.map(depId => ({
            id: `${depId}-${task.id}`,
            source: depId,
            target: task.id,
            type: gantt.config.links.finish_to_start,
          }))
        );

      gantt.parse({ data: formattedTasks, links });
    }

    return () => {
      gantt.clearAll();
    };
  }, [tasks]);

  return <div ref={ganttContainer} style={{ width: '100%', height: '500px' }}></div>;
};

export default GanttChart;
