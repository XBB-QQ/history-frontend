import { Component, type ErrorInfo, type ReactNode } from 'react';
import { useI18nStore } from '@/i18n/i18n';

interface Props {
  children: ReactNode;
  /** 自定义降级 UI */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * 全局错误边界
 * 捕获子树渲染异常，避免整页白屏
 * 降级 UI 不依赖 i18n hook（class 组件无法用 hook），直接读 store
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) return this.props.fallback;

    // 降级 UI：直接读 i18n store，避免 hook 限制
    const { locale } = useI18nStore.getState();
    const isZh = locale === 'zh';
    const texts = {
      title: isZh ? '页面加载出错' : 'Page Error',
      retry: isZh ? '重试' : 'Retry',
      home: isZh ? '返回首页' : 'Back Home',
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-ink-950 px-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">📜</div>
          <h1 className="text-2xl font-black text-ink-900 dark:text-ink-100 mb-2">
            {texts.title}
          </h1>
          <p className="text-sm text-ink-500 mb-6 break-all">
            {this.state.error?.message || 'Unknown error'}
          </p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={this.handleReset}
              className="px-4 py-2 bg-accent text-white rounded-xl text-sm font-bold hover:bg-red-800 transition-colors"
            >
              {texts.retry}
            </button>
            <a
              href="/"
              className="px-4 py-2 border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 rounded-xl text-sm font-bold hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors"
            >
              {texts.home}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
