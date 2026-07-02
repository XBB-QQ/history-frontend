import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HISTORICAL_EVENTS,
  TIMELINE_EVENTS,
  PREDICTION_SCENARIOS,
  FUTURE_EVENTS,
  PredictionScenario,
  PredictionVariable
} from '../data/features/futurePredictionData';
import SectionHeader from '../components/common/SectionHeader';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { FaHistory, FaChartLine, FaLightbulb, FaGlobe, FaClock, FaCheckCircle, FaExclamationTriangle, FaBomb, FaRocket, FaBalanceScale, FaBrain } from 'react-icons/fa';

const FuturePredictionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'future' | 'scenario'>('timeline');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedVariable, setSelectedVariable] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<any | null>(null);
  const [isScenarioRunning, setIsScenarioRunning] = useState(false);

  const historicalEvents = useMemo(() => HISTORICAL_EVENTS, []);
  const timelineEvents = useMemo(() => TIMELINE_EVENTS, []);
  const futureEvents = useMemo(() => FUTURE_EVENTS, []);
  const scenarios = useMemo(() => PREDICTION_SCENARIOS, []);

  const selectedEventData = useMemo(() => {
    return historicalEvents.find(e => e.id === selectedEvent);
  }, [selectedEvent]);

  const selectedScenarioData = useMemo(() => {
    return scenarios.find(s => s.id === selectedScenario);
  }, [selectedScenario]);

  const currentVariable = useMemo(() => {
    if (!selectedScenarioData || !selectedVariable) return null;
    return selectedScenarioData.variables.find(v => v.id === selectedVariable);
  }, [selectedScenarioData, selectedVariable]);

  const runScenario = () => {
    if (!selectedScenarioData) return;
    setIsScenarioRunning(true);
    setPredictionResult(null);

    // 模拟场景运行
    setTimeout(() => {
      const result = selectedScenarioData.scenarios[Math.floor(Math.random() * selectedScenarioData.scenarios.length)];
      setPredictionResult(result);
      setIsScenarioRunning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <SectionHeader
            title="历史预言板"
            subtitle="回顾历史关键事件，展望未来可能性"
            icon={<FaHistory className="w-12 h-12 text-cyan-500" />}
            gradient="from-cyan-500 to-blue-500"
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'timeline'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaChartLine />
              历史时间线
            </button>
            <button
              onClick={() => setActiveTab('future')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'future'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaLightbulb />
              未来预测
            </button>
            <button
              onClick={() => setActiveTab('scenario')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'scenario'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaBrain />
              情景推演
            </button>
          </div>
        </RevealOnScroll>

        <AnimatePresence mode="wait">
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <RevealOnScroll>
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaHistory className="text-cyan-500" />
                    历史关键事件
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
                    {historicalEvents.map(event => (
                      <div
                        key={event.id}
                        onClick={() => setSelectedEvent(event.id)}
                        className={`p-4 rounded-xl cursor-pointer transition-all ${
                          selectedEvent === event.id
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg transform scale-105'
                            : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-cyan-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg">{event.displayName}</h4>
                          <span className={`text-xs px-2 py-1 rounded ${
                            event.type === 'political' ? 'bg-red-100 text-red-700' :
                            event.type === 'economic' ? 'bg-green-100 text-green-700' :
                            event.type === 'social' ? 'bg-yellow-100 text-yellow-700' :
                            event.type === 'technological' ? 'bg-purple-100 text-purple-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {event.type === 'political' ? '政治' : event.type === 'economic' ? '经济' : event.type === 'social' ? '社会' : event.type === 'technological' ? '技术' : '环境'}
                          </span>
                        </div>
                        <p className="text-sm opacity-90 mb-2">{event.year}年</p>
                        <p className="text-sm opacity-90 mb-3">{event.region}</p>
                        <p className="text-sm opacity-75 line-clamp-2">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {selectedEventData && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-2xl shadow-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedEventData.displayName}</h3>
                          <p className="text-gray-600">{selectedEventData.year}年 - {selectedEventData.region}</p>
                        </div>
                        <button
                          onClick={() => setSelectedEvent(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-cyan-50 rounded-xl p-4">
                          <p className="text-sm text-cyan-600 mb-1">事件类型</p>
                          <p className="font-bold text-cyan-800">
                            {selectedEventData.type === 'political' ? '政治变革' : selectedEventData.type === 'economic' ? '经济变革' : selectedEventData.type === 'social' ? '社会变革' : selectedEventData.type === 'technological' ? '技术革命' : '环境事件'}
                          </p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4">
                          <p className="text-sm text-blue-600 mb-1">发生概率</p>
                          <p className="font-bold text-blue-800">{selectedEventData.probability}%</p>
                        </div>
                        <div className="bg-indigo-50 rounded-xl p-4">
                          <p className="text-sm text-indigo-600 mb-1">预言者</p>
                          <p className="font-bold text-indigo-800">{selectedEventData.predictedBy.join(', ')}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-bold text-gray-800 mb-2">事件描述</h4>
                        <p className="text-gray-700">{selectedEventData.description}</p>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-bold text-gray-800 mb-2">历史影响</h4>
                        <p className="text-gray-700">{selectedEventData.impact}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">主要后果</h4>
                        <ul className="space-y-1">
                          {selectedEventData.consequences.map((consequence, index) => (
                            <li key={index} className="text-gray-700 text-sm">✓ {consequence}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                        <p className="text-sm text-cyan-800">该事件改变了历史的进程，对后世产生了深远影响。</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </RevealOnScroll>
            </motion.div>
          )}

          {activeTab === 'future' && (
            <motion.div
              key="future"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <RevealOnScroll>
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaLightbulb className="text-cyan-500" />
                    未来事件预测
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {futureEvents.map(event => (
                      <div
                        key={event.id}
                        className={`p-4 rounded-xl border-2 ${
                          event.probability > 70
                            ? 'border-green-400 bg-green-50'
                            : event.probability > 40
                            ? 'border-yellow-400 bg-yellow-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-800">{event.event}</h4>
                          <span className={`text-xs px-2 py-1 rounded ${
                            event.probability > 70 ? 'bg-green-100 text-green-700' :
                            event.probability > 40 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {event.likelihood}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{event.year}年</p>
                        <p className="text-sm text-gray-700 mb-2">{event.type}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-gray-500">概率：</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${event.probability}%`,
                                backgroundColor: event.probability > 70 ? '#22c55e' : event.probability > 40 ? '#f59e0b' : '#6b7280'
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-700">{event.probability}%</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {event.factors.slice(0, 2).map(factor => (
                            <span key={factor} className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded">
                              {factor}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaClock className="text-cyan-500" />
                    历史与未来的对话
                  </h3>
                  <p className="text-gray-700 mb-4">
                    历史是过去的预言，未来是现在的延续。通过回顾历史上的关键事件，我们可以更好地理解历史的规律，预测未来的可能性。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-bold text-gray-800 mb-2">历史教训</h4>
                      <p className="text-sm text-gray-600">历史教会我们避免重复错误，总结经验教训，为未来发展提供指导。</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-bold text-gray-800 mb-2">未来启示</h4>
                      <p className="text-sm text-gray-600">通过分析历史事件的发生原因和影响，我们可以预测类似事件在未来可能发生的时间和概率。</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-bold text-gray-800 mb-2">人类责任</h4>
                      <p className="text-sm text-gray-600">历史是由人类创造的，未来的走向掌握在我们手中，我们的选择将决定历史的走向。</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </motion.div>
          )}

          {activeTab === 'scenario' && (
            <motion.div
              key="scenario"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <RevealOnScroll>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FaBrain className="text-cyan-500" />
                      选择情景
                    </h3>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                      {scenarios.map(scenario => (
                        <div
                          key={scenario.id}
                          onClick={() => setSelectedScenario(scenario.id)}
                          className={`p-4 rounded-xl cursor-pointer transition-all ${
                            selectedScenario === scenario.id
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                              : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                          }`}
                        >
                          <h4 className="font-bold">{scenario.title}</h4>
                          <p className="text-sm opacity-90 mb-2">{scenario.description}</p>
                          <p className="text-xs opacity-75">起始点：{scenario.startingPoint}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                    {selectedScenarioData && (
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedScenarioData.title}</h3>
                        <p className="text-gray-600 mb-4">{selectedScenarioData.description}</p>

                        <div className="mb-4">
                          <h4 className="font-bold text-gray-800 mb-3">预测变量</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {selectedScenarioData.variables.map(variable => (
                              <div
                                key={variable.id}
                                onClick={() => setSelectedVariable(variable.id)}
                                className={`p-4 rounded-xl cursor-pointer transition-all ${
                                  selectedVariable === variable.id
                                    ? 'bg-cyan-50 border-2 border-cyan-400'
                                    : 'bg-gray-50 hover:bg-gray-100'
                                }`}
                              >
                                <p className="font-bold text-gray-800 mb-2">{variable.name}</p>
                                <p className="text-sm text-gray-600 mb-2">{variable.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-500">当前值：{variable.currentValue}</span>
                                  <span className={`text-xs px-2 py-1 rounded ${
                                    variable.trend === 'increasing' ? 'bg-red-100 text-red-700' :
                                    variable.trend === 'decreasing' ? 'bg-green-100 text-green-700' :
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {variable.trend === 'increasing' ? '上升' : variable.trend === 'decreasing' ? '下降' : '稳定'}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {currentVariable && (
                          <div className="mb-4 p-4 bg-cyan-50 rounded-xl">
                            <h4 className="font-bold text-gray-800 mb-2">{currentVariable.name}</h4>
                            <p className="text-sm text-gray-600">{currentVariable.description}</p>
                          </div>
                        )}

                        <div className="flex gap-4">
                          <button
                            onClick={runScenario}
                            disabled={isScenarioRunning}
                            className="px-6 py-3 rounded-xl font-bold text-white transition-all bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isScenarioRunning ? '运行中...' : '运行预测'}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedScenario(null);
                              setSelectedVariable(null);
                              setPredictionResult(null);
                            }}
                            className="px-6 py-3 rounded-xl font-bold text-white transition-all bg-gray-500 hover:bg-gray-600"
                          >
                            重置
                          </button>
                        </div>
                      </div>
                    )}

                    <AnimatePresence>
                      {predictionResult && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="mt-6"
                        >
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                            <h4 className="text-xl font-bold text-green-800 mb-4">{predictionResult.title}</h4>
                            <p className="text-gray-700 mb-4">{predictionResult.description}</p>
                            <div className="flex gap-4 mb-4">
                              <div className="bg-white rounded-lg p-3 flex-1">
                                <p className="text-sm text-gray-600">预计发生年份</p>
                                <p className="font-bold text-green-700">{predictionResult.yearsToEvent}年后</p>
                              </div>
                              <div className="bg-white rounded-lg p-3 flex-1">
                                <p className="text-sm text-gray-600">发生概率</p>
                                <p className="font-bold text-green-700">{predictionResult.probability}%</p>
                              </div>
                            </div>
                            <h5 className="font-bold text-gray-800 mb-2">关键变化</h5>
                            <ul className="space-y-1">
                              {predictionResult.keyChanges.map((change, index) => (
                                <li key={index} className="text-gray-700 text-sm">• {change}</li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </RevealOnScroll>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FuturePredictionPage;
