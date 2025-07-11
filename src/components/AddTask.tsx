import { useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { Form, Input, Select, Button, Card, Typography } from 'antd';
import type { Task } from "../types";

const { Title } = Typography;
const { Option } = Select;

const AddTask: React.FC = () => {
    const { addTask } = useTasks();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSubmit = (values: Omit<Task, 'id'>) => {
        addTask(values);
        navigate('/');
    }

    const handleCancel = () => {
        navigate('/');
    }

    return (
        <div className="flex justify-center items-top">
            <Card className="max-w-2xl w-full mx-auto shadow-md">
                <Title level={3}>Add New Task</Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        title: '',
                        description: '',
                        category: 'Bug',
                        status: 'To Do',
                        priority: 'Low',
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
                                Add Task
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

export default AddTask;