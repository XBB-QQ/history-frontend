import { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  POSTHUMOUS_TITLE_CATEGORIES,
  ERA_TEMPLATES,
  POSTHUMOUS_TITLE_COMBINATIONS,
  FAMOUS_POSTHUMOUS_TITLES,
  getRandomPosthumousTitle,
  getRandomEraName,
  getPosthumousTitleById,
  getEraTemplateById,
  calculatePosthumousTitleScore
} from '@/data/features/titleData';

const TitleGeneratorPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [selectedTitleInfo, setSelectedTitleInfo] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoryOptions = [
    { value: 'all', label: '全部类别' },
    ...POSTHUMOUS_TITLE_CATEGORIES.map(cat => ({
      value: cat.id,
      label: `${cat.full} - ${cat.name}`,
      icon: cat.id
    }))
  ];

  const eraOptions = [
    { value: 'all', label: '全部朝代' },
    ...POSTHUMOUS_TITLE_CATEGORIES.reduce((acc, cat) => {
      if (cat.dynasty) {
        cat.dynasty.forEach(d => {
          if (!acc.find(e => e.value === d)) {
            acc.push({ value: d, label: d });
          }
        });
      }
      return acc;
    }, [] as { value: string; label: string }[])
  ];

  const generatedTitleInfo = useMemo(() => {
    if (selectedTitleInfo) {
      if (selectedTitleInfo.type === 'posthumous') {
        return getPosthumousTitleById(selectedTitleInfo.titleId);
      } else {
        return getEraTemplateById(selectedTitleInfo.titleId);
      }
    }
    return null;
  }, [selectedTitleInfo]);

  const generateRandomTitle = () => {
    const isPosthumous = Math.random() > 0.5;
    const title = isPosthumous
      ? getRandomPosthumousTitle()
      : getRandomEraName();

    setGeneratedTitles([...generatedTitles, title]);
    setIsModalOpen(true);

    setTimeout(() => {
      setIsModalOpen(false);
    }, 3000);
  };

  const generateMultipleTitles = (count: number) => {
    const newTitles: string[] = [];
    for (let i = 0; i < count; i++) {
      const isPosthumous = Math.random() > 0.5;
      const title = isPosthumous
        ? getRandomPosthumousTitle()
        : getRandomEraName();
      newTitles.push(title);
    }
    setGeneratedTitles([...newTitles, ...newTitles]);
  };

  const handleTitleClick = (title: string) => {
    const isPosthumous = generatedTitles.slice(-1)[0] === title;
    setSelectedTitleInfo({
      titleId: title,
      type: isPosthumous ? 'posthumous' : 'era'
    });
    setIsModalOpen(true);
  };

  const closeTitleModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTitleInfo(null), 300);
  };

  const getCategoryIcon = (id: string) => {
    const icons: Record<string, string> = {
      hui: '💝',
      jing: '💫',
      wen: '📜',
      wu: '⚔️',
      xiao: '孝',
      miao: '🌟',
      lie: '🔥',
      sheng: '👑',
      kang: '🛡️',
      xuan: '🏔️'
    };
    return icons[id] || '✨';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">谥号与年号生成器</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            探索古代帝王的称号规则，一键生成独特的谥号与年号
          </p>
        </div>
      </div>

      {/* Generator Section */}
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 -mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
            <div className="text-center mb-8">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                点击按钮生成随机谥号或年号，探索古代称号的丰富世界
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={generateRandomTitle}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  🎲 生成随机称号
                </button>

                <button
                  onClick={() => generateMultipleTitles(3)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  ✨ 生成3个称号
                </button>

                <button
                  onClick={() => generateMultipleTitles(6)}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  🎁 生成6个称号
                </button>
              </div>
            </div>

            {/* Generated Titles Display */}
            {generatedTitles.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>✅</span> 已生成的称号
                </h3>
                <div className="flex flex-wrap gap-3">
                  {generatedTitles.map((title, index) => (
                    <button
                      key={index}
                      onClick={() => handleTitleClick(title)}
                      className="px-6 py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-xl font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all transform hover:scale-105 border-2 border-transparent hover:border-blue-400"
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Section */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  💝 谥号类别
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categoryOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.icon} {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  📅 朝代/时期
                </label>
                <select
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {eraOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {POSTHUMOUS_TITLE_CATEGORIES.slice(0, 8).map((cat) => (
                <div
                  key={cat.id}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 text-center hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="text-3xl mb-2">{getCategoryIcon(cat.id)}</div>
                  <div className="font-bold text-gray-900 dark:text-white">{cat.full}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{cat.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Famous Titles Section */}
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <SectionHeader title="🏆 知名谥号" subtitle="历史上的著名谥号" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FAMOUS_POSTHUMOUS_TITLES.map((title, index) => (
              <TitleCard
                key={title.id}
                title={title}
                onClick={() => handleTitleClick(title.title)}
                getCategoryIcon={getCategoryIcon}
              />
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Era Templates Section */}
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 pb-16">
          <SectionHeader title="📅 年号模板" subtitle="古代年号的构成与意义" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ERA_TEMPLATES.slice(0, 6).map((template, index) => (
              <EraTemplateCard
                key={template.id}
                template={template}
                onClick={() => handleTitleClick(template.base)}
              />
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Title Detail Modal */}
      {isModalOpen && selectedTitleInfo && generatedTitleInfo && (
        <TitleDetailModal
          titleInfo={selectedTitleInfo}
          titleDetail={generatedTitleInfo}
          onClose={closeTitleModal}
        />
      )}
    </div>
  );
};

interface TitleCardProps {
  title: any;
  onClick: (title: string) => void;
  getCategoryIcon: (id: string) => string;
}

const TitleCard = ({ title, onClick, getCategoryIcon }: TitleCardProps) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all transform hover:scale-105"
      onClick={() => onClick(title.title)}
    >
      <div className="text-4xl mb-3">{getCategoryIcon(title.category)}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title.title}</h3>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {title.meaning}
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {title.dynasty.slice(0, 3).map(d => (
          <span key={d} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs">
            {d}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
        {title.description}
      </p>
    </div>
  );
};

interface EraTemplateCardProps {
  template: any;
  onClick: (title: string) => void;
}

const EraTemplateCard = ({ template, onClick }: EraTemplateCardProps) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all transform hover:scale-105"
      onClick={() => onClick(template.base)}
    >
      <div className="text-4xl mb-3">📅</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{template.base}</h3>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {template.meaning}
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {template.variants.slice(0, 3).map(v => (
          <span key={v} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-xs">
            {v}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
        {template.description}
      </p>
    </div>
  );
};

interface TitleDetailModalProps {
  titleInfo: any;
  titleDetail: any;
  onClose: () => void;
}

const TitleDetailModal = ({ titleInfo, titleDetail, onClose }: TitleDetailModalProps) => {
  const isPosthumous = titleInfo.type === 'posthumous';
  const score = titleInfo.type === 'posthumous'
    ? calculatePosthumousTitleScore(titleDetail.title)
    : Math.random() * 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl"
          >
            ✕
          </button>

          <div className="flex items-center gap-4">
            <div className="text-6xl">
              {isPosthumous ? '👑' : '📅'}
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white mb-2">{titleDetail.title}</h2>
              <p className="text-white/90">
                {isPosthumous ? '谥号' : '年号'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              📝 {isPosthumous ? '谥号含义' : '年号含义'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {titleDetail.meaning}
            </p>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              📖 详细说明
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {titleDetail.description}
            </p>
          </div>

          {/* Dynasty */}
          {titleDetail.dynasty && (
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                🏛️ 适用朝代
              </h4>
              <div className="flex flex-wrap gap-2">
                {titleDetail.dynasty.map((d: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Examples */}
          {titleDetail.examples && (
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                👤 历史实例
              </h4>
              <ul className="space-y-2">
                {titleDetail.examples.map((ex: string, i: number) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    • {ex}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Variants */}
          {titleDetail.variants && titleDetail.variants.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                🔄 同义变体
              </h4>
              <div className="flex flex-wrap gap-2">
                {titleDetail.variants.map((v: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Score */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              🎯 称号指数
            </h4>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {score.toFixed(1)}
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                {score > 8 ? '传奇称号' : score > 6 ? '优秀称号' : score > 4 ? '良好称号' : '普通称号'}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-900/50 px-8 py-4 rounded-b-3xl">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            {isPosthumous ? '谥号是古代帝王、大臣死后，朝廷根据其生平事迹给予的称号' : '年号是皇帝在位时期用来纪年的名号'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TitleGeneratorPage;
