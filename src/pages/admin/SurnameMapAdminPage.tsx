/**
 * 姓氏迁徙与族谱地图后台管理页面
 * @see history-museum/ITERATIONS.md Iteration #71
 */
import { useT } from '@/i18n/i18n';

export default function SurnameMapAdminPage() {
  const t = useT();
  return <div>{t('admin.surname_map_manage')}</div>;
}