import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { Task } from '../../types';
import { tasksAPI } from '../../services/api';
import { MoreHorizontal, Plus, Calendar, User as UserIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface KanbanBoardProps {
    tasks: Task[];
    onTaskUpdate: () => void; // Callback to refresh data
}

const COLUMNS: { id: Task['status']; label: string; color: string }[] = [
    { id: 'Backlog', label: 'Backlog', color: 'bg-gray-100 border-gray-200' },
    { id: 'To Do', label: 'To Do', color: 'bg-blue-50 border-blue-100' },
    { id: 'In Progress', label: 'In Progress', color: 'bg-yellow-50 border-yellow-100' },
    { id: 'Review', label: 'Review', color: 'bg-purple-50 border-purple-100' },
    { id: 'Done', label: 'Done', color: 'bg-green-50 border-green-100' },
];

const PRIORITY_COLORS = {
    Low: 'bg-slate-100 text-slate-600',
    Medium: 'bg-blue-100 text-blue-700',
    High: 'bg-orange-100 text-orange-700',
    Urgent: 'bg-red-100 text-red-700',
};

export default function KanbanBoard({ tasks, onTaskUpdate }: KanbanBoardProps) {
    const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);
    const [optimisticTasks, setOptimisticTasks] = useState<Record<number, Task>>({});
    const [isDragging, setIsDragging] = useState(false);
    const isDraggingRef = useRef(isDragging);

    useEffect(() => {
        isDraggingRef.current = isDragging;
    }, [isDragging]);

    // Derived state for tasks - use optimistic updates or original tasks
    const currentTasks = useMemo(() => {
        if (!isDragging && Object.keys(optimisticTasks).length === 0) {
            return tasks;
        }

        // Merge original tasks with optimistic updates
        const taskMap = new Map(tasks.map(task => [task.id, task]));
        Object.values(optimisticTasks).forEach(optimisticTask => {
            taskMap.set(optimisticTask.id, optimisticTask);
        });

        return Array.from(taskMap.values());
    }, [tasks, optimisticTasks, isDragging]);

    const handleDragStart = (e: React.DragEvent, taskId: number) => {
        setDraggedTaskId(taskId);
        setIsDragging(true);
        e.dataTransfer.effectAllowed = 'move';
        // Transparent drag image hack if needed, but default is usually fine
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = async (e: React.DragEvent, targetStatus: Task['status']) => {
        e.preventDefault();
        setIsDragging(false);

        if (draggedTaskId === null) return;

        const task = currentTasks.find(t => t.id === draggedTaskId);
        if (!task || task.status === targetStatus) {
            setDraggedTaskId(null);
            return;
        }

        // Optimistic Update - store the updated task in optimisticTasks
        const updatedTask = { ...task, status: targetStatus };
        setOptimisticTasks(prev => ({
            ...prev,
            [updatedTask.id]: updatedTask
        }));
        setDraggedTaskId(null);

        try {
            await tasksAPI.update(draggedTaskId, { status: targetStatus });
            onTaskUpdate(); // Sync with server eventually
        } catch (error) {
            console.error("Failed to move task", error);
            // Revert on failure - remove the optimistic update
            setOptimisticTasks(prev => {
                const newOptimisticTasks = { ...prev };
                delete newOptimisticTasks[draggedTaskId];
                return newOptimisticTasks;
            });
        }
    };

    // Filter tasks per column
    const getTasksByStatus = (status: string) => {
        return currentTasks.filter(t => t.status === status);
    };

    return (
        <div className="flex h-full overflow-x-auto pb-4 gap-4">
            {COLUMNS.map(col => (
                <div 
                    key={col.id} 
                    className={twMerge("min-w-[280px] w-[280px] flex flex-col rounded-lg border", col.color)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, col.id)}
                >
                    {/* Column Header */}
                    <div className="p-3 flex items-center justify-between border-b border-black/5">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-gray-700">{col.label}</span>
                            <span className="bg-white/50 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
                                {getTasksByStatus(col.id).length}
                            </span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-700">
                            <Plus size={16} />
                        </button>
                    </div>

                    {/* Task List */}
                    <div className="flex-1 p-2 flex flex-col gap-2 overflow-y-auto min-h-[150px]">
                        {getTasksByStatus(col.id).map(task => (
                            <div
                                key={task.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, task.id)}
                                className={clsx(
                                    "bg-white p-3 rounded shadow-sm border border-transparent hover:border-blue-300 cursor-grab active:cursor-grabbing group transition-all",
                                    draggedTaskId === task.id && "opacity-50"
                                )}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={clsx("text-[10px] px-1.5 py-0.5 rounded font-medium uppercase tracking-wider", PRIORITY_COLORS[task.priority])}>
                                        {task.priority}
                                    </span>
                                    <button className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                                
                                <h4 className="text-sm font-medium text-gray-800 mb-3 leading-snug">
                                    {task.title}
                                </h4>

                                <div className="flex items-center justify-between mt-auto">
                                    {task.due_date && (
                                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                                            <Calendar size={12} />
                                            <span>{new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                    )}
                                    
                                    {task.assignee_avatar ? (
                                        <img src={task.assignee_avatar} alt="Assignee" className="w-6 h-6 rounded-full border border-white" />
                                    ) : (
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-white">
                                            <UserIcon size={12} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
