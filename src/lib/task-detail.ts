import { tasks, teamMembers } from "./mock-data";

// --- BASE TYPES ---

// Ambil tipe 1 elemen dari array `tasks`
export type Task = (typeof tasks)[number];

// --- INTERFACES ---

export interface SubTask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface TaskComment {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  text: string;
}

export interface TaskAttachment {
  id: string;
  fileName: string;
  fileType: string;
  url: string;
  uploadDate: string;
}

export interface TaskDetails extends Task {
  subTasks: SubTask[];
  comments: TaskComment[];
  attachments: TaskAttachment[];
}

// --- LOGIC ---

/**
 * Generates a rich, detailed object for a single task.
 */
export const getTaskDetails = (taskId: string): TaskDetails | null => {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return null;

  const DEMO_TASK_ID = "TSK-001";

  // Mock data (hanya untuk demo)
  const mockSubTasks: SubTask[] = [
    { id: "SUB-1", title: "Research competitor branding", isCompleted: true },
    { id: "SUB-2", title: "Sketch initial logo variations", isCompleted: true },
    {
      id: "SUB-3",
      title: "Digitize top 3 sketches in Illustrator",
      isCompleted: false,
    },
    { id: "SUB-4", title: "Prepare presentation for client", isCompleted: false },
  ];

  const assignedMember = teamMembers.find((m) => m.name === task.assignedTo);
  const sarahMember = teamMembers.find((m) => m.name === "Sarah Wilson");

  const mockComments: TaskComment[] = [
    {
      id: "CMT-1",
      author: "Sarah Wilson",
      avatar: sarahMember?.avatar ?? "",
      timestamp: "2 hours ago",
      text: `Great start on the concepts! For the next round, let's try to explore a more minimalist approach as well, per the client's latest feedback.`,
    },
    {
      id: "CMT-2",
      author: task.assignedTo,
      avatar: assignedMember?.avatar ?? "",
      timestamp: "1 hour ago",
      text: `Will do. I'll work on a few minimalist options and have them ready for review by EOD tomorrow.`,
    },
  ];

  const mockAttachments: TaskAttachment[] = [
    {
      id: "ATT-1",
      fileName: "brief-v2.pdf",
      fileType: "PDF",
      url: "#",
      uploadDate: "2024-11-20",
    },
    {
      id: "ATT-2",
      fileName: "inspiration-board.png",
      fileType: "PNG",
      url: "#",
      uploadDate: "2024-11-21",
    },
  ];

  return {
    ...task,
    subTasks: task.id === DEMO_TASK_ID ? mockSubTasks : [],
    comments: task.id === DEMO_TASK_ID ? mockComments : [],
    attachments: task.id === DEMO_TASK_ID ? mockAttachments : [],
  };
};