import { useDetailStore } from '@/store/detailStore';
import type { PersonItem } from '@/types';

interface PersonCardProps {
  person: PersonItem;
}

export default function PersonCard({ person }: PersonCardProps) {
  const openDetail = useDetailStore((s) => s.openDetail);

  return (
    <div
      className="bg-white/60 dark:bg-ink-900/60 rounded-xl p-4 border border-ink-200 dark:border-ink-700 hover:border-accent hover:shadow-md dark:hover:border-accent transition-all duration-300 cursor-pointer"
      onClick={() => openDetail('person', person.id ? Number(person.id) : 0, person)}
    >
      <div className="text-2xl mb-2 text-center">&#128104;</div>
      <div className="text-sm font-bold text-center">{person.name}</div>
      {person.dynasty && (
        <div className="text-xs text-ink-400 text-center mt-1">{person.dynasty}</div>
      )}
    </div>
  );
}
