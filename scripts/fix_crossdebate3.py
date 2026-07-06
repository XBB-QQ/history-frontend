# -*- coding: utf-8 -*-
import io

path = r"d:/claudeCode/history-frontend/src/pages/CrossDebatePage.tsx"
with io.open(path, "r", encoding="utf-8") as f:
    c = f.read()

replacements = [
    ("{DEBATE_TOPICS.map((t, idx) => {\n                const p = DEBATE_FIGURE_PAIRS.find(fp => fp.topicId === t.id);",
     "{DEBATE_TOPICS.map((topic, idx) => {\n                const p = DEBATE_FIGURE_PAIRS.find(fp => fp.topicId === topic.id);"),
    ("                    key={t.id}\n                    onClick={() => startDebate(idx)}",
     "                    key={topic.id}\n                    onClick={() => startDebate(idx)}"),
    ("                      {t.title}\n                    </div>\n                    <div className=\"text-xs text-ink-500 dark:text-ink-400 mt-1\">\n                      {t.era} · {t.description.slice(0, 60)}…",
     "                      {topic.title}\n                    </div>\n                    <div className=\"text-xs text-ink-500 dark:text-ink-400 mt-1\">\n                      {topic.era} · {topic.description.slice(0, 60)}…"),
]

count = 0
for old, new in replacements:
    if old in c:
        c = c.replace(old, new)
        count += 1
    else:
        print('NOT FOUND:', repr(old[:80]))

with io.open(path, "w", encoding="utf-8", newline="\n") as f:
    f.write(c)

print('Replaced', count, 'of', len(replacements), 'patterns')
