import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App.tsx'
import { App as AntdApp } from 'antd'
import {Provider} from "react-redux"
import {store} from "@/app/store"
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AntdApp>
          <Provider store={store}>
              <App />
          </Provider>
      </AntdApp>
  </StrictMode>
)
