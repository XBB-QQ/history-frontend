import { useDetailStore } from '@/store/detailStore';
import type { DynastyItem } from '@/types';

interface DynastyCardProps {
  dynasty: DynastyItem;
}

export default function DynastyCard({ dynasty }: DynastyCardProps) {
  const openDetail = useDetailStore((s) => s.openDetail);

  return (
    <div
      className="bg-white/60 rounded-xl p-6 border border-ink-200 hover:border-accent hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={() => openDetail('dynasty', dynasty.id ? Number(dynasty.id) : 0, dynasty)}
    >
      <div className="text-3xl font-black mb-2">{dynasty.name}</div>
      <div className="text-sm text-ink-400 mb-2">
        {dynasty.periodStart} — {dynasty.periodEnd}
      </div>
      <p className="text-xs text-ink-500 line-clamp-3">{dynasty.description}</p>
    </div>
  );
}
