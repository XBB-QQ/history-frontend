// 古建筑榫卯拆解器数据
export interface MortiseTenon {
  id: string;
  name: string;
  category: string;
  dynasty: string;
  description: string;
  structureType: 'tenon' | 'mortise' | 'mortise-tenon' | 'jin' | 'zhuan';
  visualDiagram?: string;
  partA: {
    name: string;
    shape: string;
    size: string;
    function: string;
  };
  partB: {
    name: string;
    shape: string;
    size: string;
    function: string;
  };
  combinationMethod: string;
  advantages: string[];
  disadvantages: string[];
  famousExamples: string[];
  culturalSignificance: string;
  tags: string[];
}

export interface AncientStructure {
  id: string;
  name: string;
  dynasty: string;
  era: string;
  region: string;
  structureType: string;
  architect: string;
  constructionYear?: number;
  highlight: string;
  description: string;
  technicalFeatures: string[];
  visitorExperience: string[];
  constructionChallenge: string;
}

export interface BuildingType {
  id: string;
  name: string;
  category: string;
  primaryJoints: string[];
  characteristic: string;
  examples: string[];
  constructionMethod: string;
}

// 榫卯类型
export const MORTISE_TYPES: MortiseTenon[] = [
  {
    id: 'zhuan-lian-tenon',
    name: '榫卯连接',
    category: '基础连接',
    dynasty: '商代',
    era: '商代',
    description: '最早的榫卯结构，用于宫殿和大型建筑的基础连接',
    structureType: 'mortise-tenon',
    partA: {
      name: '榫头',
      shape: '凸出部分',
      size: '直径约8-15cm',
      function: '插入榫眼，提供连接点'
    },
    partB: {
      name: '榫眼',
      shape: '凹槽',
      size: '直径与榫头匹配，深度可调',
      function: '接受榫头，确保连接牢固'
    },
    combinationMethod: '将榫头对准榫眼轻轻敲入，用木槌固定',
    advantages: ['结构简单', '无需钉子', '抗震性能好', '便于拆卸重组'],
    disadvantages: ['加工精度要求高', '长期使用可能松动', '对木材纹理敏感'],
    famousExamples: ['河南安阳殷墟宫殿遗址', '山西应县木塔'],
    culturalSignificance: '中国古代建筑的核心技术，体现了"天人合一"的哲学思想',
    tags: ['基础', '连接', '商代', '无需钉子']
  },
  {
    id: 'zhuan-zi',
    name: '榫子',
    category: '十字连接',
    dynasty: '西周',
    era: '西周',
    description: '用于梁柱交叉的十字连接结构，使建筑更加稳固',
    structureType: 'jin',
    partA: {
      name: '榫头',
      shape: '十字形凸起',
      size: '约10-20cm',
      function: '插入榫眼，形成十字支撑'
    },
    partB: {
      name: '榫眼',
      shape: '十字形凹槽',
      size: '与榫头匹配',
      function: '接受榫头，分散受力'
    },
    combinationMethod: '将十字榫头精准对准十字榫眼，用木槌轻敲固定',
    advantages: ['受力分散均匀', '十字支撑结构稳固', '抗震能力强'],
    disadvantages: ['加工复杂', '对木材质量要求高'],
    famousExamples: ['曲阜孔庙大成殿', '北京故宫太和殿'],
    culturalSignificance: '体现了周代建筑工艺的成熟，为后世建筑奠定了基础',
    tags: ['十字连接', '梁柱', '稳固', '抗震']
  },
  {
    id: 'zhuan-shu',
    name: '榫树',
    category: '水平连接',
    dynasty: '战国',
    era: '战国',
    description: '用于水平构件之间的连接，使框架整体性更强',
    structureType: 'zhuan',
    partA: {
      name: '榫头',
      shape: '矩形凸起',
      size: '长15-30cm，宽5-10cm',
      function: '插入榫眼，连接水平构件'
    },
    partB: {
      name: '榫眼',
      shape: '矩形凹槽',
      size: '与榫头匹配',
      function: '接受榫头，保证水平稳定性'
    },
    combinationMethod: '将榫头插入榫眼，用木楔加固',
    advantages: ['水平连接稳固', '便于拼接长构件', '整体性好'],
    disadvantages: ['接缝处易渗水', '需要定期维护'],
    famousExamples: ['长沙马王堆汉墓建筑遗址', '成都金沙遗址'],
    culturalSignificance: '战国时期建筑技术的重大突破，为汉代建筑大规模发展奠定基础',
    tags: ['水平连接', '拼接', '整体性', '战国']
  },
  {
    id: 'mu-luo',
    name: '木锁',
    category: '加固结构',
    dynasty: '秦代',
    era: '秦代',
    description: '用于重要节点的加固结构，增加整体稳定性',
    structureType: 'mortise-tenon',
    partA: {
      name: '榫头',
      shape: '带有卡槽的凸起',
      size: '长10-20cm',
      function: '插入榫眼并锁定',
    },
    partB: {
      name: '榫眼',
      shape: '带锁槽的凹槽',
      size: '与榫头匹配',
      function: '接受榫头并锁定',
    },
    combinationMethod: '将榫头插入榫眼，旋转至锁槽对齐，用木销固定',
    advantages: ['加固效果好', '防止松动', '拆卸方便'],
    disadvantages: ['结构复杂', '加工成本高'],
    famousExamples: ['秦始皇陵铜车马', '汉长安城遗址'],
    culturalSignificance: '秦代工艺精细化的体现，为汉代建筑大型化提供了技术支撑',
    tags: ['加固', '锁定', '复杂', '秦代']
  },
  {
    id: 'zhi-shu',
    name: '支榫',
    category: '斜向连接',
    dynasty: '汉代',
    era: '东汉',
    description: '用于斜向支撑的榫卯结构，增强建筑的抗风和抗震性能',
    structureType: 'jin',
    partA: {
      name: '榫头',
      shape: '斜面凸起',
      size: '长12-25cm',
      function: '插入榫眼，形成斜向支撑'
    },
    partB: {
      name: '榫眼',
      shape: '斜面凹槽',
      size: '与榫头匹配',
      function: '接受榫头，提供斜向支撑'
    },
    combinationMethod: '将斜榫头精准插入斜榫眼，用木槌敲实',
    advantages: ['斜向支撑稳固', '抗风能力强', '抗震性能佳'],
    disadvantages: ['加工精度要求极高', '对木材纹理方向敏感'],
    famousExamples: ['山东高密四基木桥', '浙江宁波保国寺'],
    culturalSignificance: '汉代建筑技术的成熟标志，体现了对力学原理的深刻理解',
    tags: ['斜向支撑', '抗风', '抗震', '东汉']
  },
  {
    id: 'qiao-shu',
    name: '桥榫',
    category: '桥梁结构',
    dynasty: '唐代',
    era: '唐代',
    description: '用于石拱桥和木桥的关键连接，确保桥梁的稳固性',
    structureType: 'mortise-tenon',
    partA: {
      name: '榫头',
      shape: '拱形凸起',
      size: '长15-30cm',
      function: '嵌入榫眼，形成拱形支撑'
    },
    partB: {
      name: '榫眼',
      shape: '拱形凹槽',
      size: '与榫头匹配',
      function: '接受榫头，构成拱桥结构'
    },
    combinationMethod: '将榫头对准榫眼，用铁环或木楔加固',
    advantages: ['拱形结构稳固', '受力分布均匀', '跨度大'],
    disadvantages: ['对石材质量要求高', '施工难度大'],
    famousExamples: ['赵州桥', '洛阳桥'],
    culturalSignificance: '唐代桥梁技术的巅峰，体现了力学与美学的完美结合',
    tags: ['桥梁', '拱形', '唐代', '大跨度']
  },
  {
    id: 'shou-zhuan',
    name: '守砖',
    category: '砖石结构',
    dynasty: '宋代',
    era: '北宋',
    description: '用于砖石建筑的连接，使砌体结构更加牢固',
    structureType: 'zhuan',
    partA: {
      name: '榫头',
      shape: '砖楔形凸起',
      size: '长约5-10cm',
      function: '嵌入砖缝，增加连接强度'
    },
    partB: {
      name: '榫眼',
      shape: '砖楔形凹槽',
      size: '与榫头匹配',
      function: '接受榫头，使砖块紧密结合'
    },
    combinationMethod: '将砖楔插入砖缝，用砂浆填充',
    advantages: ['连接牢固', '便于调整', '抗剪切能力强'],
    disadvantages: ['对施工精度要求高', '需要熟练工匠'],
    famousExamples: ['登封嵩岳寺塔', '泉州开元寺'],
    culturalSignificance: '宋代建筑技术的精细化，砖石结构达到新高度',
    tags: ['砖石', '砌体', '北宋', '精细']
  },
  {
    id: 'ding-liang',
    name: '定梁',
    category: '梁柱节点',
    dynasty: '元代',
    era: '元代',
    description: '用于梁柱节点的特殊榫卯，使梁柱连接更加牢固',
    structureType: 'mortise-tenon',
    partA: {
      name: '榫头',
      shape: '带有卡齿的凸起',
      size: '长20-40cm',
      function: '插入榫眼，形成卡接结构'
    },
    partB: {
      name: '榫眼',
      shape: '带卡齿的凹槽',
      size: '与榫头匹配',
      function: '接受榫头，提供卡接支撑'
    },
    combinationMethod: '将榫头插入榫眼，调整位置后用铁箍固定',
    advantages: ['节点牢固', '抗震性能优异', '便于更换部件'],
    disadvantages: ['结构复杂', '维护成本高'],
    famousExamples: ['北京妙应寺白塔', '山西应县木塔'],
    culturalSignificance: '元代建筑大型化的关键，体现了蒙古族建筑风格与汉式技术的融合',
    tags: ['梁柱节点', '抗震', '复杂', '元代']
  },
  {
    id: 'tai-shu',
    name: '台榫',
    category: '楼阁结构',
    dynasty: '明代',
    era: '明代',
    description: '用于多层楼阁的连接，使复杂建筑结构更加稳固',
    structureType: 'jin',
    partA: {
      name: '榫头',
      shape: '多层凸起',
      size: '高30-50cm',
      function: '插入榫眼，形成多层支撑'
    },
    partB: {
      name: '榫眼',
      shape: '多层凹槽',
      size: '与榫头匹配',
      function: '接受榫头，提供多层支撑'
    },
    combinationMethod: '将多层榫头插入多层榫眼，用木销固定',
    advantages: ['多层支撑稳固', '结构复杂但整体性强', '抗风性能优异'],
    disadvantages: ['加工极为复杂', '需要极高精度'],
    famousExamples: ['北京故宫角楼', '北京天坛祈年殿'],
    culturalSignificance: '明代建筑技术的巅峰之作，展现了古人对复杂结构工程的掌控能力',
    tags: ['多层支撑', '楼阁', '复杂', '明代']
  },
  {
    id: 'gong-chuang',
    name: '拱窗',
    category: '门窗结构',
    dynasty: '清代',
    era: '清代',
    description: '用于宫殿和园林建筑的门窗连接，结合了美观与实用',
    structureType: 'mortise-tenon',
    partA: {
      name: '榫头',
      shape: '带有装饰的凸起',
      size: '长10-20cm',
      function: '插入榫眼，固定门窗'
    },
    partB: {
      name: '榫眼',
      shape: '装饰性凹槽',
      size: '与榫头匹配',
      function: '接受榫头，固定门窗框架'
    },
    combinationMethod: '将榫头插入榫眼，调整位置后用木销加固',
    advantages: ['美观大方', '连接牢固', '便于开启关闭'],
    disadvantages: ['结构相对复杂', '需要精细加工'],
    famousExamples: ['北京故宫储秀宫', '苏州拙政园门窗'],
    culturalSignificance: '清代建筑工艺的集大成者，体现了皇家建筑的精湛技艺',
    tags: ['门窗', '美观', '精致', '清代']
  }
];

