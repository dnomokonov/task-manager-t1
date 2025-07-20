import { Button, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TaskCategory, TaskStatus, TaskPriority } from '@shared/types/enums';

interface TaskControlProps {
    search: string;
    setSearch: (search: string) => void;
    categoryFilter: TaskCategory | undefined;
    setCategoryFilter: (categoryFilter: TaskCategory | undefined) => void;
    statusFilter: TaskStatus | undefined;
    setStatusFilter: (statusFilter: TaskStatus | undefined) => void;
    priorityFilter: TaskPriority | undefined;
    setPriorityFilter: (priorityFilter: TaskPriority | undefined) => void;
}

export const TaskControl = ({
                                search,
                                setSearch,
                                categoryFilter,
                                setCategoryFilter,
                                statusFilter,
                                setStatusFilter,
                                priorityFilter,
                                setPriorityFilter,
                            }: TaskControlProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center">
            <Select
                placeholder="Category"
                allowClear
                onChange={setCategoryFilter}
                value={categoryFilter}
                className="w-full sm:w-1/4"
                options={Object.entries(TaskCategory).map(([key, value]) => ({ label: value, value: key }))}
            />
            <Select
                placeholder="Status"
                allowClear
                onChange={setStatusFilter}
                value={statusFilter}
                className="w-full sm:w-1/4"
                options={Object.entries(TaskStatus).map(([key, value]) => ({ label: value, value: key }))}
            />
            <Select
                placeholder="Priority"
                allowClear
                onChange={setPriorityFilter}
                value={priorityFilter}
                className="w-full sm:w-1/4"
                options={Object.entries(TaskPriority).map(([key, value]) => ({ label: value, value: key }))}
            />
            <Input
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full sm:w-1/3"
            />
            <Button
                type="primary"
                onClick={() => navigate('/task/new')}
                className="w-full sm:w-auto"
            >
                Add Task
            </Button>
        </div>
    );
};