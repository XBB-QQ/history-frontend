import { useState, useCallback } from 'react';
import { fetchTimelineEvents, fetchAllPersons, fetchDynasties, fetchKnowledgeCards } from '@/services/api';
import type { FrontendEvent, FrontendPerson, FrontendDynasty, FrontendKnowledge } from '@/services/api';

type ExportType = 'events' | 'persons' | 'dynasties' | 'knowledge';

/** 将对象数组转为 CSV 字符串 */
function toCSV(data: Record<string, unknown>[]): string {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers
      .map((h) => {
        const val = row[h];
        if (val === null || val === undefined) return '';
        const str = String(val);
        // CSV 转义：包含逗号、引号、换行的字段需要加引号
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      })
      .join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}

/** 触发浏览器下载 */
function downloadFile(content: string, filename: string, mimeType = 'text/csv') {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function ExportDropdown() {
  const [exporting, setExporting] = useState<ExportType | null>(null);
  const [error, setError] = useState('');

  const handleExport = useCallback(
    async (type: ExportType) => {
      setExporting(type);
      setError('');
      try {
        let data: Record<string, unknown>[] = [];
        let filename = '';
        let mimeType = 'text/csv';

        switch (type) {
          case 'events': {
            const events = await fetchTimelineEvents();
            data = events.map((e: FrontendEvent) => ({
              标题: e.title,
              年份: e.yearDisplay,
              朝代: e.dynasty,
              类别: e.category,
              描述: e.description,
              全文: e.fulltext,
              标签: e.tags.join('; '),
            }));
            filename = `timeline-events-${new Date().toISOString().slice(0, 10)}.csv`;
            break;
          }
          case 'persons': {
            const persons = await fetchAllPersons();
            data = persons.map((p: FrontendPerson) => ({
              姓名: p.name,
              字: p.courtesyName,
              朝代: p.dynasty,
              生卒: p.yearsDisplay,
              性别: p.gender === 'male' ? '男' : p.gender === 'female' ? '女' : '未知',
              角色: p.roles.join('; '),
              简介: p.bio,
              名言: p.quote,
              标签: p.tags.join('; '),
            }));
            filename = `historical-persons-${new Date().toISOString().slice(0, 10)}.csv`;
            break;
          }
          case 'dynasties': {
            const dynasties = await fetchDynasties();
            data = dynasties.map((d: FrontendDynasty) => ({
              朝代: d.name,
              时期: d.period,
              建立者: d.founder,
              都城: d.capital,
              时长: d.duration,
              描述: d.description,
              灭亡原因: d.fallReason,
              影响: d.legacy,
            }));
            filename = `dynasties-${new Date().toISOString().slice(0, 10)}.csv`;
            break;
          }
          case 'knowledge': {
            const knowledge = await fetchKnowledgeCards();
            data = knowledge.map((k: FrontendKnowledge) => ({
              标题: k.title,
              朝代: k.dynasty,
              时期: k.startYearDisplay,
              描述: k.description,
              全文: k.fulltext,
              备注: k.meta,
              标签: k.tags.join('; '),
            }));
            filename = `knowledge-cards-${new Date().toISOString().slice(0, 10)}.csv`;
            break;
          }
        }

        if (data.length === 0) {
          setError('暂无数据可导出');
          return;
        }

        const csv = toCSV(data);
        downloadFile(csv, filename, 'text/csv');
      } catch (err) {
        setError('导出失败，请稍后重试');
        console.error(err);
      } finally {
        setExporting(null);
      }
    },
    [],
  );

  return (
    <div className="flex items-center gap-2">
      {/* 导出按钮组 */}
      <div className="relative group">
        <button
          className="text-sm px-3 py-1.5 rounded-lg border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:text-accent dark:hover:text-accent hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors flex items-center gap-1.5"
          title="导出数据"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          导出
        </button>

        {/* 下拉菜单 */}
        <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-ink-800 rounded-xl shadow-lg border border-ink-200 dark:border-ink-700 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
          {[
            { key: 'events' as const, label: '时间轴事件' },
            { key: 'persons' as const, label: '人物志' },
            { key: 'dynasties' as const, label: '朝代数据' },
            { key: 'knowledge' as const, label: '知识卡片' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => handleExport(item.key)}
              disabled={exporting !== null}
              className="w-full text-left px-4 py-2.5 text-sm text-ink-700 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-ink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exporting === item.key ? '导出中...' : item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
      )}
    </div>
  );
}
