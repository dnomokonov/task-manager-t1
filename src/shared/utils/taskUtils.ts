import { TaskStatus, TaskPriority } from '../types/enums'

export const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
        case 'TODO':
            return 'blue';
        case 'INPROGRESS':
            return 'volcano';
        case 'DONE':
            return 'green';
        default:
            return 'gray';
    }
};

export const getPriorityColor = (priority: TaskPriority): string => {
    switch (priority) {
        case 'LOW':
            return 'cyan';
        case 'MEDIUM':
            return 'orange';
        case 'HIGH':
            return 'red';
        default:
            return 'gray';
    }
};