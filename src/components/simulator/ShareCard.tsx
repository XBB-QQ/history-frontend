/**
 * 分享卡片 — 生成决策结果分享内容
 */

import { useState, useRef, useCallback } from 'react';
import type { Choice, Scenario } from '@/types/scenario';

interface ShareCardProps {
  scenario: Scenario;
  choice: Choice;
}

const OUTCOME_TAG: Record<string, { label: string; emoji: string }> = {
  historical: { label: '与史一致', emoji: '史' },
  alternate:  { label: '平行推演', emoji: '推' },
  failed:     { label: '失败结局', emoji: '败' },
};

function buildShareText(scenario: Scenario, choice: Choice): string {
  const tag = OUTCOME_TAG[choice.outcome];
  return [
    `【五千年史馆 · 历史决策模拟器】`,
    `场景：${scenario.title}`,
    `身份：${scenario.role} · ${scenario.yearDisplay}`,
    `我的选择：${choice.text}`,
    `结局：${tag.emoji} ${tag.label}`,
    choice.plausibility !== undefined ? `可信度：${choice.plausibility}/100` : '',
    `—`,
    choice.result.slice(0, 80) + (choice.result.length > 80 ? '…' : ''),
    `链 五千年史馆 — 如果你是${scenario.role}，你会怎么选？`,
  ].filter(Boolean).join('\n');
}

export default function ShareCard({ scenario, choice }: ShareCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const shareText = buildShareText(scenario, choice);
  const tag = OUTCOME_TAG[choice.outcome];

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers without clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = shareText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareText]);

  const handleShareNative = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `历史决策模拟器 · ${scenario.title}`,
          text: shareText,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      setShowPreview(true);
    }
  }, [shareText, scenario.title]);

  return (
    <div className="space-y-3">
      {/* 操作按钮 */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-accent hover:text-white'
          }`}
        >
          {copied ? '✓ 已复制' : '📋 复制文案'}
        </button>

        <button
          onClick={handleShareNative}
          className="px-4 py-2 rounded-lg font-bold text-sm bg-accent text-white hover:shadow-lg transition-all"
        >
          📤 分享
        </button>

        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 rounded-lg font-bold text-sm bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-ink-200 dark:hover:bg-ink-700 transition-all"
        >
          {showPreview ? '隐藏卡片' : '预 预览卡片'}
        </button>
      </div>

      {/* 卡片预览 */}
      {showPreview && (
        <div ref={cardRef} className="relative mx-auto max-w-md rounded-xl overflow-hidden shadow-xl border-2 border-accent/30"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          }}
        >
          {/* 装饰纹理 */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)',
            }}
          />

          {/* 顶部标签 */}
          <div className="relative px-6 pt-5 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-lg">殿</span>
              <span className="text-amber-300/80 text-xs font-bold tracking-widest">五千年史馆</span>
            </div>
            <div className="text-xs text-amber-200/60">历史决策模拟器</div>
          </div>

          {/* 场景信息 */}
          <div className="relative px-6 pb-3">
            <div className="text-white font-bold text-lg mb-1">
              {scenario.title}
            </div>
            <div className="text-amber-200/70 text-xs">
              {scenario.role} · {scenario.yearDisplay} · {scenario.dynasty}
            </div>
          </div>

          {/* 分割线 */}
          <div className="relative mx-6 border-t border-amber-400/20" />

          {/* 选择与结局 */}
          <div className="relative px-6 pt-4 pb-3">
            <div className="text-amber-300/70 text-xs tracking-widest mb-2">我的选择</div>
            <div className="text-white font-bold text-sm mb-3">
              {choice.text}
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: choice.outcome === 'historical' ? 'rgba(217,119,6,0.2)' :
                            choice.outcome === 'alternate'  ? 'rgba(79,70,229,0.2)' :
                            'rgba(107,114,128,0.2)',
                color: choice.outcome === 'historical' ? '#fbbf24' :
                       choice.outcome === 'alternate'  ? '#a78bfa' :
                       '#9ca3af',
              }}
            >
              {tag.emoji} {tag.label}
            </div>

            {choice.plausibility !== undefined && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-amber-200/60 text-xs">可信度</span>
                <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${choice.plausibility}%`,
                      background: choice.outcome === 'historical' ? '#fbbf24' :
                                  choice.outcome === 'alternate'  ? '#a78bfa' :
                                  '#9ca3af',
                    }}
                  />
                </div>
                <span className="text-white font-bold text-xs">{choice.plausibility}</span>
              </div>
            )}
          </div>

          {/* 结果摘要 */}
          <div className="relative px-6 pb-4">
            <div className="text-white/80 text-xs leading-relaxed">
              {choice.result.slice(0, 100)}{choice.result.length > 100 ? '…' : ''}
            </div>
          </div>

          {/* 底部 */}
          <div className="relative px-6 py-3 bg-white/5 flex items-center justify-between">
            <div className="text-amber-200/40 text-xs">
              如果你是{scenario.role}，你会怎么选？
            </div>
            <div className="text-amber-300/60 text-xs font-bold tracking-wider">
              HISTORY SIMULATOR
            </div>
          </div>
        </div>
      )}

      {/* 文案预览 */}
      {showPreview && (
        <div className="p-3 bg-ink-50 dark:bg-ink-900 rounded-lg border border-ink-200 dark:border-ink-700 text-xs text-ink-600 dark:text-ink-400 whitespace-pre-line font-mono">
          {shareText}
        </div>
      )}
    </div>
  );
}
