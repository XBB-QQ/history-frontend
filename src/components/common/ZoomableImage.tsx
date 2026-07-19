/**
 * 书画/文物高清图放大模态框
 * 原生实现：CSS transform + 鼠标滚轮缩放 + 拖拽平移
 * 零依赖（不引入 react-zoom-pan-pinch 等第三方库）
 *
 * 兜底策略：
 * - src 为空或加载失败时，渲染朝代色块占位图（不响应点击放大）
 * - 避免出现"图片裂开"的破图图标
 */
import { useCallback, useEffect, useRef, useState } from 'react';

interface ZoomableImageProps {
  /** 图片 URL；为空时显示占位图 */
  src?: string;
  alt: string;
  className?: string;
  /** 列表预览时显示的文字提示 */
  previewHint?: string;
  /** 占位图 emoji（src 为空或加载失败时显示），默认 🖼 */
  placeholderEmoji?: string;
}

interface ModalState {
  scale: number;
  translateX: number;
  translateY: number;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 5;
const SCALE_STEP = 0.15;

export default function ZoomableImage({
  src,
  alt,
  className,
  previewHint,
  placeholderEmoji = '🖼',
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [state, setState] = useState<ModalState>({ scale: 1, translateX: 0, translateY: 0 });
  const dragStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // src 变化时重置错误状态（便于父组件切换 src 时复用组件）
  useEffect(() => {
    setImgError(false);
  }, [src]);

  const showPlaceholder = !src || imgError;

  // 打开时重置缩放（占位图不响应打开）
  const handleOpen = useCallback(() => {
    if (showPlaceholder) return;
    setState({ scale: 1, translateX: 0, translateY: 0 });
    setOpen(true);
  }, [showPlaceholder]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // ESC 关闭
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === '+' || e.key === '=') setState((s) => ({ ...s, scale: Math.min(MAX_SCALE, s.scale + SCALE_STEP) }));
      if (e.key === '-') setState((s) => ({ ...s, scale: Math.max(MIN_SCALE, s.scale - SCALE_STEP) }));
      if (e.key === '0') setState({ scale: 1, translateX: 0, translateY: 0 });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, handleClose]);

  // 滚轮缩放
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setState((s) => {
      const next = e.deltaY < 0 ? s.scale + SCALE_STEP : s.scale - SCALE_STEP;
      return { ...s, scale: Math.max(MIN_SCALE, Math.min(MAX_SCALE, next)) };
    });
  }, []);

  // 拖拽平移
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY, tx: state.translateX, ty: state.translateY };
  }, [state.translateX, state.translateY]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setState((s) => ({ ...s, translateX: dragStart.current!.tx + dx, translateY: dragStart.current!.ty + dy }));
  }, []);

  const handleMouseUp = useCallback(() => {
    dragStart.current = null;
  }, []);

  // 防止背景滚动
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  // ====== 占位图分支 ======
  if (showPlaceholder) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-stone-200 via-amber-100 to-stone-200 dark:from-ink-700 dark:via-ink-800 dark:to-ink-700 ${className || ''}`}
        role="img"
        aria-label={alt}
      >
        <div className="text-5xl md:text-6xl opacity-50 mb-3 select-none" aria-hidden="true">
          {placeholderEmoji}
        </div>
        <div className="text-sm md:text-base font-bold text-stone-700 dark:text-ink-200 px-4 text-center line-clamp-2 select-none">
          {alt}
        </div>
        <div className="text-xs text-stone-500 dark:text-ink-400 mt-2 select-none">
          暂无高清图
        </div>
      </div>
    );
  }

  // ====== 正常图片分支 ======
  return (
    <>
      <div className={`relative cursor-zoom-in group ${className || ''}`} onClick={handleOpen}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
          onError={() => setImgError(true)}
        />
        {previewHint && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              {previewHint}
            </span>
          </div>
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center select-none"
          onClick={handleClose}
        >
          {/* 工具栏 */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-ink-900/80 text-white px-4 py-2 rounded-full text-sm" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setState((s) => ({ ...s, scale: Math.max(MIN_SCALE, s.scale - SCALE_STEP) }))}
              className="w-8 h-8 hover:bg-white/10 rounded-full"
              aria-label="缩小"
            >
              −
            </button>
            <span className="w-16 text-center tabular-nums">{Math.round(state.scale * 100)}%</span>
            <button
              onClick={() => setState((s) => ({ ...s, scale: Math.min(MAX_SCALE, s.scale + SCALE_STEP) }))}
              className="w-8 h-8 hover:bg-white/10 rounded-full"
              aria-label="放大"
            >
              +
            </button>
            <button
              onClick={() => setState({ scale: 1, translateX: 0, translateY: 0 })}
              className="px-3 h-8 hover:bg-white/10 rounded-full"
              aria-label="重置"
            >
              重置
            </button>
            <span className="ml-2 text-xs text-white/60">滚轮缩放 · 拖拽平移 · ESC 关闭</span>
          </div>

          {/* 关闭按钮 */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 text-white text-2xl hover:bg-white/10 rounded-full flex items-center justify-center"
            aria-label="关闭"
          >
            ✕
          </button>

          {/* 图片 */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className="max-w-[95vw] max-h-[90vh] object-contain cursor-grab active:cursor-grabbing"
            style={{
              transform: `translate(${state.translateX}px, ${state.translateY}px) scale(${state.scale})`,
              transition: dragStart.current ? 'none' : 'transform 0.1s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            draggable={false}
          />
        </div>
      )}
    </>
  );
}
