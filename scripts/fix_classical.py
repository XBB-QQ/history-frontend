# -*- coding: utf-8 -*-
import io

path = r"d:/claudeCode/history-frontend/src/pages/ClassicalAnnotationPage.tsx"
with io.open(path, "r", encoding="utf-8") as f:
    c = f.read()

replacements = [
    ("import { callLLM, type LLMMessage } from '@/utils/llmClient';",
     "import { callLLM, type LLMMessage } from '@/utils/llmClient';\nimport { useT } from '@/i18n/i18n';"),
    ("  const [hoverWord, setHoverWord] = useState<DictEntry | null>(null);\n",
     "  const [hoverWord, setHoverWord] = useState<DictEntry | null>(null);\n  const t = useT();\n"),
    ('title="古文注解"\n            description="古文逐字注解"',
     "title={t('classicalAnnotation.title')}\n            description={t('classicalAnnotation.description')}"),
    ("                典 词典检索\n              </button>",
     "                {t('classicalAnnotation.mode_dict')}\n              </button>"),
    ("                机 AI 注解\n              </button>",
     "                {t('classicalAnnotation.mode_llm')}\n              </button>"),
    ('placeholder="输入古文… 例如：朕为始皇帝，后世以计数，二世三世至于万世，传之无穷"',
     "placeholder={t('classicalAnnotation.input_placeholder')}"),
    ("                  查 检测到古汉语词汇（悬浮查看）：\n                </div>",
     "                  {t('classicalAnnotation.detected_title')}\n                </div>"),
    ("<div>古义：{hoverWord.classicalMeaning}</div>",
     "<div>{t('classicalAnnotation.classical_meaning')}{hoverWord.classicalMeaning}</div>"),
    ("<div>今义：{hoverWord.modernEquivalent}</div>",
     "<div>{t('classicalAnnotation.modern_meaning')}{hoverWord.modernEquivalent}</div>"),
    ('{hoverWord.example && <div className="text-ink-400 mt-1">例：{hoverWord.example}（{hoverWord.source}）</div>}',
     "{hoverWord.example && <div className=\"text-ink-400 mt-1\">{t('classicalAnnotation.example_prefix')}{hoverWord.example}（{hoverWord.source}）</div>}"),
    ('{hoverWord.allusion && <div className="text-amber-600 dark:text-amber-400 mt-1">典故：{hoverWord.allusion}</div>}',
     "{hoverWord.allusion && <div className=\"text-amber-600 dark:text-amber-400 mt-1\">{t('classicalAnnotation.allusion_prefix')}{hoverWord.allusion}</div>}"),
    ("                  典 查词典\n                </button>",
     "                  {t('classicalAnnotation.search_dict_btn')}\n                </button>"),
    ("{loading ? '注解中…' : '机 AI 注解'}",
     "{loading ? t('classicalAnnotation.annotating') : t('classicalAnnotation.annotate_btn')}"),
    ("                示例1：秦始皇\n              </button>",
     "                {t('classicalAnnotation.example_1')}\n              </button>"),
    ("                示例2：诸葛亮\n              </button>",
     "                {t('classicalAnnotation.example_2')}\n              </button>"),
    ('<span className="text-sm text-ink-500">古义：{e.classicalMeaning}</span>',
     "<span className=\"text-sm text-ink-500\">{t('classicalAnnotation.classical_meaning')}{e.classicalMeaning}</span>"),
    ('<span className="text-sm text-green-600 dark:text-green-400">今义：{e.modernEquivalent}</span>',
     "<span className=\"text-sm text-green-600 dark:text-green-400\">{t('classicalAnnotation.modern_meaning')}{e.modernEquivalent}</span>"),
    ("例：{e.example}（{e.source}）",
     "{t('classicalAnnotation.example_prefix')}{e.example}（{e.source}）"),
    ("                      典 {e.allusion}\n                    </div>",
     "                      {t('classicalAnnotation.allusion_label')} {e.allusion}\n                    </div>"),
    ('<span className="text-accent text-lg">机</span>',
     "<span className=\"text-accent text-lg\">{t('classicalAnnotation.machine_icon')}</span>"),
    ('<span className="font-bold text-ink-900 dark:text-ink-100">AI 古文注解</span>',
     "<span className=\"font-bold text-ink-900 dark:text-ink-100\">{t('classicalAnnotation.llm_result_title')}</span>"),
    ('<span className="text-xs text-ink-400">基于 GLM-4-Flash</span>',
     "<span className=\"text-xs text-ink-400\">{t('classicalAnnotation.llm_result_subtitle')}</span>"),
    ("              览 古汉语词典速览\n            </h3>",
     "              {t('classicalAnnotation.dict_browse_title')}\n            </h3>"),
    ('<Link to="/" className="btn-secondary">返回首页</Link>',
     "<Link to=\"/\" className=\"btn-secondary\">{t('common.back_home')}</Link>"),
    ("setLlmAnnotation('注解生成失败：' + (e instanceof Error ? e.message : '未知错误'));",
     "setLlmAnnotation(t('classicalAnnotation.annotate_failed_prefix') + (e instanceof Error ? e.message : t('classicalAnnotation.unknown_error')));"),
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
