/**
 * 通用 Markdown 渲染组件
 * 基于 react-markdown + remark-gfm，支持 GFM 语法（表格、删除线、任务列表等）
 * 统一各 AI 功能页面的富文本输出样式
 */
import type { CSSProperties } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownProps {
  children: string;
  /** 外层容器额外类名（如 font-serif、text-lg 等） */
  className?: string;
  /** 外层容器自定义样式（如自定义字体） */
  style?: CSSProperties;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold mt-5 mb-3 text-ink-900 dark:text-ink-100">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold mt-4 mb-2 text-ink-900 dark:text-ink-100">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-bold mt-3 mb-2 text-ink-900 dark:text-ink-100">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-bold mt-3 mb-1 text-ink-900 dark:text-ink-100">{children}</h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-sm font-bold mt-2 mb-1 text-ink-900 dark:text-ink-100">{children}</h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-xs font-bold mt-2 mb-1 text-ink-700 dark:text-ink-300">{children}</h6>
  ),
  p: ({ children }) => (
    <p className="my-2 leading-loose">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-2 ml-5 list-disc space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 ml-5 list-decimal space-y-1">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-loose">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-bold text-ink-900 dark:text-ink-100">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => <del className="text-ink-400 line-through">{children}</del>,
  blockquote: ({ children }) => (
    <blockquote className="my-3 pl-4 border-l-4 border-accent/40 bg-accent/5 py-2 text-ink-700 dark:text-ink-300">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    // 块级代码（有 language-xxx className）由 pre 包裹，不加额外样式
    if (className) {
      return <code className={className} {...props}>{children}</code>;
    }
    // 行内代码
    return (
      <code className="px-1.5 py-0.5 rounded bg-ink-100 dark:bg-ink-800 text-accent text-sm font-mono" {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-2 p-3 rounded-lg bg-ink-100 dark:bg-ink-800 overflow-x-auto text-sm font-mono text-ink-800 dark:text-ink-200">
      {children}
    </pre>
  ),
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-amber-600">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="my-3 overflow-x-auto">
      <table className="min-w-full border-collapse border border-ink-200 dark:border-ink-700">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-ink-50 dark:bg-ink-800">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-ink-200 dark:border-ink-700 px-3 py-2 text-left font-bold text-ink-900 dark:text-ink-100">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-ink-200 dark:border-ink-700 px-3 py-2 text-ink-700 dark:text-ink-300">{children}</td>
  ),
  hr: () => <hr className="my-4 border-ink-200 dark:border-ink-700" />,
};

export default function Markdown({ children, className, style }: MarkdownProps) {
  return (
    <div className={`text-ink-800 dark:text-ink-200 ${className || ''}`} style={style}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
