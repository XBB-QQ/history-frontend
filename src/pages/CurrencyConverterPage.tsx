/**
 * 货币购买力换算器 — 跨朝代物价与货币价值对比
 * @see history-museum/ITERATIONS.md Iteration #70
 *
 * 使用 src/data/features/currencyData.ts 数据
 * 支持多种朝代、货币类型与实物价格对比
 */

import { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { DYNASTY_CURRENCIES, calculatePurchasingPower, type PurchasingPower } from '@/data/features/currencyData';
import { useT } from '@/i18n/i18n';

import './CurrencyConverterPage.module.css';

export default function CurrencyConverterPage() {
  const t = useT();
  const [amount, setAmount] = useState<string>('');
  const [dynasty, setDynasty] = useState<string>(DYNASTY_CURRENCIES[DYNASTY_CURRENCIES.length - 1].dynasty);
  const [type, setType] = useState<'rice' | 'flour' | 'cloth' | 'meat' | 'wine' | 'custom'>('rice');
  const [customPrice, setCustomPrice] = useState<string>('1000');
  
  // 计算购买力
  const result = useMemo<PurchasingPower | null>(() => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return null;
    }

    if (type === 'custom') {
      const numPrice = parseFloat(customPrice);
      if (isNaN(numPrice) || numPrice <= 0) {
        return null;
      }
      return calculatePurchasingPower(numAmount, dynasty);
    }

    return calculatePurchasingPower(numAmount, dynasty);
  }, [amount, dynasty, type, customPrice]);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <SectionHeader
        label="CURRENCY"
        title={t('currencyConverter.title')}
        description={t('currencyConverter.description')}
      />

      <RevealOnScroll>
        <div className="converter-container max-w-4xl mx-auto">
          {/* 换算器卡片 */}
          <div className="converter-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-6">
              📊 {t('currencyConverter.toolTitle')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                    {t('currencyConverter.inputAmount')}
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={t('currencyConverter.amountPlaceholder')}
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                    {t('currencyConverter.selectDynasty')}
                  </label>
                  <select
                    value={dynasty}
                    onChange={(e) => setDynasty(e.target.value)}
                    className="input-field w-full"
                  >
                    {DYNASTY_CURRENCIES.map(currency => (
                      <option key={currency.dynasty} value={currency.dynasty}>
                        {currency.dynasty} ({currency.period})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                    {t('currencyConverter.selectProductType')}
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="input-field w-full"
                  >
                    <option value="rice">🍚 {t('currencyConverter.productRice')}</option>
                    <option value="flour">🌾 {t('currencyConverter.productFlour')}</option>
                    <option value="cloth">🧵 {t('currencyConverter.productCloth')}</option>
                    <option value="meat">🥩 {t('currencyConverter.productMeat')}</option>
                    <option value="wine">🍶 {t('currencyConverter.productWine')}</option>
                    <option value="custom">🎯 {t('currencyConverter.productCustom')}</option>
                  </select>
                </div>

                {type === 'custom' && (
                  <div>
                    <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                      {t('currencyConverter.customPrice')}
                    </label>
                    <input
                      type="number"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      placeholder={t('currencyConverter.customPricePlaceholder')}
                      className="input-field w-full"
                    />
                    <p className="text-xs text-ink-500 mt-1">
                      ⚠️ {t('currencyConverter.customPriceHint')}
                    </p>
                  </div>
                )}
              </div>

              <div className="result-area space-y-4">
                {result ? (
                  <>
                    <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                      <div className="text-sm text-ink-600 dark:text-ink-400 mb-1">
                        {t('currencyConverter.modernYuan')}
                      </div>
                      <div className="text-3xl font-bold text-accent">
                        ¥{result.yuanValue.toLocaleString()}
                      </div>
                      <div className="text-xs text-ink-500 mt-1">
                        {t('currencyConverter.basedOnRice')}
                      </div>
                    </div>

                    {type === 'rice' && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                            <div className="text-xs text-ink-500">{t('currencyConverter.canBuyRice')}</div>
                            <div className="text-xl font-bold text-ink-900 dark:text-ink-100">
                              {result.riceAmount.toLocaleString()} {t('currencyConverter.jin')}
                            </div>
                          </div>
                          <div className="p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                            <div className="text-xs text-ink-500">{t('currencyConverter.canBuyRiceBags')}</div>
                            <div className="text-xl font-bold text-ink-900 dark:text-ink-100">
                              {Math.floor(result.riceAmount / 100)} {t('currencyConverter.dai')}
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                          <div className="text-sm text-ink-700 dark:text-ink-300">
                            💡 {t('currencyConverter.riceHint', { amount: result.amount, rice: result.riceAmount.toLocaleString() })}
                          </div>
                        </div>
                      </>
                    )}

                    {type === 'flour' && (
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                        <div className="text-sm text-ink-700 dark:text-ink-300">
                          💡 {t('currencyConverter.flourHint', { flour: result.flourAmount.toLocaleString(), num: Math.floor(result.flourAmount / 50) })}
                        </div>
                      </div>
                    )}

                    {type === 'cloth' && (
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                        <div className="text-sm text-ink-700 dark:text-ink-300">
                          💡 {t('currencyConverter.clothHint', { cloth: result.clothAmount.toFixed(2), num: Math.floor(result.clothAmount) })}
                        </div>
                      </div>
                    )}

                    {type === 'meat' && (
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                        <div className="text-sm text-ink-700 dark:text-ink-300">
                          💡 {t('currencyConverter.meatHint', { meat: result.meatAmount.toFixed(2), num: Math.floor(result.meatAmount / 3) })}
                        </div>
                      </div>
                    )}

                    {type === 'wine' && (
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                        <div className="text-sm text-ink-700 dark:text-ink-300">
                          💡 {t('currencyConverter.wineHint', { wine: result.wineAmount.toFixed(2), num: Math.floor(result.wineAmount / 10) })}
                        </div>
                      </div>
                    )}

                    {type === 'custom' && (
                      <div className="p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                        <div className="text-xs text-ink-500">{t('currencyConverter.customResult')}</div>
                        <div className="text-xl font-bold text-ink-900 dark:text-ink-100">
                          {result.riceAmount.toFixed(0)} {t('currencyConverter.customEquivalent')}
                        </div>
                        <div className="text-xs text-ink-500 mt-1">
                          {t('currencyConverter.customHint')}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                    <div className="p-8 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-center">
                      <div className="text-4xl mb-2">⚠️</div>
                      <div className="text-ink-600 dark:text-ink-400">
                        {t('currencyConverter.inputInvalid')}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* 历史价格对比表 */}
          <div className="price-table-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-6">
              📈 {t('currencyConverter.priceCompareTitle')}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-200 dark:border-ink-700">
                    <th className="text-left py-3 px-4 text-ink-700 dark:text-ink-300 font-bold">{t('currencyConverter.colDynasty')}</th>
                    <th className="text-left py-3 px-4 text-ink-700 dark:text-ink-300 font-bold">{t('currencyConverter.colPeriod')}</th>
                    <th className="text-left py-3 px-4 text-ink-700 dark:text-ink-300 font-bold">{t('currencyConverter.colCurrency')}</th>
                    <th className="text-right py-3 px-4 text-ink-700 dark:text-ink-300 font-bold">{t('currencyConverter.colRicePerGuan')}</th>
                    <th className="text-right py-3 px-4 text-ink-700 dark:text-ink-300 font-bold">{t('currencyConverter.colClothPerGuan')}</th>
                    <th className="text-right py-3 px-4 text-ink-700 dark:text-ink-300 font-bold">{t('currencyConverter.colMeatPerGuan')}</th>
                  </tr>
                </thead>
                <tbody>
                  {DYNASTY_CURRENCIES.map((currency, idx) => (
                    <tr key={idx} className="border-b border-ink-100 dark:border-ink-800 hover:bg-ink-50 dark:hover:bg-ink-800/50">
                      <td className="py-3 px-4 font-bold text-ink-900 dark:text-ink-100">
                        {currency.dynasty}
                      </td>
                      <td className="py-3 px-4 text-ink-600 dark:text-ink-400">
                        {currency.period}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          currency.currencyType === 'coins' ? 'bg-yellow-100 text-yellow-800' :
                          currency.currencyType === 'paper' ? 'bg-blue-100 text-blue-800' :
                          'bg-silver-100 text-silver-800'
                        }`}>
                          {currency.currencyType === 'coins' ? t('currencyConverter.currencyCoins') :
                           currency.currencyType === 'paper' ? t('currencyConverter.currencyPaper') : t('currencyConverter.currencySilver')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        {currency.ricePricePerGuan.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        {currency.clothPricePerGuan.toFixed(1)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        {currency.meatPricePerGuan.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-xs text-ink-500">
              ⚠️ {t('currencyConverter.priceNote')}
            </div>
          </div>

          {/* 货币单位说明 */}
          <div className="info-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-6">
              📚 {t('currencyConverter.unitExplainTitle')}
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">{t('currencyConverter.guan')}</h3>
                <p className="text-ink-600 dark:text-ink-400">
                  {t('currencyConverter.guanDesc')}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">{t('currencyConverter.wen')}</h3>
                <p className="text-ink-600 dark:text-ink-400">
                  {t('currencyConverter.wenDesc')}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">{t('currencyConverter.liang')}</h3>
                <p className="text-ink-600 dark:text-ink-400">
                  {t('currencyConverter.liangDesc')}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">{t('currencyConverter.goldSilverRatio')}</h3>
                <p className="text-ink-600 dark:text-ink-400">
                  {t('currencyConverter.goldSilverDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
