/**
 * 历史人物卡牌收集页面
 * @see history-museum/design/000-future-roadmap.md §方向三 §3.3
 */

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCardStore } from '@/store/cardStore';
import { PERSON_CARDS, getCardById } from '@/data/games/personCards';
import { RARITY_CONFIG } from '@/types/card';
import type { PersonCard, CardRarity } from '@/types/card';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { useT } from '@/i18n/i18n';

const RARITY_ORDER: CardRarity[] = ['SSR', 'SR', 'R', 'N'];

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-12 text-ink-600 dark:text-ink-400">{label}</span>
      <div className="flex-1 h-2 bg-ink-100 dark:bg-ink-800 rounded-full overflow-hidden">
        <div className="h-full bg-accent rounded-full" style={{ width: `${value}%` }} />
      </div>
      <span className="w-8 text-right font-bold text-ink-900 dark:text-ink-100">{value}</span>
    </div>
  );
}

function CardDetail({ card, collected, bonds }: { card: PersonCard; collected: boolean; bonds: string[] }) {
  const t = useT();
  if (!collected) {
    return (
      <div className="text-center py-6">
        <div className="text-6xl mb-3">❓</div>
        <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">{t('cards.not_collected')}</h3>
        <p className="text-sm text-ink-500 dark:text-ink-400">{t('cards.unlock_hint')}</p>
      </div>
    );
  }
  const rarity = RARITY_CONFIG[card.rarity];
  return (
    <div>
      <div className={`p-4 rounded-lg bg-gradient-to-br ${rarity.gradient} text-white text-center mb-4`}>
        <div className="text-6xl mb-2">{card.emoji}</div>
        <h3 className="text-xl font-bold">{card.name}</h3>
        <div className="text-sm opacity-90">{card.dynasty} · {card.role}</div>
        <div className="inline-block mt-2 px-2 py-0.5 bg-white/80 text-accent text-xs font-bold rounded">
          {card.rarity} · {rarity.name}
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <StatBar label={t('cards.stat_military')} value={card.stats.military} />
        <StatBar label={t('cards.stat_wisdom')} value={card.stats.wisdom} />
        <StatBar label={t('cards.stat_governance')} value={card.stats.governance} />
        <StatBar label={t('cards.stat_charisma')} value={card.stats.charisma} />
      </div>
      <div className="p-3 bg-ink-50 dark:bg-ink-800/50 rounded text-sm italic text-ink-700 dark:text-ink-300 mb-3">
        "{card.quote}"
      </div>
      <p className="text-xs text-ink-600 dark:text-ink-400 mb-3">{card.bio}</p>
      {bonds.length > 0 && (
        <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded text-xs text-amber-700 dark:text-amber-400">
          抽 {t('cards.bond_active')}{bonds.join(', ')}
          {card.bondEffect && <div className="mt-1">{card.bondEffect}</div>}
        </div>
      )}
    </div>
  );
}

