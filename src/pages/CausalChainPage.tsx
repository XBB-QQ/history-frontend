import { useState, useMemo } from 'react';
import { CAUSAL_CHAINS, findCausalChain, traceCausalRoot } from '@/data/features/causalChains';
import type { CausalLink } from '@/data/features/causalChains';
import { useT } from '@/i18n/i18n';

const STRENGTH_STYLE = {
  direct: { labelKey: 'causalChain.strengthDirect', color: 'border-red-400 bg-red-50 text-red-700', line: '#c44536' },
  contributing: { labelKey: 'causalChain.strengthContributing', color: 'border-yellow-400 bg-yellow-50 text-yellow-700', line: '#d4a017' },
  background: { labelKey: 'causalChain.strengthBackground', color: 'border-blue-400 bg-blue-50 text-blue-700', line: '#4a90d9' },
};

export default function CausalChainPage() {
  const t = useT();
  const [selectedEvent, setSelectedEvent] = useState<string>('qin-unify');
  const [showChain, setShowChain] = useState(true);

  // 获取所有唯一事件节点
  const allEvents = useMemo(() => {
    const set = new Map<string, string>();
    CAUSAL_CHAINS.forEach(link => {
      set.set(link.cause, link.causeName);
      set.set(link.effect, link.effectName);
    });
    return Array.from(set.entries());
  }, []);

  const chain = findCausalChain(selectedEvent);
  const rootChain = traceCausalRoot(selectedEvent);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif">
            链 {t('causalChain.title')}
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            {t('causalChain.subtitle')}
          </p>
        </div>

        {/* 事件选择 */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {allEvents.map(([id, name]) => (
            <button
              key={id}
              onClick={() => { setSelectedEvent(id); setShowChain(true); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                selectedEvent === id
                  ? 'border-accent bg-accent text-white'
                  : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:border-accent/50'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* 因果链可视化 */}
        {showChain && (
          <div className="space-y-6">
            {/* 追根溯源路径 */}
            {rootChain.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3">
                  🌱 {t('causalChain.traceRoot')}
                </h3>
                <div className="flex items-center gap-1 overflow-x-auto pb-2">
                  {rootChain.map((link, i) => (
                    <div key={i} className="flex items-center gap-1 shrink-0">
                      <EventNode name={link.causeName} id={link.cause} active={link.cause === selectedEvent} />
                      <Arrow strength={link.strength} />
                      <EventNode name={link.effectName} id={link.effect} active={link.effect === selectedEvent} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 直接前因 */}
            {chain.causes.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3">
                  ⬅️ {t('causalChain.causes')}
                </h3>
                <div className="space-y-3">
                  {chain.causes.map((link, i) => (
                    <CausalCard key={i} link={link} direction="cause" onSelect={setSelectedEvent} />
                  ))}
                </div>
              </div>
            )}

            {/* 当前事件 */}
            <div className="p-4 rounded-xl border-2 border-accent bg-accent/10 dark:bg-accent/5 text-center">
              <span className="text-lg font-serif font-bold text-accent">
                事 {allEvents.find(([id]) => id === selectedEvent)?.[1] || selectedEvent}
              </span>
            </div>

            {/* 直接后果 */}
            {chain.effects.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3">
                  ➡️ {t('causalChain.effects')}
                </h3>
                <div className="space-y-3">
                  {chain.effects.map((link, i) => (
                    <CausalCard key={i} link={link} direction="effect" onSelect={setSelectedEvent} />
                  ))}
                </div>
              </div>
            )}

            {chain.causes.length === 0 && chain.effects.length === 0 && (
              <p className="text-center text-sm text-ink-400">
                {t('causalChain.noData')}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EventNode({ name, id, active }: { name: string; id: string; active: boolean }) {
  return (
    <button className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition-all ${
      active ? 'bg-accent text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400'
    }`}>
      {name}
    </button>
  );
}

function Arrow({ strength }: { strength: CausalLink['strength'] }) {
  const style = STRENGTH_STYLE[strength];
  return (
    <div className="shrink-0 flex items-center gap-0.5">
      <div className="w-6 h-0.5" style={{ backgroundColor: style.line }} />
      <span className="text-xs" style={{ color: style.line }}>→</span>
    </div>
  );
}

function CausalCard({ link, direction, onSelect }: {
  link: CausalLink;
  direction: 'cause' | 'effect';
  onSelect: (id: string) => void;
}) {
  const t = useT();
  const style = STRENGTH_STYLE[link.strength];
  const eventName = direction === 'cause' ? link.causeName : link.effectName;
  const eventId = direction === 'cause' ? link.cause : link.effect;

  return (
    <button
      onClick={() => onSelect(eventId)}
      className="w-full p-4 rounded-xl border-2 hover:shadow-md transition-all text-left"
      style={{ borderColor: style.line }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${style.color}`}>
          {t(style.labelKey)}
        </span>
        <span className="text-sm font-bold text-ink-800 dark:text-ink-200">
          {eventName}
        </span>
      </div>
      <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
        {link.description}
      </p>
    </button>
  );
}
