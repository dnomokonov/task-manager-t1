import { Tag } from 'antd';
import type { Task } from '../model/types';

interface Props {
    task: Task;
}

export const TaskTags = ({ task }: Props) => {
    return (
        <div className="flex flex-wrap gap-2 mt-2">
            <Tag color="blue">{task.category}</Tag>
            <Tag color="orange">{task.status}</Tag>
            <Tag color="red">{task.priority}</Tag>
            <Tag color="green">{new Date(task.createdAt).toLocaleDateString()}</Tag>
        </div>
    );
};
