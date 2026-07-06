# -*- coding: utf-8 -*-
import io

path = r"d:/claudeCode/history-frontend/src/pages/RagQaPage.tsx"
with io.open(path, "r", encoding="utf-8") as f:
    c = f.read()

replacements = [
    ("import { askHistoryStream, type RagAnswer } from '@/features/ragSearch';",
     "import { askHistoryStream, type RagAnswer } from '@/features/ragSearch';\nimport { useT } from '@/i18n/i18n';"),
    ("const SUGGESTIONS = [\n  '\u5b89\u53f2\u4e4b\u4e71\u5230\u5e95\u600e\u4e48\u5f71\u54cd\u5510\u671d\u7ecf\u6d4e\u7684\uff1f',\n  '\u79e6\u59cb\u7687\u7edf\u4e00\u516d\u56fd\u7528\u4e86\u4ec0\u4e48\u7b56\u7565\uff1f',\n  '\u5b8b\u671d\u4e3a\u4ec0\u4e48\u91cd\u6587\u8f7b\u6b66\uff1f',\n  '\u660e\u671d\u706d\u4ea1\u548c\u6c14\u5019\u6709\u5173\u7cfb\u5417\uff1f',\n  '\u5b54\u5b50\u548c\u8001\u5b50\u6709\u4ec0\u4e48\u5206\u6b67\uff1f',\n  '\u5510\u671d\u548c\u5b8b\u671d\u54ea\u4e2a\u66f4\u7e41\u8363\uff1f',\n  '\u8d64\u58c1\u4e4b\u6218\u66f9\u64cd\u4e3a\u4ec0\u4e48\u4f1a\u8f93\uff1f',\n  '\u56db\u5927\u53d1\u660e\u662f\u600e\u4e48\u4f20\u5230\u897f\u65b9\u7684\uff1f',\n];",
     "const SUGGESTIONS = [\n  'ragQa.suggestion_1',\n  'ragQa.suggestion_2',\n  'ragQa.suggestion_3',\n  'ragQa.suggestion_4',\n  'ragQa.suggestion_5',\n  'ragQa.suggestion_6',\n  'ragQa.suggestion_7',\n  'ragQa.suggestion_8',\n];"),
    ("  const answerEndRef = useRef<HTMLDivElement>(null);\n",
     "  const answerEndRef = useRef<HTMLDivElement>(null);\n  const t = useT();\n"),
    ("setError(e instanceof Error ? e.message : '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5 API Key \u914d\u7f6e');",
     "setError(e instanceof Error ? e.message : t('ragQa.request_failed'));"),
    ('title="\u5386\u53f2\u667a\u6167\u95ee\u7b54"\n            description="\u57fa\u4e8e\u53f2\u6599\u56de\u7b54\u5386\u53f2\u95ee\u9898"',
     "title={t('ragQa.title')}\n            description={t('ragQa.description')}"),
    ('placeholder="\u95ee\u4efb\u4f55\u5386\u53f2\u95ee\u9898\u2026 \u4f8b\u5982\uff1a\u5b89\u53f2\u4e4b\u4e71\u5230\u5e95\u600e\u4e48\u5f71\u54cd\u5510\u671d\u7ecf\u6d4e\u7684\uff1f"',
     "placeholder={t('ragQa.input_placeholder')}"),
    ("{loading ? '\u67e5\u627e\u4e2d\u2026' : '\u63d0\u95ee'}",
     "{loading ? t('ragQa.searching') : t('ragQa.submit_btn')}"),
    ("                <button\n                  key={s}\n                  onClick={() => { setQuestion(s); handleSubmit(s); }}",
     "                <button\n                  key={s}\n                  onClick={() => { setQuestion(t(s)); handleSubmit(t(s)); }}"),
    ("                  {s}\n                ",
     "                  {t(s)}\n                "),
    ("\u9519 {error}",
     "{t('ragQa.error_prefix')} {error}"),
    ('<span className="text-accent text-lg">\u673a</span>',
     '<span className="text-accent text-lg">{t(\'ragQa.answer_icon\')}</span>'),
    ('<div className="font-bold text-ink-900 dark:text-ink-100">\u53f2\u9986\u7b54\u95ee</div>',
     "<div className=\"font-bold text-ink-900 dark:text-ink-100\">{t('ragQa.answer_title')}</div>"),
    ('<div className="text-xs text-ink-500 dark:text-ink-400">\u57fa\u4e8e\u53f2\u6599\u68c0\u7d22\uff0c\u975e\u51ed\u7a7a\u4f5c\u7b54</div>',
     "<div className=\"text-xs text-ink-500 dark:text-ink-400\">{t('ragQa.answer_subtitle')}</div>"),
    ('<span>\u53f2\u6599\u5339\u914d\u5ea6\uff1a</span>',
     "<span>{t('ragQa.match_score')}</span>"),
    ("\u53f2 \u5f15\u7528\u4e8b\u4ef6",
     "{t('ragQa.source_events_title')}"),
    ("\u4eba \u5f15\u7528\u4eba\u7269",
     "{t('ragQa.source_persons_title')}"),
    ("\u671d \u5f15\u7528\u671d\u4ee3",
     "{t('ragQa.source_dynasties_title')}"),
    ("{d.name}\u671d",
     "{d.name}{t('ragQa.dynasty_suffix')}"),
    ("\u8fd4\u56de\u9996\u9875",
     "{t('common.back_home')}"),
]

count = 0
for old, new in replacements:
    if old in c:
        c = c.replace(old, new)
        count += 1
    else:
        print('NOT FOUND:', repr(old[:60]))

with io.open(path, "w", encoding="utf-8", newline="\n") as f:
    f.write(c)

print('Replaced', count, 'of', len(replacements), 'patterns')
