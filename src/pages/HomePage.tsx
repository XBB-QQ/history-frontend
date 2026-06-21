import HeroAnimation from '@/components/hero/HeroAnimation';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper">
      <HeroAnimation />

      <footer className="mt-20 text-center text-ink-300 text-sm pb-8">
        <p>五千年史馆 v0.1.0 — React + TypeScript + Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default HomePage;
