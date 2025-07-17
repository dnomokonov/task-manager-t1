import { createBrowserRouter } from 'react-router-dom';
import { TaskListPage } from '@/pages/taskListPage/index';
import { TaskCreatePage } from '@/pages/taskCreatePage/index';
import { TaskEditPage } from '@/pages/taskEditPage/index';

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <TaskListPage />,
    },
    {
        path: '/task/:id',
        element: <TaskEditPage />,
    },
    {
        path: '/task/new',
        element: <TaskCreatePage />,
    },
]);