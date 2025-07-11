import { Card, Flex, Tag } from "antd";
import type { Task } from "../types";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'To Do': return 'blue';
            case 'In Progress': return 'volcano';
            case 'Done': return 'green';
            default: return 'gray';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Low': return 'cyan';
            case 'Medium': return 'orange';
            case 'High': return 'red';
            default: return 'gray';
        }
    };

    return (
        <Card className="shadow-md h-[200px] hover:!bg-gray-100 transition-all">
            <Flex vertical gap='middle'>
                <Title level={4}>{task.title}</Title>
                {task.description && (
                    <Paragraph ellipsis={{ rows: 2, expandable: false }}>
                        {task.description}
                    </Paragraph>
                )}
                <Flex wrap='wrap' gap='small'>
                    <Tag color={getStatusColor(task.status)}>{task.status}</Tag>
                    <Tag color="geekblue">{task.category}</Tag>
                    <Tag color={getPriorityColor(task.priority)}>{task.priority}</Tag>
                </Flex>
            </Flex>
        </Card>
    )
}

export default TaskItem;