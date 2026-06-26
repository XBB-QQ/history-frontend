/**
 * 古文智能注解页面 — 词典版 + LLM 升级
 * @see history-museum/design/002-innovation-brainstorm.md §4
 */

import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { searchDict, CLASSICAL_DICT, type DictEntry } from '@/data/classicalDict';
import { callLLM, type LLMMessage } from '@/utils/llmClient';

type Mode = 'dict' | 'llm';

export default function ClassicalAnnotationPage() {
  const [inputText, setInputText] = useState('');
  const [dictResults, setDictResults] = useState<DictEntry[]>([]);
  const [llmAnnotation, setLlmAnnotation] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>('dict');
  const [hoverWord, setHoverWord] = useState<DictEntry | null>(null);

  const handleDictSearch = useCallback(() => {
    const results = searchDict(inputText);
    setDictResults(results);
  }, [inputText]);

  const handleLlmAnnotation = useCallback(async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setLlmAnnotation('');
    try {
      const messages: LLMMessage[] = [
        {
          role: 'system',
          content: `你是古汉语注解专家。用户会输入一段古文，你需要对每个关键词做注解。

格式要求：
每个词用以下格式注解：
**词** — 古义：xxx | 今义：xxx | 用法：xxx

最后给出整体白话翻译。

注解原则：
1. 重点注解生僻词、古今异义词、一字多义词
2. 注解政治制度词汇（郡县、分封、社稷等）时解释其历史背景
3. 注解等级词汇（崩、薨、弑、征等）时说明其等级含义
4. 尽量引用相关典故`,
        },
        {
          role: 'user',
          content: `请注解以下古文：\n\n${inputText}`,
        },
      ];
      const result = await callLLM(messages, { maxTokens: 1500, temperature: 0.3 });
      setLlmAnnotation(result);
    } catch (e) {
      setLlmAnnotation('注解生成失败：' + (e instanceof Error ? e.message : '未知错误'));
    } finally {
      setLoading(false);
    }
  }, [inputText]);

  // 互动式悬浮注解：在输入文本中检测古汉语词汇
  const annotatedWords = CLASSICAL_DICT.filter(e => inputText.includes(e.word));

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="CLASSICAL ANNOTATION"
            title="古文注解"
            description="古文逐字注解"
          />
        </RevealOnScroll>

        {/* 输入区 */}
        <RevealOnScroll direction="up" delay={200}>
          <div className="mt-8 p-6 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 shadow-sm">
            {/* 模式切换 */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setMode('dict')}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'dict' ? 'bg-accent text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400'}`}
              >
                📖 词典检索
              </button>
              <button
                onClick={() => setMode('llm')}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'llm' ? 'bg-accent text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400'}`}
              >
                🤖 AI 注解
              </button>
            </div>

            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="输入古文… 例如：朕为始皇帝，后世以计数，二世三世至于万世，传之无穷"
              className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
              rows={4}
            />

            {/* 悬浮注解预览 */}
            {annotatedWords.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-ink-500 dark:text-ink-400 mb-1">
                  🔍 检测到古汉语词汇（悬浮查看）：
                </div>
                <div className="flex flex-wrap gap-2">
                  {annotatedWords.map(e => (
                    <span
                      key={e.word}
                      onMouseEnter={() => setHoverWord(e)}
                      onMouseLeave={() => setHoverWord(null)}
                      className="px-2 py-1 rounded bg-accent/10 text-accent text-xs font-bold cursor-help hover:bg-accent/20 transition-colors"
                    >
                      {e.word}
                    </span>
                  ))}
                </div>
                {hoverWord && (
                  <div className="mt-2 p-3 bg-accent/5 dark:bg-accent/10 rounded-lg border border-accent/30 text-sm animate-fade-in">
                    <div className="font-bold text-accent mb-1">{hoverWord.word}</div>
                    <div>古义：{hoverWord.classicalMeaning}</div>
                    <div>今义：{hoverWord.modernEquivalent}</div>
                    {hoverWord.example && <div className="text-ink-400 mt-1">例：{hoverWord.example}（{hoverWord.source}）</div>}
                    {hoverWord.allusion && <div className="text-amber-600 dark:text-amber-400 mt-1">典故：{hoverWord.allusion}</div>}
                  </div>
                )}
              </div>
            )}

            <div className="mt-3 flex gap-2">
              {mode === 'dict' && (
                <button
                  onClick={handleDictSearch}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg transition-all"
                >
                  📖 查词典
                </button>
              )}
              {mode === 'llm' && (
                <button
                  onClick={handleLlmAnnotation}
                  disabled={loading}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg disabled:opacity-50 transition-all"
                >
                  {loading ? '注解中…' : '🤖 AI 注解'}
                </button>
              )}
              <button
                onClick={() => { setInputText('朕为始皇帝，后世以计数，二世三世至于万世，传之无穷'); }}
                className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 text-sm hover:bg-ink-200 transition-colors"
              >
                示例1：秦始皇
              </button>
              <button
                onClick={() => { setInputText('鞠躬尽瘁，死而后已。至于成败利钝，非臣之明所能逆睹也'); }}
                className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 text-sm hover:bg-ink-200 transition-colors"
              >
                示例2：诸葛亮
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* 词典结果 */}
        {mode === 'dict' && dictResults.length > 0 && (
          <RevealOnScroll direction="fade">
            <div className="mt-6 space-y-3">
              {dictResults.map(e => (
                <div key={e.word} className="p-4 bg-white/70 dark:bg-ink-900/70 rounded-lg border border-ink-200 dark:border-ink-700 hover:border-accent transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl font-bold text-accent">{e.word}</span>
                    <span className="text-sm text-ink-500">古义：{e.classicalMeaning}</span>
                    <span className="text-sm text-green-600 dark:text-green-400">今义：{e.modernEquivalent}</span>
                  </div>
                  {e.example && (
                    <div className="text-sm text-ink-600 dark:text-ink-400 mb-1">
                      例：{e.example}（{e.source}）
                    </div>
                  )}
                  {e.allusion && (
                    <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50/40 dark:bg-amber-900/10 rounded px-2 py-1">
                      📖 {e.allusion}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </RevealOnScroll>
        )}

        {/* LLM 注解结果 */}
        {mode === 'llm' && llmAnnotation && (
          <RevealOnScroll direction="fade">
            <div className="mt-6 p-6 bg-gradient-to-br from-white/80 to-accent/5 dark:from-ink-900/80 dark:to-accent/10 rounded-xl border border-ink-200 dark:border-ink-700 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-accent text-lg">🤖</span>
                <span className="font-bold text-ink-900 dark:text-ink-100">AI 古文注解</span>
                <span className="text-xs text-ink-400">基于 GLM-4-Flash</span>
              </div>
              <div className="text-ink-800 dark:text-ink-200 leading-loose whitespace-pre-line">
                {llmAnnotation}
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* 词典浏览 */}
        <RevealOnScroll direction="up" delay={400}>
          <div className="mt-8 p-4 bg-ink-50/50 dark:bg-ink-900/30 rounded-lg border border-ink-200 dark:border-ink-700">
            <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
              📚 古汉语词典速览
            </h3>
            <div className="flex flex-wrap gap-2">
              {CLASSICAL_DICT.slice(0, 20).map(e => (
                <button
                  key={e.word}
                  onClick={() => { setInputText(e.word); setMode('dict'); handleDictSearch(); }}
                  className="px-3 py-1 rounded-full bg-white/70 dark:bg-ink-800 text-ink-700 dark:text-ink-300 text-xs font-bold hover:bg-accent hover:text-white transition-all"
                >
                  {e.word}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* 底部 */}
        <RevealOnScroll direction="fade" delay={500}>
          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">返回首页</Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
