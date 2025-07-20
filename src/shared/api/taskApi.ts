import type { Task } from '@entities/task/model/types';
import { TaskStatus, TaskPriority, TaskCategory } from '@shared/types/enums';

interface ServerTask {
    id: string;
    title: string;
    description?: string;
    priority: string;
    status: string;
    category: string;
    datecreated: string;
}

const lookupTask = <T extends string>(
    labels: Record<T, string>,
    value: string,
    fallback: T
): T => {
    const entry = Object.entries(labels).find(([, label]) => label === value);
    return entry ? entry[0] as T : fallback;
};

const convertTaskServer = (serverTask: ServerTask) => ({
    id: serverTask.id.toString(),
    title: serverTask.title,
    description: serverTask.description,
    category: lookupTask(TaskCategory, serverTask.category, 'BUG'),
    status: lookupTask(TaskStatus, serverTask.status, "TODO"),
    priority: lookupTask(TaskPriority, serverTask.priority, "LOW"),
    createdAt: serverTask.datecreated
        ? new Date(serverTask.datecreated).toISOString()
        : new Date().toISOString(),
})

const convertTaskClient =(clientTask: Omit<Task, 'id' | 'createdAt'>): Omit<ServerTask, 'id' | 'datecreated'> => ({
    title: clientTask.title,
    description: clientTask.description,
    category: TaskCategory[clientTask.category],
    status: TaskStatus[clientTask.status],
    priority: TaskPriority[clientTask.priority]
})

const API_BASE_URL = import.meta.env.VITE_API_SERVER_URL;

export const fetchTasks = async (): Promise<Task[]> => {
    const res = await fetch(`${API_BASE_URL}/tasks`);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const serverTasks: ServerTask[] = await res.json();
    return serverTasks.map(convertTaskServer);
}

export const fetchTaskById = async (id: string): Promise<Task | undefined> => {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const serverTask: ServerTask = await res.json();
    return convertTaskServer(serverTask);
}

export const createTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(convertTaskClient(task)),
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const result: { id: number; message: string } = await res.json();

    return {
        ...task,
        id: result.id.toString(),
        createdAt: new Date().toISOString(), // если сервер не возвращает дату
    };
};


export const updateTask = async (
    id: string,
    task: Omit<Task, 'id' | 'createdAt'>
): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertTaskClient(task)),
    });

    if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(`Failed to update task: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const serverTask: ServerTask = await response.json();
    return convertTaskServer(serverTask);
};


export const deleteTask = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(`Failed to delete task: ${response.status} ${response.statusText} - ${errorText}`);
    }
};
