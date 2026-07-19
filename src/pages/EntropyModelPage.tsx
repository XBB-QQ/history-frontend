import React, { useState, useMemo } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import RevealOnScroll from '../components/common/RevealOnScroll';
import {
  CIVILIZATIONS,
  CIVILIZATION_STATUS,
  getEntropyLevel,
  predictTimeline,
  PREDICTION_SCENARIOS,
  type PredictionScenario,
} from '../data/features/entropyModelData';
import { useT } from '@/i18n/i18n';

const EntropyModelPage: React.FC = () => {
  const t = useT();
  const [selectedCivilization, setSelectedCivilization] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<PredictionScenario | null>(null);
  const [currentYear] = useState<number>(new Date().getFullYear());
  const [predictionYears, setPredictionYears] = useState<number>(100);
  const [predictedTimeline, setPredictedTimeline] = useState<any[]>([]);

  // 选择文明
  const selectedCiv = useMemo(() => {
    return selectedCivilization
      ? CIVILIZATIONS.find(c => c.id === selectedCivilization)
      : null;
  }, [selectedCivilization]);

  // 熵值可视化
  const entropyColor = useMemo(() => {
    if (!selectedCiv) return 'bg-gray-200';
    const entropy = selectedCiv.entropy;
    if (entropy < 40) return 'bg-gradient-to-r from-green-300 to-yellow-400';
    if (entropy < 70) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    return 'bg-gradient-to-r from-orange-500 to-red-600';
  }, [selectedCiv]);

  // 计算熵值
  const entropyValue = selectedCiv?.entropy || 0;
  const entropyLevel = selectedCiv ? getEntropyLevel(entropyValue) : CIVILIZATION_STATUS[0];

  // 预测时间序列
  const handlePredict = () => {
    if (selectedCiv) {
      const timeline = predictTimeline(entropyValue, predictionYears, {
        innovation: 60,
        organization: 70,
        stability: 80
      });
      setPredictedTimeline(timeline);
    }
  };

  // 重置预测
  const handleReset = () => {
    setPredictedTimeline([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-orange-100 dark:from-ink-950 dark:via-ink-950 dark:to-ink-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label={t('entropyModel.label')} title={t('entropyModel.title')} description={t('entropyModel.description')} />

        {/* 文明选择区域 */}
        <div className="mb-8">
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {CIVILIZATIONS.map((civ) => (
                <button
                  key={civ.id}
                  onClick={() => setSelectedCivilization(civ.id)}
                  className={`p-4 rounded-xl shadow-md transition-all duration-300 ${
                    selectedCivilization === civ.id
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg transform scale-105'
                      : 'bg-white dark:bg-ink-800 hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <h3 className="font-bold text-lg">{civ.name}</h3>
                  <p className="text-sm opacity-80">{civ.dynasty}</p>
                  <p className="text-xs mt-1 opacity-70">{civ.period}</p>
                  <div className="mt-2 text-xs">
                    {t('entropyModel.entropy_label')}: <span className="font-bold">{civ.entropy}</span>
                  </div>
                </button>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {selectedCiv && (
          <>
            {/* 熵值展示 */}
            <div className="mb-8">
              <RevealOnScroll>
                <div className="bg-white dark:bg-ink-800 rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-ink-100 mb-6">
                    {t('entropyModel.entropy_analysis', { name: selectedCiv.name })}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 熵值可视化 */}
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-medium text-gray-700 dark:text-ink-200">
                          {t('entropyModel.civilization_entropy', { value: entropyValue })}
                        </span>
                        <span className="text-lg font-bold px-4 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                          {entropyLevel.name}
                        </span>
                      </div>
                      <div className={`h-8 rounded-full ${entropyColor} shadow-inner`}>
                        <div
                          className={`h-full rounded-full ${entropyColor} shadow-inner transition-all duration-1000`}
                          style={{ width: `${entropyValue}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-ink-300 mt-2">
                        {entropyLevel.description}
                      </p>
                    </div>

                    {/* 关键特征 */}
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-ink-100 mb-4">{t('entropyModel.key_features')}</h3>
                      <ul className="space-y-2">
                        {selectedCiv.keyFeatures.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-ink-700/60 rounded-lg"
                          >
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span className="text-sm text-gray-700 dark:text-ink-200">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 挑战与创新 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-ink-100 mb-3">{t('entropyModel.challenges')}</h3>
                      <ul className="space-y-2">
                        {selectedCiv.challenges.map((challenge, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg"
                          >
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-sm text-gray-700 dark:text-ink-200">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-ink-100 mb-3">{t('entropyModel.innovation')}</h3>
                      <ul className="space-y-2">
                        {selectedCiv.innovation.map((innovation, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg"
                          >
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-sm text-gray-700 dark:text-ink-200">{innovation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 历史时间线 */}
                  <div className="mt-6">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-ink-100 mb-4">{t('entropyModel.timeline_title')}</h3>
                    <div className="space-y-3">
                      {selectedCiv.timeline.map((event, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                            index % 2 === 0 ? 'bg-gray-50 dark:bg-ink-700/50' : 'bg-amber-50 dark:bg-ink-700/80'
                          }`}
                        >
                          <div className="flex-shrink-0">
                            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                              {event.year}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 dark:text-ink-100">{event.event}</p>
                            <p className="text-sm text-gray-600 dark:text-ink-300">{event.impact}</p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded ${
                                event.entropyChange > 0
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                  : event.entropyChange < 0
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                  : 'bg-gray-200 dark:bg-ink-700 text-gray-700 dark:text-ink-300'
                              }`}
                            >
                              {event.entropyChange > 0 ? '↑' : event.entropyChange < 0 ? '↓' : '→'}
                              {Math.abs(event.entropyChange)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* 预测功能 */}
            <div className="mb-8">
              <RevealOnScroll>
                <div className="bg-white dark:bg-ink-800 rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-ink-100 mb-6">
                    {t('entropyModel.prediction_title')}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 预测参数 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-ink-200 mb-2">
                        {t('entropyModel.prediction_years_label')}
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="200"
                        value={predictionYears}
                        onChange={(e) => setPredictionYears(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-ink-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-ink-400 mt-1">
                        <span>10{t('entropyModel.years_unit')}</span>
                        <span>{predictionYears}{t('entropyModel.years_unit')}</span>
                        <span>200{t('entropyModel.years_unit')}</span>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex items-end gap-3">
                      <button
                        onClick={handlePredict}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
                      >
                        {t('entropyModel.predict_btn')}
                      </button>
                      {predictedTimeline.length > 0 && (
                        <button
                          onClick={handleReset}
                          className="bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all shadow-md"
                        >
                          {t('entropyModel.reset_btn')}
                        </button>
                      )}
                    </div>

                    {/* 预测结果统计 */}
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-ink-100 mb-2">{t('entropyModel.prediction_result')}</h3>
                      {predictedTimeline.length > 0 ? (
                        <div className="text-sm">
                          <p className="text-amber-600 dark:text-amber-400 font-bold">
                            {t('entropyModel.prediction_period', { count: predictedTimeline.length })}
                          </p>
                          <p className="text-gray-600 dark:text-ink-300">
                            {t('entropyModel.prediction_range', { min: Math.min(...predictedTimeline.map(tl => tl.entropyChange)), max: Math.max(...predictedTimeline.map(tl => tl.entropyChange)) })}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-ink-400">
                          {t('entropyModel.prediction_empty')}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 预测时间线展示 */}
                  {predictedTimeline.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-ink-100 mb-4">
                        {t('entropyModel.timeline_prediction', { start: currentYear, end: currentYear + predictionYears })}
                      </h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {predictedTimeline.map((timeline, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-4 p-3 rounded-lg ${
                              index % 2 === 0 ? 'bg-gray-50 dark:bg-ink-700/50' : 'bg-amber-50 dark:bg-ink-700/80'
                            }`}
                          >
                            <span className="w-16 text-sm font-bold text-gray-600 dark:text-ink-300">
                              {timeline.year}
                            </span>
                            <span className="flex-1 text-sm text-gray-800 dark:text-ink-100">
                              {timeline.event || t('entropyModel.timeline_continuous')}
                            </span>
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded ${
                                timeline.entropyChange > 0
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                  : timeline.entropyChange < 0
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                  : 'bg-gray-200 dark:bg-ink-700 text-gray-700 dark:text-ink-300'
                              }`}
                            >
                              {timeline.entropyChange > 0 ? '↑' : timeline.entropyChange < 0 ? '↓' : '→'}
                              {Math.abs(timeline.entropyChange)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            </div>

            {/* 场景模拟 */}
            <div className="mb-8">
              <RevealOnScroll>
                <div className="bg-white dark:bg-ink-800 rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-ink-100 mb-6">
                    {t('entropyModel.scenario_title')}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PREDICTION_SCENARIOS.map((scenario) => (
                      <button
                        key={scenario.id}
                        onClick={() => setSelectedScenario(scenario)}
                        className={`p-4 rounded-xl transition-all duration-300 ${
                          selectedScenario?.id === scenario.id
                            ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg transform scale-105'
                            : 'bg-gray-50 dark:bg-ink-700/50 hover:shadow-lg hover:scale-105'
                        }`}
                      >
                        <h3 className="font-bold text-lg mb-2">{scenario.name}</h3>
                        <p className="text-sm opacity-80 mb-3">{scenario.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs opacity-70">{t('entropyModel.scenario_probability', { probability: scenario.probability })}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            scenario.riskLevel === 'low'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : scenario.riskLevel === 'medium'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          }`}>
                            {scenario.riskLevel}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* 场景详情 */}
            {selectedScenario && (
              <div className="mb-8">
                <RevealOnScroll>
                  <div className="bg-white dark:bg-ink-800 rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-ink-100 mb-6">
                      {t('entropyModel.scenario_detail', { name: selectedScenario.name })}
                    </h2>

                    <p className="text-gray-700 dark:text-ink-200 mb-6">{selectedScenario.description}</p>

                    {/* 变量调整 */}
                    <div className="mb-6">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-ink-100 mb-4">{t('entropyModel.variables_title')}</h3>
                      <div className="space-y-4">
                        {selectedScenario.variables.map((variable: any) => (
                          <div key={variable.name}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium text-gray-700 dark:text-ink-200">{variable.name}</span>
                              <span className="text-amber-600 dark:text-amber-400 font-bold">{variable.value}</span>
                            </div>
                            <input
                              type="range"
                              min={variable.min}
                              max={variable.max}
                              value={variable.value}
                              onChange={(e) => {
                                const newScenario = {
                                  ...selectedScenario,
                                  variables: selectedScenario.variables.map((v: any) =>
                                    v.name === variable.name ? { ...v, value: Number(e.target.value) } : v
                                  )
                                };
                                setSelectedScenario(newScenario);
                              }}
                              className="w-full h-2 bg-gray-200 dark:bg-ink-700 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 预测结果 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-ink-100 mb-2">{t('entropyModel.predicted_entropy')}</h3>
                        <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{selectedScenario.predictedEntropy}</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-ink-100 mb-2">{t('entropyModel.predicted_year')}</h3>
                        <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{selectedScenario.predictedYear}</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-ink-100 mb-2">{t('entropyModel.predicted_status')}</h3>
                        <p className="text-xl font-bold px-4 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                          {selectedScenario.predictedStatus.name}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedScenario(null)}
                      className="mt-6 bg-gray-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-600 transition-all"
                    >
                      {t('entropyModel.close')}
                    </button>
                  </div>
                </RevealOnScroll>
              </div>
            )}

            {/* 熵值等级详解 */}
            <div>
              <RevealOnScroll>
                <div className="bg-white dark:bg-ink-800 rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-ink-100 mb-6">
                    {t('entropyModel.levels_title')}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {CIVILIZATION_STATUS.map((status) => (
                      <div
                        key={status.level}
                        className={`p-4 rounded-xl transition-all ${
                          status.level === 5 ? 'bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30' :
                          status.level === 4 ? 'bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30' :
                          'bg-gradient-to-br from-gray-100 to-gray-50 dark:from-ink-700/60 dark:to-ink-700/30'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                            {status.level}
                          </span>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-ink-100">{status.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-ink-300 mb-3">{status.description}</p>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-gray-500 dark:text-ink-400">{t('entropyModel.characteristics_label')}</p>
                          <ul className="text-xs space-y-1">
                            {status.characteristics.map((char, idx) => (
                              <li key={idx} className="text-gray-600 dark:text-ink-300">• {char}</li>
                            ))}
                          </ul>
                          <p className="text-xs font-medium text-gray-500 dark:text-ink-400 mt-2">{t('entropyModel.examples_label')}</p>
                          <ul className="text-xs space-y-1">
                            {status.historicalExamples.map((example, idx) => (
                              <li key={idx} className="text-gray-600 dark:text-ink-300">• {example}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EntropyModelPage;
