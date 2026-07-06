# -*- coding: utf-8 -*-
import io

path = r"d:/claudeCode/history-frontend/src/pages/LetterPage.tsx"
with io.open(path, "r", encoding="utf-8") as f:
    c = f.read()

old = r"placeholder={`给${selectedFigure.name}写点什么吧…\n可以问他的生平、探讨他的思想、或者只是聊聊你的困惑。`}"
new = "placeholder={t('letter.input_placeholder', { name: selectedFigure.name })}"

if old in c:
    c = c.replace(old, new)
    print('Replaced placeholder')
else:
    print('NOT FOUND:', repr(old[:80]))

with io.open(path, "w", encoding="utf-8", newline="\n") as f:
    f.write(c)
