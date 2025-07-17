import { AppRouter } from './router';
import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
      <ConfigProvider>
        <RouterProvider router={AppRouter} />
      </ConfigProvider>
  );
}

export default App;