import EntityEditor from './EntityEditor';
import { adminGetEvents, adminSaveEvent, adminDeleteEvent, type AdminEventDTO } from '@/services/adminApi';

const fields = [
  { key: 'uid', label: '唯一标识', placeholder: '如: qin-unify' },
  { key: 'title', label: '标题', placeholder: '事件标题' },
  { key: 'year', label: '年份（数字，公元前为负）', type: 'number' as const, help: '如: -221 表示公元前221年' },
  { key: 'yearDisplay', label: '人类可读年份', placeholder: '如: 公元前221年' },
  { key: 'yearPrecision', label: '精度', type: 'select' as const, options: ['exact', 'approx', 'range'] },
  { key: 'category', label: '类别', placeholder: '如: 朝代更迭/战争/文化' },
  { key: 'dynastyName', label: '所属朝代', placeholder: '如: 秦' },
  { key: 'description', label: '描述', type: 'textarea' as const, placeholder: '简要描述' },
  { key: 'fulltext', label: '全文', type: 'textarea' as const, placeholder: '详细内容' },
  { key: 'tags', label: '标签', type: 'tags' as const, placeholder: '逗号分隔' },
  { key: 'relatedEvents', label: '相关事件', type: 'tags' as const, placeholder: '逗号分隔' },
  { key: 'relatedPersons', label: '相关人物', type: 'tags' as const, placeholder: '逗号分隔' },
];

export default function EventsEditor() {
  return (
    <EntityEditor
      type="events"
      title="事件管理"
      listFn={adminGetEvents as any}
      saveFn={adminSaveEvent as any}
      deleteFn={adminDeleteEvent as any}
      fields={fields}
    />
  );
}
