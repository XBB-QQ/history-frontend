import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllPersons, type BackendPersonDTO } from '@/services/api';
import { CardSkeleton } from '@/components/common/Skeleton';
import { useT } from '@/i18n/i18n';

function ComparePage() {
  const t = useT();
  const navigate = useNavigate();
  const [persons, setPersons] = useState<BackendPersonDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected1, setSelected1] = useState<string>('');
  const [selected2, setSelected2] = useState<string>('');
  const [compareResult, setCompareResult] = useState<BackendPersonDTO[] | null>(null);
  // 修复 bug：原代码两个 slot 共用同一 searchTerm/showDropdown，输入互相污染
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  useEffect(() => {
    fetchAllPersons().then((data) => {
      setPersons(data as never);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // 每个 slot 独立过滤，避免互相干扰
  const filteredPersons1 = persons.filter((p: any) =>
    p.name.includes(searchTerm1) || (p.tags || []).some((t: string) => t.includes(searchTerm1))
  ).slice(0, 10);
  const filteredPersons2 = persons.filter((p: any) =>
    p.name.includes(searchTerm2) || (p.tags || []).some((t: string) => t.includes(searchTerm2))
  ).slice(0, 10);

  const handleSelect = (person: BackendPersonDTO, slot: 1 | 2) => {
    if (slot === 1) {
      setSelected1(person.uid);
      setSearchTerm1('');
      setShowDropdown1(false);
    } else {
      setSelected2(person.uid);
      setSearchTerm2('');
      setShowDropdown2(false);
    }
  };

  const handleCompare = () => {
    if (!selected1 || !selected2) return;
    const p1 = persons.find((p) => p.uid === selected1);
    const p2 = persons.find((p) => p.uid === selected2);
    if (!p1 || !p2) return;
    setCompareResult([p1, p2]);
  };

  const resetCompare = () => {
    setSelected1('');
    setSelected2('');
    setCompareResult(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink-950 pt-24 pb-12 px-4">
        <CardSkeleton count={3} />
      </div>
    );
  }

  // 渲染单个 slot 输入框 + 下拉
  const renderSlot = (slot: 1 | 2) => {
    const selectedUid = slot === 1 ? selected1 : selected2;
    const searchTerm = slot === 1 ? searchTerm1 : searchTerm2;
    const setSearchTerm = slot === 1 ? setSearchTerm1 : setSearchTerm2;
    const showDropdown = slot === 1 ? showDropdown1 : showDropdown2;
    const setShowDropdown = slot === 1 ? setShowDropdown1 : setShowDropdown2;
    const filtered = slot === 1 ? filteredPersons1 : filteredPersons2;
    const setSelected = slot === 1 ? setSelected1 : setSelected2;
    const labelKey = slot === 1 ? 'compare.person_a' : 'compare.person_b';

    return (
      <div className="relative">
        <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 block">{t(labelKey)}</label>
        <div className="relative">
          <input
            type="text"
            placeholder={t('compare.search_placeholder')}
            value={searchTerm || (persons.find((p) => p.uid === selectedUid)?.name || '')}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
              setSelected('');
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full px-4 py-3 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-900 dark:text-ink-100 focus:outline-none focus:border-accent"
          />
          {showDropdown && searchTerm && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700 rounded-xl shadow-xl z-30 max-h-48 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-sm text-ink-400">{t('compare.no_match')}</div>
              ) : (
                filtered.map((p) => (
                  <button
                    key={p.uid}
                    onMouseDown={() => handleSelect(p, slot)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
                  >
                    <span className="font-medium">{p.name}</span>
                    {p.dynastyName && (
                      <span className="ml-2 text-ink-400 text-xs">{p.dynastyName}</span>
                    )}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block text-ink-300 dark:text-ink-600">⚖</span>
          <h1 className="text-3xl font-black text-ink-900 dark:text-ink-100">{t('compare.title')}</h1>
          <p className="text-sm text-ink-500 mt-2">{t('compare.subtitle')}</p>
        </div>

        {/* Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {renderSlot(1)}
          {renderSlot(2)}
        </div>

        {/* Compare Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleCompare}
            disabled={!selected1 || !selected2}
            className="px-8 py-3 bg-accent text-white rounded-xl font-bold hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('compare.compare_btn')}
          </button>
          {compareResult && (
            <button
              onClick={resetCompare}
              className="ml-4 px-4 py-3 text-ink-500 hover:text-accent transition-colors"
            >
              {t('compare.reset_btn')}
            </button>
          )}
        </div>

        {/* Comparison Result */}
        {compareResult && compareResult.length === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {compareResult.map((person, i) => (
              <div
                key={person.uid}
                className="bg-white/60 dark:bg-ink-900/60 rounded-2xl border border-ink-200 dark:border-ink-700 p-6"
              >
                <div className="text-center mb-6">
                  <div className={`text-4xl font-black mb-2 ${i === 0 ? 'text-accent' : 'text-blue-600'}`}>
                    {person.name}
                  </div>
                  <div className="text-sm text-ink-500">
                    {person.dynastyName && <span className="mr-2">{person.dynastyName}</span>}
                    {person.yearsDisplay && <span>{person.yearsDisplay}</span>}
                  </div>
                </div>

                {/* Bio */}
                {person.bio && (
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1">{t('compare.bio')}</h4>
                    <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">{person.bio}</p>
                  </div>
                )}

                {/* Quote */}
                {person.quote && (
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1">{t('compare.quote')}</h4>
                    <blockquote className="text-sm italic text-ink-600 dark:text-ink-400 border-l-2 border-ink-300 dark:border-ink-600 pl-3">
                      "{person.quote}"
                    </blockquote>
                  </div>
                )}

                {/* Roles */}
                {person.roles && person.roles.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1">{t('compare.roles')}</h4>
                    <div className="flex flex-wrap gap-1">
                      {person.roles.map((r) => (
                        <span key={r} className="text-xs px-2 py-0.5 bg-ink-100 dark:bg-ink-800 rounded-full text-ink-500">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {person.tags && person.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1">{t('compare.tags')}</h4>
                    <div className="flex flex-wrap gap-1">
                      {person.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-ink-50 dark:bg-ink-800/50 rounded-full text-ink-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Click to view detail — 修复 bug：原 person.id 改 person.uid，与其他位置一致 */}
                <div className="text-center mt-6">
                  <button
                    onClick={() => navigate(`/persons?id=${person.uid}`)}
                    className="text-sm text-accent hover:underline"
                  >
                    {t('compare.view_detail')} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Click outside to close dropdown */}
        {(showDropdown1 || showDropdown2) && (
          <div className="fixed inset-0 z-20" onClick={() => { setShowDropdown1(false); setShowDropdown2(false); }} />
        )}
      </div>
    </div>
  );
}

export default ComparePage;
