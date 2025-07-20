import { Button, Form, Input, Select, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { type Task } from '@entities/task/model/types';
import { TaskCategory, TaskStatus, TaskPriority } from '@shared/types/enums'
import { createNewTask, fetchUpdateTask } from '@entities/task/model/taskSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

export const TaskForm = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
    const initialValues = id ? tasks.find(task => Number(task.id) === Number(id)) : undefined;

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error]);

    const onFinish = async (values: Omit<Task, 'id' | 'createdAt'>) => {
        try {
            if (id) {
                await dispatch(fetchUpdateTask({ id: String(id), task: values })).unwrap();
                message.success('Task updated');
            } else {
                await dispatch(createNewTask(values)).unwrap();
                message.success('Task created');
            }
            navigate('/');
        } catch (e) {
            message.error(String(e));
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
            disabled={loading}
            className="max-w-[600px] mx-auto p-6"
        >
            <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Enter title' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Enter category' }]}
            >
                <Select
                    options={Object.entries(TaskCategory).map(([key, value]) => ({
                        label: value,
                        value: key,
                    }))}
                />
            </Form.Item>
            <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Enter status' }]}
            >
                <Select
                    options={Object.entries(TaskStatus).map(([key, value]) => ({
                        label: value,
                        value: key,
                    }))}
                />
            </Form.Item>
            <Form.Item
                name="priority"
                label="Priority"
                rules={[{ required: true, message: 'Enter priority' }]}
            >
                <Select
                    options={Object.entries(TaskPriority).map(([key, value]) => ({
                        label: value,
                        value: key,
                    }))}
                />
            </Form.Item>
            <Form.Item>
                <div className="flex gap-4 mt-2">
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Save
                    </Button>
                    <Button onClick={() => navigate('/')} disabled={loading}>
                        Cancel
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};