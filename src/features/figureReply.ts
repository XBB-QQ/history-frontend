/**
 * 历史人物回复生成器（规则版）
 * 无需 LLM API，基于关键词和模板生成人物风格回复
 * @see history-museum/design/000-future-roadmap.md §方向六 §6.1
 *
 * 后续可替换为真实 LLM 调用：
 *   POST /api/v1/dialog/{figureId} { message }
 *   接入 DeepSeek/通义/OpenAI API，prompt 中注入 figure.bio + speakingStyle
 */

import type { HistoricalFigure } from '@/types/figure';

/** 检测用户消息中包含的关键词 */
function matchKeywords(message: string, keywords: string[]): string[] {
  return keywords.filter((k) => message.includes(k));
}

/** 根据人物和用户消息生成回复 */
export function generateFigureReply(
  figure: HistoricalFigure,
  userMessage: string
): string {
  const msg = userMessage.trim();
  const lowerMsg = msg.toLowerCase();

  // 1. 问候类
  if (/你好|您好|hi|hello|嗨/.test(lowerMsg)) {
    return `${figure.quotes[0]} 吾乃${figure.dynasty}之${figure.name}。${figure.role}是也。汝有何事相问？`;
  }

  // 2. 自我介绍询问
  if (/你是谁|介绍一下|您是|尊姓大名/.test(msg)) {
    return `${figure.bio}\n\n${figure.speakingStyle}如我，${figure.personality}。汝若有意，可与我论${figure.topics.slice(0, 3).join('、')}之事。`;
  }

  // 3. 名言询问
  if (/名言|诗句|代表|作品|名句/.test(msg)) {
    const quoteList = figure.quotes.map((q) => `"${q}"`).join('\n');
    return `吾平生所言，以此为要：\n\n${quoteList}\n\n愿汝细品其中之意。`;
  }

  // 4. 人物专长话题匹配
  const matchedTopics = matchKeywords(msg, figure.topics);
  if (matchedTopics.length > 0) {
    return generateTopicReply(figure, matchedTopics[0], msg);
  }

  // 5. 通用回复（按人物风格）
  return generateGenericReply(figure, msg);
}

/** 话题专属回复 */
function generateTopicReply(
  figure: HistoricalFigure,
  topic: string,
  _userMsg: string
): string {
  // 通用模板，但加入人物特色
  const templates: Record<string, string> = {
    '孔子': `汝问${topic}？善哉斯问。${topic}者，吾儒学之要也。君子务本，本立而道生。愿汝于${topic}之道，身体力行，勿徒言之。`,
    '李白': `哈哈，${topic}！此吾平生所爱也。且饮一杯，听我道来。人生得意须尽欢，莫使金樽空对月。汝若论${topic}，当以诗酒会友，以剑论心！`,
    '诸葛亮': `${topic}者，治国之要务也。吾辅佐先帝与后主，于此多有思虑。${topic}之道，在于审时度势，知人善任，非一日之功。汝若欲知详情，可细问之。`,
    '秦始皇': ` ${topic}！此朕统一天下之要政也。朕废分封、立郡县、统一文字度量衡，皆为万世基业。后世或毁或誉，然朕之功业，岂庸人所能懂？`,
    '苏轼': `${topic}？哈哈，吾被贬黄州惠州儋州，唯${topic}相伴而不弃。人生如逆旅，我亦是行人。汝亦当学我，随遇而安，于${topic}中寻乐。`,
    '岳飞': `${topic}！吾平生所愿，唯"还我河山"四字。${topic}之事，当以忠义为本。汝若问${topic}，且听我一言：文臣不爱钱，武臣不惜死，天下太平矣！`,
  };

  return templates[figure.name] || `关于${topic}，吾思之已久。汝之问题，值得深思。`;
}

/** 通用回复（兜底） */
function generateGenericReply(figure: HistoricalFigure, _userMsg: string): string {
  const genericReplies: Record<string, string[]> = {
    '孔子': [
      '善哉斯言。吾闻之：知之为知之，不知为不知，是知也。汝当深思。',
      '此问甚妙。吾尝曰：学而不思则罔，思而不学则殆。汝可细味之。',
      '吾之所答，未必尽善。然三人行必有我师，汝当自择其善而从之。',
    ],
    '李白': [
      '哈哈，此言有趣！且共饮一杯，再论此事。人生得意须尽欢！',
      '汝之言，令吾诗兴大发。然酒酣耳热之际，方得佳句。改日再叙！',
      '此事吾不曾深思。吾辈诗人，但求诗酒风流，何管许多俗事？',
    ],
    '诸葛亮': [
      '此事需深思。兵法云：知己知彼，百战不殆。汝当审慎。',
      '吾辅佐先帝多年，深知事必躬亲之理。此事亦当如此。',
      '汝之所问，吾当细思。然此时北伐事繁，未能详述，他日再议。',
    ],
    '秦始皇': [
      '朕统一六国，岂是汝等所能揣度？此事朕自有决断。',
      '朕之功过，后人自会评说。然朕所立之法，万世不易。',
      '此事朕已诏令天下。违令者，族之！',
    ],
    '苏轼': [
      '哈哈，汝之问，令吾莞尔。人生如梦，一尊还酹江月。',
      '此事吾在黄州时也曾思量。随遇而安吧，朋友。',
      '汝若来黄州，吾请你吃东坡肉，再论此事不迟。',
    ],
    '岳飞': [
      '此事关乎社稷，不可不慎。吾辈武人，当以保家卫国为念。',
      '汝之所问，吾深有同感。然精忠报国，吾之志也，何惧生死？',
      '待我收复中原，再与汝细论此事。暂且忍耐！',
    ],
  };

  const replies = genericReplies[figure.name] || [
    `吾乃${figure.name}，汝之所问，吾当思之。`,
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

/** 生成欢迎语 */
export function generateGreeting(figure: HistoricalFigure): string {
  return `${figure.quotes[0]}\n\n吾乃${figure.dynasty}之${figure.name}，${figure.role}是也。汝有何事相问？可论${figure.topics.slice(0, 3).join('、')}等事。`;
}
