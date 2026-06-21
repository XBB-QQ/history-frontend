import type { PersonItem } from '@/types';
import PersonCard from './PersonCard';

interface PersonGridProps {
  persons: PersonItem[];
}

export default function PersonGrid({ persons }: PersonGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {persons.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
