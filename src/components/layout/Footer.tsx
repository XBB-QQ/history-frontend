import { useEffect, useState } from 'react';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* 回到顶部按钮 */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-accent/90 text-white shadow-lg
                   flex items-center justify-center transition-all duration-300 hover:bg-accent hover:scale-110
                   ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="回到顶部"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* 页脚 */}
      <footer className="border-t border-ink-200 bg-rice/80 dark:bg-ink-950/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            {/* 品牌 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="border-2 border-red-700 text-red-700 rounded w-7 h-7 flex items-center justify-center font-bold text-xs">
                  史
                </div>
                <span className="font-bold tracking-widest">五千年史馆</span>
              </div>
              <p className="text-ink-400">
                以史为鉴，可知兴替。<br />
                探索中华文明五千年辉煌历史。
              </p>
            </div>

            {/* 导航 */}
            <div>
              <h4 className="font-bold text-ink-700 mb-3">快速导航</h4>
              <ul className="space-y-2 text-ink-500">
                <li><a href="/timeline" className="hover:text-accent transition-colors">时间轴</a></li>
                <li><a href="/dynasties" className="hover:text-accent transition-colors">朝代更迭</a></li>
                <li><a href="/persons" className="hover:text-accent transition-colors">人物志</a></li>
                <li><a href="/knowledge" className="hover:text-accent transition-colors">史海钩沉</a></li>
                <li><a href="/map" className="hover:text-accent transition-colors">历史地图</a></li>
              </ul>
            </div>

            {/* 技术 */}
            <div>
              <h4 className="font-bold text-ink-700 mb-3">技术栈</h4>
              <ul className="space-y-2 text-ink-500">
                <li>React + TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Zustand 状态管理</li>
                <li>Spring Boot 后端</li>
              </ul>
            </div>
          </div>

          {/* 底部版权 */}
          <div className="mt-8 pt-4 border-t border-ink-100 text-center text-ink-300 text-xs">
            <p>五千年史馆 v0.1.0 — 仅供学习演示用途</p>
          </div>
        </div>
      </footer>
    </>
  );
}
