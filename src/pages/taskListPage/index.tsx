import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Empty, Layout, Spin, message } from 'antd';
import { fetchAllTask } from '@entities/task/model/taskSlice';
import { TaskItem } from '@entities/task/ui/TaskItem';
import HeaderPage from '@shared/ui/HeaderPage/HeaderPage';
import { TaskControl } from '@features/taskControl/ui/TaskControl';
import { TaskCategory, TaskStatus, TaskPriority } from '@shared/types/enums';
import { type RootState } from '@/app/store';
import { useAppDispatch} from '@shared/hooks/useAppDispatch'

const { Content } = Layout;

export const TaskListPage = () => {
    const dispatch = useAppDispatch();
    const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<TaskCategory | undefined>(undefined);
    const [statusFilter, setStatusFilter] = useState<TaskStatus | undefined>(undefined);
    const [priorityFilter, setPriorityFilter] = useState<TaskPriority | undefined>(undefined);

    useEffect(() => {
        dispatch(fetchAllTask());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error]);

    const filteredTasks = tasks.filter(task => {
        const matchesSearch =
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            (task.description?.toLowerCase().includes(search.toLowerCase()) ?? true);
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
                    {loading ? (
                        <div className="flex justify-center items-center min-h-[200px]">
                            <Spin />
                        </div>
                    ) : tasks.length === 0 ? (
                        <Empty description="There are no tasks yet." />
                    ) : filteredTasks.length === 0 ? (
                        <Empty description="No tasks match the filter." />
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