import { Tag } from 'antd';
import type { Task } from '../model/types';
import { getStatusColor, getPriorityColor } from '@/shared/utils/taskUtils';
import {TaskCategory, TaskPriority, TaskStatus} from "@shared/types/enums.ts";
import Paragraph from "antd/es/typography/Paragraph";

interface Props {
    task: Task;
}

export const TaskTags = ({ task }: Props) => {
    return (
        <>
            <div className="flex flex-wrap mt-2">
                <Tag color="blue">{TaskCategory[task.category]}</Tag>
                <Tag color={getStatusColor(task.status)}>{TaskStatus[task.status]}</Tag>
                <Tag color={getPriorityColor(task.priority)}>{TaskPriority[task.priority]}</Tag>
            </div>

            <div className="absolute bottom-0 right-5 flex justify-end items-center">
                <Paragraph className="!text-gray-400" ellipsis={{rows: 2, expandable: false}}>
                    {new Date(task.createdAt).toLocaleDateString()}
                </Paragraph>
            </div>
        </>
    );
};