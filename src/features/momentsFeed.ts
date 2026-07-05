/**
 * 历史人物朋友圈 — 基于历史事件生成人物朋友圈动态+互评
 * 优化：添加缓存 + 预设数据，避免重复调用 API
 */

import { callLLM, type LLMMessage } from '@/utils/llmClient';
import type { HistoricalFigure } from '@/types/figure';
import { FIGURES } from '@/data/scenarios/figures';

const LIKED_KEY = 'moments-liked';
const COMMENTS_KEY = 'moments-comments';
const CACHE_KEY = 'moments-cache';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;

export interface MomentComment {
  id: string;
  author: string;
  emoji: string;
  content: string;
  isUser: boolean;
  replyTo?: string;
  createdAt?: number;
}

export interface MomentPost {
  id: string;
  author: string;
  emoji: string;
  dynasty: string;
  content: string;
  likes: number;
  hasLiked: boolean;
  comments: MomentComment[];
}

export interface MomentFeed {
  sceneId: string;
  sceneName: string;
  year: string;
  posts: MomentPost[];
}

export interface Scene {
  id: string;
  name: string;
  year: string;
  description: string;
  participants: string[];
}

export const SCENES: Scene[] = [
  { id: 'anshi', name: '安史之乱爆发', year: '755 年', description: '安禄山起兵反唐，盛世骤然崩塌', participants: ['李白', '杜甫', '白居易', '唐玄宗', '安禄山'] },
  { id: 'chibi', name: '赤壁之战', year: '208 年', description: '孙刘联军火攻曹军，三国鼎立之势成', participants: ['诸葛亮', '曹操', '周瑜', '刘备', '孙权'] },
  { id: 'tongyi', name: '秦始皇统一六国', year: '前 221 年', description: '秦王政完成统一大业，建立中国第一个帝国', participants: ['秦始皇', '李斯', '扶苏', '赵高'] },
  { id: 'bianfa', name: '王安石变法', year: '1069 年', description: '宋神宗启用王安石推行新法，新旧党争激烈', participants: ['王安石', '司马光', '苏轼', '宋神宗'] },
  { id: 'jingkang', name: '靖康之变', year: '1127 年', description: '金兵攻破汴京，徽钦二宗被掳，北宋灭亡', participants: ['宋徽宗', '李纲', '岳飞', '秦桧'] },
  { id: 'yazhou', name: '崖山海战', year: '1279 年', description: '宋元最后一战，南宋灭亡，元朝统一天下', participants: ['陆秀夫', '张世杰', '忽必烈', '文天祥'] },
];

