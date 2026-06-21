import type { DynastyItem } from '@/types';
import DynastyCard from './DynastyCard';

interface DynastyGridProps {
  dynasties: DynastyItem[];
}

export default function DynastyGrid({ dynasties }: DynastyGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {dynasties.map((dynasty) => (
        <DynastyCard key={dynasty.id} dynasty={dynasty} />
      ))}
    </div>
  );
}
