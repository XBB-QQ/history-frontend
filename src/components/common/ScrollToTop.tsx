import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 路由切换时自动滚动到顶部
 * 配合页面淡入过渡效果
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}
