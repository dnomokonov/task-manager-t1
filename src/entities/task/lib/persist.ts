import type { Task } from '../model/types';

export const TASKS_KEY = 'tasks';

export const loadTasks = (): Task[] => {
    const tasks = localStorage.getItem(TASKS_KEY);
    if (!tasks) return [];
    const parsedTasks = JSON.parse(tasks) as Task[];
    return parsedTasks.map(task => ({
        ...task,
        createdAt: task.createdAt || new Date().toISOString(),
    }));
};

export const saveTasks = (tasks: Task[]) => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};