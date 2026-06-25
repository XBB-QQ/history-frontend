/**
 * 历史辩论场 — 争议性话题数据
 */

export interface DebateTopic {
  id: string;
  title: string;
  description: string;
  era: string;
  proSide: DebateSide;
  conSide: DebateSide;
  expertView: string;
  tags: string[];
}

export interface DebateSide {
  label: string;
  icon: string;
  arguments: string[];
}

export const DEBATE_TOPICS: DebateTopic[] = [
  {
    id: 'yuefei-return',
    title: '岳飞是否应该迎回二圣？',
    description: '岳飞北伐打到朱仙镇，却被十二道金牌召回。如果岳飞未被召回，能否收复中原、迎回徽钦二宗？',
    era: '南宋',
    proSide: {
      label: '应该迎回',
      icon: '⚔️',
      arguments: [
        '岳家军战斗力强，朱仙镇大捷后金军已溃退',
        '收复中原是民族尊严问题，不应妥协',
        '迎回二圣有利于南宋正统性',
      ],
    },
    conSide: {
      label: '不该迎回',
      icon: '🛡️',
      arguments: [
        '南宋国力不足以维持北方战线',
        '迎回二圣会威胁赵构的皇位合法性',
        '金军仍有实力反扑，风险极大',
      ],
    },
    expertView: '从军事角度看岳飞确有收复可能，但政治因素（赵构害怕二圣回归威胁皇位）是召回的根本原因。岳飞之死更多是政治悲剧而非军事失败。',
    tags: ['岳飞', '南宋', '军事', '政治'],
  },
  {
    id: 'yongzheng-legitimacy',
    title: '雍正继位是否合法？',
    description: '雍正继位一直是清史最大争议。"传位十四子"篡改为"传位于四子"的传说流传至今，真相如何？',
    era: '清朝',
    proSide: {
      label: '合法继位',
      icon: '📜',
      arguments: [
        '康熙遗诏现存于中国第一历史档案馆，满文版本明确写"雍亲王皇四子胤禛"',
        '满文遗诏无法篡改（"十"和"于"在满文中字形完全不同）',
        '雍正治国有方，康熙晚年已倾向选择他',
      ],
    },
    conSide: {
      label: '篡位可疑',
      icon: '🔍',
      arguments: [
        '遗诏公布时间延迟，有可疑之处',
        '雍正即位后立即消灭竞争对手，手段残酷',
        '民间传说虽不可信，但反映出当时的疑虑',
      ],
    },
    expertView: '学界主流认为雍正合法继位。"传位十四子改为传位于四子"纯属民间谣言——满文遗诏无法这样篡改。但雍正继位过程确实不够透明，疑虑有其历史背景。',
    tags: ['雍正', '清朝', '政治', '继位'],
  },
  {
    id: 'wanganshi-reform',
    title: '王安石变法利大于弊吗？',
    description: '王安石变法是北宋最大规模改革，旨在富国强兵。但变法失败后宋朝更加混乱，变法本身是进步还是灾难？',
    era: '北宋',
    proSide: {
      label: '利大于弊',
      icon: '📈',
      arguments: [
        '青苗法减轻了农民高利贷负担',
        '国家财政明显改善，国库充盈',
        '保甲法加强了基层治理和国防',
      ],
    },
    conSide: {
      label: '弊大于利',
      icon: '📉',
      arguments: [
        '执行中官员强行放贷，反而加重农民负担',
        '变法加剧了党争，撕裂了北宋政治',
        '变法未能从根本上解决宋朝的军事困境',
      ],
    },
    expertView: '王安石变法的理念是先进的，但执行出了严重问题。核心矛盾在于：理想化的政策设计遇到了官僚体制的扭曲执行。变法的失败更多是执行层面的失败而非理念层面的。',
    tags: ['王安石', '北宋', '改革', '党争'],
  },
  {
    id: 'qinshi-standardize',
    title: '秦始皇统一是进步还是暴政？',
    description: '秦统一六国建立了中央集权制度，但也带来了严刑峻法和文化压制。如何评价秦始皇的统一？',
    era: '秦朝',
    proSide: {
      label: '历史进步',
      icon: '🏗️',
      arguments: [
        '统一文字、度量衡奠定了中华文明基础',
        '郡县制取代分封制是政治制度飞跃',
        '结束了数百年的战乱分裂',
      ],
    },
    conSide: {
      label: '暴政统治',
      icon: '⛓️',
      arguments: [
        '焚书坑儒摧毁了文化多样性',
        '严刑峻法使人民生活在恐惧中',
        '二世而亡说明制度不可持续',
      ],
    },
    expertView: '秦始皇的统一确实是划时代的进步，但其手段过于残酷。历史的评价应区分"制度贡献"和"统治方式"——制度贡献是进步的，统治方式是暴政的。',
    tags: ['秦始皇', '秦朝', '统一', '制度'],
  },
  {
    id: 'ming-seaban',
    title: '明朝海禁是否合理？',
    description: '明朝实施海禁政策，禁止民间海外贸易。郑和之后中国从海洋退缩，是否为合理的安全选择？',
    era: '明朝',
    proSide: {
      label: '合理防御',
      icon: '🛡️',
      arguments: [
        '海禁防止了倭寇和海盗的侵扰',
        '维护了沿海地区的社会稳定',
        '集中资源应对北方蒙古威胁更重要',
      ],
    },
    conSide: {
      label: '错失机遇',
      icon: '🚢',
      arguments: [
        '海禁使中国错失了大航海时代',
        '民间走私反而更猖獗，海禁适得其反',
        '闭关导致技术和经济逐渐落后西方',
      ],
    },
    expertView: '海禁的初衷有一定合理性（防御倭寇），但长期实施严重损害了中国发展。最关键的损失不是贸易本身，而是错过了全球化起步阶段的技术和思想交流。',
    tags: ['明朝', '海禁', '郑和', '全球化'],
  },
];
