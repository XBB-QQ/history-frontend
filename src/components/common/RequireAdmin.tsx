import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminStore } from '@/store/adminStore';

/**
 * 后台管理路由客户端守卫
 * 未登录时重定向到 /admin/login，并记住来源路径
 */
export default function RequireAdmin({ children }: { children: ReactNode }) {
  const isLoggedIn = useAdminStore((s) => s.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
