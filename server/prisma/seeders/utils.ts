import { faker } from '@faker-js/faker';

const indonesianNames = [
  'Budi Santoso', 'Siti Nurhaliza', 'Ahmad Fauzi', 'Dewi Lestari', 'Eko Prasetyo',
  'Rina Wijaya', 'Joko Widodo', 'Maya Sari', 'Agus Setiawan', 'Fitri Handayani',
  'Rizky Ramadhan', 'Ayu Ting Ting', 'Doni Prakoso', 'Lina Marlina', 'Hendra Gunawan',
  'Sari Indah', 'Bambang Kusuma', 'Ratna Dewi', 'Yudi Hartono', 'Ani Wijayanti'
];

// Universal project types (applicable to any agency)
const projectTypes = [
  'Brand Strategy', 'Campaign Management', 'Digital Transformation', 'Content Creation',
  'Website Development', 'Mobile App', 'Marketing Strategy', 'Social Media Management',
  'Event Planning', 'Video Production', 'Consulting Project', 'Research & Analysis',
  'Design System', 'Advertising Campaign', 'Public Relations', 'Training Program'
];

// Universal task types
const taskTypes = [
  'Research & Discovery', 'Strategy Development', 'Concept Creation', 'Design & Layout',
  'Content Writing', 'Review & Feedback', 'Client Presentation', 'Implementation',
  'Quality Check', 'Optimization', 'Documentation', 'Team Meeting',
  'Stakeholder Review', 'Revision & Updates', 'Final Delivery', 'Post-Project Analysis'
];

export function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function getIndonesianName(): string {
  return getRandomElement(indonesianNames);
}

export function generateProjectName(clientName: string): string {
  return `${getRandomElement(projectTypes)} - ${clientName}`;
}

export function generateTaskTitle(): string {
  return getRandomElement(taskTypes);
}
