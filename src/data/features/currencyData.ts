/**
 * 历史货币购买力数据 — 跨朝代物价与货币换算
 * @see history-museum/ITERATIONS.md Iteration #70
 *
 * 数据来源：《食货志》《汉书》《宋史》等历史文献
 * 价格以稻米/小米为基准，单位：贯（一贯=1000文）
 */

/** 货币类型 */
export type CurrencyType = 'coins' | 'paper' | 'silver' | 'gold';

/** 单个朝代货币数据 */
export interface DynastyCurrency {
  /** 朝代名称 */
  dynasty: string;
  /** 朝代时期 */
  period: string;
  /** 主要货币类型 */
  currencyType: CurrencyType;
  /** 1贯 = 多少文钱 */
  guanToWen: number;
  /** 1两银 = 多少贯 */
  liangToGuan: number;
  /** 1两金 = 多少两银 */
  liangGoldToSilver: number;
  /** 主要实物价格（大米） */
  ricePricePerGuan: number;
  /** 主要实物价格（面粉） */
  flourPricePerGuan: number;
  /** 主要实物价格（布匹） */
  clothPricePerGuan: number;
  /** 主要实物价格（肉） */
  meatPricePerGuan: number;
  /** 主要实物价格（酒） */
  winePricePerGuan: number;
  /** 典型物品价格 */
  prices: {
    [key: string]: number;
  };
}

/** 购买力计算结果 */
export interface PurchasingPower {
  /** 原始金额（货币单位） */
  amount: number;
  /** 换算为当前人民币（元） */
  yuanValue: number;
  /** 可购买大米（斤） */
  riceAmount: number;
  /** 可购买面粉（斤） */
  flourAmount: number;
  /** 可购买布匹（匹） */
  clothAmount: number;
  /** 可购买猪肉（斤） */
  meatAmount: number;
  /** 可购买酒（斤） */
  wineAmount: number;
}

