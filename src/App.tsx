import { Routes, Route, Link, useLocation } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import AddTask from './components/AddTask';
import TaskFilter from './components/TaskFilter';
import { Button, Layout, Typography } from 'antd';
import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState<{
    field: string | null;
    value: string | null;
  }>({
    field: null,
    value: null,
  });
  const location = useLocation();

  const handleFilterChange = (values: { filter: string | null }) => {
    if (values.filter) {
      const [field, value] = values.filter.split(':');
      setFilter({ field, value });
    } else {
      setFilter({ field: null, value: null });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (!filter.field || !filter.value) return true;
    return task[filter.field as keyof typeof task] === filter.value;
  });

  const showControls = location.pathname === '/';

  return (
    <Layout className="layout-new">
      <Header className="header">
        <Title level={2} className="pt-6">Task Manager</Title>
      </Header>
      <Content className="container mx-auto p-5 md:w-[1200px] flex justify-center items-start min-h-screen">
        <div className='w-full'>
          {showControls && (
            <div className="mb-6 flex justify-between">
              <TaskFilter
                onFilterChange={handleFilterChange}
                initialValues={{ filter: filter.field && filter.value ? `${filter.field}:${filter.value}` : null }}
              />
              <Link to="/add-task">
                <Button type="primary">Add New Task</Button>
              </Link>
            </div>
          )}
          <Routes>
            <Route path="/" element={<TaskList tasks={filteredTasks} />} />
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="/add-task" element={<AddTask />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
};

export default App;