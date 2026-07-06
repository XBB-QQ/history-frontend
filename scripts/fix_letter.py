# -*- coding: utf-8 -*-
import io

path = r"d:/claudeCode/history-frontend/src/pages/LetterPage.tsx"
with io.open(path, "r", encoding="utf-8") as f:
    c = f.read()

replacements = [
    ("import { usePersonaStore } from '@/store/personaStore';",
     "import { usePersonaStore } from '@/store/personaStore';\nimport { useT } from '@/i18n/i18n';"),
    ("  const replyRef = useRef<HTMLDivElement>(null);\n",
     "  const replyRef = useRef<HTMLDivElement>(null);\n  const t = useT();\n"),
    ('title="时空邮筒"\n            description="给历史人物写信，AI 以其口吻回信"',
     "title={t('letter.title')}\n            description={t('letter.description')}"),
    ("              收件人 选择历史人物\n            </h3>",
     "              {t('letter.recipient_title')}\n            </h3>"),
    ('<div className="text-xs text-ink-500 dark:text-ink-400">致</div>',
     "<div className=\"text-xs text-ink-500 dark:text-ink-400\">{t('letter.to_label')}</div>"),
    ("placeholder={`给${selectedFigure.name}写点什么吧…\n可以问他的生平、探讨他的思想、或者只是聊聊你的困惑。`}",
     "placeholder={t('letter.input_placeholder', { name: selectedFigure.name })}"),
    ("                  {letterContent.length} 字\n                </span>",
     "                  {t('letter.char_count', { n: letterContent.length })}\n                </span>"),
    ("{sending ? '投递中…' : '📮 投入邮筒'}",
     "{sending ? t('letter.sending') : t('letter.send_btn')}"),
    ("setError(e instanceof Error ? e.message : '投递失败');",
     "setError(e instanceof Error ? e.message : t('letter.send_failed'));"),
    ("<span className=\"font-bold text-accent\">{selectedFigure?.name} 回信</span>",
     "<span className=\"font-bold text-accent\">{t('letter.reply_title', { name: selectedFigure?.name })}</span>"),
    ("                往来信件 ({letters.length})\n              </h3>",
     "                {t('letter.letters_title', { n: letters.length })}\n              </h3>"),
    ("                          删除\n                        </button>",
     "                          {t('letter.delete_btn')}\n                        </button>"),
    ('<div className="text-xs text-ink-500 dark:text-ink-400 mb-1">来信</div>',
     "<div className=\"text-xs text-ink-500 dark:text-ink-400 mb-1\">{t('letter.incoming_label')}</div>"),
    ('<div className="text-xs text-accent mb-1">回信</div>',
     "<div className=\"text-xs text-accent mb-1\">{t('letter.reply_label')}</div>"),
    ('<Link to="/" className="btn-secondary">返回首页</Link>',
     "<Link to=\"/\" className=\"btn-secondary\">{t('common.back_home')}</Link>"),
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
