import React, { useState, useMemo } from 'react';
import { MORTISE_TYPES, BUILDING_TYPES, ANCIENT_STRUCTURES, MortiseTenon, BuildingType, AncientStructure } from '../data/features/architectureData';
import SectionHeader from '../components/common/SectionHeader';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { FaBuilding, FaTools, FaLightbulb, FaHistory, FaCubes, FaUndo } from 'react-icons/fa';
import { useT } from '@/i18n/i18n';

const ArchitectureMortisePage: React.FC = () => {
  const t = useT();
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [selectedDynasty, setSelectedDynasty] = useState<string>('全部');
  const [selectedStructureType, setSelectedStructureType] = useState<string>('全部');
  const [selectedBuildingType, setSelectedBuildingType] = useState<string | BuildingType>('全部');
  const [selectedStructure, setSelectedStructure] = useState<AncientStructure | null>(null);

  const categories = useMemo(() => {
    return ['全部', ...new Set(MORTISE_TYPES.map(m => m.category))];
  }, []);

  const dynasties = useMemo(() => {
    return ['全部', ...new Set(MORTISE_TYPES.map(m => m.dynasty))].sort();
  }, []);

  const structureTypes = useMemo(() => {
    return ['全部', ...new Set(MORTISE_TYPES.map(m => m.structureType))];
  }, []);

  const buildingTypes = useMemo(() => {
    return ['全部', ...BUILDING_TYPES.map(b => b.id)];
  }, []);

  const filteredMortiseTypes = useMemo(() => {
    return MORTISE_TYPES.filter(mortise => {
      const matchCategory = selectedCategory === '全部' || mortise.category === selectedCategory;
      const matchDynasty = selectedDynasty === '全部' || mortise.dynasty === selectedDynasty;
      const matchType = selectedStructureType === '全部' || mortise.structureType === selectedStructureType;
      return matchCategory && matchDynasty && matchType;
    });
  }, [selectedCategory, selectedDynasty, selectedStructureType]);

  const filteredStructures = useMemo(() => {
    return ANCIENT_STRUCTURES.filter(structure => {
      const matchType = selectedBuildingType === '全部' || structure.structureType === selectedBuildingType;
      return matchType;
    });
  }, [selectedBuildingType]);

  const buildingTypeOptions = useMemo(() => {
    return BUILDING_TYPES.filter(bt => {
      return selectedBuildingType === '全部' || bt.id === selectedBuildingType;
    });
  }, [selectedBuildingType]);

  const handleStructureClick = (structure: AncientStructure) => {
    setSelectedStructure(structure);
  };

  const handleCloseModal = () => {
    setSelectedStructure(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <SectionHeader
            label={t('architectureMortise.label')}
            title={t('architectureMortise.title')}
            description={t('architectureMortise.description')}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaTools className="text-orange-500" />
              {t('architectureMortise.filter_title')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === '全部' ? t('architectureMortise.all') : category}
                </button>
              ))}
              {dynasties.map(dynasty => (
                <button
                  key={dynasty}
                  onClick={() => setSelectedDynasty(dynasty)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedDynasty === dynasty
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dynasty === '全部' ? t('architectureMortise.all') : dynasty}
                </button>
              ))}
              {structureTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedStructureType(type)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedStructureType === type
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === '全部' ? t('architectureMortise.all') : type}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevealOnScroll>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FaCubes className="text-orange-500" />
                  {t('architectureMortise.types_title')}
                </h3>
                <span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                  {t('architectureMortise.types_count', { count: filteredMortiseTypes.length })}
                </span>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredMortiseTypes.map((mortise, index) => (
                  <div
                    key={mortise.id}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      mortise.structureType === selectedStructureType
                        ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold text-gray-800">{mortise.name}</h4>
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                        {mortise.dynasty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{mortise.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {mortise.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FaHistory className="text-orange-500" />
                  {t('architectureMortise.structures_title')}
                </h3>
                <span className="text-sm bg-amber-100 text-amber-600 px-3 py-1 rounded-full">
                  {t('architectureMortise.structures_count', { count: filteredStructures.length })}
                </span>
              </div>

              <div className="mb-4">
                <select
                  value={selectedBuildingType}
                  onChange={(e) => setSelectedBuildingType(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                >
                  {buildingTypeOptions.map(bt => {
                    const type = BUILDING_TYPES.find(b => b.id === bt);
                    return type ? (
                      <option key={bt} value={bt as string}>{type.name}</option>
                    ) : null;
                  })}
                </select>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredStructures.map((structure, index) => (
                  <div
                    key={structure.id}
                    onClick={() => handleStructureClick(structure)}
                    className="p-4 rounded-xl cursor-pointer transition-all duration-300 bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-orange-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold text-gray-800">{structure.name}</h4>
                      <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded">
                        {structure.dynasty}·{structure.era}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{structure.highlight}</p>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{structure.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {structure.technicalFeatures.slice(0, 3).map(feature => (
                        <span key={feature} className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <div className="mt-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FaLightbulb className="text-yellow-300" />
              {t('architectureMortise.features_title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <h4 className="font-bold text-lg mb-2">{t('architectureMortise.feature_1_title')}</h4>
                <p className="text-sm opacity-90">{t('architectureMortise.feature_1_desc')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <h4 className="font-bold text-lg mb-2">{t('architectureMortise.feature_2_title')}</h4>
                <p className="text-sm opacity-90">{t('architectureMortise.feature_2_desc')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <h4 className="font-bold text-lg mb-2">{t('architectureMortise.feature_3_title')}</h4>
                <p className="text-sm opacity-90">{t('architectureMortise.feature_3_desc')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <h4 className="font-bold text-lg mb-2">{t('architectureMortise.feature_4_title')}</h4>
                <p className="text-sm opacity-90">{t('architectureMortise.feature_4_desc')}</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <div>
        {selectedStructure && (
          <AncientStructureModal
            structure={selectedStructure}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

const AncientStructureModal: React.FC<{
  structure: AncientStructure;
  onClose: () => void;
}> = ({ structure, onClose }) => {
  const t = useT();
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{structure.name}</h2>
              <div className="flex gap-3 mt-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {structure.dynasty}·{structure.era}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {structure.region}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl transition-all"
            >
              <FaUndo />
            </button>
          </div>
          <p className="mt-4 text-lg opacity-90">{structure.highlight}</p>
        </div>

        <div className="p-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {structure.description}
            </p>

            <h3 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-orange-500 pl-3">
              {t('architectureMortise.technical_features')}
            </h3>
            <ul className="space-y-2 mb-6">
              {structure.technicalFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-amber-500 pl-3">
              {t('architectureMortise.building_features')}
            </h3>
            <p className="text-gray-700 mb-4">{structure.highlight}</p>

            <h3 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-amber-600 pl-3">
              {t('architectureMortise.visitor_experience')}
            </h3>
            <ul className="space-y-2 mb-6">
              {structure.visitorExperience.map((experience, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span className="text-gray-700">{experience}</span>
                </li>
              ))}
            </ul>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                <FaLightbulb className="text-orange-500" />
                {t('architectureMortise.construction_challenge')}
              </h3>
              <p className="text-gray-700">{structure.constructionChallenge}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureMortisePage;
