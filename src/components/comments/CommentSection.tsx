import { useState } from 'react';
import { useUserStore } from '@/store/userStore';

interface Comment {
  id: number;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface CommentSectionProps {
  resourceId: string;
  resourceType: string;
}

/** 模拟评论数据（后续可接后端 API） */
const MOCK_COMMENTS: Comment[] = [
  { id: 1, author: '历史爱好者', authorAvatar: '历', content: '这个事件非常有趣，学到了新知识！', timestamp: '2小时前', likes: 5 },
  { id: 2, author: '小明', authorAvatar: '小', content: '希望能有更多相关内容', timestamp: '5小时前', likes: 2 },
  { id: 3, author: '读书人', authorAvatar: '读', content: '写得很好，支持！', timestamp: '1天前', likes: 8 },
];

export default function CommentSection({ resourceId, resourceType }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const { isAuthenticated, user } = useUserStore();

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    if (!isAuthenticated) {
      alert('请先登录后再发表评论');
      window.location.href = '/login';
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
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-6 pt-4 border-t border-ink-200 dark:border-ink-700">
      <h4 className="text-sm font-bold text-ink-900 dark:text-ink-100 mb-4 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        评论 ({comments.length})
      </h4>

      {/* 发表评论 */}
      <div className="flex gap-2 mb-4">
        {isAuthenticated ? (
          <>
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm flex-shrink-0 text-accent">
              {(user?.nickname || user?.username || 'U').charAt(0)}
            </div>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder={`发表你的看法，${user?.nickname || user?.username}...`}
              className="flex-1 px-3 py-2 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <button
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-bold hover:bg-red-700 disabled:opacity-50"
            >
              发送
            </button>
          </>
        ) : (
          <button
            onClick={() => { window.location.href = '/login'; }}
            className="w-full py-2 rounded-lg border border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-400 text-sm hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
          >
            登录后发表评论
          </button>
        )}
      </div>

      {/* 评论列表 */}
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3 p-3 rounded-lg bg-ink-50 dark:bg-ink-800/50">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm flex-shrink-0 text-accent">
              {c.authorAvatar || c.author.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-ink-900 dark:text-ink-100">{c.author}</span>
                <span className="text-xs text-ink-400">{c.timestamp}</span>
              </div>
              <p className="text-sm text-ink-700 dark:text-ink-300">{c.content}</p>
              <div className="flex items-center gap-3 mt-1">
                <button className="text-xs text-ink-400 hover:text-accent flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {c.likes || 0}
                </button>
                <button className="text-xs text-ink-400 hover:text-accent">回复</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
