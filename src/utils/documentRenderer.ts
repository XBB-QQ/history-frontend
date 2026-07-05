/**
 * 奏折 / 尺牍格式渲染器
 * @see ITERATIONS.md #97
 */

/** 奏折模板配置 */
export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  paperColor: string;
  borderColor: string;
  textColor: string;
  headerFont: string;
  bodyFont: string;
  lineSpacing: number;
  margin: number;
  hasSeal: boolean;
  sealPosition?: 'top-right' | 'bottom-right' | 'center-bottom';
}

/** 奏折模板列表 */
export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'memorial',
    name: '奏折',
    description: '清代官员向皇帝上书的标准格式',
    paperColor: '#F5E6C8',
    borderColor: '#8B4513',
    textColor: '#1A1A1A',
    headerFont: 'serif',
    bodyFont: 'serif',
    lineSpacing: 28,
    margin: 40,
    hasSeal: true,
    sealPosition: 'bottom-right',
  },
  {
    id: 'letter',
    name: '尺牍',
    description: '古代书信格式',
    paperColor: '#F0E6D2',
    borderColor: '#6B4226',
    textColor: '#2C2C2C',
    headerFont: 'serif',
    bodyFont: 'serif',
    lineSpacing: 26,
    margin: 30,
    hasSeal: true,
    sealPosition: 'center-bottom',
  },
  {
    id: 'edict',
    name: '圣旨',
    description: '皇帝诏书格式',
    paperColor: '#FFF8DC',
    borderColor: '#DAA520',
    textColor: '#8B0000',
    headerFont: 'serif',
    bodyFont: 'serif',
    lineSpacing: 32,
    margin: 50,
    hasSeal: true,
    sealPosition: 'center-bottom',
  },
];

/** 将文本按固定宽度分行 */
export function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split('');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

/** 生成文档图片 */
export async function generateDocumentImage(
  template: DocumentTemplate,
  title: string,
  content: string,
  sender: string,
  date: string,
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const WIDTH = 800;
  const LINE_HEIGHT = template.lineSpacing;
  const MARGIN = template.margin;

  // 估算行数
  const lines = wrapText({ measureText: (s: string) => ({ width: s.length * 18 }) as unknown as CanvasRenderingContext2D, wrapText: () => [] } as unknown as CanvasRenderingContext2D, content, WIDTH - MARGIN * 2);
  const estimatedLines = lines.length || Math.ceil(content.length / 20);
  const HEIGHT = MARGIN * 2 + estimatedLines * LINE_HEIGHT + 120;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d')!;

  // 绘制纸张背景
  ctx.fillStyle = template.paperColor;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // 绘制边框
  ctx.strokeStyle = template.borderColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(MARGIN / 2, MARGIN / 2, WIDTH - MARGIN, HEIGHT - MARGIN);

  // 双线装饰
  ctx.lineWidth = 1;
  ctx.strokeRect(MARGIN, MARGIN, WIDTH - MARGIN * 2, HEIGHT - MARGIN * 2);

  // 标题
  ctx.fillStyle = template.textColor;
  ctx.font = 'bold 28px serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, WIDTH / 2, MARGIN + 40);

  // 内容
  ctx.textAlign = 'left';
  ctx.font = '18px serif';
  const textLines = wrapText(ctx, content, WIDTH - MARGIN * 2);
  let y = MARGIN + 80;
  for (const line of textLines) {
    ctx.fillText(line, MARGIN, y);
    y += LINE_HEIGHT;
  }

  // 落款
  y += 20;
  ctx.textAlign = 'right';
  ctx.font = '16px serif';
  ctx.fillText(sender, WIDTH - MARGIN, y);
  ctx.font = '14px serif';
  ctx.fillStyle = '#666';
  ctx.fillText(date, WIDTH - MARGIN, y + 24);

  // 印章
  if (template.hasSeal) {
    drawSeal(ctx, WIDTH - MARGIN - 60, y - 10, 50);
  }

  return canvas;
}

/** 绘制红色印章 */
function drawSeal(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();

  // 印章边框
  ctx.strokeStyle = '#CC0000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, size, size);

  // 印章文字
  ctx.fillStyle = '#CC0000';
  ctx.font = 'bold 14px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('印', x + size / 2, y + size / 2);

  ctx.restore();
}

/** 导出为 PNG 下载 */
export function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
