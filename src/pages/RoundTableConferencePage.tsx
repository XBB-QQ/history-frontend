import React, { useState, useMemo } from 'react';
import {
  HISTORICAL_FIGURES,
  ROUND_TABLE_TOPICS
} from '../data/features/roundTableData';
import SectionHeader from '../components/common/SectionHeader';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { FaUsers, FaComments, FaLightbulb, FaHistory, FaGlobe } from 'react-icons/fa';
import { useT } from '@/i18n/i18n';

const RoundTableConferencePage: React.FC = () => {
  const t = useT();
  const [selectedTopic, setSelectedTopic] = useState<string>('yin-yang');
  const [participants, setParticipants] = useState<string[]>([]);
  const [showDiscussion, setShowDiscussion] = useState(false);

  const topics = useMemo(() => {
    return ROUND_TABLE_TOPICS;
  }, []);

  const currentTopic = useMemo(() => {
    return topics.find(t => t.id === selectedTopic);
  }, [selectedTopic]);

  const availableFigures = useMemo(() => {
    return HISTORICAL_FIGURES.filter(figure => {
      return participants.length === 0 ||
             participants.length < 3 ||
             participants.includes(figure.id);
    });
  }, [participants]);

  const availableParticipants = useMemo(() => {
    return participants.map(pid => {
      const figure = HISTORICAL_FIGURES.find(f => f.id === pid);
      return figure;
    }).filter(Boolean);
  }, [participants]);

  const toggleParticipant = (figureId: string) => {
    if (participants.includes(figureId)) {
      setParticipants(participants.filter(pid => pid !== figureId));
    } else if (participants.length < 5) {
      setParticipants([...participants, figureId]);
    }
  };

  const handleStartDiscussion = () => {
    setShowDiscussion(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <SectionHeader
            label={t('roundTableConference.label')}
            title={t('roundTableConference.title')}
            description={t('roundTableConference.description')}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaComments className="text-purple-500" />
              {t('roundTableConference.select_topic')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
              {topics.map(topic => (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedTopic === topic.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-purple-200'
                  }`}
                >
                  <h4 className="font-bold text-lg mb-2">{topic.title}</h4>
                  <p className="text-sm opacity-90 line-clamp-2">{topic.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {topic.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-white/20 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div>
          {currentTopic && (
            <div>
              <RevealOnScroll>
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <FaLightbulb className="text-purple-500" />
                        {currentTopic.title}
                      </h3>
                      <p className="text-gray-600">{currentTopic.description}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
                    <h4 className="font-bold text-gray-800 mb-2">{t('roundTableConference.discussion_question')}</h4>
                    <p className="text-gray-700 italic">"{currentTopic.question}"</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3">{t('roundTableConference.historical_background')}</h4>
                    <p className="text-gray-600">{currentTopic.historicalContext}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentTopic.tags.map(tag => (
                      <span key={tag} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FaUsers className="text-purple-500" />
                      {t('roundTableConference.select_participants')}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4">
                      {t('roundTableConference.select_participants_tip')}
                    </p>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {availableFigures.map(figure => (
                        <div
                          key={figure.id}
                          onClick={() => toggleParticipant(figure.id)}
                          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                            participants.includes(figure.id)
                              ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-400'
                              : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                          }`}
                        >
                          <span className="text-2xl">{figure.avatar}</span>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800">{figure.displayName}</h4>
                            <p className="text-sm text-gray-600">{figure.role}</p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {figure.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                      <p className="text-sm text-purple-800">
                        {t('roundTableConference.participants_count', { count: participants.length })}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FaHistory className="text-purple-500" />
                      {t('roundTableConference.participants_info')}
                    </h3>

                    {availableParticipants.length > 0 ? (
                      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {availableParticipants.map((figure: any) => (
                          <div
                            key={figure.id}
                            className={`p-4 rounded-xl border-2 ${
                              participants.includes(figure.id)
                                ? 'border-purple-400 bg-purple-50'
                                : 'border-gray-200 bg-gray-50 opacity-50'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-3xl">{figure.avatar}</span>
                              <div>
                                <h4 className="font-bold text-gray-800">{figure.displayName}</h4>
                                <p className="text-sm text-gray-600">{figure.role}</p>
                                <p className="text-xs text-purple-600">{figure.dynasty}·{figure.era}</p>
                              </div>
                            </div>

                            <div className="mb-3">
                              <p className="text-sm text-gray-500">{t('roundTableConference.core_opinion')}</p>
                              <p className="text-gray-700 text-sm italic">"{figure.keyOpinion}"</p>
                            </div>

                            <div className="mb-3">
                              <p className="text-sm text-gray-500">{t('roundTableConference.key_concept')}</p>
                              <p className="text-gray-700">{figure.keyConcept}</p>
                            </div>

                            <div className="mb-3">
                              <p className="text-sm text-gray-500">{t('roundTableConference.modern_relevance')}</p>
                              <p className="text-gray-600 text-sm">{figure.modernRelevance}</p>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {figure.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-12">
                        <FaUsers className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p>{t('roundTableConference.min_participants')}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleStartDiscussion}
                    disabled={participants.length < 2}
                    className={`px-8 py-3 rounded-xl font-bold text-white transition-all ${
                      participants.length < 2
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg transform hover:scale-105'
                    }`}
                  >
                    <FaComments className="inline mr-2" />
                    {t('roundTableConference.start_discussion')}
                  </button>
                </div>
              </RevealOnScroll>
            </div>
          )}
        </div>

        {showDiscussion && currentTopic && (
            <DiscussionSession
              topic={currentTopic}
              participants={availableParticipants}
              onClose={() => setShowDiscussion(false)}
            />
          )}
      </div>
    </div>
  );
};

const DiscussionSession: React.FC<{
  topic: typeof ROUND_TABLE_TOPICS[0];
  participants: any[];
  onClose: () => void;
}> = ({ topic, participants, onClose }) => {
  const t = useT();
  const [discussionPoints, setDiscussionPoints] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const nextSpeaker = () => {
    if (currentIndex < participants.length) {
      const speaker = participants[currentIndex];
      const opinion = speaker.keyOpinion;
      const question = topic.question;

      const newPoint: any = {
        id: `point-${Date.now()}-${currentIndex}`,
        speakerId: speaker.id,
        speakerName: speaker.displayName,
        speakerRole: speaker.role,
        speakerAvatar: speaker.avatar,
        content: opinion,
        timestamp: currentIndex,
        position: currentIndex % 3 === 0 ? 'left' : currentIndex % 3 === 1 ? 'center' : 'right',
        question: question
      };

      setDiscussionPoints([...discussionPoints, newPoint]);
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const goToSpeaker = (index: number) => {
    setCurrentIndex(index);
  };

  const resetDiscussion = () => {
    setDiscussionPoints([]);
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FaLightbulb className="text-purple-500" />
                  {topic.title}
                </h3>
                <p className="text-gray-600">{topic.description}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
              <p className="text-gray-700 text-lg">{t('roundTableConference.discussion_question')}"{topic.question}"</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaComments className="text-purple-500" />
              {t('roundTableConference.discussion_title')}
            </h3>

            {discussionPoints.length === 0 ? (
              <div className="text-center py-12">
                <FaUsers className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">{t('roundTableConference.discussion_empty')}</p>
                <p className="text-gray-400 mt-2">{t('roundTableConference.discussion_empty_tip')}</p>
              </div>
            ) : (
              <div className="space-y-6 mb-6">
                {discussionPoints.map((point, index) => {
                  const isCurrent = index === currentIndex;
                  const isPast = index < currentIndex;

                  return (
                    <div
                      key={point.id}
                      className={`p-4 rounded-xl ${
                        point.position === 'left'
                          ? 'bg-gradient-to-r from-purple-50 to-transparent border-l-4 border-purple-400'
                          : point.position === 'center'
                          ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-l-4 border-purple-500'
                          : 'bg-gradient-to-l from-blue-50 to-transparent border-r-4 border-blue-400'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-3xl">{point.speakerAvatar}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-800">{point.speakerName}</h4>
                            <span className="text-sm text-purple-600 bg-purple-100 px-2 py-0.5 rounded">
                              {point.speakerRole}
                            </span>
                          </div>
                          {isPast && (
                            <span className="text-xs text-gray-500">{t('roundTableConference.speaker_no', { no: point.timestamp + 1 })}</span>
                          )}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 mb-3">
                        <p className="text-gray-700 italic">"{point.content}"</p>
                      </div>
                      {isCurrent && (
                        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
                          <p className="text-sm text-yellow-800">
                            {t('roundTableConference.think_question')}
                          </p>
                        </div>
                      )}
                      {isPast && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => goToSpeaker(point.timestamp)}
                            className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded hover:bg-purple-200"
                          >
                            {t('roundTableConference.review')}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {discussionPoints.length > 0 && !isCompleted && (
              <div className="flex justify-center">
                <button
                  onClick={nextSpeaker}
                  disabled={currentIndex >= participants.length}
                  className="px-8 py-3 rounded-xl font-bold text-white transition-all bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentIndex >= participants.length ? t('roundTableConference.discussion_complete') : t('roundTableConference.next_speaker')}
                </button>
              </div>
            )}
          </div>

          {isCompleted && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <FaGlobe className="text-green-500" />
                {t('roundTableConference.summary_title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-2">{t('roundTableConference.summary_theme')}</h4>
                  <p className="text-gray-700">{topic.title}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-2">{t('roundTableConference.discussion_count_label')}</h4>
                  <p className="text-gray-700">{t('roundTableConference.summary_count', { count: participants.length })}</p>
                </div>
              </div>
              <button
                onClick={resetDiscussion}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg"
              >
                {t('roundTableConference.restart')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoundTableConferencePage;
