# -*- coding: utf-8 -*-
import io

path = r"d:/claudeCode/history-frontend/src/pages/DialogPage.tsx"
with io.open(path, "r", encoding="utf-8") as f:
    c = f.read()

replacements = [
    ("import RevealOnScroll from '@/components/common/RevealOnScroll';",
     "import RevealOnScroll from '@/components/common/RevealOnScroll';\nimport { useT } from '@/i18n/i18n';"),
    ("  const messagesEndRef = useRef<HTMLDivElement>(null);\n",
     "  const messagesEndRef = useRef<HTMLDivElement>(null);\n  const t = useT();\n"),
    ('title="与历史人物对话"\n            description="和历史人物对话"',
     "title={t('dialog.title')}\n            description={t('dialog.description')}"),
    ('aria-label="返回"',
     "aria-label={t('dialog.back_aria')}"),
    # rename map callback t -> topic and use i18n t for template
    ("{selectedFigure.topics.slice(0, 4).map((t) => (\n                  <button\n                    key={t}\n                    onClick={() => setInput(`请问${t}之道？`)}\n                    className=\"text-xs px-2 py-1 bg-accent/10 dark:bg-accent/20 text-accent rounded-full hover:bg-accent/20 transition-colors\"\n                  >\n                    {t}\n                  </button>\n                ))}",
     "{selectedFigure.topics.slice(0, 4).map((topic) => (\n                  <button\n                    key={topic}\n                    onClick={() => setInput(t('dialog.topic_btn_template', { topic }))}\n                    className=\"text-xs px-2 py-1 bg-accent/10 dark:bg-accent/20 text-accent rounded-full hover:bg-accent/20 transition-colors\"\n                  >\n                    {topic}\n                  </button>\n                ))}"),
    ("placeholder={`向${selectedFigure.name}提问...`}",
     "placeholder={t('dialog.input_placeholder', { name: selectedFigure.name })}"),
    ("                发送\n              </button>",
     "                {t('dialog.send_btn')}\n              </button>"),
    ("              返回首页\n            </Link>",
     "              {t('common.back_home')}\n            </Link>"),
    ("            注 当前为规则版回复，后续将接入 LLM 实现真正智能对话。可尝试询问人物专长话题（如问孔子\"仁\"、问李白\"诗\"）获得更好体验。\n          </div>",
     "            {t('dialog.rule_hint')}\n          </div>"),
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
