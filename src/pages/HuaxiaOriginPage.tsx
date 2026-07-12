/**
 * 华夏溯源页面
 * 展示三皇五帝体系、考古发现时间线、传说与考古对照
 */
import { useNavigate } from 'react-router-dom';

const THREE_RULERS_THEORIES = [
  { source: '《尚书大传》', figures: ['燧人', '伏羲', '神农'], focus: '用火 · 智慧 · 农耕' },
  { source: '《白虎通》', figures: ['伏羲', '神农', '祝融'], focus: '智慧 · 农耕 · 火神' },
  { source: '《史记·补三皇本纪》', figures: ['伏羲', '女娲', '神农'], focus: '智慧 · 造人 · 农耕' },
];

const FIVE_EMPERORS_THEORIES = [
  { source: '《史记·五帝本纪》', figures: ['黄帝', '颛顼', '帝喾', '尧', '舜'] },
  { source: '《尚书序》', figures: ['少昊', '颛顼', '帝喾', '尧', '舜'] },
];

const FIGURE_DETAILS: Record<string, { title: string; achievement: string; archaeology: string }> = {
  '燧人': { title: '钻木取火', achievement: '使人类从茹毛饮血进入熟食时代', archaeology: '北京人遗址灰烬层厚达6米（距今约70万至20万年）' },
  '伏羲': { title: '画卦结网', achievement: '创八卦、结网罟、制嫁娶之礼', archaeology: '八卦是二进制思维雏形；对偶婚制标志社会规则建立' },
  '神农': { title: '尝百草制耒耜', achievement: '发明农具、开创农耕、探索草药', archaeology: '磁山遗址储粮5万斤（距今约8000年）；河姆渡稻谷堆积（距今约7000年）' },
  '女娲': { title: '抟土造人', achievement: '创世神话中的大地母亲', archaeology: '黄土造人传说折射农耕文明对土地的崇拜' },
  '祝融': { title: '火正之官', achievement: '掌火之神，后被尊为火神', archaeology: '火崇拜是早期文明共通现象' },
  '黄帝': { title: '修德振兵', achievement: '阪泉败炎帝、涿鹿杀蚩尤，华夏共同体雏形', archaeology: '庙底沟文化大扩张（距今约6000年）；石峁遗址425万平米石城（距今约4000年）' },
  '颛顼': { title: '绝地天通', achievement: '改革祭祀制度，王权垄断通天权', archaeology: '社会复杂化、神权向王权过渡的投影' },
  '帝喾': { title: '序星辰', achievement: '观象授时、确立历法', archaeology: '陶寺观象台可测定节气（距今约4100年）' },
  '尧': { title: '克明俊德', achievement: '禅让于舜、设立诽谤木', archaeology: '陶寺遗址疑似尧都平阳（距今约4300至3900年）' },
  '舜': { title: '巡狩四方', achievement: '完善礼仪、流放四凶、禅让于禹', archaeology: '陶寺中晚期暴力毁城，或对应权力更迭' },
  '少昊': { title: '鸟官之治', achievement: '以鸟名官，东夷部落首领', archaeology: '大汶口文化鸟形陶器（距今约6000至4500年）' },
};

const ARCHAEOLOGY_TIMELINE = [
  { year: '约170万年前', site: '元谋人', desc: '已知最早的中国境内直立人，出土石器与用火痕迹' },
  { year: '约70万至20万年前', site: '北京人', desc: '灰烬层厚达6米，证明已能持续控制用火' },
  { year: '约3万年前', site: '山顶洞人', desc: '磨制钻孔技术，骨针缝衣，原始宗教萌芽' },
  { year: '约12000年前', site: '玉蟾岩/仙人洞', desc: '世界最早陶器与人工栽培稻硅酸体' },
  { year: '约8000年前', site: '磁山/裴李岗', desc: '粟作农业成型，储粮灰坑近500个，粟存量达5万斤' },
  { year: '约7000年前', site: '河姆渡', desc: '稻作农业繁盛，干栏式木构建筑，骨耜农具' },
  { year: '约7000至5000年前', site: '仰韶文化', desc: '彩陶全盛，粟作农业扩散，半坡/姜寨聚落' },
  { year: '约6000年前', site: '庙底沟文化', desc: '彩陶花纹大扩张，中国史前第一次文化整合' },
  { year: '约5000至4000年前', site: '龙山文化', desc: '黑陶、城址群、社会分层，"古国时代"全面到来' },
  { year: '约4300至3900年前', site: '陶寺遗址', desc: '280万平米大城、观象台、朱书"文"字，疑似尧都' },
  { year: '约4000年前', site: '石峁遗址', desc: '425万平米石砌瓮城，东亚最大史前石城' },
  { year: '约3800至3500年前', site: '二里头遗址', desc: '宫殿群、青铜礼器作坊、城市路网，夏文化实证' },
];

