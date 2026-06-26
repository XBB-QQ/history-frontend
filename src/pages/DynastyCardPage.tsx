import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DYNASTY_CARD_TEMPLATES } from '@/data/dynastyCards';
import type { DynastyCardProfile } from '@/data/dynastyCards';

export default function DynastyCardPage() {
  const navigate = useNavigate();
  const templates = Object.values(DYNASTY_CARD_TEMPLATES);
  const [selectedId, setSelectedId] = useState<string>(templates[0].dynastyId);
  const [showCard, setShowCard] = useState(false);

  const template = DYNASTY_CARD_TEMPLATES[selectedId];
  if (!template) return null;

  const card: DynastyCardProfile = {
    ...template,
    learnedEvents: 3,
    totalEvents: 5,
    quizCorrect: 2,
    quizTotal: 3,
    userName: '历史爱好者',
    generatedAt: new Date().toLocaleDateString('zh-CN'),
  };

  const progress = Math.round((card.learnedEvents / card.totalEvents) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif">
            殿 朝代名片
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            学完一个朝代，生成专属名片，分享你的历史足迹
          </p>
        </div>

        {/* 朝代选择 */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {templates.map(t => (
            <button
              key={t.dynastyId}
              onClick={() => { setSelectedId(t.dynastyId); setShowCard(false); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border-2 ${
                selectedId === t.dynastyId
                  ? 'border-accent bg-accent text-white scale-105'
                  : 'border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:border-accent/50'
              }`}
              style={selectedId === t.dynastyId ? { borderColor: t.colorPrimary } : {}}
            >
              {t.dynastyName}
            </button>
          ))}
        </div>

        {/* 名片预览 */}
        {!showCard ? (
          <div className="text-center">
            <button
              onClick={() => setShowCard(true)}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-amber-600 text-white font-bold text-lg hover:shadow-xl transition-all"
            >
              生成名片 生
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className="relative w-[380px] rounded-2xl shadow-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${card.colorPrimary}20, ${card.colorSecondary}30)`,
                borderColor: card.colorPrimary,
              }}
            >
              {/* 装饰边框 */}
              <div
                className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                style={{ borderColor: `${card.colorPrimary}40` }}
              />

              {/* 名片内容 */}
              <div className="p-6 relative">
                {/* 朝代印章 */}
                <div className="absolute top-4 right-4">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-serif text-2xl font-bold shadow-inner"
                    style={{ backgroundColor: card.colorPrimary }}
                  >
                    {card.dynastyName}
                  </div>
                </div>

                {/* 主标题 */}
                <h2
                  className="text-4xl font-serif font-bold mb-1"
                  style={{ color: card.colorPrimary }}
                >
                  {card.dynastyName}朝
                </h2>
                <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">
                  {card.period}
                </p>

                {/* 一句话 */}
                <div
                  className="px-4 py-2 rounded-lg mb-4 text-sm font-bold"
                  style={{
                    backgroundColor: `${card.colorPrimary}15`,
                    color: card.colorPrimary,
                    borderLeft: `3px solid ${card.colorPrimary}`,
                  }}
                >
                  {card.tagline}
                </div>

                {/* 关键信息 */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-xs">
                    <span className="text-ink-400">都城</span>
                    <span className="ml-2 font-bold text-ink-700 dark:text-ink-300">{card.capital}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-ink-400">开国</span>
                    <span className="ml-2 font-bold text-ink-700 dark:text-ink-300">{card.foundingEmperor}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-ink-400">代表</span>
                    <span className="ml-2 font-bold text-ink-700 dark:text-ink-300">{card.peakEvent}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-ink-400">印章</span>
                    <span className="ml-2 font-bold text-ink-700 dark:text-ink-300">{card.sealStyle}</span>
                  </div>
                </div>

                {/* 学习进度 */}
                <div className="border-t border-ink-200/30 dark:border-ink-700/30 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-ink-500">学习进度</span>
                    <span className="text-xs font-bold" style={{ color: card.colorPrimary }}>
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-ink-200/30 dark:bg-ink-700/30">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${progress}%`, backgroundColor: card.colorPrimary }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-ink-400">
                    <span>事件 {card.learnedEvents}/{card.totalEvents}</span>
                    <span>答题 {card.quizCorrect}/{card.quizTotal}</span>
                  </div>
                </div>

                {/* 底部 */}
                <div className="mt-4 text-center text-xs text-ink-400">
                  <p>{card.userName} · {card.generatedAt}</p>
                  <p className="mt-1 text-ink-300">五千年史馆 · 历史足迹名片</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 分享提示 */}
        {showCard && (
          <div className="mt-6 text-center">
            <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">
              名片生成完成！长按图片保存或截图分享朋友圈
            </p>
            <button
              onClick={() => navigate('/dynasties')}
              className="px-6 py-3 rounded-lg border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
            >
              继续探索朝代 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
