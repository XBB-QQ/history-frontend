# -*- coding: utf-8 -*-
import re
FILE = r"d:\claudeCode\history-frontend\src\pages\AiHistorianPage.tsx"
with open(FILE, "r", encoding="utf-8") as f:
    c = f.read()
pattern = r"\{ key: 'eulogy', label: '[^']+', emoji: '[^']+', desc: '[^']+' \},"
replacement = "  { key: 'eulogy', labelKey: 'aiHistorian.style_eulogy_label', emoji: '\u8bc4', descKey: 'aiHistorian.style_eulogy_desc' },"
c2 = re.sub(pattern, replacement, c)
with open(FILE, "w", encoding="utf-8", newline="\n") as f:
    f.write(c2)
print("Fixed" if c != c2 else "No change")