export const DYNASTY_CURRENCIES: DynastyCurrency[] = [
  // 夏商西周（青铜/贝壳货币）
  {
    dynasty: '夏商西周',
    period: '约前2070年-前771年',
    currencyType: 'coins',
    guanToWen: 1000,
    liangToGuan: 0.02,
    liangGoldToSilver: 15,
    ricePricePerGuan: 3000, // 约3000斤大米
    flourPricePerGuan: 2800,
    clothPricePerGuan: 1500,
    meatPricePerGuan: 5000,
    winePricePerGuan: 4000,
    prices: {
      '一斗米': 0.33, // 1贯=3000斤，1斗=15斤
      '一匹布': 0.67,
      '一斤肉': 0.2,
    }
  },
  // 东周（战国）
  {
    dynasty: '东周',
    period: '前770年-前221年',
    currencyType: 'coins',
    guanToWen: 1000,
    liangToGuan: 0.03,
    liangGoldToSilver: 12,
    ricePricePerGuan: 2500,
    flourPricePerGuan: 2400,
    clothPricePerGuan: 1200,
    meatPricePerGuan: 4500,
    winePricePerGuan: 3500,
    prices: {
      '一斗米': 0.25,
      '一匹布': 0.83,
      '一斤肉': 0.22,
    }
  },
  // 秦朝
  {
    dynasty: '秦朝',
    period: '前221年-前207年',
    currencyType: 'coins',
    guanToWen: 1000,
    liangToGuan: 0.04,
    liangGoldToSilver: 10,
    ricePricePerGuan: 2000,
    flourPricePerGuan: 1900,
    clothPricePerGuan: 1000,
    meatPricePerGuan: 4000,
    winePricePerGuan: 3000,
    prices: {
      '一石米': 2, // 1石=120斤
      '一匹布': 1,
      '一斗酒': 0.33,
    }
  },
  // 汉朝
  {
    dynasty: '汉朝',
    period: '前202年-220年',
    currencyType: 'coins',
    guanToWen: 1000,
    liangToGuan: 0.05,
    liangGoldToSilver: 8,
    ricePricePerGuan: 1800,
    flourPricePerGuan: 1700,
    clothPricePerGuan: 900,
    meatPricePerGuan: 3500,
    winePricePerGuan: 2500,
    prices: {
      '一石米': 1.8,
      '一匹布': 1.11,
      '一斤肉': 0.28,
      '一斗酒': 0.4,
    }
  },
  // 三国两晋南北朝
  {
    dynasty: '三国两晋南北朝',
    period: '220年-589年',
    currencyType: 'coins',
    guanToWen: 1000,
    liangToGuan: 0.06,
    liangGoldToSilver: 6,
    ricePricePerGuan: 1600,
    flourPricePerGuan: 1500,
    clothPricePerGuan: 800,
    meatPricePerGuan: 3000,
    winePricePerGuan: 2000,
    prices: {
      '一斗米': 0.16,
      '一匹布': 1.25,
      '一斤肉': 0.33,
    }
  },
  // 隋朝
  {
    dynasty: '隋朝',
    period: '581年-618年',
    currencyType: 'coins',
    guanToWen: 1000,
    liangToGuan: 0.07,
    liangGoldToSilver: 5,
    ricePricePerGuan: 1500,
    flourPricePerGuan: 1400,
    clothPricePerGuan: 700,
    meatPricePerGuan: 2800,
    winePricePerGuan: 1800,
    prices: {
      '一斗米': 0.15,
      '一匹布': 1.43,
    }
  },
  // 唐朝（盛唐）
  {
    dynasty: '唐朝',
    period: '618年-907年',
    currencyType: 'paper',
    guanToWen: 1000,
    liangToGuan: 0.08,
    liangGoldToSilver: 4,
    ricePricePerGuan: 1200,
    flourPricePerGuan: 1100,
    clothPricePerGuan: 600,
    meatPricePerGuan: 2500,
    winePricePerGuan: 1500,
    prices: {
      '一斗米': 0.12,
      '一匹布': 1.67,
      '一斤肉': 0.4,
      '一斗酒': 0.67,
    }
  },
  // 五代十国
  {
    dynasty: '五代十国',
    period: '907年-960年',
    currencyType: 'paper',
    guanToWen: 1000,
    liangToGuan: 0.09,
    liangGoldToSilver: 3,
    ricePricePerGuan: 1000,
    flourPricePerGuan: 900,
    clothPricePerGuan: 500,
    meatPricePerGuan: 2200,
    winePricePerGuan: 1200,
    prices: {
      '一斗米': 0.1,
      '一匹布': 2,
      '一斤肉': 0.45,
    }
  },
  // 宋朝（北宋）
  {
    dynasty: '宋朝',
    period: '960年-1127年',
    currencyType: 'paper',
    guanToWen: 1000,
    liangToGuan: 0.1,
    liangGoldToSilver: 2,
    ricePricePerGuan: 800,
    flourPricePerGuan: 700,
    clothPricePerGuan: 400,
    meatPricePerGuan: 2000,
    winePricePerGuan: 1000,
    prices: {
      '一斗米': 0.08,
      '一匹布': 2.5,
      '一斤肉': 0.5,
      '一斗酒': 1,
    }
  },
  // 宋朝（南宋）
  {
    dynasty: '宋朝',
    period: '1127年-1279年',
    currencyType: 'paper',
    guanToWen: 1000,
    liangToGuan: 0.12,
    liangGoldToSilver: 1.5,
    ricePricePerGuan: 600,
    flourPricePerGuan: 500,
    clothPricePerGuan: 300,
    meatPricePerGuan: 1800,
    winePricePerGuan: 800,
    prices: {
      '一斗米': 0.06,
      '一匹布': 3.33,
      '一斤肉': 0.56,
    }
  },
  // 元朝
  {
    dynasty: '元朝',
    period: '1271年-1368年',
    currencyType: 'silver',
    guanToWen: 1000,
    liangToGuan: 0.15,
    liangGoldToSilver: 1,
    ricePricePerGuan: 500,
    flourPricePerGuan: 400,
    clothPricePerGuan: 250,
    meatPricePerGuan: 1500,
    winePricePerGuan: 600,
    prices: {
      '一斗米': 0.05,
      '一匹布': 4,
      '一斤肉': 0.67,
    }
  },
  // 明朝
  {
    dynasty: '明朝',
    period: '1368年-1644年',
    currencyType: 'silver',
    guanToWen: 1000,
    liangToGuan: 0.2,
    liangGoldToSilver: 0.8,
    ricePricePerGuan: 400,
    flourPricePerGuan: 300,
    clothPricePerGuan: 200,
    meatPricePerGuan: 1200,
    winePricePerGuan: 400,
    prices: {
      '一斗米': 0.04,
      '一匹布': 5,
      '一斤肉': 0.83,
      '一斤酒': 2.5,
    }
  },
  // 清朝（前期）
  {
    dynasty: '清朝',
    period: '1644年-1730年',
    currencyType: 'silver',
    guanToWen: 1000,
    liangToGuan: 0.25,
    liangGoldToSilver: 0.6,
    ricePricePerGuan: 350,
    flourPricePerGuan: 250,
    clothPricePerGuan: 150,
    meatPricePerGuan: 1000,
    winePricePerGuan: 300,
    prices: {
      '一斗米': 0.035,
      '一匹布': 6.67,
      '一斤肉': 0.35,
    }
  },
  // 清朝（中期）
  {
    dynasty: '清朝',
    period: '1730年-1840年',
    currencyType: 'silver',
    guanToWen: 1000,
    liangToGuan: 0.3,
    liangGoldToSilver: 0.5,
    ricePricePerGuan: 300,
    flourPricePerGuan: 200,
    clothPricePerGuan: 120,
    meatPricePerGuan: 800,
    winePricePerGuan: 250,
    prices: {
      '一斗米': 0.03,
      '一匹布': 8.33,
      '一斤肉': 0.38,
    }
  },
  // 清朝（后期）
  {
    dynasty: '清朝',
    period: '1840年-1911年',
    currencyType: 'silver',
    guanToWen: 1000,
    liangToGuan: 0.35,
    liangGoldToSilver: 0.4,
    ricePricePerGuan: 250,
    flourPricePerGuan: 180,
    clothPricePerGuan: 100,
    meatPricePerGuan: 700,
    winePricePerGuan: 200,
    prices: {
      '一斗米': 0.025,
      '一匹布': 10,
      '一斤肉': 0.43,
    }
  },
];

// 计算购买力
export function calculatePurchasingPower(
  amount: number,
  dynasty: string,
): PurchasingPower {
  const currency = DYNASTY_CURRENCIES.find(c => c.dynasty === dynasty);
  if (!currency) {
    throw new Error(`未找到朝代: ${dynasty}`);
  }

  // 计算人民币价值（基于现代大米价格 3元/斤）
  const YUAN_PER_JIN = 3;
  const guanToYuan = amount * currency.ricePricePerGuan * YUAN_PER_JIN;

  // 计算可购买数量
  const riceAmount = amount * currency.ricePricePerGuan;
  const flourAmount = amount * currency.flourPricePerGuan;
  const clothAmount = amount * currency.clothPricePerGuan;
  const meatAmount = amount * currency.meatPricePerGuan;
  const wineAmount = amount * currency.winePricePerGuan;

  return {
    amount,
    yuanValue: guanToYuan,
    riceAmount,
    flourAmount,
    clothAmount,
    meatAmount,
    wineAmount,
  };
}
