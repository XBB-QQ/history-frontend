import { useDetailStore } from '@/store/detailStore';
import type { PersonItem } from '@/types';

interface PersonCardProps {
  person: PersonItem;
}

// 根据朝代生成不同的水墨色调
const DYNASTY_COLORS: Record<string, { bg: string; text: string }> = {
  '先秦': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-800 dark:text-amber-200' },
  '春秋': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-800 dark:text-amber-200' },
  '战国': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-800 dark:text-orange-200' },
  '秦': { bg: 'bg-stone-200 dark:bg-stone-700/30', text: 'text-stone-800 dark:text-stone-200' },
  '汉': { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-800 dark:text-red-200' },
  '三国': { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-800 dark:text-blue-200' },
  '晋': { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-800 dark:text-purple-200' },
  '南北朝': { bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-800 dark:text-indigo-200' },
  '隋': { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-800 dark:text-cyan-200' },
  '唐': { bg: "bg-rose-50 dark:bg-rose-900/20", text: 'text-rose-800 dark:text-rose-200' },
  '宋': { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-800 dark:text-emerald-200' },
  '元': { bg: 'bg-sky-50 dark:bg-sky-900/20', text: 'text-sky-800 dark:text-sky-200' },
  '明': { bg: 'bg-yellow-50 dark:bg-yellow-900/20', text: 'text-yellow-800 dark:text-yellow-200' },
  '清': { bg: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-800 dark:text-violet-200' },
  '近代': { bg: 'bg-teal-50 dark:bg-teal-900/20', text: 'text-teal-800 dark:text-teal-200' },
};

function getDynastyColor(dynasty: string) {
  for (const [key, colors] of Object.entries(DYNASTY_COLORS)) {
    if (dynasty?.includes(key)) return colors;
  }
  return { bg: 'bg-ink-100 dark:bg-ink-800', text: 'text-ink-700 dark:text-ink-200' };
}

export default function PersonCard({ person }: PersonCardProps) {
  const openDetail = useDetailStore((s) => s.openDetail);
  const colors = getDynastyColor(person.dynasty);
  // 取姓氏第一个字作为头像
  const initial = person.name?.charAt(0) || '?';

  return (
    <div
      className="bg-white/60 dark:bg-ink-900/60 rounded-xl overflow-hidden border border-ink-200 dark:border-ink-700 hover:border-accent hover:shadow-md dark:hover:border-accent transition-all duration-300 cursor-pointer"
      onClick={() => openDetail('person', person.id ? Number(person.id) : 0, person)}
    >
      {/* 水墨首字头像 */}
      <div className={`aspect-square w-full flex items-center justify-center ${colors.bg} relative`}>
        {/* 装饰墨点 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-3 w-8 h-8 rounded-full bg-current blur-sm" />
          <div className="absolute bottom-4 right-2 w-6 h-6 rounded-full bg-current blur-sm" />
          <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-current blur-xs" />
        </div>
        {/* 姓氏大字 */}
        <span className={`text-5xl font-bold ${colors.text} relative z-10 select-none`}>
          {initial}
        </span>
      </div>

      {/* 信息区 */}
      <div className="p-3">
        <div className="text-sm font-bold text-center text-ink-900 dark:text-ink-100">{person.name}</div>
        {person.dynasty && (
          <div className="text-xs text-ink-500 dark:text-ink-400 text-center mt-1">{person.dynasty}</div>
        )}
        {person.quote && (
          <div className="text-xs text-ink-400 dark:text-ink-500 text-center mt-2 line-clamp-2 italic">
            "{person.quote}"
          </div>
        )}
      </div>
    </div>
  );
}
