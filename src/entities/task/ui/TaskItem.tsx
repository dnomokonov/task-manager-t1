import type { MouseEvent } from 'react';
import { Card, Tag, message } from 'antd';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { fetchDeleteTask } from '../model/taskSlice';
import type { Task } from '../model/types';
import Paragraph from 'antd/es/typography/Paragraph';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import {getPriorityColor, getStatusColor} from "@shared/utils/taskUtils.ts";

export const TaskItem = ({ task }: { task: Task }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onDelete = async (e: MouseEvent) => {
        e.stopPropagation();
        try {
            await dispatch(fetchDeleteTask(task.id)).unwrap();
            message.success('Task deleted');
        } catch (e) {
            message.error(`Error deleting task: ${e}`);
        }
    };

    return (
        <Card
            title={
                <div className="flex items-center gap-2">
                    <span>{task.title}</span>
                    <Tag color={getStatusColor(task.status)}>{task.status}</Tag>
                </div>
            }
            extra={<IconButton icon={<FaRegTrashCan />} onClick={onDelete} danger/>}
            onClick={() => navigate(`/task/${task.id}`)}
            className="shadow-md hover:!bg-gray-50 transition-all cursor-pointer relative"
        >
            <Paragraph ellipsis={{rows: 2, expandable: false}}>
                {task.description}
            </Paragraph>
            <div className="flex flex-wrap gap-2 mt-2">
                <Tag color="blue">{task.category}</Tag>
                <Tag color={getPriorityColor(task.priority)}>{task.priority}</Tag>
            </div>
            <div className="absolute bottom-0 right-5 flex justify-end items-center">
                <Paragraph className="!text-gray-400" ellipsis={{rows: 2, expandable: false}}>
                    {new Date(task.createdAt).toLocaleDateString()}
                </Paragraph>
            </div>
        </Card>
    );
};