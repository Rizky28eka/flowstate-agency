export interface Project {
    id: number;
    name: string;
    client: string;
    status: 'In Progress' | 'Completed' | 'On Hold';
    progress: number;
}
