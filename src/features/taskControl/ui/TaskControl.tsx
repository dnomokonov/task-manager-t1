import {useNavigate} from "react-router-dom";
import {Button, Input, Select} from "antd";
import {TaskCategory, TaskStatus, TaskPriority} from "@shared/types/enums";

interface TaskFiltersProps {
    search: string;
    setSearch: (search: string) => void;
    categoryFilter: string | undefined;
    setCategoryFilter: (categoryFilter: string | undefined) => void;
    statusFilter: string | undefined;
    setStatusFilter: (categoryFilter: string | undefined) => void;
    priorityFilter: string | undefined;
    setPriorityFilter: (categoryFilter: string | undefined) => void;
}

export const TaskControl = ({
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter
}: TaskFiltersProps) => {
    const navigation = useNavigate();

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center">
            <Select
                placeholder="Category"
                allowClear
                onChange={setCategoryFilter}
                value={categoryFilter}
                className="w-full sm:w-1/4"
                options={Object.values(TaskCategory).map(value => ({ label: value, value }))}
            />
            <Select
                placeholder="Status"
                allowClear
                onChange={setStatusFilter}
                value={statusFilter}
                className="w-full sm:w-1/4"
                options={Object.values(TaskStatus).map(value => ({ label: value, value }))}
            />
            <Select
                placeholder="Priority"
                allowClear
                onChange={setPriorityFilter}
                value={priorityFilter}
                className="w-full sm:w-1/4"
                options={Object.values(TaskPriority).map(value => ({ label: value, value }))}
            />
            <Input
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full sm:w-1/3"
            />
            <Button
                type="primary"
                onClick={() => navigation('/task/new')}
                className="w-full sm:w-auto"
            >
                Add Task
            </Button>
        </div>
    )
}