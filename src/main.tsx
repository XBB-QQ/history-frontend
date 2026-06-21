import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { applyTheme } from './store/themeStore';

// 初始主题（在 React 挂载前就设置，避免闪烁）
const stored = localStorage.getItem('theme');
applyTheme(stored === 'dark' ? 'dark' : 'light');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
