import type { PersonItem } from '@/types';

interface PersonCardProps {
  person: PersonItem;
}

export default function PersonCard({ person }: PersonCardProps) {
  return (
    <div className="bg-white/60 rounded-xl p-4 border border-ink-200 hover:border-accent transition-colors">
      <div className="text-2xl mb-2 text-center">&#128104;</div>
      <div className="text-sm font-bold text-center">{person.name}</div>
      {person.dynasty && (
        <div className="text-xs text-ink-400 text-center mt-1">{person.dynasty}</div>
      )}
    </div>
  );
}
