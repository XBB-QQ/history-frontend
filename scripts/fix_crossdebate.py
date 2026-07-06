# -*- coding: utf-8 -*-
import io

path = r"d:/claudeCode/history-frontend/src/pages/CrossDebatePage.tsx"
with io.open(path, "r", encoding="utf-8") as f:
    c = f.read()

replacements = [
    ("import { usePersonaStore } from '@/store/personaStore';",
     "import { usePersonaStore } from '@/store/personaStore';\nimport { useT } from '@/i18n/i18n';"),
    ("  const scrollRef = useRef<HTMLDivElement>(null);\n",
     "  const scrollRef = useRef<HTMLDivElement>(null);\n  const t = useT();\n"),
    ('title="跨时空辩论场"\n            description="不同时代的人怎么想同一件事"',
     "title={t('crossDebate.title')}\n            description={t('crossDebate.description')}"),
    ("title={!p ? '该话题暂未配置辩手，敬请期待' : undefined}",
     "title={!p ? t('crossDebate.no_pair_hint') : undefined}"),
    ("{pro?.emoji || '人'}",
     "{pro?.emoji || t('crossDebate.default_figure_emoji')}"),
    ("{pro?.name || '正方'}",
     "{pro?.name || t('crossDebate.pro_side')}"),
    ("{con?.emoji || '人'}",
     "{con?.emoji || t('crossDebate.default_figure_emoji')}"),
    ("{con?.name || '反方'}",
     "{con?.name || t('crossDebate.con_side')}"),
    ('<span className="text-lg font-bold text-ink-400">战</span>',
     "<span className=\"text-lg font-bold text-ink-400\">{t('crossDebate.vs_label')}</span>"),
    ("{proFigure?.name || '正方'}",
     "{proFigure?.name || t('crossDebate.pro_side')}"),
    ("{conFigure?.name || '反方'}",
     "{conFigure?.name || t('crossDebate.con_side')}"),
    ('<div className="text-2xl text-ink-400 font-bold">战</div>',
     "<div className=\"text-2xl text-ink-400 font-bold\">{t('crossDebate.vs_label')}</div>"),
    ("— 第 {r.round} 轮 —",
     "{t('crossDebate.round_label', { n: r.round })}"),
    ("赞 有道理 ({proVotes})",
     "{t('crossDebate.vote_pro', { n: proVotes })}"),
    ("赞 有道理 ({conVotes})",
     "{t('crossDebate.vote_con', { n: conVotes })}"),
    ('<div className="inline-block animate-pulse text-2xl">辩</div>',
     "<div className=\"inline-block animate-pulse text-2xl\">{t('crossDebate.thinking_icon')}</div>"),
    ('<div className="text-sm text-ink-500 mt-1">辩手正在思考…</div>',
     "<div className=\"text-sm text-ink-500 mt-1\">{t('crossDebate.thinking')}</div>"),
    ('<h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">向辩手提问</h4>',
     "<h4 className=\"text-sm font-bold text-ink-700 dark:text-ink-300 mb-2\">{t('crossDebate.ask_title')}</h4>"),
    ('placeholder="你想问什么？两位辩手都会回答…"',
     "placeholder={t('crossDebate.ask_placeholder')}"),
    ("                  提问\n                  </button>",
     "                  {t('crossDebate.ask_btn')}\n                  </button>"),
    ("{rounds.length >= 3 ? '出结论' : `第 ${rounds.length + 1} 轮 →`}",
     "{rounds.length >= 3 ? t('crossDebate.conclude_btn') : t('crossDebate.next_round_btn', { n: rounds.length + 1 })}"),
    ("                  返回选择\n                </button>",
     "                  {t('crossDebate.back_to_select')}\n                </button>"),
    ("                观众投票结果\n              </h3>",
     "                {t('crossDebate.vote_result_title')}\n              </h3>"),
    ('<div className="text-4xl text-ink-300">辩</div>',
     "<div className=\"text-4xl text-ink-300\">{t('crossDebate.thinking_icon')}</div>"),
    ("                史官评语\n                </h3>",
     "                {t('crossDebate.conclusion_title')}\n                </h3>"),
    ("                学术观点\n              </h3>",
     "                {t('crossDebate.expert_view_title')}\n              </h3>"),
    ("                选择新话题\n              </button>",
     "                {t('crossDebate.select_new_topic')}\n              </button>"),
    ("                返回首页\n              </Link>",
     "                {t('common.back_home')}\n              </Link>"),
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
