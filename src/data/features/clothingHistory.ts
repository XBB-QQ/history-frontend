/**
 * 历代服饰演变与文化数据
 * 覆盖先秦至清代各朝代服饰特征、等级制度、材质工艺
 */

export type ClothingType = 'headwear' | 'top' | 'bottom' | 'footwear' | 'accessory' | 'full';

export interface ClothingItem {
  name: string;
  type: ClothingType;
  description: string;
  wearers: string[];
  materials: string[];
  historicalNote: string;
}

/** 服饰图片资源（来自 Wikimedia Commons，CC0/Public Domain/CC BY 等开放授权） */
export interface ClothingImage {
  url: string;
  caption: string;
  license: string;
}

export interface DynastyClothing {
  id: string;
  dynasty: string;
  era: string;
  description: string;
  features: string[];
  clothingItems: ClothingItem[];
  colorSystem: string;
  rankSystem: string;
  culturalMeaning: string;
  /** 该朝代相关文物图片（壁画/陶俑/绘画/服饰实物等） */
  images: ClothingImage[];
}

export const DYNASTY_CLOTHING: DynastyClothing[] = [
  {
    id: 'shang-zhou',
    dynasty: '先秦（商周）',
    era: '约前1600-前221年',
    description: '上衣下裳制确立，冠冕制度初成，深衣出现，礼制服饰体系奠基',
    features: [
      '上衣下裳（交领右衽）',
      '冠冕制度区分等级',
      '玉佩组绶彰显身份',
      '深衣（上下连属）出现于春秋战国',
      '染色以矿物颜料为主（朱砂、石黄）',
    ],
    clothingItems: [
      {
        name: '玄衣',
        type: 'top',
        description: '黑色交领上衣，祭祀时穿，象征天地玄黄',
        wearers: ['天子', '贵族'],
        materials: ['丝帛', '麻布'],
        historicalNote: '《周礼》规定天子祭祀穿玄衣纁裳，上衣画六章（日月至黼黻），下裳绣六章',
      },
      {
        name: '冕冠',
        type: 'headwear',
        description: '礼冠，顶覆綖板，前后垂旒，十二旒为天子专用',
        wearers: ['天子', '诸侯'],
        materials: ['竹丝', '玉珠', '丝线'],
        historicalNote: '冕旒数量区分等级：天子十二旒，诸侯九旒，上大夫七旒，下大夫五旒',
      },
      {
        name: '深衣',
        type: 'full',
        description: '上衣下裳相连的长衣，交领右衽，曲裾绕身',
        wearers: ['士人', '贵族', '平民'],
        materials: ['丝帛', '麻布'],
        historicalNote: '《礼记·深衣》详细记载裁剪规范，深衣是先秦最具代表性的服饰',
      },
      {
        name: '组玉佩',
        type: 'accessory',
        description: '多件玉器串联的佩饰，行走时碰撞发声以节步',
        wearers: ['贵族'],
        materials: ['和田玉', '丝线'],
        historicalNote: '组玉佩越长等级越高，墓主身份可由玉佩数量判定',
      },
    ],
    colorSystem: '尚玄（黑）尚黄，五方正色（青赤黄白黑）对应五行五方',
    rankSystem: '以冕旒数量、衣章纹样、玉佩组数区分天子至士人的等级',
    culturalMeaning: '先秦服饰是礼制的物化表现，"垂衣裳而天下治"体现了服饰的政治功能',
    images: [
      {
        url: '/images/clothing/shang-zhou-0-960px-Bronze_Colossal_Standing_Figure__Sanxingdui_a.jpg',
        caption: '三星堆青铜大立人像（商代，服饰纹饰繁复，体现古蜀祭司服饰）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/shang-zhou-1-960px-Sanxingdui_Bronze_Standing_Figure__9950576136_.jpg',
        caption: '三星堆青铜立人像（另一角度，可见冠帽与衣纹细节）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/shang-zhou-2-960px-Bronze_Figure_with_Headdress__Sanxingdui.jpg',
        caption: '三星堆戴冠青铜人像（反映商代冠帽形制）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/shang-zhou-3-960px-Ancient_Shu_Altar_Reconstruction__Sanxingdui.jpg',
        caption: '古蜀祭坛复原（三星堆博物馆藏，反映祭祀服饰）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/shang-zhou-4-960px-Pendant_in_the_shape_of_a_Human_Figure__China__Warring_States_period__.jpg',
        caption: '战国玉人佩饰（哈佛大学萨克勒博物馆藏，反映深衣形制）',
        license: 'Public domain',
      },
    ],
  },
  {
    id: 'qin-han',
    dynasty: '秦汉',
    era: '前221-220年',
    description: '深衣普及，曲裾绕襟，直裾出现，丝绸纺织技术飞跃',
    features: [
      '曲裾深衣为主流（绕襟）',
      '直裾深衣出现（直襟）',
      '冠式制度化（冠帽区分身份）',
      '丝绸之路带动丝绸外销',
      '以黑色为尊（秦水德），汉改尚赤',
    ],
    clothingItems: [
      {
        name: '曲裾深衣',
        type: 'full',
        description: '衣襟接长绕身后，三角状缠绕，紧裹身体',
        wearers: ['贵族', '平民'],
        materials: ['丝绸', '麻布'],
        historicalNote: '马王堆汉墓出土曲裾素纱襌衣仅49克，代表汉代纺织技术巅峰',
      },
      {
        name: '直裾深衣',
        type: 'full',
        description: '衣襟垂直而下不绕身，较曲裾简便',
        wearers: ['士人', '平民'],
        materials: ['丝绸', '麻布'],
        historicalNote: '东汉后期逐渐取代曲裾，因内衣裤普及后无需绕襟遮掩',
      },
      {
        name: '刘氏冠',
        type: 'headwear',
        description: '竹皮编织的长冠，刘邦所创',
        wearers: ['官员'],
        materials: ['竹皮', '丝线'],
        historicalNote: '《史记》载高祖以竹皮为冠，遂为汉代官员祭冠之制',
      },
      {
        name: '履',
        type: 'footwear',
        description: '丝织或麻编的平底鞋，分履屦',
        wearers: ['贵族', '平民'],
        materials: ['丝帛', '麻', '皮革'],
        historicalNote: '汉代规定入朝脱履，臣下着袜上殿，赤足为失礼',
      },
    ],
    colorSystem: '秦尚黑（水德），汉初尚赤（火德），东汉改尚黄',
    rankSystem: '以冠式（长冠/进贤冠/法冠）和绶带颜色区分官品等级',
    culturalMeaning: '汉代服饰奠定了汉服的基本形制，丝绸之路使丝绸成为中华文明的象征',
    images: [
      {
        url: '/images/clothing/qin-han-1-Dahuting_tomb_mural_detail_of_a_woman__Eastern_Han.jpg',
        caption: '打虎亭汉墓壁画·女性人物特写（东汉，反映曲裾深衣穿着效果）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/qin-han-2-960px-Dahuting_Eastern_Han_Tombs_Mural_-_29.jpg',
        caption: '打虎亭汉墓壁画（东汉，反映汉代人物服饰全貌）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/qin-han-3-960px-Dahuting_Eastern_Han_Tombs_Mural_-_5.jpg',
        caption: '打虎亭汉墓壁画（东汉宴饮/乐舞场景，人物服饰清晰）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/qin-han-4-960px-Dahuting_Eastern_Han_Tombs_Mural_-_20.jpg',
        caption: '打虎亭汉墓壁画（东汉，反映鞋履与下裳形制）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/qin-han-5-960px-Dahuting_Eastern_Han_Tombs_Mural_-_30.jpg',
        caption: '打虎亭汉墓壁画（东汉人物群像）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/qin-han-0-Dahuting_mural__Eastern_Han_Dynasty.jpg',
        caption: '打虎亭汉墓壁画全景（河南密县，东汉晚期）',
        license: 'Public domain',
      },
    ],
  },
  {
    id: 'wei-jin',
    dynasty: '魏晋南北朝',
    era: '220-589年',
    description: '宽衣博带成风，胡服骑射影响深，裤褶服流行，民族服饰交融',
    features: [
      '宽衫大袖，褒衣博带',
      '胡服（裤褶）传入中原',
      '袴褶服便于骑射活动',
      '女性穿襦裙（短上衣+长裙）',
      '幅巾束发替代冠帽',
    ],
    clothingItems: [
      {
        name: '宽衫',
        type: 'top',
        description: '宽大的交领长衫，袖口敞开，飘逸洒脱',
        wearers: ['士人', '贵族'],
        materials: ['丝绸', '麻布'],
        historicalNote: '竹林七贤画像砖中人物皆穿宽衫，体现魏晋风度与玄学审美',
      },
      {
        name: '裤褶',
        type: 'full',
        description: '上衣下裤，紧身便于骑射，源自北方游牧民族',
        wearers: ['军人', '平民'],
        materials: ['麻布', '毛织物'],
        historicalNote: '赵武灵王胡服骑射的延续，南北朝时裤褶成为军服和常服',
      },
      {
        name: '襦裙',
        type: 'full',
        description: '短襦（上衣）配长裙，腰间束带',
        wearers: ['女性'],
        materials: ['丝绸', '麻布'],
        historicalNote: '襦裙成为此后千年女性服饰的基本形制，延续至明清',
      },
      {
        name: '幅巾',
        type: 'headwear',
        description: '丝帛或麻布裹头，替代正式冠帽',
        wearers: ['士人', '平民'],
        materials: ['丝帛', '麻布'],
        historicalNote: '魏晋名士以幅巾为风尚，诸葛亮羽扇纶巾即此风之延续',
      },
    ],
    colorSystem: '尚白（魏）尚红（晋），南方崇素雅，北方尚鲜艳',
    rankSystem: '以服饰颜色和材质区分等级，裤褶颜色区分文武',
    culturalMeaning: '魏晋服饰反映了个性的解放和民族交融，为隋唐服饰的多元开放奠定基础',
    images: [
      {
        url: '/images/clothing/extra-0-Seven_Sages_of_the_Bamboo_Grove_by_Honda_Tenj_.jpg',
        caption: '竹林七贤图（反映魏晋宽衫大袖、幅巾束发的名士风度）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/extra-1-_____-Seven_Sages_of_the_Bamboo_Grove_MET_DP361155.jpg',
        caption: '竹林七贤图（大都会博物馆藏本，反映褒衣博带之风）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/wei-jin-0-960px-Pottery_Figurine_of_Wei__Jin__or_Southern-Northern_Dynasties.jpg',
        caption: '魏晋南北朝陶俑（反映当时襦裙与裤褶形制）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/wei-jin-5-960px-Northern_dynasties_soldiers_01.jpg',
        caption: '北朝士兵陶俑（反映裤褶服便于骑射的特征）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/extra-2-Northern_Wei_Painted_Pottery_Female_Musician_03.jpg',
        caption: '北魏彩绘女乐俑（反映北方鲜卑服饰与汉服交融）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/extra-3-Northern_Wei_Pottery_Musicians_from_Tomb_of_Yuan_Zhao__Luoyang_-_1.jpg',
        caption: '北魏元邵墓乐俑（洛阳出土，反映北朝服饰）',
        license: 'CC0',
      },
    ],
  },
  {
    id: 'tang',
    dynasty: '隋唐',
    era: '581-907年',
    description: '服饰华丽开放，胡服盛行，女装坦露，品色服制度确立',
    features: [
      '圆领袍衫为男装主流',
      '女装襦裙坦露（低胸）',
      '胡服（胡帽/窄袖）风靡',
      '品色服制度（紫绯绿青）',
      '半臂披帛增添飘逸感',
    ],
    clothingItems: [
      {
        name: '圆领袍衫',
        type: 'full',
        description: '圆领窄袖长袍，膝下施横襕，配革带靴',
        wearers: ['官员', '士人', '平民'],
        materials: ['丝绸', '绫罗'],
        historicalNote: '受鲜卑胡服影响，唐代圆领袍成为此后千年男装的基本形制',
      },
      {
        name: '齐胸襦裙',
        type: 'full',
        description: '裙腰束至胸部以上，上衣短小，裙摆曳地',
        wearers: ['贵族女性', '仕女'],
        materials: ['丝绸', '绫罗', '纱罗'],
        historicalNote: '唐代仕女画中常见齐胸裙，体现唐代开放的审美观',
      },
      {
        name: '半臂',
        type: 'top',
        description: '短袖外衣，长及腰间，套在襦衫之外',
        wearers: ['女性'],
        materials: ['丝绸', '纱罗'],
        historicalNote: '半臂是唐代特色服饰，源自西域，与披帛搭配使用',
      },
      {
        name: '幞头',
        type: 'headwear',
        description: '巾帛裹头，两脚系于脑后或垂下',
        wearers: ['官员', '士人'],
        materials: ['丝帛', '漆纱'],
        historicalNote: '幞头由北周武帝始创，唐代发展出硬脚幞头，宋明演变为乌纱帽',
      },
    ],
    colorSystem: '品色服：三品紫，四五品绯，六七品绿，八九品青',
    rankSystem: '以袍服颜色、革带材质（玉/犀/金/银/铜）和鱼袋区分官品',
    culturalMeaning: '唐代服饰是古代最开放的时期，胡服与汉服并存，体现了大唐的包容与自信',
    images: [
      {
        url: '/images/clothing/tang-5-960px-Court_Ladies_of_the_Tang.jpg',
        caption: '唐代仕女图（反映齐胸襦裙与披帛的穿着效果）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/tang-4-960px-Court_ladies_pounding_silk_from_a_painting_______by_Emperor_Huizong.jpg',
        caption: '捣练图（宋徽宗摹唐代张萱原作，反映唐代女装全貌）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/extra-4-Tang-PolychromeGlazedFigurineOfWoman-ShanghaiMuseum-May27-08.jpg',
        caption: '唐三彩女立俑（上海博物馆藏，反映唐代女性服饰实物）',
        license: 'CC BY-SA 3.0',
      },
      {
        url: '/images/clothing/extra-5-Tang_Dynasty_woman_with_long_silk_sleeves.JPG',
        caption: '唐代女俑·长袖造型（反映半臂与披帛搭配）',
        license: 'CC BY-SA 4.0',
      },
      {
        url: '/images/clothing/extra-6-Tomb_figurine_of_a_horse_with_rider__China__Tang_dynasty__618-906_AD__earthenware_with_traces_of.jpg',
        caption: '唐代骑马俑（斯德哥尔摩远东博物馆藏，反映圆领袍衫与胡服）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/extra-7-Cavalier_en_armure_Yide_Tang_Guimet.jpg',
        caption: '唐代武士骑马俑（吉美博物馆藏，反映圆领袍配革带靴）',
        license: 'CC BY-SA 4.0',
      },
    ],
  },
  {
    id: 'song',
    dynasty: '宋代',
    era: '960-1279年',
    description: '理学影响下趋于内敛保守，女装瘦长雅致，男装简洁实用',
    features: [
      '女装窄瘦修长（褙子）',
      '男装尚简洁（直裰/衫）',
      '幞头演变为展角（硬翅）',
      '色彩素雅，纹样精细',
      '缠足风气开始（北宋后期）',
    ],
    clothingItems: [
      {
        name: '褙子',
        type: 'full',
        description: '直领对襟长衣，两侧开衩，修身窄袖',
        wearers: ['女性', '士人'],
        materials: ['丝绸', '绫罗'],
        historicalNote: '褙子是宋代最具代表性的服饰，男女皆穿，体现理学审美的内敛',
      },
      {
        name: '直裰',
        type: 'full',
        description: '交领长衫，宽袖，士人和僧道常穿',
        wearers: ['士人', '僧道'],
        materials: ['绢帛', '麻布'],
        historicalNote: '宋代文人画像中多见直裰，是宋代男性日常服饰',
      },
      {
        name: '展角幞头',
        type: 'headwear',
        description: '幞头两脚平直展开如翅，以铁丝/竹丝为骨',
        wearers: ['官员'],
        materials: ['漆纱', '铁丝'],
        historicalNote: '宋代展角幞头即后世"乌纱帽"的原型，两翅防止官员交头接耳',
      },
      {
        name: '罗裙',
        type: 'bottom',
        description: '多幅丝绸拼合的长裙，褶皱细密',
        wearers: ['女性'],
        materials: ['罗', '绮'],
        historicalNote: '宋代罗裙以细褶为美，福州黄昇墓出土的多幅罗裙工艺精湛',
      },
    ],
    colorSystem: '尚青绿等素雅色，禁用正色（黄/紫），品色服沿用唐制但更素淡',
    rankSystem: '以幞头展角长度、袍服颜色、革带材质区分官品',
    culturalMeaning: '宋代服饰受理学影响趋向保守内敛，瘦长造型体现了文人审美和理性精神',
    images: [
      {
        url: '/images/clothing/song-1-960px-Portrait_de_Song_Taizu.jpg',
        caption: '宋太祖赵匡胤画像（反映展角幞头与圆领袍形制）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/song-5-Song_court_lady.jpg',
        caption: '宋代宫女图（反映褙子修身瘦长的特征）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/extra-8-___.jpg',
        caption: '文会图（反映宋代文人直裰与日常服饰）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/extra-9-Dame_Guoguo_partant_faire_une_promenade___cheval__copie_par_Li_Gonglin.jpg',
        caption: '虢国夫人游春图摹本（李公麟，反映宋代女性襦裙）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/extra-10-Refusing_the_Seat_-_Anonymous_painter_during_the_Song_dynasty.jpg',
        caption: '宋代画作·辞座图（反映宋代士人服饰）',
        license: 'Public domain',
      },
    ],
  },
  {
    id: 'yuan',
    dynasty: '元代',
    era: '1271-1368年',
    description: '蒙古服饰影响深远，质孙服制度独特，辫线袄流行',
    features: [
      '质孙服（一色服）制度',
      '辫线袄（贴里）流行',
      '戴笠帽瓦楞帽',
      '女性穿袄裙（合韩服影响）',
      '蒙古族穿辫发',
    ],
    clothingItems: [
      {
        name: '质孙服',
        type: 'full',
        description: '上下连属的一色衣，衣冠颜色统一',
        wearers: ['官员', '贵族'],
        materials: ['丝绸', '织金锦'],
        historicalNote: '忽必烈制定的宫廷服饰制度，每次宴会换一色，千人同色',
      },
      {
        name: '辫线袄',
        type: 'top',
        description: '腰间打褶的交领窄袖长袍，腰系辫线',
        wearers: ['官员', '军人'],
        materials: ['丝绸', '织金锦'],
        historicalNote: '辫线袄源自蒙古族骑射服饰，腰间密褶便于活动',
      },
      {
        name: '钹笠冠',
        type: 'headwear',
        description: '笠帽形如钹，顶部尖圆',
        wearers: ['帝王', '贵族'],
        materials: ['竹丝', '漆纱', '珠玉'],
        historicalNote: '元代帝王常戴钹笠冠，顶饰大珠，是蒙古特色冠帽',
      },
      {
        name: '姑姑冠',
        type: 'headwear',
        description: '高耸的圆柱状冠，顶部扩展如鸭舌',
        wearers: ['贵族女性'],
        materials: ['竹丝', '桦树皮', '丝绸', '珠玉'],
        historicalNote: '蒙古贵族已婚妇女的高冠，最高可达三尺，元代独特风景',
      },
    ],
    colorSystem: '尚白（蒙古尚白），质孙服一日一色',
    rankSystem: '以质孙服颜色、冠帽装饰、革带材质区分等级',
    culturalMeaning: '元代服饰是蒙古与汉族文化的交融，质孙服制度体现了大一统下的民族融合',
    images: [
      {
        url: '/images/clothing/yuan-0-960px-YuanEmperorAlbumKhubilaiPortrait.jpg',
        caption: '元世祖忽必烈画像（反映钹笠冠与蒙古袍服）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/yuan-1-960px-YuanEmperorAlbumKhubilaiFull.jpg',
        caption: '忽必烈全身像（反映质孙服与蒙古服饰全貌）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/yuan-4-Man_wearing_a_Mongol_robe_with_underarm_openings.JPG',
        caption: '蒙古袍实物（腋下开衩，反映辫线袄形制）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/extra-12-Liu-Kuan-Tao-Jagd.JPG',
        caption: '刘贯道《元世祖出猎图》（反映元代帝王狩猎服饰）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/yuan-3-Qubilai_Setsen_Khaan.JPG',
        caption: '元世祖画像（另一版本，可见冠帽细节）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/extra-13-___________.jpg',
        caption: '元太宗窝阔台汗画像（反映蒙古帝王冠帽）',
        license: 'CC0',
      },
    ],
  },
  {
    id: 'ming',
    dynasty: '明代',
    era: '1368-1644年',
    description: '恢复汉唐衣冠制度，服饰等级森严，补子制度确立',
    features: [
      '恢复汉冠服制度',
      '补子（胸背绣章）区分官品',
      '网巾束发为定式',
      '女装袄裙为主流',
      '乌纱帽定型（展角幞头演变）',
    ],
    clothingItems: [
      {
        name: '补服',
        type: 'full',
        description: '胸前背后缀方形补子，绣飞禽走兽区分文武官品',
        wearers: ['官员'],
        materials: ['丝绸', '金线'],
        historicalNote: '文官绣飞禽（一品仙鹤），武官绣走兽（一品位狮子），补子制度沿用至清末',
      },
      {
        name: '袄裙',
        type: 'full',
        description: '交领或立领袄上衣，配马面裙',
        wearers: ['女性'],
        materials: ['丝绸', '绫罗'],
        historicalNote: '明代袄裙是汉服的晚期形制，马面裙的侧褶设计便于活动',
      },
      {
        name: '乌纱帽',
        type: 'headwear',
        description: '黑色纱制硬帽，两侧展翅如翅',
        wearers: ['官员'],
        materials: ['漆纱', '铁丝'],
        historicalNote: '乌纱帽定型于明代，成为官员身份的象征，"乌纱帽"遂代指官职',
      },
      {
        name: '网巾',
        type: 'headwear',
        description: '丝线编织的网罩，束发于内',
        wearers: ['男性'],
        materials: ['丝线', '马尾'],
        historicalNote: '朱元璋推广网巾，规定男子皆需戴网巾束发，成为明代男子头饰定式',
      },
    ],
    colorSystem: '尚赤（红），品色服：一至四品绯，五至七品青，八九品绿',
    rankSystem: '以补子纹样、腰带材质（玉/犀角/金/银/角）和冠帽区分官品',
    culturalMeaning: '明代服饰是对汉文化的复兴，补子制度将服饰等级推向极致，影响了朝鲜越南服饰',
    images: [
      {
        url: '/images/clothing/ming-2-960px-A_Seated_Portrait_of_Ming_Emperor_Taizu.jpg',
        caption: '明太祖朱元璋坐像（反映乌纱帽与补服形制）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/ming-1-960px-Portrait_assis_de_l_empereur_Ming_Chengzu.jpg',
        caption: '明成祖朱棣坐像（反映明代帝王冠服与补子）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/ming-0-960px-Ming_Xuanzong.jpg',
        caption: '明宣宗坐像（反映乌纱帽与圆领袍）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/ming-5-960px-Ming_Shenzong__1_.jpg',
        caption: '明神宗坐像（反映明代晚期帝王服饰与补子纹样）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/extra-14-Portrait_assis_de_l_empereur_Tianqi.jpg',
        caption: '明熹宗坐像（反映明代冠帽与袍服细节）',
        license: 'Public domain',
      },
    ],
  },
  {
    id: 'qing',
    dynasty: '清代',
    era: '1644-1912年',
    description: '满族服饰主导，剃发易服，马褂旗袍盛行，服饰民族政策严苛',
    features: [
      '剃发易服（剃发留辫）',
      '长袍马褂为男装主流',
      '旗袍为女装代表',
      '顶戴花翎区分官品',
      '缠足（汉族女性）与天足（满族女性）并存',
    ],
    clothingItems: [
      {
        name: '长袍马褂',
        type: 'full',
        description: '长袍外套短马褂，立领窄袖',
        wearers: ['男性'],
        materials: ['丝绸', '缎', '呢绒'],
        historicalNote: '马褂源自满族骑射服饰，清代成为男子标准礼服，沿用至民国',
      },
      {
        name: '旗袍',
        type: 'full',
        description: '立领右衽长袍，腰部收紧，开衩',
        wearers: ['女性'],
        materials: ['丝绸', '缎'],
        historicalNote: '旗袍源自满族女服，民国时期改良后成为最具代表性的中国女装',
      },
      {
        name: '顶戴花翎',
        type: 'headwear',
        description: '冠顶嵌宝石（顶戴），冠后插孔雀翎（花翎）',
        wearers: ['官员'],
        materials: ['红宝石/蓝宝石/水晶', '孔雀翎'],
        historicalNote: '顶戴材质（红宝石/珊瑚/蓝宝石/水晶/金/银）区分品级，花翎眼数（一至三眼）区分勋贵',
      },
      {
        name: '朝珠',
        type: 'accessory',
        description: '108颗珠子串联的佩饰，挂于胸前',
        wearers: ['官员'],
        materials: ['东珠/翡翠/珊瑚/琥珀'],
        historicalNote: '朝珠源自佛教念珠，清代规定文五品武四品以上方可佩戴',
      },
    ],
    colorSystem: '尚黄（帝王专用），品色服：石青色外褂为主，以补子和顶戴区分',
    rankSystem: '以顶戴材质、花翎眼数、补子纹样、朝珠材质综合区分官品',
    culturalMeaning: '清代服饰是满汉文化碰撞的产物，剃发易服政策深刻影响了近代中国人的外貌认同',
    images: [
      {
        url: '/images/clothing/qing-0-960px-20241025_Dragon_Robe_of_Daoguang_Emperor__Qing_Dynasty_02.jpg',
        caption: '清道光帝龙袍实物（反映清代皇帝吉服龙袍）',
        license: 'CC BY-SA 4.0',
      },
      {
        url: '/images/clothing/qing-1-960px-Qing_Dragon_Robe_a.jpg',
        caption: '清代龙袍正面（反映马蹄袖与龙纹刺绣）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/qing-2-960px-Qing_Dragon_Robe_b.jpg',
        caption: '清代龙袍背面（反映补子与龙纹布局）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/qing-4-960px-1913.158_-_Emperor_s_Jifu__Semiformal_Court_Robe_.jpg',
        caption: '清代皇帝吉服袍（博物馆藏，反映吉服全貌）',
        license: 'CC0',
      },
      {
        url: '/images/clothing/extra-16-Man_s_semi-formal_court_robe__jifu__-_Google_Art_Project.jpg',
        caption: '清代男子吉服袍（Google Art Project，反映长袍马褂形制）',
        license: 'Public domain',
      },
      {
        url: '/images/clothing/qing-3-960px-Robe__dragon__AM_12081-1_.jpg',
        caption: '清代龙袍实物（反映朝珠搭配与服饰等级）',
        license: 'CC BY 4.0',
      },
    ],
  },
];

/** 所有服饰条目扁平列表 */
export const ALL_CLOTHING_ITEMS = DYNASTY_CLOTHING.flatMap(d =>
  d.clothingItems.map(item => ({ ...item, dynasty: d.dynasty }))
);

/** 按类型分组 */
export const CLOTHING_BY_TYPE: Record<ClothingType, typeof ALL_CLOTHING_ITEMS> = {
  headwear: ALL_CLOTHING_ITEMS.filter(i => i.type === 'headwear'),
  top: ALL_CLOTHING_ITEMS.filter(i => i.type === 'top'),
  bottom: ALL_CLOTHING_ITEMS.filter(i => i.type === 'bottom'),
  footwear: ALL_CLOTHING_ITEMS.filter(i => i.type === 'footwear'),
  accessory: ALL_CLOTHING_ITEMS.filter(i => i.type === 'accessory'),
  full: ALL_CLOTHING_ITEMS.filter(i => i.type === 'full'),
};

/** 服饰类型中文名映射 */
export const CLOTHING_TYPE_LABELS: Record<ClothingType, string> = {
  headwear: '冠帽首服',
  top: '上衣',
  bottom: '下裳',
  footwear: '足衣',
  accessory: '配饰',
  full: '通裁',
};
