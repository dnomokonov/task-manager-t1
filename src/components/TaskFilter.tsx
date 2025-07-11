import { Form, Select } from "antd";
import { useForm } from "antd/es/form/Form";

const { Option, OptGroup } = Select;

interface TaskFilterProps {
    onFilterChange: (values: { filter: string | null }) => void;
    initialValues: { filter: string | null };
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange, initialValues }) => {
    const [form] = useForm();

    return (
        <Form form={form} layout="inline" onValuesChange={onFilterChange} initialValues={initialValues} className="mb-4 flex flex-col sm:flex-row justify-end gap-4">
            <Form.Item name="filter">
                <Select allowClear style={{ width: 150 }} placeholder="Filter tasks">
                    <OptGroup label="Category">
                        <Option value="category:Bug">Bug</Option>
                        <Option value="category:Feature">Feature</Option>
                        <Option value="category:Documentation">Documentation</Option>
                        <Option value="category:Refactor">Refactor</Option>
                        <Option value="category:Test">Test</Option>
                    </OptGroup>
                    <OptGroup label="Status">
                        <Option value="status:To Do">To Do</Option>
                        <Option value="status:In Progress">In Progress</Option>
                        <Option value="status:Done">Done</Option>
                    </OptGroup>
                    <OptGroup label="Priority">
                        <Option value="priority:Low">Low</Option>
                        <Option value="priority:Medium">Medium</Option>
                        <Option value="priority:High">High</Option>
                    </OptGroup>
                </Select>
            </Form.Item>
        </Form>
    )
}

export default TaskFilter;