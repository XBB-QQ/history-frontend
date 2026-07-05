/**
 * 货币购买力换算器 — 跨朝代物价与货币价值对比
 * @see history-museum/ITERATIONS.md Iteration #70
 *
 * 使用 src/data/features/currencyData.ts 数据
 * 支持多种朝代、货币类型与实物价格对比
 */

import React, { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { DYNASTY_CURRENCIES, calculatePurchasingPower, type PurchasingPower } from '@/data/features/currencyData';

import './CurrencyConverterPage.module.css';

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState<string>('');
  const [dynasty, setDynasty] = useState<string>(DYNASTY_CURRENCIES[DYNASTY_CURRENCIES.length - 1].dynasty);
  const [type, setType] = useState<'rice' | 'flour' | 'cloth' | 'meat' | 'wine' | 'custom'>('rice');
  const [customItem, setCustomItem] = useState<string>('');
  const [customPrice, setCustomPrice] = useState<string>('1000');
  
  // 计算购买力
  const result = useMemo<PurchasingPower>(() => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return null;
    }
    
    if (type === 'custom') {
      const numPrice = parseFloat(customPrice);
      if (isNaN(numPrice) || numPrice <= 0) {
        return null;
      }
      return calculatePurchasingPower(numAmount, dynasty, 'custom');
    }
    
    return calculatePurchasingPower(numAmount, dynasty, type);
  }, [amount, dynasty, type, customPrice]);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <SectionHeader
        label="CURRENCY"
        title="货币购买力换算器"
        description="穿越时空，了解古代货币的实际价值"
      />

      <RevealOnScroll>
        <div className="converter-container max-w-4xl mx-auto">
          {/* 换算器卡片 */}
          <div className="converter-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-6">
              📊 货币换算工具
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                    输入金额（贯）
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="例如：100"
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                    选择朝代
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
                    选择商品类型
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="input-field w-full"
                  >
                    <option value="rice">🍚 大米</option>
                    <option value="flour">🌾 面粉</option>
                    <option value="cloth">🧵 布匹</option>
                    <option value="meat">🥩 猪肉</option>
                    <option value="wine">🍶 酒</option>
                    <option value="custom">🎯 自定义</option>
                  </select>
                </div>

                {type === 'custom' && (
                  <div>
                    <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                      自定义商品价格（贯）
                    </label>
                    <input
                      type="number"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      placeholder="例如：500"
                      className="input-field w-full"
                    />
                    <p className="text-xs text-ink-500 mt-1">
                      ⚠️ 用于估算当前可购买数量
                    </p>
                  </div>
                )}
              </div>

              <div className="result-area space-y-4">
                {result ? (
                  <>
                    <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                      <div className="text-sm text-ink-600 dark:text-ink-400 mb-1">
                        折合现代人民币
                      </div>
                      <div className="text-3xl font-bold text-accent">
                        ¥{result.yuanValue.toLocaleString()}
                      </div>
                      <div className="text-xs text-ink-500 mt-1">
                        (基于大米价格 ¥3/斤)
                      </div>
                    </div>

                    {type === 'rice' && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                            <div className="text-xs text-ink-500">可购买大米</div>
                            <div className="text-xl font-bold text-ink-900 dark:text-ink-100">
                              {result.riceAmount.toLocaleString()} 斤
                            </div>
                          </div>
                          <div className="p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                            <div className="text-xs text-ink-500">可购买米袋</div>
                            <div className="text-xl font-bold text-ink-900 dark:text-ink-100">
                              {Math.floor(result.riceAmount / 100)} 袋
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                          <div className="text-sm text-ink-700 dark:text-ink-300">
                            💡 这是一个现代人穿越到这个朝代，拿着 {result.amount} 贯，
                            <br/>可以购买 {result.riceAmount.toLocaleString()} 斤大米。
                          </div>
                        </div>
                      </>
                    )}

                    {type === 'flour' && (
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                        <div className="text-sm text-ink-700 dark:text-ink-300">
                          💡 你可以购买 {result.flourAmount.toLocaleString()} 斤面粉，
                          <br/>足够制作 {Math.floor(result.flourAmount / 50)} 个馒头。
                        </div>
                      </div>
                    )}

                    {type === 'cloth' && (
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                        <div className="text-sm text-ink-700 dark:text-ink-300">
                          💡 你可以购买 {result.clothAmount.toFixed(2)} 匹布匹，
                          <br/>足够制作 {Math.floor(result.clothAmount)} 件衣服。
                        </div>
                      </div>
                    )}

                    {type === 'meat' && (
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                        <div className="text-sm text-ink-700 dark:text-ink-300">
                          💡 你可以购买 {result.meatAmount.toFixed(2)} 斤猪肉，
                          <br/>足以制作 {Math.floor(result.meatAmount / 3)} 份红烧肉大餐。
                        </div>
                      </div>
                    )}

                    {type === 'wine' && (
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                        <div className="text-sm text-ink-700 dark:text-ink-300">
                          💡 你可以购买 {result.wineAmount.toFixed(2)} 斤酒，
                          <br/>足够招待 {Math.floor(result.wineAmount / 10)} 位客人。
                        </div>
                      </div>
                    )}

                    {type === 'custom' && (
                      <div className="p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                        <div className="text-xs text-ink-500">可购买自定义商品</div>
                        <div className="text-xl font-bold text-ink-900 dark:text-ink-100">
                          {result.riceAmount.toFixed(0)} 斤当量
                        </div>
                        <div className="text-xs text-ink-500 mt-1">
                          (基于该朝代大米价格折算)
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                    <div className="p-8 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-center">
                      <div className="text-4xl mb-2">⚠️</div>
                      <div className="text-ink-600 dark:text-ink-400">
                        请输入有效的金额
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* 历史价格对比表 */}
          <div className="price-table-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-6">
              📈 不同朝代物价对比
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-200 dark:border-ink-700">
                    <th className="text-left py-3 px-4 text-ink-700 dark:text-ink-300 font-bold">朝代</th>
                    <th className="text-left py-3 px-4 text-ink-700 dark:text-ink-300 font-bold">时期</th>
                    <th className="text-left py-3 px-4 text-ink-700 dark:text-ink-300 font-bold">货币</th>
                    <th className="text-right py-3 px-4 text-ink-700 dark:text-ink-300 font-bold">1贯=斤米</th>
                    <th className="text-right py-3 px-4 text-ink-700 dark:text-ink-300 font-bold">1贯=匹布</th>
                    <th className="text-right py-3 px-4 text-ink-700 dark:text-ink-300 font-bold">1贯=斤肉</th>
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
                          {currency.currencyType === 'coins' ? '铜钱' :
                           currency.currencyType === 'paper' ? '纸币' : '白银'}
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
              ⚠️ 注：价格基于历史文献记录的大致均值，实际价格会因地区、季节等因素波动。
            </div>
          </div>

          {/* 货币单位说明 */}
          <div className="info-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-6">
              📚 货币单位说明
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">贯</h3>
                <p className="text-ink-600 dark:text-ink-400">
                  贯是古代最常见的货币单位。1贯 = 1000文铜钱。
                  在宋朝及以后，纸币（交子、会子）和白银成为主要货币，但"贯"仍然被广泛使用。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">文</h3>
                <p className="text-ink-600 dark:text-ink-400">
                  文是最小的货币单位，1文 = 1文铜钱。
                  在古代，一文钱可以购买1升米（约1斤）。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">两</h3>
                <p className="text-ink-600 dark:text-ink-400">
                  两是重量单位，在宋朝及以后成为主要货币单位。
                  1两 = 10钱 = 100分。
                  一两银子大约相当于1贯铜钱或1000文。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">金银比例</h3>
                <p className="text-ink-600 dark:text-ink-400">
                  各朝代金银比价不同。一般来说：
                  <br/>• 唐朝：1两金 = 4两银
                  <br/>• 宋朝：1两金 = 2两银
                  <br/>• 元朝：1两金 = 1两银（黄金开始成为主要货币）
                  <br/>• 明清：1两金 = 0.5~0.8两银
                </p>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
