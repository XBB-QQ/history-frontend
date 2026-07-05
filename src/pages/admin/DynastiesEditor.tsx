import EntityEditor from './EntityEditor';
import { adminGetDynasties, adminSaveDynasty, adminDeleteDynasty, type AdminDynastyDTO } from '@/services/adminApi';

const fields = [
  { key: 'uid', label: '唯一标识', placeholder: '如: tang' },
  { key: 'name', label: '朝代名', placeholder: '如: 唐' },
  { key: 'fullName', label: '全称', placeholder: '如: 唐朝' },
  { key: 'period', label: '时期描述', placeholder: '如: 618年—907年' },
  { key: 'periodStart', label: '起始年（数字）', type: 'number' as const },
  { key: 'periodEnd', label: '结束年（数字）', type: 'number' as const },
  { key: 'founder', label: '建立者', placeholder: '如: 李渊' },
  { key: 'lastRuler', label: '末代君主', placeholder: '如: 哀帝' },
  { key: 'capital', label: '都城', placeholder: '如: 长安' },
  { key: 'duration', label: '时长', placeholder: '如: 289年' },
  { key: 'highlights', label: '亮点', placeholder: '如: 贞观之治、开元盛世' },
  { key: 'description', label: '描述', type: 'textarea' as const },
  { key: 'fallReason', label: '灭亡原因', placeholder: '如: 安史之乱后藩镇割据' },
  { key: 'legacy', label: '历史影响', type: 'textarea' as const },
];

export default function DynastiesEditor() {
  return (
    <EntityEditor
      type="dynasties"
      title="朝代管理"
      listFn={adminGetDynasties as any}
      saveFn={adminSaveDynasty as any}
      deleteFn={adminDeleteDynasty as any}
      fields={fields}
    />
  );
}
