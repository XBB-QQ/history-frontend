import { useRef, useState } from 'react';

interface PosterOptions {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  footer?: string;
  bgColor?: string;
  textColor?: string;
}

/**
 * 海报生成器组件
 * 使用 Canvas API 生成分享海报并下载
 */
export default function PosterGenerator({ options }: { options: PosterOptions }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generating, setGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const generatePoster = async () => {
    setGenerating(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const W = 800;
    const H = 1200;
    canvas.width = W;
    canvas.height = H;

    // 背景
    ctx.fillStyle = options.bgColor || '#FAF7F2';
    ctx.fillRect(0, 0, W, H);

    // 顶部装饰线
    ctx.fillStyle = '#8B0000';
    ctx.fillRect(0, 0, W, 6);

    // 印章风格标题区
    ctx.save();
    ctx.translate(W / 2, 120);
    ctx.fillStyle = '#8B0000';
    ctx.globalAlpha = 0.1;
    ctx.beginPath();
    ctx.arc(0, 0, 100, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();

    // 标题
    ctx.fillStyle = options.textColor || '#1a1a1a';
    ctx.font = 'bold 48px serif';
    ctx.textAlign = 'center';
    ctx.fillText(options.title, W / 2, 200);

    // 副标题
    if (options.subtitle) {
      ctx.font = '24px serif';
      ctx.fillStyle = '#666';
      ctx.fillText(options.subtitle, W / 2, 250);
    }

    // 分隔线
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 290);
    ctx.lineTo(W - 80, 290);
    ctx.stroke();

    // 描述文字
    if (options.description) {
      ctx.font = '20px serif';
      ctx.fillStyle = '#444';
      ctx.textAlign = 'left';
      const words = options.description.split('');
      let line = '';
      let y = 340;
      const maxWidth = W - 160;

      for (const char of words) {
        const test = line + char;
        if (ctx.measureText(test).width > maxWidth) {
          ctx.fillText(line, 80, y);
          line = char;
          y += 36;
        } else {
          line = test;
        }
      }
      if (line) ctx.fillText(line, 80, y);
    }

    // 底部
    ctx.save();
    ctx.translate(W / 2, H - 60);
    ctx.fillStyle = '#8B0000';
    ctx.globalAlpha = 0.8;
    ctx.font = 'bold 20px serif';
    ctx.textAlign = 'center';
    ctx.fillText(options.footer || '五千年史馆', 0, 0);
    ctx.restore();

    // 底部装饰线
    ctx.fillStyle = '#8B0000';
    ctx.fillRect(0, H - 6, W, 6);

    // 转为图片
    const dataUrl = canvas.toDataURL('image/png');
    setImageUrl(dataUrl);
    setGenerating(false);
  };

  const download = () => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `${options.title || 'poster'}.png`;
    a.click();
  };

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="hidden" />
      <button
        onClick={generatePoster}
        disabled={generating}
        className="w-full py-3 bg-accent text-white rounded-xl font-bold hover:bg-red-800 transition-colors disabled:opacity-50"
      >
        {generating ? '生成中...' : '生成分享海报'}
      </button>
      {imageUrl && (
        <div className="space-y-3">
          <img src={imageUrl} alt="海报预览" className="w-full rounded-xl border border-ink-200 dark:border-ink-700" />
          <button
            onClick={download}
            className="w-full py-2 bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-200 rounded-xl text-sm font-bold hover:bg-ink-200 dark:hover:bg-ink-700 transition-colors"
          >
            下载海报
          </button>
        </div>
      )}
    </div>
  );
}
