/**
 * 文学艺术·建筑页（综述栏目）
 * 区别于 /architecture-mortise（斗拱榫卯专题）
 * 此页为建筑综述，链接到榫卯专题详情
 */
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';

interface BuildingStyle {
  id: string;
  name: string;
  dynasty: string;
  representative: string[];
  features: string;
  significance: string;
  tags: string[];
}

const BUILDING_STYLES: BuildingStyle[] = [
  {
    id: 'dian-ting',
    name: '殿堂式',
    dynasty: '秦汉至明清',
    representative: ['故宫太和殿', '曲阜孔庙大成殿', '天坛祈年殿'],
    features: '中轴对称，台基-屋身-屋顶三段式；屋顶等级分明（庑殿>歇山>悬山>硬山）；斗拱承重，飞檐翘角；彩画装饰，琉璃瓦顶。',
    significance: '中国官方建筑主流形制，体现"中庸""等级""天人合一"思想。屋顶等级与建筑规模严格对应，是礼制在建筑上的物化表达。',
    tags: ['官式', '礼制', '木构'],
  },
  {
    id: 'yuan-lin',
    name: '园林建筑',
    dynasty: '春秋至明清',
    representative: ['拙政园', '留园', '颐和园', '圆明园'],
    features: '"虽由人作，宛自天开"；以叠山理水、移步换景为精髓；亭台楼阁轩榭廊桥形式多样；借景、对景、框景手法丰富。',
    significance: '中国文人精神在建筑上的最高表达，与西方几何园林形成鲜明对比。苏州园林1997年列入世界遗产，被誉为"凝固的诗，立体的画"。',
    tags: ['江南', '文人', '世界遗产'],
  },
  {
    id: 'min-ju',
    name: '民居建筑',
    dynasty: '历代',
    representative: ['徽派民居', '福建土楼', '北京四合院', '陕西窑洞'],
    features: '因地制宜，形制多样；徽派白墙黑瓦马头墙，土楼圆形围合聚族而居，四合院中轴对称家族礼序，窑洞依山而建冬暖夏凉。',
    significance: '民间智慧结晶，反映地理环境与宗族文化的多样性。福建土楼2008年列入世界遗产，是客家文化的标志性建筑。',
    tags: ['地域', '宗族', '世界遗产'],
  },
  {
    id: 'zong-jiao',
    name: '宗教建筑',
    dynasty: '汉魏至明清',
    representative: ['少林寺', '武当山古建筑群', '布达拉宫', '五台山佛光寺'],
    features: '佛教寺院"伽蓝七堂"制；道教宫观依山就势；藏传佛教金顶红墙；石窟寺摩崖造像。融合中印建筑元素，汉化特色鲜明。',
    significance: '宗教中国化的建筑见证。武当山古建筑群1994年列入世界遗产，布达拉宫1994年列入世界遗产，体现多元宗教文化交融。',
    tags: ['佛道', '世界遗产', '汉化'],
  },
];

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 dark:from-ink-950 dark:via-ink-950 dark:to-ink-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="文学艺术"
          title="建筑大观"
          description="从宫殿到园林，从民居到寺观，木石之间见中华营造智慧"
        />

        {/* 入口提示：链接到榫卯专题 */}
        <RevealOnScroll>
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-2xl p-6 mb-8 border border-orange-200 dark:border-orange-700">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-lg font-bold text-orange-800 dark:text-orange-300 mb-1">
                  🛠 想深入了解木构技艺？
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-400">
                  探索斗拱榫卯的精妙结构，看中国古代建筑如何不用一根钉子屹立千年
                </p>
              </div>
              <Link
                to="/architecture-mortise"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap"
              >
                进入斗拱榫卯专题 →
              </Link>
            </div>
          </div>
        </RevealOnScroll>

        {/* 建筑类型网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BUILDING_STYLES.map((style, idx) => (
            <RevealOnScroll key={style.id} delay={idx * 50}>
              <article className="bg-white dark:bg-ink-800 rounded-2xl shadow-lg p-6 border border-ink-100 dark:border-ink-700 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100">{style.name}</h3>
                  <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-xs font-bold">
                    {style.dynasty}
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-bold text-orange-700 dark:text-orange-400 mb-1">代表建筑</h4>
                    <div className="flex flex-wrap gap-2">
                      {style.representative.map((rep) => (
                        <span
                          key={rep}
                          className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 px-2 py-1 rounded text-xs"
                        >
                          {rep}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-700 dark:text-orange-400 mb-1">建筑特征</h4>
                    <p className="text-ink-700 dark:text-ink-300 leading-relaxed">{style.features}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-700 dark:text-orange-400 mb-1">文化意义</h4>
                    <p className="text-ink-700 dark:text-ink-300 leading-relaxed">{style.significance}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {style.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-300 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