const LEGEND_vs_ARCHAEOLOGY = [
  { legend: '燧人取火', archaeology: '北京人灰烬层', note: '用火历史远早于传说' },
  { legend: '有巢构木', archaeology: '田螺山干栏建筑', note: '距今7000年已有成熟木构' },
  { legend: '神农种五谷', archaeology: '磁山/河姆渡遗址', note: '南北两个独立农业起源中心' },
  { legend: '黄帝战蚩尤', archaeology: '庙底沟文化扩张', note: '距今6000年彩陶文化大传播' },
  { legend: '尧都平阳', archaeology: '陶寺遗址', note: '大城+观象台+朱书文字' },
  { legend: '禹会诸侯', archaeology: '禹会村遗址', note: '大型祭祀台+多地风格陶器' },
  { legend: '禹都阳城', archaeology: '王城岗遗址', note: '大小城重叠，年代吻合' },
  { legend: '夏王朝', archaeology: '二里头遗址', note: '中国最早宫殿群与青铜礼器' },
];

export default function HuaxiaOriginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-ink-900 dark:to-ink-800 py-12 md:py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-10 text-8xl font-serif text-ink-900">华</div>
          <div className="absolute bottom-4 right-10 text-6xl font-serif text-ink-900">源</div>
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-ink-900 dark:text-ink-100 mb-4">
            华夏溯源
          </h1>
          <p className="text-lg text-ink-600 dark:text-ink-400 max-w-2xl mx-auto">
            从盘古创世到夏朝建立，在神话与考古之间，拼合中华文明从蒙昧走向国家的万年历程。
          </p>
          <p className="text-sm text-ink-400 dark:text-ink-500 mt-3">
            传说不是信史，但传说背后有考古的影子；考古不是传说，但考古填补了传说的空白。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* 三皇体系 */}
        <section>
          <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-2">三皇：文明起源的三把钥匙</h2>
          <p className="text-sm text-ink-500 dark:text-ink-400 mb-6">三种主流说法，指向同一组文明要素：用火、居住、智慧、农耕</p>
          <div className="grid md:grid-cols-3 gap-4">
            {THREE_RULERS_THEORIES.map((theory) => (
              <div key={theory.source} className="bg-white dark:bg-ink-900 rounded-xl shadow-md border border-ink-100 dark:border-ink-700 p-5">
                <div className="text-xs text-ink-400 dark:text-ink-500 mb-2">{theory.source}</div>
                <div className="flex gap-2 mb-3">
                  {theory.figures.map((f) => (
                    <span key={f} className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded text-sm font-bold">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-ink-500 dark:text-ink-400">{theory.focus}</div>
              </div>
            ))}
          </div>

          {/* 三皇人物详解 */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {['燧人', '伏羲', '神农', '女娲'].map((name) => {
              const detail = FIGURE_DETAILS[name];
              if (!detail) return null;
              return (
                <div key={name} className="flex gap-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-lg p-4 border-l-2 border-amber-400">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center text-lg font-serif font-bold text-amber-800 dark:text-amber-200">
                    {name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-ink-900 dark:text-ink-100">{name}氏 · {detail.title}</div>
                    <div className="text-sm text-ink-600 dark:text-ink-400 mt-1">{detail.achievement}</div>
                    <div className="text-xs text-ink-400 dark:text-ink-500 mt-1">考古佐证：{detail.archaeology}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 五帝体系 */}
        <section>
          <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-2">五帝：从部落联盟到早期国家</h2>
          <p className="text-sm text-ink-500 dark:text-ink-400 mb-6">两种主流世系，核心人物黄帝与尧舜为共有节点</p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {FIVE_EMPERORS_THEORIES.map((theory) => (
              <div key={theory.source} className="bg-white dark:bg-ink-900 rounded-xl shadow-md border border-ink-100 dark:border-ink-700 p-5">
                <div className="text-xs text-ink-400 dark:text-ink-500 mb-3">{theory.source}</div>
                <div className="flex flex-wrap gap-2">
                  {theory.figures.map((f, i) => (
                    <span key={f} className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-sm font-bold">
                        {f}
                      </span>
                      {i < theory.figures.length - 1 && <span className="text-ink-300 dark:text-ink-600">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 五帝人物详解 */}
          <div className="space-y-3">
            {['黄帝', '颛顼', '帝喾', '尧', '舜'].map((name) => {
              const detail = FIGURE_DETAILS[name];
              if (!detail) return null;
              return (
                <div key={name} className="flex gap-4 bg-white dark:bg-ink-900 rounded-lg p-4 border border-ink-100 dark:border-ink-700">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center font-serif font-bold text-blue-800 dark:text-blue-200">
                    {name.charAt(0)}
                  </div>
                  <div className="flex-1 flex flex-wrap items-baseline gap-x-3">
                    <span className="font-bold text-ink-900 dark:text-ink-100">{name}</span>
                    <span className="text-sm text-ink-600 dark:text-ink-400">{detail.title} — {detail.achievement}</span>
                    <span className="text-xs text-ink-400 dark:text-ink-500 w-full mt-1">考古佐证：{detail.archaeology}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 考古时间线 */}
        <section>
          <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-2">考古发现时间线</h2>
          <p className="text-sm text-ink-500 dark:text-ink-400 mb-6">从170万年前的元谋人到3800年前的二里头，用实物拼合文明源头</p>
          <div className="relative pl-8 border-l-2 border-amber-300 dark:border-amber-700 space-y-6">
            {ARCHAEOLOGY_TIMELINE.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-amber-400 border-2 border-white dark:border-ink-900" />
                <div className="bg-white dark:bg-ink-900 rounded-lg p-4 border border-ink-100 dark:border-ink-700">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{item.year}</span>
                    <span className="font-bold text-ink-900 dark:text-ink-100">{item.site}</span>
                  </div>
                  <p className="text-sm text-ink-600 dark:text-ink-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 传说与考古对照 */}
        <section>
          <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-2">传说与考古对照</h2>
          <p className="text-sm text-ink-500 dark:text-ink-400 mb-6">每个传说背后，都可能藏着一段被考古揭开的真实</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-ink-200 dark:border-ink-700 text-sm">
              <thead className="bg-ink-50 dark:bg-ink-800">
                <tr>
                  <th className="border border-ink-200 dark:border-ink-700 px-4 py-2 text-left font-bold text-ink-900 dark:text-ink-100">传说</th>
                  <th className="border border-ink-200 dark:border-ink-700 px-4 py-2 text-left font-bold text-ink-900 dark:text-ink-100">考古对应</th>
                  <th className="border border-ink-200 dark:border-ink-700 px-4 py-2 text-left font-bold text-ink-900 dark:text-ink-100">说明</th>
                </tr>
              </thead>
              <tbody>
                {LEGEND_vs_ARCHAEOLOGY.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-ink-900' : 'bg-ink-50/50 dark:bg-ink-800/50'}>
                    <td className="border border-ink-200 dark:border-ink-700 px-4 py-2 font-bold text-amber-700 dark:text-amber-400">{row.legend}</td>
                    <td className="border border-ink-200 dark:border-ink-700 px-4 py-2 text-ink-700 dark:text-ink-300">{row.archaeology}</td>
                    <td className="border border-ink-200 dark:border-ink-700 px-4 py-2 text-ink-500 dark:text-ink-400">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 专题入口 */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-ink-900 dark:to-ink-800 rounded-2xl p-8 text-center border border-amber-200 dark:border-amber-800">
          <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-2">深度阅读</h2>
          <p className="text-sm text-ink-600 dark:text-ink-400 mb-6 max-w-xl mx-auto">
            想深入了解每个传说的文化密码和考古实证？阅读专题深度长文，用 5 个章节完整梳理从盘古创世到夏朝建立的万年历程。
          </p>
          <button
            onClick={() => navigate('/topic/topic-three-sovereigns-five-emperors')}
            className="px-6 py-3 bg-accent text-white rounded-lg font-bold hover:bg-amber-600 transition-colors shadow-lg"
          >
            阅读专题：三皇五帝 — 从传说到信史的考古拼图
          </button>
        </section>
      </div>
    </div>
  );
}
