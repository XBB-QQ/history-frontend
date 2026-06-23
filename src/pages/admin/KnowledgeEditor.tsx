import EntityEditor from './EntityEditor';
import { adminGetKnowledge, adminSaveKnowledge, adminDeleteKnowledge, type AdminKnowledgeDTO } from '@/services/adminApi';

const fields = [
  { key: 'uid', label: '唯一标识', placeholder: '如: four-inventions' },
  { key: 'title', label: '标题', placeholder: '知识卡片标题' },
  { key: 'startYear', label: '起始年（数字）', type: 'number' as const },
  { key: 'startYearDisplay', label: '时期显示', placeholder: '如: 约公元前200年' },
  { key: 'dynastyName', label: '关联朝代', placeholder: '如: 西汉' },
  { key: 'description', label: '描述', type: 'textarea' as const, placeholder: '简要描述' },
  { key: 'fulltext', label: '全文', type: 'textarea' as const, placeholder: '详细内容' },
  { key: 'tags', label: '标签', type: 'tags' as const, placeholder: '逗号分隔' },
  { key: 'relevantEvents', label: '相关事件', type: 'tags' as const, placeholder: '逗号分隔' },
  { key: 'relevantPersons', label: '相关人物', type: 'tags' as const, placeholder: '逗号分隔' },
  { key: 'meta', label: '备注', type: 'textarea' as const, placeholder: '补充说明' },
];

export default function KnowledgeEditor() {
  return (
    <EntityEditor
      type="knowledge"
      title="知识卡片管理"
      listFn={adminGetKnowledge}
      saveFn={adminSaveKnowledge as any}
      deleteFn={adminDeleteKnowledge as any}
      fields={fields}
    />
  );
}
