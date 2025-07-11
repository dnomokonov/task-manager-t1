import { useNavigate, useParams } from "react-router-dom"
import { useTasks } from "../hooks/useTasks";
import { Form, Input, Select, Button, Card, Typography } from "antd";
import { useEffect } from "react";
import type { Task } from "../types";

const { Title } = Typography;
const { Option } = Select;

const TaskDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { tasks, updateTask } = useTasks();
    const navigate = useNavigate();
    const task = tasks.find(t => t.id === id);
    const [form] = Form.useForm();

    useEffect(() => {
        if (task) {
            form.setFieldsValue({
                title: task.title,
                description: task.description || '',
                category: task.category,
                status: task.status,
                priority: task.priority
            });
        }
    }, [task, form]);

    const handleSubmit = (values: Partial<Task>) => {
        if (id) {
            updateTask(id, values);
            navigate('/');
        }
        console.log(id);
    }

    const handleCancel = () => {
        navigate('/');
    }

    if (!task) return <div className="text-center text-red-600">Task not found</div>

    return (
        <div className="flex justify-center items-center">
            <Card className="max-w-2xl w-full mx-auto shadow-md">
                <Title level={3}>Edit Task</Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        title: task.title,
                        description: task.description || '',
                        category: task.category,
                        status: task.status,
                        priority: task.priority,
                    }}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input task title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please select category!' }]}
                    >
                        <Select>
                            <Option value="Bug">Bug</Option>
                            <Option value="Feature">Feature</Option>
                            <Option value="Documentation">Documentation</Option>
                            <Option value="Refactor">Refactor</Option>
                            <Option value="Test">Test</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please select status!' }]}
                    >
                        <Select>
                            <Option value="To Do">To Do</Option>
                            <Option value="In Progress">In Progress</Option>
                            <Option value="Done">Done</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Priority"
                        name="priority"
                        rules={[{ required: true, message: 'Please select priority!' }]}
                    >
                        <Select>
                            <Option value="Low">Low</Option>
                            <Option value="Medium">Medium</Option>
                            <Option value="High">High</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <div className="flex gap-4">
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                            <Button onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default TaskDetails;