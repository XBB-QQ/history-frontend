# -*- coding: utf-8 -*-
import io

path = r"d:/claudeCode/history-frontend/src/pages/TimeCapsulePage.tsx"
with io.open(path, "r", encoding="utf-8") as f:
    c = f.read()

replacements = [
    ("} from '@/features/timeCapsule';",
     "} from '@/features/timeCapsule';\nimport { useT } from '@/i18n/i18n';"),
    ("  const [error, setError] = useState('');\n",
     "  const [error, setError] = useState('');\n  const t = useT();\n"),
    ('title="历史时间胶囊"\n            description="给未来的自己写一封信，由历史人物保管"',
     "title={t('timeCapsule.title')}\n            description={t('timeCapsule.description')}"),
    ("              我的胶囊\n            </button>",
     "              {t('timeCapsule.tab_list')}\n            </button>"),
    ("              写一封信\n            </button>",
     "              {t('timeCapsule.tab_create')}\n            </button>"),
    ("                  选择守护史官\n                </label>",
     "                  {t('timeCapsule.guard_select_label')}\n                </label>"),
    ("                  {FIGURES.find(f => f.id === guardFigureId)?.name} 将为你保管这封信，开启时会为你解读\n                </p>",
     "                  {t('timeCapsule.guard_hint', { name: FIGURES.find(f => f.id === guardFigureId)?.name })}\n                </p>"),
    ("                  信件标题\n                </label>",
     "                  {t('timeCapsule.title_label')}\n                </label>"),
    ('placeholder="给未来的自己..."',
     "placeholder={t('timeCapsule.title_placeholder')}"),
    ("                  信件内容\n                </label>",
     "                  {t('timeCapsule.content_label')}\n                </label>"),
    ('placeholder="写下你想对未来的自己说的话..."',
     "placeholder={t('timeCapsule.content_placeholder')}"),
    ("                  开启日期\n                </label>",
     "                  {t('timeCapsule.open_date_label')}\n                </label>"),
    ("                  选择一个未来的日期，届时你的守护史官会提醒你开启\n                </p>",
     "                  {t('timeCapsule.open_date_hint')}\n                </p>"),
    ("setError('请填写标题和内容');",
     "setError(t('timeCapsule.error_title_content'));"),
    ("setError('请选择开启日期');",
     "setError(t('timeCapsule.error_open_date'));"),
    ("                  取消\n                </button>",
     "                  {t('timeCapsule.cancel_btn')}\n                </button>"),
    ("                  封存信件\n                </button>",
     "                  {t('timeCapsule.seal_btn')}\n                </button>"),
    ("                    待开启的胶囊 ({readyCapsules.length})\n                  </h3>",
     "                    {t('timeCapsule.ready_title', { n: readyCapsules.length })}\n                  </h3>"),
    ("<span className=\"text-xs text-ink-500 dark:text-ink-400\">守护中</span>",
     "<span className=\"text-xs text-ink-500 dark:text-ink-400\">{t('timeCapsule.guarding')}</span>"),
    ("{openingId === capsule.id ? '开启中…' : '开启'}",
     "{openingId === capsule.id ? t('timeCapsule.opening') : t('timeCapsule.open_btn')}"),
    ("                          封存于 {new Date(capsule.createdAt).toLocaleDateString('zh-CN')}\n                        </div>",
     "                          {t('timeCapsule.sealed_at', { date: new Date(capsule.createdAt).toLocaleDateString('zh-CN') })}\n                        </div>"),
    ("                    已开启的胶囊 ({openedCapsules.length})\n                  </h3>",
     "                    {t('timeCapsule.opened_title', { n: openedCapsules.length })}\n                  </h3>"),
    ("<span className=\"text-xs text-green-600 dark:text-green-400\">已开启</span>",
     "<span className=\"text-xs text-green-600 dark:text-green-400\">{t('timeCapsule.opened_status')}</span>"),
    ("<span className=\"text-xs font-bold text-accent\">{capsule.guardFigureName} 的解读</span>",
     "<span className=\"text-xs font-bold text-accent\">{t('timeCapsule.interpretation_title', { name: capsule.guardFigureName })}</span>"),
    ("<span>封存：{new Date(capsule.createdAt).toLocaleDateString('zh-CN')}</span>",
     "<span>{t('timeCapsule.sealed_label', { date: new Date(capsule.createdAt).toLocaleDateString('zh-CN') })}</span>"),
    ("<span>开启：{new Date(capsule.openedAt || 0).toLocaleDateString('zh-CN')}</span>",
     "<span>{t('timeCapsule.opened_label', { date: new Date(capsule.openedAt || 0).toLocaleDateString('zh-CN') })}</span>"),
    ("                    待开启的胶囊 ({pendingCapsules.length})\n                  </h3>",
     "                    {t('timeCapsule.pending_title', { n: pendingCapsules.length })}\n                  </h3>"),
    ("                            开启日期：{capsule.openDate} ({getDaysRemaining(capsule.openDate)})\n                          </div>",
     "                            {t('timeCapsule.open_date_label_with_days', { date: capsule.openDate, days: getDaysRemaining(capsule.openDate) })}\n                          </div>"),
    ("                          删除\n                        </button>",
     "                          {t('timeCapsule.delete_btn')}\n                        </button>"),
    ("    if (confirm('确定要删除这个时间胶囊吗？')) {",
     "    if (confirm(t('timeCapsule.delete_confirm'))) {"),
    ("                    暂无时间胶囊\n                  </h3>",
     "                    {t('timeCapsule.empty_title')}\n                  </h3>"),
    ("                    写一封信给未来的自己，由历史人物为你保管\n                  </p>",
     "                    {t('timeCapsule.empty_desc')}\n                  </p>"),
    ("                    写一封信\n                  </button>",
     "                    {t('timeCapsule.tab_create')}\n                  </button>"),
    ('<Link to="/" className="btn-secondary">返回首页</Link>',
     "<Link to=\"/\" className=\"btn-secondary\">{t('common.back_home')}</Link>"),
    # getDaysRemaining function
    ("if (diff < 0) return '已到期';",
     "if (diff < 0) return t('timeCapsule.days_expired');"),
    ("if (diff === 0) return '今天';",
     "if (diff === 0) return t('timeCapsule.days_today');"),
    ("if (diff === 1) return '明天';",
     "if (diff === 1) return t('timeCapsule.days_tomorrow');"),
    ("return `${diff}天后`;",
     "return t('timeCapsule.days_later', { n: diff });"),
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
