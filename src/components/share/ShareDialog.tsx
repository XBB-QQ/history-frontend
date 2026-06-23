import { useState } from 'react';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export default function ShareDialog({ isOpen, onClose, title, url }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareLinks = [
    { name: '微信', color: 'bg-green-500', icon: '💬' },
    { name: '微博', color: 'bg-red-500', icon: '📢' },
    { name: 'QQ', color: 'bg-blue-500', icon: '🐧' },
    { name: '复制链接', color: 'bg-ink-500', icon: '🔗' },
  ];

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-ink-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-ink-200 dark:border-ink-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">分享</h3>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-700 dark:hover:text-ink-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-ink-500 dark:text-ink-400 mb-4 truncate">
          {title}
        </p>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {shareLinks.map((item) => (
            <button
              key={item.name}
              onClick={item.name === '复制链接' ? handleCopy : undefined}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-xl`}>
                {item.icon}
              </div>
              <span className="text-xs text-ink-600 dark:text-ink-400">{item.name}</span>
            </button>
          ))}
        </div>

        {copied && (
          <div className="text-center text-sm text-green-600 dark:text-green-400">
            ✓ 链接已复制
          </div>
        )}
      </div>
    </div>
  );
}
