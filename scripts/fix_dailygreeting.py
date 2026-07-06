# -*- coding: utf-8 -*-
import io

path = r"d:/claudeCode/history-frontend/src/pages/DailyGreetingPage.tsx"
with io.open(path, "r", encoding="utf-8") as f:
    c = f.read()

replacements = [
    ("} from '@/features/dailyGreeting';",
     "} from '@/features/dailyGreeting';\nimport { useT } from '@/i18n/i18n';"),
    ("  const [showRefresh, setShowRefresh] = useState(false);\n",
     "  const [showRefresh, setShowRefresh] = useState(false);\n  const t = useT();\n"),
    ('title="历史人物每日问候"\n            description="关注你喜欢的历史人物，每天收到他们的问候"',
     "title={t('dailyGreeting.title')}\n            description={t('dailyGreeting.description')}"),
    ("              关注人物（已关注 {followedIds.length} 人）\n            </h3>",
     "              {t('dailyGreeting.follow_title', { n: followedIds.length })}\n            </h3>"),
    ("{followed && <span className=\"text-[10px] mt-1 text-accent\">已关注</span>}",
     "{followed && <span className=\"text-[10px] mt-1 text-accent\">{t('dailyGreeting.followed')}</span>}"),
    ("              关注的人物每天会给你发问候消息\n            </p>",
     "              {t('dailyGreeting.follow_hint')}\n            </p>"),
    ("                  <h3 className=\"text-lg font-bold text-ink-900 dark:text-ink-100\">\n                    今日问候\n                  </h3>",
     "                  <h3 className=\"text-lg font-bold text-ink-900 dark:text-ink-100\">\n                    {t('dailyGreeting.today_title')}\n                  </h3>"),
    ("{loading ? '发送中…' : '接收问候'}",
     "{loading ? t('dailyGreeting.sending') : t('dailyGreeting.receive_btn')}"),
    ("setError(e instanceof Error ? e.message : '生成失败');",
     "setError(e instanceof Error ? e.message : t('dailyGreeting.generate_failed'));"),
    ('<div className="text-sm text-ink-500 dark:text-ink-400">人物正在写问候…</div>',
     "<div className=\"text-sm text-ink-500 dark:text-ink-400\">{t('dailyGreeting.writing')}</div>"),
    ("                历史问候 ({historyGreetings.length})\n              </h3>",
     "                {t('dailyGreeting.history_title', { n: historyGreetings.length })}\n              </h3>"),
    ("                暂无问候消息\n              </h3>",
     "                {t('dailyGreeting.empty_title')}\n              </h3>"),
    ("                先关注几位历史人物，明天就能收到他们的问候啦！\n              </p>",
     "                {t('dailyGreeting.empty_desc')}\n              </p>"),
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