/** 预设数据（当没有 API Key 或缓存时使用） */
export const PRESET_DATA: Record<string, MomentFeed> = {
  anshi: {
    sceneId: 'anshi',
    sceneName: '安史之乱爆发',
    year: '755 年',
    posts: [
      {
        id: 'anshi_0',
        author: '李白',
        emoji: '🍷',
        dynasty: '唐',
        content: '烽火连三月，家书抵万金。长安乱矣，吾欲仗剑西行，寻一片净土。诸位珍重！',
        likes: 2333,
        hasLiked: false,
        comments: [
          { id: 'c1', author: '杜甫', emoji: '📜', content: '白兄珍重！待战乱平定，共饮美酒！', isUser: false },
          { id: 'c2', author: '唐玄宗', emoji: '👑', content: '朕之错也，愧对天下苍生...', isUser: false },
        ],
      },
      {
        id: 'anshi_1',
        author: '杜甫',
        emoji: '📝',
        dynasty: '唐',
        content: '国破山河在，城春草木深。感时花溅泪，恨别鸟惊心。此恨绵绵无绝期！',
        likes: 1999,
        hasLiked: false,
        comments: [
          { id: 'c3', author: '李白', emoji: '🍷', content: '子美兄诗以言志，感人肺腑！', isUser: false },
          { id: 'c4', author: '白居易', emoji: '🎭', content: '前辈之忧，后辈之鉴！', isUser: false },
        ],
      },
      {
        id: 'anshi_2',
        author: '安禄山',
        emoji: '⚔️',
        dynasty: '唐',
        content: '今日起兵，清君侧，诛杨国忠！天下本应是强者之天下！',
        likes: 520,
        hasLiked: false,
        comments: [
          { id: 'c5', author: '唐玄宗', emoji: '👑', content: '逆贼！朕定将你碎尸万段！', isUser: false },
          { id: 'c6', author: '杜甫', emoji: '📝', content: '乱臣贼子，不得好死！', isUser: false },
        ],
      },
    ],
  },
  chibi: {
    sceneId: 'chibi',
    sceneName: '赤壁之战',
    year: '208 年',
    posts: [
      {
        id: 'chibi_0',
        author: '诸葛亮',
        emoji: '🪭',
        dynasty: '三国',
        content: '东风不与周郎便，铜雀春深锁二乔。今日借东风，破曹军百万！',
        likes: 6666,
        hasLiked: false,
        comments: [
          { id: 'c7', author: '周瑜', emoji: '🔥', content: '孔明兄真乃神人也！', isUser: false },
          { id: 'c8', author: '刘备', emoji: '👑', content: '军师妙计，吾等佩服！', isUser: false },
        ],
      },
      {
        id: 'chibi_1',
        author: '曹操',
        emoji: '🐯',
        dynasty: '三国',
        content: '区区孙刘，安敢与我百万雄师抗衡？待吾破阵，踏平江东！',
        likes: 233,
        hasLiked: false,
        comments: [
          { id: 'c9', author: '周瑜', emoji: '🔥', content: '曹贼休狂！今日定教你葬身火海！', isUser: false },
          { id: 'c10', author: '诸葛亮', emoji: '🪭', content: '孟德公，小心东风！', isUser: false },
        ],
      },
      {
        id: 'chibi_2',
        author: '周瑜',
        emoji: '🔥',
        dynasty: '三国',
        content: '万事俱备，只欠东风！今日火攻，让曹军尝尝烈焰焚身之苦！',
        likes: 4444,
        hasLiked: false,
        comments: [
          { id: 'c11', author: '诸葛亮', emoji: '🪭', content: '公瑾兄运筹帷幄，令人叹服！', isUser: false },
          { id: 'c12', author: '孙权', emoji: '⚔️', content: '周郎威武！', isUser: false },
        ],
      },
    ],
  },
  tongyi: {
    sceneId: 'tongyi',
    sceneName: '秦始皇统一六国',
    year: '前 221 年',
    posts: [
      {
        id: 'tongyi_0',
        author: '秦始皇',
        emoji: '👑',
        dynasty: '秦',
        content: '六王毕，四海一！朕统一天下，建立大秦帝国！后世千秋万代，皆以朕为始！',
        likes: 9999,
        hasLiked: false,
        comments: [
          { id: 'c13', author: '李斯', emoji: '📜', content: '陛下英明！千古一帝！', isUser: false },
          { id: 'c14', author: '扶苏', emoji: '🤴', content: '父皇万岁！', isUser: false },
        ],
      },
      {
        id: 'tongyi_1',
        author: '李斯',
        emoji: '📜',
        dynasty: '秦',
        content: '废分封，行郡县；书同文，车同轨。天下大一统，万世之基也！',
        likes: 666,
        hasLiked: false,
        comments: [
          { id: 'c15', author: '秦始皇', emoji: '👑', content: '李丞相功不可没！', isUser: false },
          { id: 'c16', author: '赵高', emoji: '🐍', content: '丞相所言极是！', isUser: false },
        ],
      },
    ],
  },
  bianfa: {
    sceneId: 'bianfa',
    sceneName: '王安石变法',
    year: '1069 年',
    posts: [
      {
        id: 'bianfa_0',
        author: '王安石',
        emoji: '📋',
        dynasty: '宋',
        content: '天变不足畏，祖宗不足法，人言不足恤！新法推行，富国强兵指日可待！',
        likes: 888,
        hasLiked: false,
        comments: [
          { id: 'c17', author: '宋神宗', emoji: '👑', content: '王相公大胆去做，朕支持你！', isUser: false },
          { id: 'c18', author: '司马光', emoji: '📜', content: '祖宗之法不可变！安石误国！', isUser: false },
        ],
      },
      {
        id: 'bianfa_1',
        author: '司马光',
        emoji: '📜',
        dynasty: '宋',
        content: '新法扰民，国库空虚，百姓困苦！恳请陛下废新法，复旧制！',
        likes: 777,
        hasLiked: false,
        comments: [
          { id: 'c19', author: '王安石', emoji: '📋', content: '君实兄守旧，不识时务！', isUser: false },
          { id: 'c20', author: '苏轼', emoji: '🍷', content: '两位前辈各有道理，可否折中？', isUser: false },
        ],
      },
      {
        id: 'bianfa_2',
        author: '苏轼',
        emoji: '🍷',
        dynasty: '宋',
        content: '横看成岭侧成峰，远近高低各不同。变法之事，需三思而后行啊！',
        likes: 1314,
        hasLiked: false,
        comments: [
          { id: 'c21', author: '王安石', emoji: '📋', content: '子瞻文采斐然，然于治国之道尚浅！', isUser: false },
          { id: 'c22', author: '司马光', emoji: '📜', content: '子瞻所言极是！', isUser: false },
        ],
      },
    ],
  },
  jingkang: {
    sceneId: 'jingkang',
    sceneName: '靖康之变',
    year: '1127 年',
    posts: [
      {
        id: 'jingkang_0',
        author: '宋徽宗',
        emoji: '🎨',
        dynasty: '宋',
        content: '朕误国矣！书画误我，享乐误我！悔不该听信奸臣，荒废朝政...',
        likes: 3,
        hasLiked: false,
        comments: [
          { id: 'c23', author: '李纲', emoji: '🛡️', content: '陛下！臣愿死守汴京！', isUser: false },
          { id: 'c24', author: '岳飞', emoji: '⚔️', content: '靖康耻，犹未雪！臣子恨，何时灭！', isUser: false },
        ],
      },
      {
        id: 'jingkang_1',
        author: '岳飞',
        emoji: '⚔️',
        dynasty: '宋',
        content: '怒发冲冠，凭栏处、潇潇雨歇。抬望眼、仰天长啸，壮怀激烈！誓要收复失地！',
        likes: 8888,
        hasLiked: false,
        comments: [
          { id: 'c25', author: '李纲', emoji: '🛡️', content: '岳将军壮志凌云！', isUser: false },
          { id: 'c26', author: '秦桧', emoji: '🐍', content: '将军息怒，和谈为上...', isUser: false },
        ],
      },
    ],
  },
  yazhou: {
    sceneId: 'yazhou',
    sceneName: '崖山海战',
    year: '1279 年',
    posts: [
      {
        id: 'yazhou_0',
        author: '陆秀夫',
        emoji: '🏯',
        dynasty: '宋',
        content: '国破山河在，臣当殉国！抱幼主投海，誓不做亡国奴！',
        likes: 9999,
        hasLiked: false,
        comments: [
          { id: 'c27', author: '张世杰', emoji: '⚓', content: '君实兄忠义千秋！', isUser: false },
          { id: 'c28', author: '文天祥', emoji: '📜', content: '人生自古谁无死，留取丹心照汗青！', isUser: false },
        ],
      },
      {
        id: 'yazhou_1',
        author: '文天祥',
        emoji: '📜',
        dynasty: '宋',
        content: '惶恐滩头说惶恐，零丁洋里叹零丁。人生自古谁无死，留取丹心照汗青！',
        likes: 10000,
        hasLiked: false,
        comments: [
          { id: 'c29', author: '陆秀夫', emoji: '🏯', content: '文山兄气节感人！', isUser: false },
          { id: 'c30', author: '忽必烈', emoji: '👑', content: '文先生真乃忠臣，不如降我大元？', isUser: false },
        ],
      },
      {
        id: 'yazhou_2',
        author: '忽必烈',
        emoji: '👑',
        dynasty: '元',
        content: '南宋已亡，天下一统！朕将开创大元盛世！',
        likes: 5555,
        hasLiked: false,
        comments: [
          { id: 'c31', author: '文天祥', emoji: '📜', content: '胡虏窃国，终将被逐！', isUser: false },
          { id: 'c32', author: '张世杰', emoji: '⚓', content: '宋虽亡，忠义永存！', isUser: false },
        ],
      },
    ],
  },
};

