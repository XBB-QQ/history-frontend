/**
 * 历史基因检测 — LLM 深度报告生成
 * 基于用户画像，调用 LLM 生成具传播性的"基因检测报告"
 */

import { callLLMStream, readStreamToString, type LLMMessage } from '@/utils/llmClient';
import type { ProfileReport } from '@/features/profileReport';
import type { PersonalityMatch, DimensionKey } from '@/data/core/personalityMatches';
import { DIMENSION_LABELS } from '@/data/core/personalityMatches';

export interface GeneReportInput {
  profile: ProfileReport;
  matched: PersonalityMatch;
  username: string;
  favoritesCount: number;
}

/** 流式生成基因检测报告
 * @param onChunk 每收到一段文本就回调
 * @returns 完整报告文本
 */
export async function generateGeneReportStream(
  input: GeneReportInput,
  onChunk?: (chunk: string) => void,
): Promise<string> {
  const { profile, matched, username, favoritesCount } = input;

  const dimensionDesc = profile.dimensions
    .map((d) => `${DIMENSION_LABELS[d.key]} ${d.normalized}/100`)
    .join('、');

  const portraitText = [
    `访客名号：${username}`,
    `史官等级：${profile.level}`,
    `综合评分：${profile.totalScore}`,
    `四维基因：${dimensionDesc}`,
    `主导基因：${DIMENSION_LABELS[profile.dominantDimension as DimensionKey]}`,
    `历史足迹：${profile.matchCount} 条（收藏 ${favoritesCount} 项）`,
    `DNA 相似历史人物：${matched.name}（${matched.dynasty} · ${matched.role}）`,
    `人物名言：${matched.quote}`,
  ].join('\n');

  const messages: LLMMessage[] = [
    {
      role: 'system',
      content: `你是"五千年史馆"的历史基因检测官，负责将访客的浏览行为解读为一份"历史基因检测报告"。

要求：
1. 整体风格：伪科学感+趣味化，类似基因检测报告但内容是历史解读
2. 输出纯文本，不要使用任何 Markdown 语法（不要 ##、**、\`\`\` 等），不要使用 emoji
3. 用空行分隔章节，每个章节标题用【】标注，包含以下章节：

   【历史基因图谱】
   解读四维基因（文治/武功/智略/博学），用拟人化比喻说明每个维度的"基因特性"

   【DNA 相似度分析】
   深度解析为什么用户像 ${matched.name}——不只是表面相似，而是从"性格基因""价值观基因""命运基因"三层分析
   相似度百分比（编一个有趣的数字，如 87.3%）

   【跨朝代品味雷达】
   基于用户偏好推断 ta 潜意识的朝代偏好，分析这种偏好的心理暗示

   【历史命运预言】
   如果用户穿越到古代，ta 最可能成为什么角色？会经历什么命运？

4. 全文 600-900 字，每个章节都要有金句可截图传播
5. 可以适度引用古文增添韵味，但主体是现代白话
6. 不要写"作为AI"之类的自我指涉`,
    },
    {
      role: 'user',
      content: `请为以下访客生成历史基因检测报告：\n\n${portraitText}`,
    },
  ];

  const stream = await callLLMStream(messages, {
    maxTokens: 2048,
    temperature: 0.9,
  });

  return readStreamToString(stream, onChunk);
}
