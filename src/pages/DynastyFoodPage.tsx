import { useState } from 'react';
import { DYNASTY_FOODS } from '@/data/dynastyFood';
import type { FoodItem } from '@/data/dynastyFood';

export default function DynastyFoodPage() {
  const [selectedDynasty, setSelectedDynasty] = useState<string>('tang');
  const [selectedDish, setSelectedDish] = useState<FoodItem | null>(null);

  const dynastyData = DYNASTY_FOODS.find(d => d.dynastyId === selectedDynasty);
  if (!dynastyData) return null;

  const dish = selectedDish || dynastyData.representativeDish;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif">
            🍜 历代饮食食谱
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            "吃"是最接地气的历史入口 — 从汉朝胡饼到清代满汉全席
          </p>
        </div>

        {/* 朝代选择 */}
        <div className="flex gap-3 mb-8 justify-center">
          {DYNASTY_FOODS.map(d => (
            <button
              key={d.dynastyId}
              onClick={() => { setSelectedDynasty(d.dynastyId); setSelectedDish(null); }}
              className={`px-5 py-3 rounded-xl font-bold transition-all border-2 ${
                selectedDynasty === d.dynastyId
                  ? 'border-accent bg-accent text-white'
                  : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:border-accent/50'
              }`}
            >
              <span className="mr-1">{d.icon}</span>
              {d.dynastyName}
            </button>
          ))}
        </div>

        {/* 朝代概述 */}
        <div className="p-5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50/50 dark:bg-ink-800/50 mb-6">
          <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-100 mb-2">
            {dynastyData.icon} {dynastyData.dynastyName}朝饮食文化
          </h2>
          <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
            {dynastyData.description}
          </p>
        </div>

        {/* 菜品列表 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {dynastyData.dishes.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDish(d)}
              className={`p-4 rounded-xl border transition-all text-center ${
                dish.name === d.name
                  ? 'border-accent bg-accent/10 dark:bg-accent/5'
                  : 'border-ink-200 dark:border-ink-700 hover:border-accent/50'
              }`}
            >
              <span className="text-2xl">{d.icon}</span>
              <div className="text-sm font-bold text-ink-800 dark:text-ink-200 mt-2">{d.name}</div>
            </button>
          ))}
        </div>

        {/* 菜品详情 */}
        <div className="p-6 rounded-xl border-2 border-accent/30 bg-accent/10 dark:bg-accent/5">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{dish.icon}</span>
            <h3 className="text-2xl font-serif font-bold text-ink-900 dark:text-ink-100">{dish.name}</h3>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">🥘 食材</h4>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map(ing => (
                <span key={ing} className="px-3 py-1 rounded-lg bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-400 text-xs font-bold">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed mb-4">
            {dish.description}
          </p>

          <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-900/20">
            <h4 className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-2">📜 历史注记</h4>
            <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed italic">
              {dish.historicalNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
