import { Layout } from 'antd';
import { TaskForm } from '@features/taskForm/ui/TaskForm';
import HeaderPage from '@shared/ui/HeaderPage/HeaderPage';

const { Content } = Layout;

export const TaskEditPage = () => {
    return (
        <Layout className="layout-container">
            <HeaderPage />
            <Content className="container mx-auto p-6 md:w-[1200px] flex justify-center items-start min-h-screen">
                <div className="w-full max-w-[600px] p-6 bg-white rounded-lg">
                    <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
                    <TaskForm />
                </div>
            </Content>
        </Layout>
    );
};