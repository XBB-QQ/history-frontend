import EntityEditor from './EntityEditor';
import { useT } from '@/i18n/i18n';
import { adminGetPersons, adminSavePerson, adminDeletePerson } from '@/services/adminApi';

const fields = [
  { key: 'uid', label: '唯一标识', placeholder: '如: confucius' },
  { key: 'name', label: '姓名', placeholder: '人物姓名' },
  { key: 'courtesyName', label: '字/号', placeholder: '如: 孔明' },
  { key: 'dynastyName', label: '所属朝代', placeholder: '如: 三国' },
  { key: 'yearsDisplay', label: '生卒年', placeholder: '如: 181年—234年' },
  { key: 'gender', label: '性别', type: 'select' as const, options: ['male', 'female', 'unknown'] },
  { key: 'roles', label: '角色', type: 'tags' as const, placeholder: '逗号分隔，如: 政治家,军事家' },
  { key: 'quote', label: '名言', placeholder: '代表性名言' },
  { key: 'bio', label: '简介', type: 'textarea' as const, placeholder: '人物生平简介' },
  { key: 'tags', label: '标签', type: 'tags' as const, placeholder: '逗号分隔' },
  { key: 'relatedEvents', label: '相关事件', type: 'tags' as const, placeholder: '逗号分隔' },
  { key: 'relatedPersons', label: '相关人物', type: 'tags' as const, placeholder: '逗号分隔' },
];

export default function PersonsEditor() {
  const t = useT();
  return (
    <EntityEditor
      type="persons"
      title={t('admin.persons_manage')}
      listFn={adminGetPersons as any}
      saveFn={adminSavePerson as any}
      deleteFn={adminDeletePerson as any}
      fields={fields}
    />
  );
}
