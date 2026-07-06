import { useState } from 'react';
import { convertCalendar } from '@/utils/calendarConverter';
import { useT } from '@/i18n/i18n';

export default function CalendarConverterPage() {
  const t = useT();
  const [year, setYear] = useState<number>(755);
  const result = convertCalendar(year);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif">
            历 {t('calendarConverter.title')}
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            {t('calendarConverter.subtitle')}
          </p>
        </div>

        {/* 输入区域 */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <label className="text-sm font-bold text-ink-700 dark:text-ink-300">{t('calendarConverter.gregorian_year_label')}</label>
          <input
            type="number"
            value={year}
            onChange={e => setYear(parseInt(e.target.value) || 0)}
            className="w-32 px-4 py-3 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-900 dark:text-ink-100 text-lg font-serif font-bold text-center focus:border-accent focus:outline-none"
          />
          <span className="text-sm text-ink-400">{t('calendarConverter.year_suffix')}</span>
        </div>

        {/* 快捷年份按钮 */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[-221, -104, 208, 627, 755, 1068, 1403, 1644, 1722, 1840, 1949].map(y => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
                year === y
                  ? 'border-accent bg-accent text-white'
                  : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:border-accent/50'
              }`}
            >
              {y < 0 ? t('calendarConverter.bc_year_short', { year: Math.abs(y) }) : y}{t('calendarConverter.year_suffix')}
            </button>
          ))}
        </div>

        {/* 转换结果 */}
        <div className="p-6 rounded-xl border-2 border-accent/30 bg-accent/10 dark:bg-accent/5">
          {/* 公历 → 干支 */}
          <div className="text-center mb-6">
            <div className="text-sm text-ink-400 mb-1">{t('calendarConverter.gregorian')}</div>
            <div className="text-2xl font-serif font-bold text-ink-900 dark:text-ink-100">
              {year < 0 ? t('calendarConverter.bc_year_full', { year: Math.abs(year) }) : t('calendarConverter.ad_year_full', { year: year })}
            </div>
          </div>

          <div className="text-center text-3xl text-ink-300 dark:text-ink-600 my-4">⇓</div>

          {/* 干支纪年 */}
          <div className="text-center mb-4">
            <div className="text-sm text-ink-400 mb-1">{t('calendarConverter.ganzhi_era')}</div>
            <div className="text-3xl font-serif font-bold text-accent">{result.ganzhi}</div>
          </div>

          {/* 生肖 */}
          <div className="text-center mb-4">
            <div className="text-sm text-ink-400 mb-1">{t('calendarConverter.zodiac')}</div>
            <div className="text-2xl font-serif font-bold text-ink-700 dark:text-ink-300">
              {t('calendarConverter.zodiac_year', { zodiac: result.shengxiao })}
            </div>
          </div>

          {/* 年号 */}
          {result.reignPeriods.length > 0 && (
            <div className="mt-4 p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-900/20">
              <div className="text-sm text-ink-400 mb-1 text-center">{t('calendarConverter.reign_periods')}</div>
              {result.reignPeriods.map((reign, i) => (
                <div key={i} className="text-center mb-2">
                  <span className="text-xl font-serif font-bold text-amber-700 dark:text-amber-300">
                    {reign.dynasty}·{reign.reignTitle}
                  </span>
                  <span className="mx-2 text-ink-400">—</span>
                  <span className="text-sm text-ink-600 dark:text-ink-400">
                    {t('calendarConverter.reign_period_years', { emperor: reign.emperor, reignTitle: reign.reignTitle })}
                  </span>
                </div>
              ))}
            </div>
          )}

          {result.reignPeriods.length === 0 && (
            <div className="text-center text-sm text-ink-400 mt-4">
              {t('calendarConverter.no_reign_data')}
            </div>
          )}
        </div>

        {/* 完整格式输出 */}
        <div className="mt-6 p-4 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50/30 dark:bg-ink-800/20 text-center">
          <code className="text-sm text-ink-600 dark:text-ink-400">{result.formatted}</code>
        </div>

        {/* 知识小贴士 */}
        <div className="mt-8 p-5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50/30 dark:bg-ink-800/20">
          <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3">注 {t('calendarConverter.tips_title')}</h3>
          <ul className="space-y-2 text-sm text-ink-600 dark:text-ink-400">
            <li>• {t('calendarConverter.tip_ganzhi')}</li>
            <li>• {t('calendarConverter.tip_reign')}</li>
            <li>• {t('calendarConverter.tip_ad')}</li>
            <li>• {t('calendarConverter.tip_key_years')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
