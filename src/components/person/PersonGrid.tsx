import type { PersonItem } from '@/types';
import PersonCard from './PersonCard';

interface PersonGridProps {
  persons: PersonItem[];
}

const DYNASTY_ORDER = [
  '先秦', '春秋', '战国', '秦', '汉', '三国', '晋', '南北朝',
  '隋', '唐', '宋', '元', '明', '清', '近代', '其他'
];

function getDynastyGroup(dynasty: string): string {
  for (const d of DYNASTY_ORDER) {
    if (dynasty?.includes(d)) return d;
  }
  return '其他';
}

export default function PersonGrid({ persons }: PersonGridProps) {
  const groups: Record<string, PersonItem[]> = {};
  persons.forEach(p => {
    const group = getDynastyGroup(p.dynasty);
    if (!groups[group]) groups[group] = [];
    groups[group].push(p);
  });

  const orderedGroups = DYNASTY_ORDER.filter(d => groups[d]);

  return (
    <div className="space-y-8">
      {orderedGroups.map(dynasty => (
        <div key={dynasty}>
          {/* 朝代标题 */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ink-300 dark:via-ink-600 to-transparent" />
            <h3 className="text-lg font-bold text-ink-700 dark:text-ink-200 px-4 py-1 bg-paper dark:bg-ink-900 rounded-full border border-ink-200 dark:border-ink-700">
              {dynasty}
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ink-300 dark:via-ink-600 to-transparent" />
          </div>
          {/* 人物网格 */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {groups[dynasty].map(person => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