function CardsPage() {
  const t = useT();
  const { points, cards, draw, drawTen, hasCard, getActiveBonds } = useCardStore();
  const [drawResults, setDrawResults] = useState<PersonCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<PersonCard | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  function handleDraw(count: 1 | 10) {
    setIsDrawing(true);
    setDrawResults([]);
    setTimeout(() => {
      const results = count === 1 ? (draw() ? [draw()!] : []) : drawTen();
      setDrawResults(results);
      setIsDrawing(false);
    }, 500);
  }

  const collectedCount = cards.length;
  const totalCount = PERSON_CARDS.length;
  const progress = Math.round((collectedCount / totalCount) * 100);

  const rarityStats = useMemo(() => {
    const stats: Record<CardRarity, { total: number; collected: number }> = {
      SSR: { total: 0, collected: 0 },
      SR: { total: 0, collected: 0 },
      R: { total: 0, collected: 0 },
      N: { total: 0, collected: 0 },
    };
    PERSON_CARDS.forEach((c) => stats[c.rarity].total++);
    cards.forEach((c) => {
      const card = getCardById(c.cardId);
      if (card) stats[card.rarity].collected++;
    });
    return stats;
  }, [cards]);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="CARD COLLECTION"
            title={t('cards.title')}
            description={t('cards.description')}
          />
        </RevealOnScroll>

        {/* 顶部状态栏 */}
        <RevealOnScroll direction="up" delay={200}>
          <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-amber-500/10 dark:from-accent/20 dark:to-amber-700/20 rounded-xl border border-accent/20">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-xs text-ink-500 dark:text-ink-400">{t('cards.points')}</div>
                  <div className="text-2xl font-bold text-accent">{points}</div>
                </div>
                <div className="text-ink-300">|</div>
                <div>
                  <div className="text-xs text-ink-500 dark:text-ink-400">{t('cards.collected')}</div>
                  <div className="text-2xl font-bold text-ink-900 dark:text-ink-100">
                    {collectedCount}<span className="text-sm text-ink-400">/{totalCount}</span>
                  </div>
                </div>
                <div className="text-ink-300">|</div>
                <div>
                  <div className="text-xs text-ink-500 dark:text-ink-400">{t('cards.progress')}</div>
                  <div className="text-2xl font-bold text-accent">{progress}%</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDraw(1)}
                  disabled={isDrawing || points < 10}
                  className="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                >
                  {t('cards.draw_one')}
                </button>
                <button
                  onClick={() => handleDraw(10)}
                  disabled={isDrawing || points < 100}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-accent text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                >
                  {t('cards.draw_ten')}
                </button>
              </div>
            </div>
            <div className="mt-3 h-2 bg-ink-100 dark:bg-ink-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-amber-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </RevealOnScroll>

        {/* 抽卡结果 */}
        {(isDrawing || drawResults.length > 0) && (
          <RevealOnScroll direction="fade">
            <div className="mt-6 p-6 bg-white/70 dark:bg-ink-900/70 rounded-xl border-2 border-accent/30">
              <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-4 text-center">
                {isDrawing ? t('cards.drawing') : t('cards.obtained', { count: drawResults.length })}
              </h3>
              {isDrawing ? (
                <div className="text-center text-4xl animate-pulse">包</div>
              ) : (
                <div className={`grid gap-3 ${drawResults.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' : 'grid-cols-2 md:grid-cols-5'}`}>
                  {drawResults.map((card, i) => {
                    const rarity = RARITY_CONFIG[card.rarity];
                    return (
                      <div key={i} className={`p-3 rounded-lg bg-gradient-to-br ${rarity.gradient} text-white relative`}>
                        <div className="text-4xl text-center mb-1">{card.emoji}</div>
                        <div className="text-center font-bold text-sm">{card.name}</div>
                        <div className="text-center text-xs opacity-80">{card.dynasty}</div>
                        <div className={`text-center text-xs font-bold mt-1 ${rarity.color} bg-white/80 rounded`}>
                          {card.rarity}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </RevealOnScroll>
        )}

        {/* 稀有度统计 */}
        <RevealOnScroll direction="up" delay={300}>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {RARITY_ORDER.map((r) => {
              const stat = rarityStats[r];
              const config = RARITY_CONFIG[r];
              return (
                <div key={r} className={`p-3 rounded-lg bg-gradient-to-br ${config.gradient} text-white text-center`}>
                  <div className="text-2xl font-bold">{r}</div>
                  <div className="text-xs opacity-90">{config.name}</div>
                  <div className="text-sm mt-1">{stat.collected}/{stat.total}</div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* 卡牌图鉴 */}
        <RevealOnScroll direction="up" delay={400}>
          <div className="mt-6 p-4 bg-white/60 dark:bg-ink-900/60 rounded-xl border border-ink-200 dark:border-ink-700">
            <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-4">{t('cards.album')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {PERSON_CARDS.map((card) => {
                const collected = hasCard(card.id);
                const rarity = RARITY_CONFIG[card.rarity];
                return (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCard(card)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      collected
                        ? `bg-gradient-to-br ${rarity.gradient} text-white border-white/30 hover:scale-105`
                        : 'bg-ink-100/50 dark:bg-ink-800/50 border-ink-200 dark:border-ink-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="text-3xl text-center mb-1">{collected ? card.emoji : '❓'}</div>
                    <div className="text-center font-bold text-sm">{collected ? card.name : '???'}</div>
                    <div className={`text-center text-xs ${collected ? 'opacity-80' : ''}`}>
                      {collected ? card.dynasty : t('cards.not_collected')}
                    </div>
                    <div className={`text-center text-xs font-bold mt-1 ${collected ? 'bg-white/80 rounded' : ''}`}>
                      {card.rarity}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>

        {/* 详情弹窗 */}
        {selectedCard && (
          <div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={() => setSelectedCard(null)}
          >
            <div
              className="bg-paper dark:bg-ink-900 rounded-2xl border-2 border-accent/30 max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <CardDetail card={selectedCard} collected={hasCard(selectedCard.id)} bonds={getActiveBonds(selectedCard.id)} />
              <button
                onClick={() => setSelectedCard(null)}
                className="w-full mt-4 px-4 py-2 bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 rounded-lg hover:bg-ink-200 dark:hover:bg-ink-700 transition-colors"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        )}

        <RevealOnScroll direction="fade" delay={500}>
          <div className="mt-8 text-center">
            <Link to="/" className="btn-secondary">{t('cards.back_home')}</Link>
          </div>
        </RevealOnScroll>

        <div className="mt-6 p-3 bg-amber-50/50 dark:bg-amber-900/10 rounded-lg text-xs text-ink-500 dark:text-ink-400">
          注 {t('cards.tip')}
        </div>
      </div>
    </div>
  );
}

export default CardsPage;
