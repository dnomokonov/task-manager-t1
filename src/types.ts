export interface Task {
    id: string;
    title: string;
    description?: string;
    category: string;
    status: string;
    priority: string;
}

export interface TaskContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id'>) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
}