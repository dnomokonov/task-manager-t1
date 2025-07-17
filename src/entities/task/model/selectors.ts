import type { RootState } from '@/app/store';
import type { Task } from './types';

export const selectTaskState = (state: RootState) => state.task;

export const selectAllTasks = (state: RootState): Task[] => selectTaskState(state);

export const selectTaskById = (id: string) => (state: RootState): Task | undefined =>
    selectAllTasks(state).find(task => task.id === id);