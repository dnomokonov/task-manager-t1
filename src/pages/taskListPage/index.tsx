import { useSelector } from 'react-redux';
import {Empty, Layout} from 'antd';
import { selectAllTasks } from '@/entities/task/model/selectors';
import { TaskItem } from '@/entities/task/ui/TaskItem';
import HeaderPage from "@shared/ui/HeaderPage/HeaderPage";
import {TaskControl} from "@features/taskControl/ui/TaskControl";
import {useState} from "react";

const {Content} = Layout;

export const TaskListPage = () => {
    const tasks = useSelector(selectAllTasks);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
    const [priorityFilter, setPriorityFilter] = useState<string | undefined>(undefined);

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = !categoryFilter || task.category === categoryFilter;
        const matchesStatus = !statusFilter || task.status === statusFilter;
        const matchesPriority = !priorityFilter || task.priority === priorityFilter;
        return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });

    return (
        <Layout className="layout-container flex gap-2">
            <HeaderPage />
            <Content className="container mx-auto md:w-[1200px] flex justify-center items-start min-h-screen">
                <div className="w-full p-6">
                    <TaskControl
                        search={search}
                        setSearch={setSearch}
                        categoryFilter={categoryFilter}
                        setCategoryFilter={setCategoryFilter}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        priorityFilter={priorityFilter}
                        setPriorityFilter={setPriorityFilter}
                    />

                    {tasks.length === 0 ? (
                        <Empty description="There are no tasks yet." />
                    ) : (
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredTasks.map(task => (
                                <TaskItem key={task.id} task={task} />
                            ))}
                        </div>
                    )}
                </div>
            </Content>
        </Layout>
    );
};