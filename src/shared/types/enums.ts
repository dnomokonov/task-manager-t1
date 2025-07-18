export const TaskStatus = {
    TODO: 'To Do',
    INPROGRESS: 'In Progress',
    DONE: 'Done',
} as const;

export type TaskStatus = keyof typeof TaskStatus;

export const TaskPriority = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
} as const;

export type TaskPriority = keyof typeof TaskPriority;

export const TaskCategory = {
    BUG: 'Bug',
    FEATURE: 'Feature',
    DOCUMENTATION: 'Documentation',
    REFACTOR: 'Refactor',
    TEST: 'Test',
} as const;

export type TaskCategory = keyof typeof TaskCategory;
