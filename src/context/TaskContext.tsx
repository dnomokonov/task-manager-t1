import { useState, useEffect } from "react";
import type { Task } from "../types";
import { TaskContext } from "./taskContextInstance";

// Тестовые данные (потом удалить)
const defaultTasks: Task[] = [
    {
        id: crypto.randomUUID(),
        title: 'Fix bug',
        description: '',
        category: 'Bug',
        status: 'To Do',
        priority: 'High',
    },
    {
        id: crypto.randomUUID(),
        title: 'Add dark mode',
        description: 'Implement dark mode toggle for better user experience',
        category: 'Feature',
        status: 'In Progress',
        priority: 'Medium',
    },
    {
        id: crypto.randomUUID(),
        title: 'Update documentation',
        description: 'Revise API documentation for clarity',
        category: 'Documentation',
        status: 'To Do',
        priority: 'Low',
    },
    {
        id: crypto.randomUUID(),
        title: 'Refactor codebase',
        description: 'Optimize task management module for performance',
        category: 'Refactor',
        status: 'To Do',
        priority: 'Medium',
    }
]

// Костыль с тестовыми
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            return JSON.parse(savedTasks);
        } else {
            localStorage.setItem('tasks', JSON.stringify(defaultTasks));
            return defaultTasks;
        }
        //return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task: Omit<Task, 'id'>) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            ...task,
        };
        setTasks([...tasks, newTask]);
    };

    const updateTask = (id: string, updates: Partial<Task>) => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, ...updates } : task)));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
}