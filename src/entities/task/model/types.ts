import { TaskCategory, TaskStatus, TaskPriority } from '@shared/types/enums.ts'

export interface Task {
    id: string;
    title: string;
    description?: string;
    category: TaskCategory;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: string;
}

export { TaskCategory, TaskStatus, TaskPriority };
