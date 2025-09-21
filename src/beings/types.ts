import {
  JINGJIE_BREAK_XIUWEI,
  JingjieStageType,
  JingjieType,
  LinggenType,
} from "../constants/attribute";

/**
 * 修仙者属性接口
 */
export interface XiuXianZheAttributes {
  // 当前气血
  qixue: number;
  // 最大气血
  maxQixue: number;
  // 出生时间
  bornTime: number;
  // 寿元，单位天
  shouyuan: number;
  // 当前灵力
  lingli: number;
  // 最大灵力
  maxLingli: number;
  // 修为
  xiuwei: number;
  // 突破需要的修为
  breakXiuwei: number;
  // 境界
  jingjie: JingjieType;
  // 境界阶段
  jingjieStage: JingjieStageType;
  // 灵根
  linggen: LinggenType[];
  // 资质
  zizhi: number;
  // 悟性
  wuxing: number;
  // 心境
  xinjing: number;
  // 神识
  shenshi: number;
  // 遁速
  dunsu: number;
  // 攻击
  gongji: number;
  // 防御
  fangyu: number;
  // 修炼速度
  xiulianSpeed: number;
}

/**
 * 修仙者属性接口中值为 number 的键
 */
export type XiuXianZheNumberAttributeKey = Exclude<
  keyof XiuXianZheAttributes,
  "jingjie" | "jingjieStage" | "linggen"
>;

/**
 * 属性键到属性名称的映射
 */
export const attributeKeyToNameMap: Record<keyof XiuXianZheAttributes, string> =
  {
    qixue: "气血",
    maxQixue: "最大气血",
    bornTime: "出生时间",
    shouyuan: "寿元",
    lingli: "灵力",
    maxLingli: "最大灵力",
    xiuwei: "修为",
    breakXiuwei: "突破需要的修为",
    jingjie: "境界",
    jingjieStage: "境界阶段",
    linggen: "灵根",
    zizhi: "资质",
    wuxing: "悟性",
    xinjing: "心境",
    shenshi: "神识",
    dunsu: "遁速",
    gongji: "攻击",
    fangyu: "防御",
    xiulianSpeed: "修炼速度",
  };

/**
 * 创建一个随机的灵根数组
 */
export const createRandomLinggen = (): LinggenType[] => {
  const linggenPool: LinggenType[] = ["金", "木", "水", "火", "土"];
  const selectedLinggen: Set<LinggenType> = new Set();
  // 随机 3 到 5次
  const times = Math.floor(Math.random() * 3) + 3;
  for (let i = 0; i < times; i++) {
    const index = Math.floor(Math.random() * linggenPool.length);
    selectedLinggen.add(linggenPool[index]);
  }

  return Array.from(selectedLinggen);
};

/**
 * 创建修仙者属性对象
 */
export const createXiuXianZheAttributes = (
  attributes: Partial<XiuXianZheAttributes>
): XiuXianZheAttributes => {
  return {
    qixue: attributes.qixue || 100,
    maxQixue: attributes.maxQixue || 100,
    bornTime: attributes.bornTime || Date.now(),
    shouyuan: attributes.shouyuan || 100,
    lingli: attributes.lingli || 0,
    maxLingli: attributes.maxLingli || 0,
    xiuwei: attributes.xiuwei || 0,
    breakXiuwei: attributes.breakXiuwei || JINGJIE_BREAK_XIUWEI["练气初期"],
    jingjie: attributes.jingjie || "练气",
    jingjieStage: attributes.jingjieStage || "初期",
    linggen: attributes.linggen || createRandomLinggen(),
    zizhi: attributes.zizhi || 0,
    wuxing: attributes.wuxing || 0,
    xinjing: attributes.xinjing || 0,
    shenshi: attributes.shenshi || 0,
    dunsu: attributes.dunsu || 0,
    gongji: attributes.gongji || 0,
    fangyu: attributes.fangyu || 0,
    xiulianSpeed: attributes.xiulianSpeed || 0,
  };
};
