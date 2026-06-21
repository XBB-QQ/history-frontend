interface SkeletonProps {
  className?: string;
}

/** 通用骨架屏占位符 */
export default function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse bg-ink-200 dark:bg-ink-700 rounded ${className}`} />;
}

/** 卡片骨架屏 — 用于 Timeline / Dynasty / Person / Knowledge 的卡片列表 */
export function CardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white/60 dark:bg-ink-900/60 rounded-xl p-6 border border-ink-200 dark:border-ink-700 animate-pulse"
        >
          <div className="flex items-start gap-4">
            <Skeleton className="w-20 h-4 rounded" />
            <Skeleton className="w-3 h-3 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/** 网格骨架屏 — 用于 DynastyGrid / PersonGrid / KnowledgeGrid */
export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white/60 dark:bg-ink-900/60 rounded-xl p-6 border border-ink-200 dark:border-ink-700 animate-pulse"
        >
          <Skeleton className="h-8 w-8 mx-auto rounded-full mb-3" />
          <Skeleton className="h-5 w-3/4 mx-auto rounded mb-2" />
          <Skeleton className="h-3 w-1/2 mx-auto rounded mb-3" />
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-5/6 rounded" />
        </div>
      ))}
    </div>
  );
}
