/**
 * documentRenderer — L1 单元测试
 * @see ITERATIONS.md #97
 */

import { describe, it, expect } from 'vitest';
import { DOCUMENT_TEMPLATES, wrapText, downloadCanvas, generateDocumentImage } from '@/utils/documentRenderer';

describe('DOCUMENT_TEMPLATES', () => {
  it('包含奏折/尺牍/圣旨模板', () => {
    const ids = DOCUMENT_TEMPLATES.map(t => t.id);
    expect(ids).toContain('memorial');
    expect(ids).toContain('letter');
    expect(ids).toContain('edict');
  });

  it('每个模板包含 id/name 字段', () => {
    DOCUMENT_TEMPLATES.forEach(t => {
      expect(t).toHaveProperty('id');
      expect(t).toHaveProperty('name');
      expect(t).toHaveProperty('paperColor');
      expect(t).toHaveProperty('borderColor');
    });
  });

  it('奏折模板有印章', () => {
    const memorial = DOCUMENT_TEMPLATES.find(t => t.id === 'memorial');
    expect(memorial!.hasSeal).toBe(true);
    expect(memorial!.sealPosition).toBe('bottom-right');
  });
});

describe('wrapText', () => {
  it('短文本返回单行', () => {
    const mockCtx = { measureText: vi.fn(() => ({ width: 50 })) } as any;
    const result = wrapText(mockCtx, '测试文本', 400);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
  });

  it('空文本返回空数组', () => {
    const mockCtx = { measureText: vi.fn(() => ({ width: 0 })) } as any;
    const result = wrapText(mockCtx, '', 400);
    expect(result).toEqual([]);
  });
});

describe('downloadCanvas', () => {
  it('不报错', () => {
    const mockCanvas = {
      toDataURL: vi.fn(() => 'data:image/png;base64,test'),
    } as any;
    expect(() => downloadCanvas(mockCanvas, 'test.png')).not.toThrow();
  });
});

describe('generateDocumentImage', () => {
  it('函数存在', () => {
    expect(generateDocumentImage).toBeDefined();
    expect(typeof generateDocumentImage).toBe('function');
  });
});
