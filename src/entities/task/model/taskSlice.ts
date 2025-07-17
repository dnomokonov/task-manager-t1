import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadTasks, saveTasks, TASKS_KEY } from "../lib/persist.ts";
import type { Task } from "./types.ts";

const initialState: Task[] = loadTasks();

const taskSlice = createSlice({
    name: TASKS_KEY,
    initialState,
    reducers: {
        createTask: (state, action: PayloadAction<Omit<Task, 'createdAt'>>) => {
            const newTask: Task = {
                ...action.payload,
                createdAt: new Date().toISOString(),
            };
            state.push(newTask);
            saveTasks(state);
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            const index = state.findIndex((task: Task) => task.id === action.payload);
            if (index >= 0) {
                state.splice(index, 1);
                saveTasks(state);
            }
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.findIndex((task: Task) => task.id === action.payload.id);
            if (index >= 0) {
                state[index] = action.payload;
                saveTasks(state);
            }
        },
    },
});

export const { createTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;