import { useState, useEffect } from "react";
import type { Task } from "../types";
import { TaskContext } from "./taskContextInstance";

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
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