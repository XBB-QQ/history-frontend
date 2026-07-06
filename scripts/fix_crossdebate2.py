# -*- coding: utf-8 -*-
import io

path = r"d:/claudeCode/history-frontend/src/pages/CrossDebatePage.tsx"
with io.open(path, "r", encoding="utf-8") as f:
    c = f.read()

old = '<h3 className="text-sm font-bold text-accent mb-3 tracking-widest">史官评语</h3>'
new = "<h3 className=\"text-sm font-bold text-accent mb-3 tracking-widest\">{t('crossDebate.conclusion_title')}</h3>"

if old in c:
    c = c.replace(old, new)
    print('Replaced:', repr(old))
else:
    print('NOT FOUND:', repr(old))

with io.open(path, "w", encoding="utf-8", newline="\n") as f:
    f.write(c)
