/**
 * 历史人物朋友圈页面 — 支持点赞和评论互动
 */

import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  getMomentFeed,
  SCENES,
  PRESET_DATA,
  toggleLike,
  addUserComment,
  replyToUserComment,
  getAllComments,
  clearMomentCache,
  type Scene,
  type MomentFeed,
  type MomentPost,
  type MomentComment,
} from '@/features/momentsFeed';
import { hasApiKey } from '@/utils/llmConfig';

export default function MomentsPage() {
  const [activeScene, setActiveScene] = useState<Scene | null>(null);
  const [feed, setFeed] = useState<MomentFeed | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [replyingPostId, setReplyingPostId] = useState<string | null>(null);

  const handleSelectScene = useCallback((scene: Scene) => {
    if (loading) return;
    setActiveScene(scene);
    setError('');

    const preset = PRESET_DATA[scene.id];

    if (preset) {
      setFeed(preset);
    }

    if (!hasApiKey()) {
      return;
    }

    setLoading(true);
    getMomentFeed(scene)
      .then((result) => setFeed(result))
      .catch((e) => {
        if (!preset) {
          setError(e instanceof Error ? e.message : '生成失败');
        }
      })
      .finally(() => setLoading(false));
  }, [loading]);

  const handleLike = useCallback((post: MomentPost) => {
    const result = toggleLike(post.id);
    setFeed((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        posts: prev.posts.map((p) =>
          p.id === post.id ? { ...p, hasLiked: result.hasLiked, likes: p.likes + result.likes } : p,
        ),
      };
    });
  }, []);

  const handleCommentSubmit = useCallback(async (post: MomentPost) => {
    const content = commentInputs[post.id];
    if (!content?.trim()) return;

    const userComment = addUserComment(post.id, content.trim());
    setCommentInputs((prev) => ({ ...prev, [post.id]: '' }));
    setReplyingPostId(null);

    setFeed((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        posts: prev.posts.map((p) =>
          p.id === post.id ? { ...p, comments: [...p.comments, userComment] } : p,
        ),
      };
    });

    try {
      const reply = await replyToUserComment(post, userComment);
      setFeed((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          posts: prev.posts.map((p) =>
            p.id === post.id ? { ...p, comments: [...p.comments, reply] } : p,
          ),
        };
      });
    } catch {
      // AI 回复失败不影响用户评论
    }
  }, [commentInputs]);

  const handleInputChange = useCallback((postId: string, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  }, []);

  const apiReady = hasApiKey();

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="MOMENTS FEED"
            title="历史人物朋友圈"
            description="看看历史大事件发生时，当事人们的朋友圈 · 你也可以点赞和评论"
          />
        </RevealOnScroll>

        {!apiReady && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm">
              ⚙️ 需先配置 LLM API Key — 点击页面右上角"⚙️ 配置"按钮
            </div>
          </RevealOnScroll>
        )}

        {/* 场景选择 */}
        <RevealOnScroll direction="up" delay={200}>
          <div className="mt-8 p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
            <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
              ⏳ 选择历史时刻
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SCENES.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => handleSelectScene(scene)}
                  disabled={loading}
                  className={`p-4 rounded-lg text-left transition-all border ${
                    activeScene?.id === scene.id
                      ? 'bg-accent/10 border-accent shadow-md'
                      : 'bg-ink-50/50 dark:bg-ink-800/50 border-ink-200 dark:border-ink-700 hover:border-accent/50'
                  } disabled:opacity-50`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-ink-900 dark:text-ink-100">
                      {scene.name}
                    </span>
                    <span className="text-xs text-accent">{scene.year}</span>
                  </div>
                  <p className="text-xs text-ink-500 dark:text-ink-400">
                    {scene.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {scene.participants.slice(0, 4).map((p) => (
                      <span
                        key={p}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-400"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* 加载中 */}
        {loading && !feed && (
          <RevealOnScroll direction="fade">
            <div className="mt-6 p-8 text-center">
              <div className="inline-block w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-3" />
              <div className="text-sm text-ink-500 dark:text-ink-400">
                历史人物正在发朋友圈…
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* 错误 */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {/* 朋友圈展示 */}
        {feed && !loading && (
          <RevealOnScroll direction="up" delay={300}>
            <div className="mt-6 space-y-4">
              {/* 场景标题 */}
              <div className="p-4 bg-gradient-to-r from-accent/10 to-amber-500/10 dark:from-accent/20 dark:to-amber-700/20 rounded-xl border border-accent/30 text-center">
                <div className="text-xs text-accent tracking-widest">朋友圈 · {feed.year}</div>
                <div className="text-xl font-bold text-ink-900 dark:text-ink-100 mt-1">
                  {feed.sceneName}
                </div>
              </div>

              {/* 动态列表 */}
              {feed.posts.map((post, i) => (
                <RevealOnScroll key={post.id} direction="up" delay={i * 100}>
                  <div className="p-4 bg-white/80 dark:bg-ink-900/80 rounded-xl border border-ink-200 dark:border-ink-700 shadow-sm">
                    {/* 作者 */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-amber-500/20 flex items-center justify-center text-2xl">
                        {post.emoji}
                      </div>
                      <div>
                        <div className="font-bold text-ink-900 dark:text-ink-100">
                          {post.author}
                        </div>
                        <div className="text-xs text-ink-500 dark:text-ink-400">
                          {post.dynasty}
                        </div>
                      </div>
                    </div>

                    {/* 正文 */}
                    <div className="text-ink-800 dark:text-ink-200 leading-relaxed text-sm whitespace-pre-line">
                      {post.content}
                    </div>

                    {/* 互动栏 */}
                    <div className="mt-3 pt-3 border-t border-ink-100 dark:border-ink-700 flex items-center justify-between">
                      <button
                        onClick={() => handleLike(post)}
                        className={`flex items-center gap-1 text-xs transition-all ${
                          post.hasLiked
                            ? 'text-red-500'
                            : 'text-ink-500 dark:text-ink-400 hover:text-red-500'
                        }`}
                      >
                        <span className={`text-lg transition-transform ${post.hasLiked ? 'scale-110' : ''}`}>
                          {post.hasLiked ? '❤️' : '🤍'}
                        </span>
                        <span className="font-bold">{post.likes}</span>
                      </button>
                      <button
                        onClick={() => setReplyingPostId(replyingPostId === post.id ? null : post.id)}
                        className="flex items-center gap-1 text-xs text-ink-500 dark:text-ink-400 hover:text-accent transition-all"
                      >
                        <span>💬</span>
                        <span>{post.comments.length} 评论</span>
                      </button>
                    </div>

                    {/* 评论列表 */}
                    {(post.comments.length > 0 || replyingPostId === post.id) && (
                      <div className="mt-3 space-y-2">
                        {post.comments.length > 0 && (
                          <div className="p-3 bg-ink-50/50 dark:bg-ink-800/50 rounded-lg space-y-2">
                            {post.comments.map((c) => (
                              <div key={c.id} className="text-sm">
                                <span className="mr-1">{c.emoji}</span>
                                <span className={`font-bold mr-1 ${c.isUser ? 'text-blue-600 dark:text-blue-400' : 'text-accent'}`}>
                                  {c.author}
                                </span>
                                {c.isUser && <span className="text-[10px] text-blue-500 dark:text-blue-400 mr-1">[你]</span>}
                                <span className="text-ink-700 dark:text-ink-300">{c.content}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 评论输入框 */}
                        {replyingPostId === post.id && (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={commentInputs[post.id] || ''}
                              onChange={(e) => handleInputChange(post.id, e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post)}
                              placeholder="写评论…"
                              className="flex-1 px-3 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-white/70 dark:bg-ink-800/70 text-sm focus:outline-none focus:border-accent"
                            />
                            <button
                              onClick={() => handleCommentSubmit(post)}
                              disabled={!commentInputs[post.id]?.trim()}
                              className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-bold hover:shadow-md disabled:opacity-50 transition-all"
                            >
                              发送
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </RevealOnScroll>
              ))}

              {/* 重新生成 */}
              {activeScene && (
                <div className="text-center">
                  <button
                    onClick={() => {
                      clearMomentCache();
                      handleSelectScene(activeScene);
                    }}
                    disabled={loading}
                    className="text-xs px-4 py-2 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all"
                  >
                    🔄 重新生成这组朋友圈
                  </button>
                </div>
              )}
            </div>
          </RevealOnScroll>
        )}

        {/* 底部 */}
        <RevealOnScroll direction="fade" delay={400}>
          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">返回首页</Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
