import { Card, Tag, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { deleteTask } from '@entities/task/model/taskSlice';
import { type Task } from '@entities/task/model/types';

export const TaskItem = ({ task }: { task: Task }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onDelete = () => dispatch(deleteTask(task.id));

    return (
        <Card
            title={task.title}
            extra={<Button danger onClick={onDelete}>Удалить</Button>}
            onClick={() => navigate(`/task/${task.id}`)}
            className="cursor-pointer hover:shadow-xl"
        >
            <p>{task.description}</p>
            <Tag color="blue">{task.category}</Tag>
            <Tag color="orange">{task.status}</Tag>
            <Tag color="red">{task.priority}</Tag>
        </Card>
    );
};