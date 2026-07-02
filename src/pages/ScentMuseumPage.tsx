import { useState, useMemo } from 'react';
import { SectionHeader, RevealOnScroll } from '@/components/common';
import { HISTORICAL_SCENTS, SCENTS_BY_DYNASTY, POPULAR_SCENTS, ENERGY_COLORS } from '@/data/features/scentData';

const ScentMuseumPage = () => {
  const [selectedDynasty, setSelectedDynasty] = useState('全部');
  const [selectedEnergy, setSelectedEnergy] = useState('全部');
  const [selectedScent, setSelectedScent] = useState<typeof HISTORICAL_SCENTS[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dynastyOptions = ['全部', ...Object.keys(SCENTS_BY_DYNASTY).map(d => d.toUpperCase()).map(d => ({
    value: d,
    label: d
  }))];

  const energyOptions = [
    { value: '全部', label: '全部能量' },
    { value: 'calm', label: '宁静' },
    { value: 'energetic', label: '活力' },
    { value: 'grand', label: '宏大' }
  ];

  const filteredScents = useMemo(() => {
    return HISTORICAL_SCENTS.filter(scent => {
      const matchDynasty = selectedDynasty === '全部' || SCENTS_BY_DYNASTY[selectedDynasty]?.includes(scent);
      const matchEnergy = selectedEnergy === '全部' || scent.energy === selectedEnergy;
      return matchDynasty && matchEnergy;
    });
  }, [selectedDynasty, selectedEnergy]);

  const handleScentClick = (scent: typeof HISTORICAL_SCENTS[0]) => {
    setSelectedScent(scent);
    setIsModalOpen(true);
  };

  const closeScentModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedScent(null), 300);
  };

  const getEnergyBadge = (energy: string) => {
    const badges: Record<string, { bg: string; text: string; icon: string }> = {
      calm: { bg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', icon: '🍃' },
      energetic: { bg: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300', icon: '⚡' },
      grand: { bg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300', icon: '🏛️' },
      melancholy: { bg: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300', icon: '🌙' },
      intimate: { bg: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300', icon: '❤️' }
    };
    return badges[energy] || { bg: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300', icon: '✨' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 dark:from-amber-900 dark:via-orange-900 dark:to-amber-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">历史气味博物馆</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            穿越时空的嗅觉之旅，感受千年文明的独特气息
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 -mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  🏛️ 朝代时期
                </label>
                <select
                  value={selectedDynasty}
                  onChange={(e) => setSelectedDynasty(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  {dynastyOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  💫 能量氛围
                </label>
                <select
                  value={selectedEnergy}
                  onChange={(e) => setSelectedEnergy(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  {energyOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 pt-2">
              共找到 <span className="font-bold text-amber-600 dark:text-amber-400">{filteredScents.length}</span> 个历史气味
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Popular Scents Section */}
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <SectionHeader title="🔥 推荐气味" subtitle="精选最具代表性的历史气味" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_SCENTS.map((scent, index) => (
              <ScentCard
                key={scent.id}
                scent={scent}
                index={index}
                onClick={handleScentClick}
              />
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* All Scents Section */}
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 pb-16">
          <SectionHeader
            title="🎭 历史气味图鉴"
            subtitle={`共 ${HISTORICAL_SCENTS.length} 个气味：${filteredScents.length} 个匹配`}
          />

          {filteredScents.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p className="text-6xl mb-4">🔍</p>
              <p>未找到匹配的气味，请尝试调整筛选条件</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScents.map((scent, index) => (
                <ScentCard
                  key={scent.id}
                  scent={scent}
                  index={index}
                  onClick={handleScentClick}
                />
              ))}
            </div>
          )}
        </div>
      </RevealOnScroll>

      {/* Scent Detail Modal */}
      {isModalOpen && selectedScent && (
        <ScentDetailModal
          scent={selectedScent}
          onClose={closeScentModal}
        />
      )}
    </div>
  );
};

interface ScentCardProps {
  scent: any;
  index: number;
  onClick: (scent: any) => void;
}

const ScentCard = ({ scent, index, onClick }: ScentCardProps) => {
  const energyBadge = getEnergyBadge(scent.energy);
  const gradientClass = ENERGY_COLORS[scent.energy] || ENERGY_COLORS.calm;

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
      onClick={() => onClick(scent)}
    >
      {/* Energy Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-10 group-hover:opacity-20 transition-opacity`} />

      {/* Header with Icon */}
      <div className="relative p-6">
        <div className="flex justify-between items-start">
          <div className={`text-5xl mb-2 transform group-hover:scale-110 transition-transform`}>
            {scent.id === 'scent-001' ? '🛡️' :
             scent.id === 'scent-002' ? '📜' :
             scent.id === 'scent-003' ? '🐪' :
             scent.id === 'scent-004' ? '🏯' :
             scent.id === 'scent-005' ? '🌸' :
             scent.id === 'scent-006' ? '🍖' :
             scent.id === 'scent-007' ? '🏪' :
             scent.id === 'scent-008' ? '🍵' :
             scent.id === 'scent-009' ? '🏛️' :
             scent.id === 'scent-010' ? '🌿' :
             scent.id === 'scent-011' ? '🌊' :
             scent.id === 'scent-012' ? '☕' :
             scent.id === 'scent-013' ? '✈️' :
             scent.id === 'scent-014' ? '📚' :
             scent.id === 'scent-015' ? '🖨️' :
             scent.id === 'scent-016' ? '🚀' :
             '🏭'}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${energyBadge.bg}`}>
            {energyBadge.icon} {scent.energy === 'calm' ? '宁静' : scent.energy === 'energetic' ? '活力' : '宏大'}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{scent.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {scent.dynasty} · {scent.era}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {scent.accords.slice(0, 3).map(accord => (
            <span key={accord} className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-md text-xs">
              {accord}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {scent.description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative bg-gray-50 dark:bg-gray-900/50 px-6 py-4">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>温度：{scent.temperature === '极寒' ? '❄️' : scent.temperature === '寒冷' ? '🥶' : scent.temperature === '温暖' ? '☀️' : '🔥'}</span>
          <span>强度：{scent.intensity}/10</span>
          <span>时间：{scent.timeOfDay}</span>
        </div>
      </div>
    </div>
  );
};

interface ScentDetailModalProps {
  scent: any;
  onClose: () => void;
}

const ScentDetailModal = ({ scent, onClose }: ScentDetailModalProps) => {
  const energyBadge = getEnergyBadge(scent.energy);
  const gradientClass = ENERGY_COLORS[scent.energy] || ENERGY_COLORS.calm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with Gradient */}
        <div className={`relative bg-gradient-to-r ${gradientClass} p-8 rounded-t-3xl`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl"
          >
            ✕
          </button>

          <div className="flex items-start gap-6">
            <div className="text-7xl">
              {scent.id === 'scent-001' ? '🛡️' :
             scent.id === 'scent-002' ? '📜' :
             scent.id === 'scent-003' ? '🐪' :
             scent.id === 'scent-004' ? '🏯' :
             scent.id === 'scent-005' ? '🌸' :
             scent.id === 'scent-006' ? '🍖' :
             scent.id === 'scent-007' ? '🏪' :
             scent.id === 'scent-008' ? '🍵' :
             scent.id === 'scent-009' ? '🏛️' :
             scent.id === 'scent-010' ? '🌿' :
             scent.id === 'scent-011' ? '🌊' :
             scent.id === 'scent-012' ? '☕' :
             scent.id === 'scent-013' ? '✈️' :
             scent.id === 'scent-014' ? '📚' :
             scent.id === 'scent-015' ? '🖨️' :
             scent.id === 'scent-016' ? '🚀' :
             '🏭'}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-white">{scent.name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${energyBadge.bg}`}>
                  {energyBadge.icon} {scent.energy === 'calm' ? '宁静' : scent.energy === 'energetic' ? '活力' : '宏大'}
                </span>
              </div>
              <p className="text-white/90 text-lg">
                {scent.dynasty} · {scent.era}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">🌡️</div>
              <div className="text-white font-medium">{scent.temperature}</div>
              <div className="text-white/70 text-sm">温度</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">💫</div>
              <div className="text-white font-medium">{scent.intensity}/10</div>
              <div className="text-white/70 text-sm">强度</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">⏰</div>
              <div className="text-white font-medium">{scent.timeOfDay}</div>
              <div className="text-white/70 text-sm">时间</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              📝 气味描述
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {scent.description}
            </p>
          </div>

          {/* Base and Secondary Scent */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🔍</span> 主基调
              </h4>
              <p className="text-lg text-gray-700 dark:text-gray-300">{scent.baseScent}</p>
              {scent.secondaryScent && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  次基调：{scent.secondaryScent}
                </p>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🎭</span> 香调
              </h4>
              <div className="flex flex-wrap gap-2">
                {scent.accords.map((accord: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm"
                  >
                    {accord}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Atmosphere */}
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">🌫️</span> 氛围感受
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {scent.atmosphere}
            </p>
          </div>

          {/* Emotional Impact */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">💖</span> 情感冲击
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {scent.emotionalImpact}
            </p>
          </div>

          {/* Visual Elements */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">🖼️</span> 视觉元素
            </h4>
            <div className="flex flex-wrap gap-2">
              {scent.visualElements.map((el: string, i: number) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg"
                >
                  {el}
                </span>
              ))}
            </div>
          </div>

          {/* Sound Elements */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">🔊</span> 声音元素
            </h4>
            <div className="flex flex-wrap gap-2">
              {scent.soundElements.map((el: string, i: number) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-lg"
                >
                  {el}
                </span>
              ))}
            </div>
          </div>

          {/* Soundscape */}
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">🎵</span> 声景体验
            </h4>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "{scent.soundscape}"
            </p>
          </div>

          {/* Historical Context */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">📜</span> 历史背景
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {scent.historicalContext}
            </p>
          </div>

          {/* Trivia */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span> 历史冷知识
            </h4>
            <ul className="space-y-2">
              {scent.trivia.map((fact: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-amber-500">▸</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Texture */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                🎨 质地感受
              </h4>
              <p className="text-gray-700 dark:text-gray-300">{scent.texture}</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                ⚡ 能量属性
              </h4>
              <p className="text-gray-700 dark:text-gray-300">{scent.energy === 'calm' ? '平静、内敛、冥想' : scent.energy === 'energetic' ? '激发、活跃、冲动' : '庄严、崇高、宏大'}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-900/50 px-8 py-4 rounded-b-3xl">
          <div className="flex flex-wrap gap-2">
            {scent.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScentMuseumPage;
