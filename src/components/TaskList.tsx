import { Col, Row } from "antd";
import type { Task } from "../types";
import { Link } from "react-router-dom";
import TaskItem from "./TaskItem";

interface TaskListProps {
    tasks: Task[]
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <>
            {tasks.length === 0 ? (
                <div className="text-center text-gray-500">No tasks</div>
            ) : (
                <Row gutter={[20, 20]}>
                    {tasks.map(task => (
                        <Col key={task.id} xs={24} sm={12} lg={8}>
                            <Link to={`/task/${task.id}`}>
                                <TaskItem task={task} />
                            </Link>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
}

export default TaskList;