import React, { useState, useMemo } from 'react';
import {
  CHARACTER_DATABASE,
  SCRIPTS,
  MysteryEvent,
  Clue,
  Character
} from '../data/features/scriptKillerData';
import SectionHeader from '../components/common/SectionHeader';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { FaSearch, FaLightbulb, FaHistory, FaUserSecret, FaClipboard, FaFingerprint, FaBrain, FaChevronLeft, FaChevronRight, FaHome } from 'react-icons/fa';

const ScriptKillerPage: React.FC = () => {
  const [selectedScript, setSelectedScript] = useState<string>('shang-mystery');
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'character' | 'clues' | 'deduction' | 'reveal'>('intro');
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [revealedSecrets, setRevealedSecrets] = useState<Set<string>>(new Set());
  const [clueCollection, setClueCollection] = useState<Clue[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
  const [testimonyIndex, setTestimonyIndex] = useState(0);
  const [finalAccusation, setFinalAccusation] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentScript = useMemo(() => {
    return SCRIPTS.find(s => s.id === selectedScript);
  }, [selectedScript]);

  const mysteryEvent = currentScript?.mysteryEvent;
  const characters = currentScript?.characters || [];

  const handleCharacterSelect = (characterId: string) => {
    if (selectedCharacters.includes(characterId)) {
      setSelectedCharacters(selectedCharacters.filter(id => id !== characterId));
    } else {
      setSelectedCharacters([...selectedCharacters, characterId]);
    }
  };

  const handleNextPhase = () => {
    setCurrentPhase(prev => {
      const phases: any[] = ['intro', 'character', 'clues', 'deduction', 'reveal'];
      const currentIndex = phases.indexOf(prev);
      return phases[currentIndex + 1] || prev;
    });
  };

  const handlePrevPhase = () => {
    setCurrentPhase(prev => {
      const phases: any[] = ['intro', 'character', 'clues', 'deduction', 'reveal'];
      const currentIndex = phases.indexOf(prev);
      return phases[currentIndex - 1] || prev;
    });
  };

  const handleSelectCharacter = (characterId: string) => {
    const character = characters.find(c => c.id === characterId);
    setCurrentCharacter(character);
    setTestimonyIndex(0);
  };

  const handleNextTestimony = () => {
    setTestimonyIndex(prev => Math.min(prev + 1, characters.length - 1));
  };

  const handlePrevTestimony = () => {
    setTestimonyIndex(prev => Math.max(prev - 1, 0));
  };

  const handleRevealSecret = (secret: string) => {
    setRevealedSecrets(prev => new Set(prev).add(secret));
  };

  const collectClue = (clue: Clue) => {
    setClueCollection(prev => [...prev, clue]);
  };

  const handleAccuse = (characterId: string) => {
    setFinalAccusation(characterId);
    setIsRevealed(true);
  };

  const handleReset = () => {
    setCurrentPhase('intro');
    setSelectedCharacters([]);
    setRevealedSecrets(new Set());
    setClueCollection([]);
    setCurrentCharacter(null);
    setTestimonyIndex(0);
    setFinalAccusation(null);
    setIsRevealed(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <SectionHeader
            title="历史剧本杀"
            subtitle="穿越时空，化身为历史人物，解开神秘的谜团"
            icon={<FaUserSecret className="w-12 h-12 text-red-500" />}
            gradient="from-red-500 to-orange-500"
          />
        </RevealOnScroll>

        {currentPhase === 'intro' && (
          <div className="animate-fade-in">
            <div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RevealOnScroll>
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">选择剧本</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
                    {SCRIPTS.map(script => (
                      <div
                        key={script.id}
                        onClick={() => setSelectedScript(script.id)}
                        className={`p-4 rounded-xl cursor-pointer transition-all ${
                          selectedScript === script.id
                            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg transform scale-105'
                            : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-red-200'
                        }`}
                      >
                        <h4 className="font-bold text-lg mb-2">{script.title}</h4>
                        <p className="text-sm opacity-90 mb-3">{script.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-white/20 px-2 py-0.5 rounded">玩家数: {script.playerCount}</span>
                          <span className="text-xs bg-white/20 px-2 py-0.5 rounded">时长: {script.duration}分钟</span>
                          <span className="text-xs bg-white/20 px-2 py-0.5 rounded">难度: {script.difficulty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">游戏规则</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                      <h4 className="font-bold mb-2">角色扮演</h4>
                      <p className="text-sm opacity-90">选择一个角色，了解你的背景、动机和秘密</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                      <h4 className="font-bold mb-2">收集线索</h4>
                      <p className="text-sm opacity-90">调查现场，收集关键证据和线索</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                      <h4 className="font-bold mb-2">推理指控</h4>
                      <p className="text-sm opacity-90">根据线索和动机，找出真正的凶手</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleNextPhase}
                    className="px-8 py-3 rounded-xl font-bold text-white transition-all bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-lg transform hover:scale-105"
                  >
                    开始游戏
                  </button>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        )}

        {currentPhase === 'character' && (
          <div className="animate-fade-in">
            <div
              key="character"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <RevealOnScroll>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FaUsers className="text-red-500" />
                      选择角色
                    </h3>
                    <p className="text-gray-600 mb-4">请选择 2-5 个角色加入游戏</p>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                      {characters.map(character => (
                        <div
                          key={character.id}
                          onClick={() => handleSelectCharacter(character.id)}
                          className={`p-4 rounded-xl cursor-pointer transition-all ${
                            selectedCharacters.includes(character.id)
                              ? 'bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-400'
                              : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-3xl">{character.avatar}</span>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-800">{character.displayName}</h4>
                              <p className="text-sm text-gray-600">{character.role}</p>
                              <p className="text-xs text-red-600">{character.dynasty}·{character.era}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-4 bg-red-50 rounded-xl">
                      <p className="text-sm text-red-800">
                        已选择 <strong>{selectedCharacters.length}</strong> 个角色
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FaFingerprint className="text-red-500" />
                      角色档案
                    </h3>

                    {currentCharacter ? (
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <span className="text-4xl">{currentCharacter.avatar}</span>
                          <div>
                            <h4 className="font-bold text-gray-800 text-lg">{currentCharacter.displayName}</h4>
                            <p className="text-sm text-gray-600">{currentCharacter.role}</p>
                            <p className="text-xs text-red-600">{currentCharacter.dynasty}·{currentCharacter.era}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">背景：</h4>
                          <p className="text-gray-700">{currentCharacter.background}</p>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">动机：</h4>
                          <ul className="space-y-1">
                            {currentCharacter.motivations.map((motivation, index) => (
                              <li key={index} className="text-gray-700 text-sm">• {motivation}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">关键事件：</h4>
                          <ul className="space-y-1">
                            {currentCharacter.keyEvents.map((event, index) => (
                              <li key={index} className="text-gray-700 text-sm">• {event}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">技能：</h4>
                          <div className="flex flex-wrap gap-1">
                            {currentCharacter.skills.map(skill => (
                              <span key={skill} className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-12">
                        <FaUserSecret className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                        <p>选择一个角色查看详细信息</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handlePrevPhase}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                  >
                    <FaChevronLeft className="inline mr-2" />
                    上一步
                  </button>
                  <button
                    onClick={handleNextPhase}
                    className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg"
                  >
                    下一步
                    <FaChevronRight className="inline ml-2" />
                  </button>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        )}

        {currentPhase === 'clues' && (
          <div className="animate-fade-in">
            <div
              key="clues"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <RevealOnScroll>
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      <FaSearch className="text-red-500" />
                      收集线索
                    </h3>
                    <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">
                      已收集 {clueCollection.length} / {mysteryEvent?.keyClues.length || 0} 条线索
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {mysteryEvent?.keyClues.map((clue, index) => (
                      <div
                        key={index}
                        onClick={() => collectClue(clue as any)}
                        className={`p-4 rounded-xl cursor-pointer transition-all ${
                          clueCollection.some(c => c.description === clue)
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400'
                            : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                        }`}
                      >
                        <h4 className="font-bold text-gray-800 mb-2">{clue}</h4>
                        <p className="text-sm text-gray-600">
                          {clueCollection.some(c => c.description === clue) ? '✓ 已收集' : '点击收集'}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 mb-6">
                    <h4 className="font-bold text-gray-800 mb-2">神秘事件背景</h4>
                    <p className="text-gray-700">{mysteryEvent?.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FaHistory className="text-red-500" />
                      时间线
                    </h3>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {mysteryEvent?.timeLine.map((event, index) => {
                        const character = characters.find(c => c.id === event.characterId);
                        return (
                          <div
                            key={index}
                            className={`p-3 rounded-lg ${
                              event.isPlayer ? 'bg-red-50 border-l-4 border-red-400' : 'bg-gray-50'
                            }`}
                          >
                            <p className="text-sm text-red-600 font-bold">{event.time}</p>
                            <p className="text-sm text-gray-800">{event.description}</p>
                            {event.location && (
                              <p className="text-xs text-gray-500">📍 {event.location}</p>
                            )}
                            {character && (
                              <p className="text-xs text-gray-600">👤 {character.displayName}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FaLightbulb className="text-red-500" />
                      线索分析
                    </h3>

                    <div className="space-y-4">
                      {clueCollection.map((clue, index) => (
                        <div key={index} className="p-4 rounded-xl bg-gray-50">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">🔍</span>
                            <h4 className="font-bold text-gray-800">{clue.description}</h4>
                          </div>
                          <p className="text-sm text-gray-600">{clue.content}</p>
                        </div>
                      ))}

                      {clueCollection.length === 0 && (
                        <div className="text-center text-gray-500 py-12">
                          <FaSearch className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                          <p>点击上方线索收集证据</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handlePrevPhase}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                  >
                    <FaChevronLeft className="inline mr-2" />
                    上一步
                  </button>
                  <button
                    onClick={handleNextPhase}
                    className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg"
                  >
                    下一步
                    <FaChevronRight className="inline ml-2" />
                  </button>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        )}

        {currentPhase === 'deduction' && (
          <div className="animate-fade-in">
            <div
              key="deduction"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RevealOnScroll>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FaClipboard className="text-red-500" />
                      受害者与凶手
                    </h3>

                    {mysteryEvent && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-gray-50">
                          <h4 className="font-bold text-gray-800 mb-2">受害者</h4>
                          <p className="text-gray-700">{mysteryEvent.victim}</p>
                        </div>

                        <div className="p-4 rounded-xl bg-gray-50">
                          <h4 className="font-bold text-gray-800 mb-2">凶手（待确认）</h4>
                          <p className="text-gray-700 italic">? ? ?</p>
                        </div>

                        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                          <h4 className="font-bold text-red-800 mb-2">关键线索</h4>
                          <ul className="space-y-1">
                            {mysteryEvent.keyClues.slice(0, 3).map((clue, index) => (
                              <li key={index} className="text-sm text-gray-700">• {clue}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FaBrain className="text-red-500" />
                      指控凶手
                    </h3>

                    <p className="text-gray-600 mb-4">根据你收集的线索和了解的动机，选择你认为的凶手：</p>

                    <div className="space-y-3">
                      {characters.map(character => (
                        <button
                          key={character.id}
                          onClick={() => handleAccuse(character.id)}
                          className={`w-full p-4 rounded-xl transition-all text-left ${
                            finalAccusation === character.id
                              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg transform scale-105'
                              : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{character.avatar}</span>
                            <div className="flex-1">
                              <h4 className="font-bold">{character.displayName}</h4>
                              <p className="text-sm text-gray-600">{character.role}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handlePrevPhase}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                  >
                    <FaChevronLeft className="inline mr-2" />
                    上一步
                  </button>
                  <button
                    onClick={handleNextPhase}
                    className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg"
                  >
                    揭示真相
                    <FaChevronRight className="inline ml-2" />
                  </button>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        )}

        {currentPhase === 'reveal' && isRevealed && (
          <div className="animate-fade-in">
            <div
              key="reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RevealOnScroll>
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentScript?.title}</h3>
                    <p className="text-gray-600">真相揭秘</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                      <FaLightbulb className="text-green-500" />
                      案件真相
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{currentScript?.solution}</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                      <FaUserSecret className="text-blue-500" />
                      详细分析
                    </h4>
                    <div className="space-y-4">
                      {mysteryEvent?.keyClues.map((clue, index) => (
                        <div key={index} className="p-3 rounded-lg bg-white">
                          <h5 className="font-bold text-gray-800 mb-1">{clue}</h5>
                          <p className="text-sm text-gray-600">这是关键证据，揭示了案件的真相。</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:shadow-lg"
                  >
                    <FaHome className="inline mr-2" />
                    返回主页
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg"
                  >
                    <FaChevronLeft className="inline mr-2" />
                    重新开始
                  </button>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptKillerPage;
