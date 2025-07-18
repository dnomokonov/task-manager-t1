import { useDispatch } from 'react-redux';
import { Button, Form, Input, Select, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createTask } from '@entities/task/model/taskSlice';
import { TaskCategory, TaskStatus, TaskPriority } from '@shared/types/enums';
import type {Task} from "@entities/task/model/types";
import HeaderPage from "@shared/ui/HeaderPage/HeaderPage";

const { Content } = Layout;

export const TaskCreatePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values: Omit<Task, 'id' | 'createdAt'>) => {
        const newTask: Omit<Task, 'createdAt'> = {
            id: crypto.randomUUID(),
            ...values,
        };
        dispatch(createTask(newTask));
        navigate('/');
    };

    const handleCancel = () => {
        navigate('/');
    }

    return (
        <Layout className="layout-container">
            <HeaderPage />
            <Content className="container mx-auto p-8 md:w-[900px] flex justify-center items-start min-h-screen">
                <div className="w-full p-6 bg-white rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">Create task</h1>
                    <Form onFinish={onFinish} layout="vertical">
                        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Enter the name' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label="Description">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Select a category' }]}>
                            <Select>
                                {Object.values(TaskCategory).map(category => (
                                    <Select.Option key={category} value={category}>{category}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Select the status' }]}>
                            <Select>
                                {Object.values(TaskStatus).map(status => (
                                    <Select.Option key={status} value={status}>{status}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="priority" label="Priority" rules={[{ required: true, message: 'Choose a priority' }]}>
                            <Select>
                                {Object.values(TaskPriority).map(priority => (
                                    <Select.Option key={priority} value={priority}>{priority}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <div className="flex gap-4 mt-4">
                                <Button type="primary" htmlType="submit">
                                    Create
                                </Button>
                                <Button onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </div>

                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};