// 古代建筑类型
export const BUILDING_TYPES: BuildingType[] = [
  {
    id: 'gong-dian',
    name: '宫殿',
    category: '官方建筑',
    primaryJoints: ['榫卯连接', '定梁', '台榫'],
    characteristic: '规模宏大，结构复杂，装饰精美，体现了皇家威严',
    examples: ['北京故宫', '沈阳故宫', '曲阜孔庙大成殿'],
    constructionMethod: '采用榫卯结构搭建，梁柱交接处使用多层支撑和卡接结构，屋顶使用琉璃瓦装饰'
  },
  {
    id: 'si-ta',
    name: '佛塔',
    category: '宗教建筑',
    primaryJoints: ['支榫', '定梁', '台榫'],
    characteristic: '多层塔楼，内部空心或实心，外观造型多样，体现了宗教文化的多样性',
    examples: ['河南登封嵩岳寺塔', '山西应县木塔', '杭州六和塔'],
    constructionMethod: '采用多层榫卯结构，每层之间通过榫卯连接，塔身逐渐收分，屋顶使用飞檐翘角设计'
  },
  {
    id: 'zi-jin',
    name: '民居',
    category: '民间建筑',
    primaryJoints: ['榫子', '榫树', '木锁'],
    characteristic: '结构紧凑，注重实用，装饰简洁，体现了地方文化特色',
    examples: ['山西四合院', '徽派民居', '福建土楼'],
    constructionMethod: '采用简单榫卯结构，注重屋顶排水和保暖功能，门窗设计实用而富有地方特色'
  },
  {
    id: 'qiao-liang',
    name: '桥梁',
    category: '基础设施',
    primaryJoints: ['桥榫', '榫树', '木锁'],
    characteristic: '跨越江河，结构精巧，造型美观，体现了力学与艺术的结合',
    examples: ['河北赵州桥', '福建洛阳桥', '贵州侗族风雨桥'],
    constructionMethod: '采用拱形或梁式结构，关键节点使用榫卯连接，桥面铺设木板或石板'
  },
  {
    id: 'tang-lou',
    name: '戏楼',
    category: '文化建筑',
    primaryJoints: ['定梁', '台榫', '拱窗'],
    characteristic: '舞台特殊设计，声学效果优异，装饰华丽，便于表演和观众观看',
    examples: ['北京故宫畅音阁', '山西平遥古戏楼', '扬州何园戏台'],
    constructionMethod: '采用特殊榫卯结构支撑舞台，屋顶使用飞檐翘角设计，门窗和装饰融合了戏曲文化元素'
  },
  {
    id: 'shu-fen',
    name: '园林',
    category: '景观建筑',
    primaryJoints: ['榫树', '木锁', '拱窗'],
    characteristic: '与自然融合，结构精巧，造型多样，体现了"虽由人作，宛自天开"的设计理念',
    examples: ['苏州拙政园', '北京颐和园', '承德避暑山庄'],
    constructionMethod: '采用小型榫卯结构，亭台楼榭与自然景观相融合，门窗设计通透而富有装饰性'
  }
];

