import { Button, Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    type Task,
    TaskCategory,
    TaskPriority,
    TaskStatus
} from '@entities/task/model/types';
import { createTask, updateTask } from '@entities/task/model/taskSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { v4 as uuidv4 } from 'uuid';

export const TaskForm = ({ initialValues }: { initialValues?: Task }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        const task: Task = {
            ...values,
            id: initialValues?.id || uuidv4(),
            createdAt: initialValues?.createdAt || new Date().toISOString(),
        };
        if (initialValues) {
            dispatch(updateTask(task));
        } else {
            dispatch(createTask(task));
        }
        navigate('/');
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
            <Form.Item name="title" label="Заголовок" rules={[{ required: true }]}> <Input /> </Form.Item>
            <Form.Item name="description" label="Описание"> <Input.TextArea /> </Form.Item>
            <Form.Item name="category" label="Категория">
                <Select options={Object.values(TaskCategory).map(v => ({ label: v, value: v }))} />
            </Form.Item>
            <Form.Item name="status" label="Статус">
                <Select options={Object.values(TaskStatus).map(v => ({ label: v, value: v }))} />
            </Form.Item>
            <Form.Item name="priority" label="Приоритет">
                <Select options={Object.values(TaskPriority).map(v => ({ label: v, value: v }))} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Save</Button>
                <Button onClick={() => navigate('/')} className="ml-2">Cancel</Button>
            </Form.Item>
        </Form>
    );
};