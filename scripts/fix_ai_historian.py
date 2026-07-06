# -*- coding: utf-8 -*-
"""AiHistorianPage.tsx i18n 改造脚本"""
import sys

FILE = r"d:\claudeCode\history-frontend\src\pages\AiHistorianPage.tsx"

with open(FILE, "r", encoding="utf-8") as f:
    content = f.read()

replacements = [
    # 1. 添加 import
    (
        "import { buildPersonaPrompt } from '@/utils/personaBuilder';",
        "import { buildPersonaPrompt } from '@/utils/personaBuilder';\nimport { useT } from '@/i18n/i18n';",
    ),
    # 2. STYLE_LABELS: label -> labelKey, desc -> descKey
    (
        "  { key: 'formal', label: '\u6b63\u53f2\u4f53', emoji: '\u53f2', desc: '\u6a21\u4eff\u300a\u53f2\u8bb0\u300b\u5217\u4f20\u98ce\u683c\uff0c\u6587\u8a00\u6587\u8bc4\u4ef7' },",
        "  { key: 'formal', labelKey: 'aiHistorian.style_formal_label', emoji: '\u53f2', descKey: 'aiHistorian.style_formal_desc' },",
    ),
    (
        "  { key: 'anecdotal', label: '\u7a17\u5b98\u4f53', emoji: '\u4f20', desc: '\u6c11\u95f4\u8bf4\u4e66\u98ce\u683c\uff0c\u901a\u4fd7\u6709\u8da3' },",
        "  { key: 'anecdotal', labelKey: 'aiHistorian.style_anecdotal_label', emoji: '\u4f20', descKey: 'aiHistorian.style_anecdotal_desc' },",
    ),
    (
        "  { key: 'eulogy', label: '\u8c29\u8bae\u4f53', emoji: '\u8bc4', desc: '\u53e4\u4ee3\u8c29\u53f7\u8bc4\u5b9a\u683c\u5f0f\uff0c\u6b63\u5f0f\u5e84\u91cd' },",
        "  { key: 'eulogy', labelKey: 'aiHistorian.style_eulogy_label', emoji: '\u8bc4', descKey: 'aiHistorian.style_eulogy_desc' },",
    ),
    # 3. 添加 const t = useT();
    (
        "export default function AiHistorianPage() {\n  const [portrait, setPortrait]",
        "export default function AiHistorianPage() {\n  const t = useT();\n  const [portrait, setPortrait]",
    ),
    # 4. 生成失败
    (
        "setError(e instanceof Error ? e.message : '\u751f\u6210\u5931\u8d25');",
        "setError(e instanceof Error ? e.message : t('aiHistorian.generate_failed'));",
    ),
    # 5. 对话失败
    (
        "setChatError(e instanceof Error ? e.message : '\u5bf9\u8bdd\u5931\u8d25');",
        "setChatError(e instanceof Error ? e.message : t('aiHistorian.chat_failed'));",
    ),
    # 6. suggestedQuestions
    (
        "    `\u4e3a\u4ec0\u4e48\u8bf4${portrait.matchedFigure || '\u6211'}\u662f\u6211\u7684\u955c\u50cf\uff1f`,",
        "    t('aiHistorian.q_mirror_figure', { name: portrait.matchedFigure || t('aiHistorian.default_figure') }),",
    ),
    (
        "    `\u6211\u5173\u6ce8${portrait.topDynasties[0] || '\u5510\u671d'}\uff0c\u8fd9\u4e2a\u671d\u4ee3\u6709\u4ec0\u4e48\u88ab\u4f4e\u4f30\u7684\u7ec6\u8282\uff1f`,",
        "    t('aiHistorian.q_dynasty_details', { dynasty: portrait.topDynasties[0] || t('aiHistorian.default_dynasty') }),",
    ),
    (
        "    `\u5982\u679c\u6211\u4ece${portrait.topPersons[0] || '\u674e\u767d'}\u8eab\u4e0a\u53ea\u5b66\u4e00\u4ef6\u4e8b\uff0c\u5e94\u8be5\u662f\u4ec0\u4e48\uff1f`,",
        "    t('aiHistorian.q_learn_one_thing', { name: portrait.topPersons[0] || t('aiHistorian.default_person') }),",
    ),
    (
        "    `\u5386\u53f2\u5b66\u5bb6\u4f1a\u600e\u4e48\u8bc4\u4ef7\u6211\u8fd9\u79cd\"\u753b\u50cf\"\uff1f`,",
        "    t('aiHistorian.q_historian_judgment'),",
    ),
    # 7. SectionHeader
    (
        '            title="AI \u53f2\u5b98\u8bc4\u8bed"',
        "            title={t('aiHistorian.title')}",
    ),
    (
        '            description="AI \u751f\u6210\u7684\u4eba\u7269\u4f20\u8bb0"',
        "            description={t('aiHistorian.description')}",
    ),
    # 8. portrait_title
    (
        "                \u50cf \u4f60\u7684\u5386\u53f2\u753b\u50cf",
        "                {t('aiHistorian.portrait_title')}",
    ),
    # 9. portrait labels
    (
        '<div className="text-ink-500 dark:text-ink-400">\u5e38\u89c8\u671d\u4ee3</div>',
        "<div className=\"text-ink-500 dark:text-ink-400\">{t('aiHistorian.top_dynasties')}</div>",
    ),
    (
        '<div className="text-ink-500 dark:text-ink-400">\u5173\u6ce8\u4eba\u7269</div>',
        "<div className=\"text-ink-500 dark:text-ink-400\">{t('aiHistorian.top_persons')}</div>",
    ),
    (
        '<div className="text-ink-500 dark:text-ink-400">\u7b54\u9898\u6b63\u786e\u7387</div>',
        "<div className=\"text-ink-500 dark:text-ink-400\">{t('aiHistorian.quiz_accuracy')}</div>",
    ),
    (
        '<div className="text-ink-500 dark:text-ink-400">\u6700\u50cf\u7684\u4eba\u7269</div>',
        "<div className=\"text-ink-500 dark:text-ink-400\">{t('aiHistorian.matched_figure')}</div>",
    ),
    # 10. dimensions
    (
        "{ key: 'governance', label: '\u6587\u6cbb', color: 'text-amber-600' },",
        "{ key: 'governance', labelKey: 'aiHistorian.dim_governance', color: 'text-amber-600' },",
    ),
    (
        "{ key: 'military', label: '\u6b66\u529f', color: 'text-red-600' },",
        "{ key: 'military', labelKey: 'aiHistorian.dim_military', color: 'text-red-600' },",
    ),
    (
        "{ key: 'wisdom', label: '\u667a\u7565', color: 'text-indigo-600' },",
        "{ key: 'wisdom', labelKey: 'aiHistorian.dim_wisdom', color: 'text-indigo-600' },",
    ),
    (
        "{ key: 'charisma', label: '\u535a\u5b66', color: 'text-green-600' },",
        "{ key: 'charisma', labelKey: 'aiHistorian.dim_charisma', color: 'text-green-600' },",
    ),
    (
        '<div className="text-xs text-ink-400">{d.label}</div>',
        "<div className=\"text-xs text-ink-400\">{t(d.labelKey)}</div>",
    ),
    # 11. generate button
    (
        "{loading ? '\u64b0\u5199\u4e2d\u2026' : '\u4e3a\u6211\u4f5c\u8bc4'}",
        "{loading ? t('aiHistorian.generating') : t('aiHistorian.generate_btn')}",
    ),
    # 12. error prefix
    (
        "            \u9519 {error}",
        "            {t('aiHistorian.error_prefix')} {error}",
    ),
    # 13. style buttons
    (
        "{s.emoji} {s.label}",
        "{s.emoji} {t(s.labelKey)}",
    ),
    # 14. style desc
    (
        "{STYLE_LABELS.find(s => s.key === activeStyle)?.desc}",
        "{t(STYLE_LABELS.find(s => s.key === activeStyle)?.descKey || '')}",
    ),
    # 15. suggestion_title
    (
        "\u6ce8 \u53f2\u5b98\u5efa\u8bae",
        "{t('aiHistorian.suggestion_title')}",
    ),
    # 16. compare_title
    (
        "\u4e09\u4f53\u5bf9\u7167",
        "{t('aiHistorian.compare_title')}",
    ),
    # 17. compare list label
    (
        "<span className=\"font-bold text-accent\">{s.emoji} {s.label}\uff1a</span>",
        "<span className=\"font-bold text-accent\">{s.emoji} {t(s.labelKey)}\uff1a</span>",
    ),
    # 18. chat title
    (
        "                    \u8ffd\u95ee\u53f2\u5b98",
        "                    {t('aiHistorian.chat_title')}",
    ),
    # 19. chat subtitle
    (
        "                    \u53f2\u5b98\u8bb0\u5f97\u4f60\u7684\u753b\u50cf\u4e0e\u4ed6\u4e4b\u524d\u7684\u8bc4\u8bed\uff0c\u53ef\u4ee5\u7ee7\u7eed\u8ffd\u95ee",
        "                    {t('aiHistorian.chat_subtitle')}",
    ),
    # 20. chat hint
    (
        "                  \u8bc4\u8bed\u5df2\u751f\u6210\uff0c\u73b0\u5728\u53ef\u4ee5\u5411\u53f2\u5b98\u8ffd\u95ee\u4efb\u4f55\u5386\u53f2\u95ee\u9898\u3002\u53f2\u5b98\u4f1a\u8bb0\u5f97\u4f60\u7684\u753b\u50cf\u548c\u8bc4\u8bed\uff0c\u4fdd\u6301\u5224\u65ad\u4e00\u81f4\u6027\u3002",
        "                  {t('aiHistorian.chat_hint')}",
    ),
    # 21. chat input placeholder
    (
        'placeholder="\u5411\u53f2\u5b98\u63d0\u95ee\u2026"',
        "placeholder={t('aiHistorian.chat_input_placeholder')}",
    ),
    # 22. chat send button
    (
        "{chatLoading ? '\u2026' : '\u53d1\u9001'}",
        "{chatLoading ? '\u2026' : t('aiHistorian.chat_send')}",
    ),
    # 23. back home
    (
        '<Link to="/" className="btn-secondary">\u8fd4\u56de\u9996\u9875</Link>',
        "<Link to=\"/\" className=\"btn-secondary\">{t('common.back_home')}</Link>",
    ),
]

count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new, 1)
        count += 1
    else:
        print(f"WARNING: not found: {old[:60]}...")

with open(FILE, "w", encoding="utf-8", newline="\n") as f:
    f.write(content)

print(f"AiHistorianPage.tsx: {count}/{len(replacements)} replacements applied")
