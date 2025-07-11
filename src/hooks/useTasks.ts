import { useContext } from "react";
import { TaskContext } from "../context/taskContextInstance";

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('Error');
    return context;
};