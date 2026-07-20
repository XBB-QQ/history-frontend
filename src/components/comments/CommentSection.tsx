import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import Markdown from '@/components/common/Markdown';

interface Reply {
  id: number;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  liked?: boolean;
}

interface Comment {
  id: number;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  liked?: boolean;
  replies?: Reply[];
}

interface CommentSectionProps {
  resourceId: string;
  resourceType: string;
}

// 安全修复 P0-1：删除自写的 renderMarkdown（未做 HTML 转义，存在 XSS 漏洞），
// 改用项目已有的 Markdown 组件（基于 react-markdown，默认不渲染 raw HTML）

/** 模拟评论数据 */
const MOCK_COMMENTS: Comment[] = [
  { id: 1, author: '历史爱好者', authorAvatar: '历', content: '**这个事件非常有趣**，学到了新知识！', timestamp: '2小时前', likes: 5, replies: [
    { id: 101, author: '小明', authorAvatar: '小', content: '我也觉得！', timestamp: '1小时前', likes: 2 },
  ]},
  { id: 2, author: '读书人', authorAvatar: '读', content: '写得很好，支持！', timestamp: '1天前', likes: 8 },
  { id: 3, author: '小明', authorAvatar: '小', content: '希望能有更多相关内容', timestamp: '5小时前', likes: 2 },
];

export default function CommentSection({ resourceId: _resourceId, resourceType: _resourceType }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'hot'>('latest');
  const { isAuthenticated, user } = useUserStore();
  const navigate = useNavigate();

  // 排序
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'hot') return b.likes - a.likes;
    // latest: 简单按 ID 倒序模拟
    return b.id - a.id;
  });

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const authorName = user?.nickname || user?.username || '匿名';
    const comment: Comment = {
      id: Date.now(),
      author: authorName,
      authorAvatar: authorName.charAt(0),
      content: newComment.trim(),
      timestamp: '刚刚',
      likes: 0,
      replies: [],
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLike = (commentId: number) => {
    setComments((prev) =>
      prev.map((c: any) =>
        c.id === commentId
          ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
          : c
      )
    );
  };

  const handleReplyLike = (commentId: number, replyId: number) => {
    setComments((prev) =>
      prev.map((c: any) =>
        c.id === commentId
          ? {
              ...c,
              replies: (c.replies || []).map((r: any) =>
                r.id === replyId
                  ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 }
                  : r
              ),
            }
          : c
      )
    );
  };

  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleReply = (commentId: number) => {
    if (!replyText.trim()) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const authorName = user?.nickname || user?.username || '匿名';
    const reply: Reply = {
      id: Date.now(),
      author: authorName,
      authorAvatar: authorName.charAt(0),
      content: replyText.trim(),
      timestamp: '刚刚',
      likes: 0,
    };
    setComments((prev) =>
      prev.map((c: any) =>
        c.id === commentId ? { ...c, replies: [...(c.replies || []), reply] } : c
      )
    );
    setReplyText('');
    setReplyingTo(null);
  };

  return (
    <div className="mt-6 pt-4 border-t border-ink-200 dark:border-ink-700">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-ink-800 dark:text-ink-200 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          评论 ({comments.reduce((sum, c) => sum + 1 + (c.replies?.length || 0), 0)})
        </h4>

        {/* 排序选项 */}
        <div className="flex gap-1">
          <button
            onClick={() => setSortBy('latest')}
            className={`text-xs px-2 py-1 rounded-full transition-colors ${
              sortBy === 'latest'
                ? 'bg-accent text-white'
                : 'text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800'
            }`}
          >
            最新
          </button>
          <button
            onClick={() => setSortBy('hot')}
            className={`text-xs px-2 py-1 rounded-full transition-colors ${
              sortBy === 'hot'
                ? 'bg-accent text-white'
                : 'text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800'
            }`}
          >
            最热
          </button>
        </div>
      </div>

      {/* 发表评论 */}
      <div className="flex gap-2 mb-4">
        {isAuthenticated ? (
          <>
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm flex-shrink-0 text-accent">
              {(user?.nickname || user?.username || 'U').charAt(0)}
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="发表你的看法（支持 **粗体**、`代码`、链接）"
              rows={2}
              className="flex-1 px-3 py-2 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />
            <button
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-bold hover:bg-red-700 disabled:opacity-50 self-end"
            >
              发送
            </button>
          </>
        ) : (
          <button
            onClick={() => { navigate('/login'); }}
            className="w-full py-2 rounded-lg border border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-400 text-sm hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
          >
            登录后发表评论
          </button>
        )}
      </div>

      {/* 评论列表 */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {sortedComments.length === 0 ? (
          <div className="text-center py-8 text-ink-400 text-sm">
            <p>暂无评论，快来抢沙发吧！</p>
          </div>
        ) : (
          sortedComments.map((c: any) => (
            <div key={c.id} className="flex gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/50">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm flex-shrink-0 text-accent">
                {c.authorAvatar || c.author.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-ink-900 dark:text-ink-100">{c.author}</span>
                  <span className="text-xs text-ink-400">{c.timestamp}</span>
                </div>
                <Markdown className="text-sm text-ink-700 dark:text-ink-300 [&_p]:my-0">{c.content}</Markdown>
                <div className="flex items-center gap-3 mt-1.5">
                  <button
                    onClick={() => handleLike(c.id)}
                    className={`text-xs flex items-center gap-1 transition-colors ${
                      c.liked ? 'text-red-500' : 'text-ink-400 hover:text-accent'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill={c.liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {c.likes || 0}
                  </button>
                  <button
                    onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                    className="text-xs text-ink-400 hover:text-accent"
                  >
                    回复
                  </button>
                </div>

                {/* 回复输入框 */}
                {replyingTo === c.id && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleReply(c.id)}
                      placeholder={`回复 ${c.author}...`}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                    <button
                      onClick={() => handleReply(c.id)}
                      disabled={!replyText.trim()}
                      className="px-3 py-1.5 bg-accent text-white text-xs rounded-lg font-bold disabled:opacity-50"
                    >
                      发送
                    </button>
                    <button
                      onClick={() => { setReplyingTo(null); setReplyText(''); }}
                      className="px-3 py-1.5 text-ink-400 text-xs hover:text-ink-600"
                    >
                      取消
                    </button>
                  </div>
                )}

                {/* 楼中楼回复 */}
                {c.replies && c.replies.length > 0 && (
                  <div className="mt-2 space-y-2 pl-3 border-l-2 border-ink-200 dark:border-ink-700">
                    {c.replies.map((r: any) => (
                      <div key={r.id} className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs flex-shrink-0 text-blue-600 dark:text-blue-400">
                          {r.authorAvatar || r.author.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-ink-700 dark:text-ink-300">{r.author}</span>
                            <span className="text-[10px] text-ink-400">{r.timestamp}</span>
                          </div>
                          <Markdown className="text-xs text-ink-600 dark:text-ink-400 [&_p]:my-0">{r.content}</Markdown>
                          <button
                            onClick={() => handleReplyLike(c.id, r.id)}
                            className={`text-[10px] flex items-center gap-0.5 mt-0.5 ${
                              r.liked ? 'text-red-500' : 'text-ink-400 hover:text-accent'
                            }`}
                          >
                            <svg className="w-3 h-3" fill={r.liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {r.likes || 0}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