// 古代建筑结构
export const ANCIENT_STRUCTURES: AncientStructure[] = [
  {
    id: 'zheng-uo-bai-ta',
    name: '正觉白塔',
    dynasty: '元代',
    era: '元代',
    region: '北京',
    structureType: '喇嘛塔',
    architect: '阿尼哥',
    constructionYear: 1271,
    highlight: '中国现存最高大的喇嘛塔，融合了藏式、汉式和尼泊尔式建筑风格',
    description: '正觉白塔是北京妙应寺的主塔，高50.9米，采用藏式佛塔形制，塔身白色，塔顶使用铜制鎏金塔刹，是中国古代建筑艺术的杰作。塔身由砖石砌筑，内部采用复杂的榫卯结构，展现了元代工匠的高超技艺。',
    technicalFeatures: ['塔身呈覆钵形', '塔刹为十三天造型', '采用空心结构', '外檐装饰精美', '抗震性能优异'],
    visitorExperience: ['仰望白塔，感受其庄严神圣', '登塔远眺，俯瞰北京城景', '欣赏塔身的精美雕刻', '感受元代建筑的历史底蕴'],
    constructionChallenge: '如此高大的佛塔，在元代的技术条件下如何确保结构稳定？工匠们采用多层榫卯支撑、空心结构设计，巧妙解决了重心和稳定性问题。'
  },
  {
    id: 'ying-qian-mu-ta',
    name: '应县木塔',
    dynasty: '辽代',
    era: '辽代',
    region: '山西',
    structureType: '楼阁式木塔',
    architect: '绰契尔',
    constructionYear: 1056,
    highlight: '世界上现存最高、最古老的木结构建筑，历经千年风雨屹立不倒',
    description: '应县木塔建于辽代，高67.31米，共九层，全木结构，完全依靠榫卯连接而成，未用一钉一铆。木塔历经千年地震、风雨侵蚀和战火考验，至今依然稳固，被誉为"世界木结构建筑的奇迹"。',
    technicalFeatures: ['全木结构无钉无铆', '九层塔楼逐层收分', '斗拱节点采用多层榫卯', '具有卓越的抗震性能', '塔内藏有大量珍贵佛像'],
    visitorExperience: ['仰望木塔的壮观', '触摸千年古木', '感受榫卯结构的奥秘', '欣赏塔内佛像和壁画', '聆听古塔的历史传说'],
    constructionChallenge: '如此高大的木塔，如何防止倾倒？工匠采用逐层收分的结构设计，使塔身重心下移，塔身与地面形成完美的平衡。同时，复杂的榫卯结构分散了荷载，使木塔具有卓越的抗震性能。'
  },
  {
    id: 'zhao-zhou-qiao',
    name: '赵州桥',
    dynasty: '隋代',
    era: '隋代',
    region: '河北',
    structureType: '敞肩石拱桥',
    architect: '李春',
    constructionYear: 595-605,
    highlight: '世界上现存最古老的敞肩石拱桥，开创了拱桥设计的先河',
    description: '赵州桥又名安济桥，建于隋代，由著名工匠李春设计建造。桥长50.82米，主拱净跨37.02米，是中国现存最早的大型单孔敞肩石拱桥。桥身采用14道并列拱券，每道拱券之间有横向铁拉杆连接，体现了卓越的结构设计智慧。',
    technicalFeatures: ['敞肩设计，减轻桥身自重', '并列拱券结构，便于维修', '横贯铁拉杆，增强整体性', '拱肩各开小拱，增加泄洪能力', '设计精巧，美观实用'],
    visitorExperience: ['漫步古桥，感受千年历史的沉淀', '仰视主拱，惊叹古人的智慧', '抚摸石栏，想象千年前的工匠', '观察桥拱的精美雕刻', '聆听古桥的传说故事'],
    constructionChallenge: '在隋代的技术条件下，如何建造如此巨大的拱桥？工匠采用敞肩设计，在主拱两侧各开两个小拱，既减轻了桥身自重，又增加了泄洪能力，体现了极高的设计智慧。'
  },
  {
    id: 'sun-yat-sen-mu-diao-miao',
    name: '中山木雕庙',
    dynasty: '明末清初',
    era: '明末清初',
    region: '广东',
    structureType: '潮汕木雕建筑',
    architect: '佚名',
    constructionYear: 1650,
    highlight: '潮汕木雕建筑的代表作，集雕刻、建筑、绘画于一体',
    description: '中山木雕庙是潮汕地区明清建筑的瑰宝，采用精美的木雕工艺，榫卯结构精密，装饰华丽。庙宇建筑结构复杂，多层斗拱榫卯连接，展现了明末清初建筑工艺的巅峰。',
    technicalFeatures: ['木雕工艺精湛', '榫卯结构精密', '斗拱多层叠加', '装饰华丽精美', '体现了潮汕文化特色'],
    visitorExperience: ['欣赏精美的木雕装饰', '感受潮汕建筑的特色', '了解木雕工艺的历史', '体验传统建筑的韵味'],
    constructionChallenge: '如何在有限的尺寸内，实现如此精美的装饰和精密的结构？工匠们采用分层雕刻、榫卯结合的方式，将装饰与结构完美融合，既美观又牢固。'
  },
  {
    id: 'fujian-tulou',
    name: '福建土楼',
    dynasty: '明代',
    era: '明代至清代',
    region: '福建',
    structureType: '围合式土楼',
    architect: '佚名',
    constructionYear: 1400-1700,
    highlight: '世界上独一无二的民居建筑形式，体现了集体智慧和防御功能',
    description: '福建土楼是客家先民为防御外敌而建造的大型集体住宅，呈圆形、方形、椭圆形等多种形状。土楼采用生土夯筑，内部使用榫卯木结构作为支撑，楼内有一二三百户人家共居一屋，形成独特的家族聚落形态。',
    technicalFeatures: ['生土夯筑', '榫卯木结构支撑', '防御功能强大', '集体居住形式', '适应山区环境'],
    visitorExperience: ['进入土楼内部，感受家族聚落', '了解客家文化和历史', '观看土楼的防御设施', '体验客家民俗活动', '品尝客家美食'],
    constructionChallenge: '如何建造既能防御外敌又能居住的家园？土楼采用厚实的生土墙体和精巧的榫卯木结构，外敌难以攻破，内部则形成了舒适的居住环境，体现了客家人的生存智慧。'
  },
  {
    id: 'xishuangbanna-dong',
    name: '西双版纳侗族风雨桥',
    dynasty: '清代',
    era: '清代',
    region: '云南',
    structureType: '风雨桥',
    architect: '侗族工匠',
    constructionYear: 1700,
    highlight: '侗族建筑艺术的杰作，集交通、休憩、文化于一体',
    description: '西双版纳侗族风雨桥是侗族传统建筑的代表，桥身采用榫卯木结构，桥上建有廊亭，供行人避雨遮阳。风雨桥通常没有桥墩，直接架设在溪流之上，结构精巧，造型美观，体现了侗族工匠的高超技艺。',
    technicalFeatures: ['无桥墩设计', '榫卯木结构', '廊亭遮阳避雨', '与自然融为一体', '体现了侗族文化'],
    visitorExperience: ['在廊亭中休憩', '观赏桥上的雕刻', '感受侗族文化的魅力', '在溪边散步', '拍摄美丽的风景'],
    constructionChallenge: '如何建造无需桥墩的桥梁？侗族工匠采用巧妙的结构设计，将桥梁架设在溪流之上，利用榫卯结构的连接和廊亭的重量，使桥梁保持稳定，既美观又实用。'
  },
  {
    id: 'chengdu-jin-sha-yi-zhi',
    name: '成都金沙遗址建筑遗址',
    dynasty: '商代',
    era: '商代',
    region: '四川',
    structureType: '干栏式建筑',
    architect: '古蜀先民',
    constructionYear: -1200,
    highlight: '古蜀文明的建筑证据，展现了商代建筑工艺的成就',
    description: '成都金沙遗址发现了大量商代建筑遗迹，其中干栏式建筑是重要发现。干栏式建筑采用木桩架空的方式建造，下层支撑上层建筑，既防潮又防洪，是古代南方地区常见的建筑形式。建筑遗迹中发现了早期的榫卯结构。',
    technicalFeatures: ['干栏式建筑', '木桩架空', '早期榫卯结构', '防潮防洪', '适应南方气候'],
    visitorExperience: ['参观遗址现场', '了解古蜀文明', '观看建筑遗迹', '感受古蜀建筑智慧'],
    constructionChallenge: '如何在南方潮湿多雨的环境中建造房屋？古蜀先民采用干栏式建筑，将房屋架设在木桩之上，既防潮又防洪，创造了适合南方环境的居住方式。'
  },
  {
    id: 'suzhou-mian-zhai',
    name: '苏州木雕馆',
    dynasty: '清代',
    era: '清代',
    region: '江苏',
    structureType: '江南园林建筑',
    architect: '佚名',
    constructionYear: 1800,
    highlight: '江南园林建筑的精品，集建筑、雕刻、绘画于一体',
    description: '苏州木雕馆是江南园林建筑的代表，建筑采用精致的木雕工艺和精巧的榫卯结构。馆内建筑与园林景观完美融合，亭台楼榭错落有致，门窗雕刻精美，展现了清代苏州园林建筑的艺术成就。',
    technicalFeatures: ['木雕工艺精湛', '榫卯结构精巧', '与园林融合', '亭台楼榭错落', '门窗雕刻精美'],
    visitorExperience: ['欣赏精美的木雕', '游览园林景观', '感受江南文化的韵味', '品尝江南美食', '体验苏州的慢生活'],
    constructionChallenge: '如何在有限的园林空间内，创造出如此丰富的建筑景观？苏州工匠巧妙地利用榫卯结构，将亭台楼榭与园林景观完美融合，既美观又实用，体现了"虽由人作，宛自天开"的设计理念。'
  }
];

// 榫卯相关关键词
export const MORTISE_KEYWORDS = {
  tenon: ['榫头', '凸起', '榫子', '钩', '连接'],
  mortise: ['榫眼', '凹槽', '孔洞', '榫孔', '接收'],
  structure: ['结构', '框架', '支撑', '节点', '连接'],
  construction: ['施工', '建造', '搭建', '组装', '固定'],
  material: ['木材', '木料', '木结构', '木雕', '檀木'],
  technique: ['技艺', '工艺', '技术', '方法', '诀窍'],
  advantage: ['牢固', '稳固', '抗震', '连接', '整体'],
  disadvantage: ['复杂', '困难', '要求高', '易松动', '维护难'],
  dynasty: ['商代', '西周', '战国', '秦代', '汉代', '唐代', '宋代', '元代', '明代', '清代'],
  category: ['基础连接', '十字连接', '水平连接', '加固结构', '斜向连接', '桥梁结构', '砖石结构', '梁柱节点', '楼阁结构', '门窗结构']
};
