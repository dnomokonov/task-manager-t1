import {TaskCategory, TaskPriority, TaskStatus} from "@shared/types/enums";

export interface Task {
    id: string;
    title: string;
    description?: string;
    category: TaskCategory;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: string;
}
