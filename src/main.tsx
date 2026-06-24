import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import App from './App';
import './index.css';
import { applyTheme } from './store/themeStore';

// 初始主题（在 React 挂载前就设置，避免闪烁）
const stored = localStorage.getItem('theme');
applyTheme(stored === 'dark' ? 'dark' : 'light');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
