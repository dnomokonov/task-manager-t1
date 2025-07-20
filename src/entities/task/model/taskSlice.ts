import type { Task } from "@entities/task/model/types";
import {
    createTask,
    deleteTask,
    fetchTaskById,
    fetchTasks,
    updateTask,
} from "@shared/api/taskApi";
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};

export const fetchAllTask = createAsyncThunk<Task[]>(
    "task/fetchAll",
    async () => {
        return await fetchTasks();
    }
);

export const selectTaskById = createAsyncThunk<Task | undefined, string>(
    "task/fetchId",
    async (id: string) => {
        return await fetchTaskById(id);
    }
);

export const createNewTask = createAsyncThunk<Task, Omit<Task, 'id' | 'createdAt'>>(
    'task/createTask',
    async (task) => {
        return await createTask(task);
    }
);

export const fetchUpdateTask = createAsyncThunk<
    Task,
    { id: string; task: Omit<Task, "id" | "createdAt"> }
>("task/updateTask", async ({ id, task }) => {
    return await updateTask(id, task);
});

export const fetchDeleteTask = createAsyncThunk<string, string>(
    "task/deleteTask",
    async (id) => {
        await deleteTask(id);
        return id;
    }
);

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllTask.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchAllTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch tasks";
            })

            .addCase(selectTaskById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(selectTaskById.fulfilled, (state, action) => {
                state.loading = false;
                const task = action.payload;
                if (task) {
                    const index = state.tasks.findIndex((t) => t.id === task.id);
                    if (index >= 0) {
                        state.tasks[index] = task;
                    } else {
                        state.tasks.push(task);
                    }
                }
            })
            .addCase(selectTaskById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch task";
            })

            .addCase(createNewTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createNewTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create task";
            })

            .addCase(fetchUpdateTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.loading = false;
                const index = state.tasks.findIndex((t) => t.id === action.payload.id);
                if (index >= 0) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(fetchUpdateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update task";
            })

            .addCase(fetchDeleteTask.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            })
            .addCase(fetchDeleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete task";
            });
    },
});

export default taskSlice.reducer;