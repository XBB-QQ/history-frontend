/**
 * Widget API — 嵌入模式支持
 * @see ITERATIONS.md #104
 *
 * 允许第三方通过 iframe 嵌入史馆工具页，隐藏导航栏等无关元素。
 */

import { useEffect, useState } from 'react';

/**
 * 检查是否处于嵌入模式
 */
export function isEmbedMode(): boolean {
  return new URLSearchParams(window.location.search).get('embed') === '1';
}

/**
 * 嵌入模式样式
 * 当 ?embed=1 时，移除导航栏、页脚、背景层等，只保留主要内容
 */
export function useEmbedStyles() {
  const [embedded, setEmbedded] = useState(isEmbedMode());

  useEffect(() => {
    const handler = () => setEmbedded(isEmbedMode());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return embedded;
}

/**
 * 向父页面发送消息（用于嵌入模式下的交互）
 */
export function postMessageToParent(type: string, data: unknown) {
  if (window.parent !== window) {
    window.parent.postMessage({ type, data, source: 'history-museum-widget' }, '*');
  }
}

/**
 * 接收父页面消息
 */
export function useParentMessage(handler: (data: unknown) => void) {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data?.source === 'history-museum-widget') {
        handler(event.data.data);
      }
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [handler]);
}