/** 获取缓存 */
function getCache(): Record<string, { data: MomentFeed; timestamp: number }> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** 保存缓存 */
function saveCache(sceneId: string, feed: MomentFeed): void {
  const cache = getCache();
  cache[sceneId] = { data: feed, timestamp: Date.now() };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

// ========== 预设优先 + 后台预热 ==========

/** 后台生成中的场景集合（防重复触发） */
const generatingScenes = new Set<string>();

/** feed 更新订阅者（后台生成完成后通知页面刷新） */
const feedUpdateSubscribers = new Map<string, Set<(feed: MomentFeed) => void>>();

/** 订阅某个场景的 AI 生成完成事件，返回取消订阅函数 */
export function subscribeFeedUpdate(sceneId: string, cb: (feed: MomentFeed) => void): () => void {
  if (!feedUpdateSubscribers.has(sceneId)) {
    feedUpdateSubscribers.set(sceneId, new Set());
  }
  feedUpdateSubscribers.get(sceneId)!.add(cb);
  return () => {
    feedUpdateSubscribers.get(sceneId)?.delete(cb);
  };
}

function notifyFeedUpdate(sceneId: string, feed: MomentFeed): void {
  feedUpdateSubscribers.get(sceneId)?.forEach(cb => cb(feed));
}

/** 后台异步生成并缓存，完成后通知订阅者 */
function triggerBackgroundGeneration(scene: Scene): void {
  if (generatingScenes.has(scene.id)) return;
  generatingScenes.add(scene.id);

  generateMomentFeed(scene)
    .then(feed => {
      saveCache(scene.id, feed);
      notifyFeedUpdate(scene.id, feed);
    })
    .catch(() => {
      // 静默失败，用户看到的仍是预设数据
    })
    .finally(() => {
      generatingScenes.delete(scene.id);
    });
}

export interface MomentFeedResult {
  feed: MomentFeed;
  /** 数据来源：cache=缓存命中，preset=预设数据，fallback=兜底生成 */
  source: 'cache' | 'preset' | 'fallback';
  /** 是否正在后台生成 AI 内容 */
  isAiGenerating: boolean;
}

/**
 * 获取场景的朋友圈数据 — 预设优先，后台预热
 *
 * - 有缓存：立即返回缓存
 * - 无缓存：立即返回预设数据 + 后台异步生成，生成完成后通过 subscribeFeedUpdate 通知
 */
export async function getMomentFeed(scene: Scene): Promise<MomentFeedResult> {
  const cache = getCache();
  const cached = cache[scene.id];

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return { feed: cached.data, source: 'cache', isAiGenerating: false };
  }

  const preset = PRESET_DATA[scene.id];
  if (preset) {
    triggerBackgroundGeneration(scene);
    return { feed: preset, source: 'preset', isAiGenerating: true };
  }

  // 没有预设数据的场景，只能同步等待
  try {
    const feed = await generateMomentFeed(scene);
    saveCache(scene.id, feed);
    return { feed, source: 'cache', isAiGenerating: false };
  } catch {
    return { feed: generateFallbackFeed(scene), source: 'fallback', isAiGenerating: false };
  }
}

