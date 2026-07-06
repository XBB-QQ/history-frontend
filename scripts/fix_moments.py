# -*- coding: utf-8 -*-
import io

path = r"d:/claudeCode/history-frontend/src/pages/MomentsPage.tsx"
with io.open(path, "r", encoding="utf-8") as f:
    c = f.read()

replacements = [
    ("} from '@/features/momentsFeed';",
     "} from '@/features/momentsFeed';\nimport { useT } from '@/i18n/i18n';"),
    ("  const [replyingPostId, setReplyingPostId] = useState<string | null>(null);\n",
     "  const [replyingPostId, setReplyingPostId] = useState<string | null>(null);\n  const t = useT();\n"),
    ('title="历史人物朋友圈"\n            description="看看历史大事件发生时，当事人们的朋友圈 · 你也可以点赞和评论"',
     "title={t('moments.title')}\n            description={t('moments.description')}"),
    ("              选择历史时刻\n            </h3>",
     "              {t('moments.scene_select_title')}\n            </h3>"),
    ("setError(e instanceof Error ? e.message : '生成失败');",
     "setError(e instanceof Error ? e.message : t('moments.generate_failed'));"),
    ("                历史人物正在发朋友圈…\n              </div>",
     "                {t('moments.regenerating')}\n              </div>"),
    ('<div className="text-xs text-accent tracking-widest">朋友圈 · {feed.year}</div>',
     "<div className=\"text-xs text-accent tracking-widest\">{t('moments.feed_header', { year: feed.year })}</div>"),
    ("                  AI 正在生成更精彩的朋友圈内容，完成后自动替换…\n                </div>",
     "                  {t('moments.ai_generating_hint')}\n                </div>"),
    ("<span>{post.comments.length} 评论</span>",
     "<span>{t('moments.comment_count', { n: post.comments.length })}</span>"),
    ('{c.isUser && <span className="text-[10px] text-blue-500 dark:text-blue-400 mr-1">[你]</span>}',
     "{c.isUser && <span className=\"text-[10px] text-blue-500 dark:text-blue-400 mr-1\">{t('moments.you_tag')}</span>}"),
    ('placeholder="写评论…"',
     "placeholder={t('moments.comment_placeholder')}"),
    ("                              发送\n                            </button>",
     "                              {t('moments.comment_send_btn')}\n                            </button>"),
    ("{regenerating ? '🔄 生成中…' : '🔄 重新生成这组朋友圈'}",
     "{regenerating ? t('moments.regenerating_btn') : t('moments.regenerate_btn')}"),
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
