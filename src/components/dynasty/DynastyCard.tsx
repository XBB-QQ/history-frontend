import { useTheme } from '@/components/layout/ThemeProvider';
import { useDetailStore } from '@/store/detailStore';
import { useSceneStore } from '@/store/sceneStore';
import type { DynastyItem } from '@/types';
import { getDynastyColor } from '@/data/themes/dynastyThemes';

interface DynastyCardProps {
  dynasty: DynastyItem;
}

export default function DynastyCard({ dynasty }: DynastyCardProps) {
  const { setDynasty } = useTheme();
  const openDetail = useDetailStore((s) => s.openDetail);
  const { setSceneByDynasty, restoreScene } = useSceneStore();

  const color = getDynastyColor(dynasty.name);

  const handleHover = () => {
    setDynasty(dynasty.name);
    // 联动场景皮肤（受 autoSwitchByContent 控制）
    setSceneByDynasty(dynasty.name);
  };

  const handleLeave = () => {
    setDynasty(null);
    // 恢复原场景
    restoreScene();
  };

  return (
    <div
      className="bg-white/60 dark:bg-ink-900/60 rounded-xl p-6 border border-ink-200 dark:border-ink-700 hover:shadow-md cursor-pointer transition-all duration-500 hover:-translate-y-1 group"
      style={{
        borderColor: 'transparent',
        transition: 'border-color 0.5s ease, box-shadow 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = color;
        handleHover();
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'transparent';
        handleLeave();
      }}
      onClick={() => openDetail('dynasty', dynasty.id ? Number(dynasty.id) : 0, dynasty)}
    >
      <div
        className="text-3xl font-black mb-2 transition-colors duration-500"
        style={{ color: color }}
      >
        {dynasty.name}
      </div>
      <div className="text-sm text-ink-400 mb-2">
        {dynasty.periodStart} — {dynasty.periodEnd}
      </div>
      <p className="text-xs text-ink-500 line-clamp-3">{dynasty.description}</p>
    </div>
  );
}