/** 同步重新生成（用于"重新生成"按钮，清缓存后强制重新调用 AI） */
export async function regenerateMomentFeed(scene: Scene): Promise<MomentFeed> {
  const feed = await generateMomentFeed(scene);
  saveCache(scene.id, feed);
  return feed;
}

/** 生成场景下的人物朋友圈动态 */
async function generateMomentFeed(scene: Scene): Promise<MomentFeed> {
  const systemPrompt = `根据历史事件，生成当事人物的朋友圈动态。

事件：${scene.name}（${scene.year}）
事件描述：${scene.description}
参与人物：${scene.participants.join('、')}

要求：
1. 为 3-5 个关键人物各生成一条朋友圈动态
2. 每条动态必须符合该人物的性格、说话风格、当时的处境
3. 动态内容用半文言半白话，既古风又可读（不要纯古文，也不要纯现代）
4. 每条动态要有 2-4 条其他人物的评论（互怼、感叹、安慰等）
5. 评论要体现人物关系（敌对/同盟/师徒/君臣）
6. 点赞数编一个有戏剧性的数字（如 2333、666、520）
7. 可以适度幽默，但要尊重历史事实

输出严格 JSON 格式：
{
  "posts": [
    {
      "author": "人物名",
      "emoji": "代表emoji",
      "dynasty": "朝代",
      "content": "朋友圈正文（不超过100字）",
      "likes": 数字,
      "comments": [
        {"author": "评论者", "emoji": "emoji", "content": "评论内容（30字以内）"}
      ]
    }
  ]
}

只输出 JSON，不要其他文字。`;

  const messages: LLMMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `请生成「${scene.name}」时的人物朋友圈动态。` },
  ];

  const raw = await callLLM(messages, { maxTokens: 2048, temperature: 0.95 });

  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      const posts: MomentPost[] = (parsed.posts || []).map((p: any, idx: number) => ({
        id: `${scene.id}_${idx}`,
        author: String(p.author || ''),
        emoji: String(p.emoji || '👤'),
        dynasty: String(p.dynasty || ''),
        content: String(p.content || ''),
        likes: Number(p.likes) || 0,
        hasLiked: false,
        comments: Array.isArray(p.comments)
          ? p.comments.map((c: any) => ({
              id: `comment_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
              author: String(c.author || ''),
              emoji: String(c.emoji || '👤'),
              content: String(c.content || ''),
              isUser: false,
            }))
          : [],
      }));
      return { sceneId: scene.id, sceneName: scene.name, year: scene.year, posts };
    }
  } catch {
    // JSON 解析失败
  }

  throw new Error('AI 输出格式异常');
}

/** 生成兜底数据 */
function generateFallbackFeed(scene: Scene): MomentFeed {
  const posts: MomentPost[] = scene.participants.slice(0, 3).map((name, idx) => ({
    id: `${scene.id}_${idx}`,
    author: name,
    emoji: '👤',
    dynasty: scene.year,
    content: `值此${scene.name}之际，感慨万千。天下大势，分久必合，合久必分。愿国泰民安，百姓乐业。`,
    likes: 666,
    hasLiked: false,
    comments: [],
  }));
  return { sceneId: scene.id, sceneName: scene.name, year: scene.year, posts };
}

/** 清除缓存 */
export function clearMomentCache(): void {
  localStorage.removeItem(CACHE_KEY);
}

// ========== 用户互动功能 ==========

function getLikedPostIds(): Set<string> {
  try {
    const raw = localStorage.getItem(LIKED_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveLikedPostIds(ids: Set<string>): void {
  localStorage.setItem(LIKED_KEY, JSON.stringify([...ids]));
}

export function toggleLike(postId: string): { hasLiked: boolean; likes: number } {
  const liked = getLikedPostIds();
  if (liked.has(postId)) {
    liked.delete(postId);
    saveLikedPostIds(liked);
    return { hasLiked: false, likes: -1 };
  }
  liked.add(postId);
  saveLikedPostIds(liked);
  return { hasLiked: true, likes: 1 };
}

export function getLikeStatus(postId: string): boolean {
  return getLikedPostIds().has(postId);
}

export function addUserComment(postId: string, content: string): MomentComment {
  const comment: MomentComment = {
    id: `user_comment_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    author: '访客',
    emoji: '👤',
    content,
    isUser: true,
    createdAt: Date.now(),
  };
  const comments = getUserComments(postId);
  comments.push(comment);
  saveUserComments(postId, comments);
  return comment;
}

function getUserComments(postId: string): MomentComment[] {
  try {
    const raw = localStorage.getItem(COMMENTS_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return data[postId] || [];
  } catch {
    return [];
  }
}

function saveUserComments(postId: string, comments: MomentComment[]): void {
  try {
    const raw = localStorage.getItem(COMMENTS_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data[postId] = comments;
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(data));
  } catch {
    // 忽略保存失败
  }
}

export async function replyToUserComment(post: MomentPost, userComment: MomentComment): Promise<MomentComment> {
  const figure = FIGURES.find(f => f.name === post.author);
  const figureInfo = figure
    ? `\n人物资料：${figure.bio}\n说话风格：${figure.speakingStyle}\n性格：${figure.personality}\n名言：${figure.quotes.join('、')}`
    : '';

  const systemPrompt = `你是历史人物 ${post.author}（${post.dynasty}）。${figureInfo}

现在有一位访客在你的朋友圈下留了言："${userComment.content}"

请你以 ${post.author} 的身份回复这位访客。

要求：
1. 严格保持 ${post.author} 的说话风格和性格
2. 回复要简短（50-80字），像在朋友圈评论一样自然
3. 可以幽默、可以严肃、可以互怼，符合人物性格
4. 不要说"作为AI"之类的自我指涉`;

  const messages: LLMMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: '请回复这条评论。' },
  ];

  const content = await callLLM(messages, { maxTokens: 200, temperature: 0.9 });

  const reply: MomentComment = {
    id: `ai_reply_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    author: post.author,
    emoji: post.emoji,
    content: content.trim(),
    isUser: false,
    replyTo: userComment.id,
    createdAt: Date.now(),
  };

  const comments = getUserComments(post.id);
  comments.push(reply);
  saveUserComments(post.id, comments);

  return reply;
}

export function getAllComments(postId: string): MomentComment[] {
  return getUserComments(postId);
}
