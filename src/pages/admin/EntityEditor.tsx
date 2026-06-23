import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

type EntityType = 'events' | 'persons' | 'dynasties' | 'knowledge';

interface FieldDef {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'select' | 'tags';
  options?: string[];
  placeholder?: string;
  help?: string;
}

interface EditorProps {
  type: EntityType;
  title: string;
  listFn: () => Promise<Record<string, unknown>[]>;
  saveFn: (dto: Record<string, unknown>) => Promise<Record<string, unknown>>;
  deleteFn: (id: number) => Promise<void>;
  fields: FieldDef[];
  idKey?: string;
}

function EntityEditor({ type, title, listFn, saveFn, deleteFn, fields, idKey = 'id' }: EditorProps) {
  const navigate = useNavigate();
  const { editId } = useParams<{ editId: string }>();
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await listFn();
      setItems(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    if (editId) {
      const item = items.find((i) => Number(i[idKey]) === Number(editId));
      if (item) setEditing(item);
    } else {
      setEditing({});
    }
  }, [editId, items]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const saved = await saveFn(editing!);
      setEditing(null);
      await loadData();
      navigate(`/admin/${type}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定删除？')) return;
    try {
      await deleteFn(id);
      if (editing && Number(editing[idKey]) === id) setEditing(null);
      await loadData();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '删除失败');
    }
  };

  const getField = (key: string) => fields.find((f) => f.key === key)!;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <div className="flex gap-2">
          <button onClick={() => setEditing({})} className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-bold hover:bg-red-700">
            + 新增
          </button>
          <button onClick={loadData} className="px-4 py-2 rounded-lg bg-ink-800 text-ink-300 text-sm hover:bg-ink-700">
            刷新
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-800 text-red-400 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 列表 */}
        <div className="bg-ink-900 rounded-xl border border-ink-800 overflow-hidden">
          <div className="p-4 border-b border-ink-800 flex justify-between items-center">
            <h2 className="text-sm font-bold text-ink-300">数据列表 ({items.length})</h2>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-ink-500">加载中...</div>
            ) : items.length === 0 ? (
              <div className="p-8 text-center text-ink-500">暂无数据</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-ink-800 text-ink-400 sticky top-0">
                  <tr>
                    {fields.slice(0, 3).map((f) => (
                      <th key={f.key} className="px-3 py-2 text-left font-medium">{f.label}</th>
                    ))}
                    <th className="px-3 py-2 text-right">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const itemId = Number(item[idKey]);
                    return (
                      <tr key={itemId} className="border-t border-ink-800 hover:bg-ink-800/50">
                        {fields.slice(0, 3).map((f) => (
                          <td key={f.key} className="px-3 py-2 text-ink-300 truncate max-w-[150px]">
                            {String(item[f.key] ?? '')}
                          </td>
                        ))}
                        <td className="px-3 py-2 text-right">
                          <button onClick={() => setEditing(item)} className="text-accent hover:underline mr-3 text-xs">编辑</button>
                          <button onClick={() => handleDelete(itemId)} className="text-red-400 hover:underline text-xs">删除</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* 编辑表单 */}
        {editing && (
          <div className="bg-ink-900 rounded-xl border border-ink-800 overflow-hidden">
            <div className="p-4 border-b border-ink-800">
              <h2 className="text-sm font-bold text-ink-300">{editing[idKey] ? '编辑' : '新增'} {title}</h2>
            </div>
            <form onSubmit={handleSave} className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm text-ink-400 mb-1">
                    {f.label}
                    {f.type !== 'tags' && f.type !== 'textarea' && !f.key.includes('text') && f.type !== 'select' && ' '}
                  </label>
                  {f.type === 'textarea' ? (
                    <textarea
                      value={String(editing[f.key] ?? '')}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg bg-ink-800 border border-ink-700 text-ink-100 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                      placeholder={f.placeholder}
                    />
                  ) : f.type === 'select' ? (
                    <select
                      value={editing[f.key] as string}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-ink-800 border border-ink-700 text-ink-100 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                    >
                      <option value="">请选择</option>
                      {f.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : f.type === 'tags' ? (
                    <input
                      type="text"
                      value={Array.isArray(editing[f.key]) ? (editing[f.key] as string[]).join(', ') : ''}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                      className="w-full px-3 py-2 rounded-lg bg-ink-800 border border-ink-700 text-ink-100 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                      placeholder={f.placeholder || '用逗号分隔'}
                    />
                  ) : f.type === 'number' ? (
                    <input
                      type="number"
                      value={editing[f.key] as number | ''}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value ? Number(e.target.value) : null })}
                      className="w-full px-3 py-2 rounded-lg bg-ink-800 border border-ink-700 text-ink-100 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                      placeholder={f.placeholder}
                    />
                  ) : (
                    <input
                      type="text"
                      value={String(editing[f.key] ?? '')}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-ink-800 border border-ink-700 text-ink-100 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                      placeholder={f.placeholder}
                    />
                  )}
                  {f.help && <p className="text-xs text-ink-600 mt-1">{f.help}</p>}
                </div>
              ))}

              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={saving} className="px-6 py-2 rounded-lg bg-accent text-white font-bold text-sm hover:bg-red-700 disabled:opacity-50">
                  {saving ? '保存中...' : '保存'}
                </button>
                <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 rounded-lg bg-ink-800 text-ink-300 text-sm hover:bg-ink-700">
                  取消
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default EntityEditor;
