/**
 * 本模块定义游戏中所有的丹药
 */

import { XiuXianZheAttributes } from "../beings/types";
import { CaoyaoType } from "./caoyao";
import { BaseItemConfig } from "./types";

/**
 * 丹药类型
 */
export enum DanyaoType {
  // 一品
  冰心丹 = "冰心丹",
  龟灵丹 = "龟灵丹",
  凝神丹 = "凝神丹",
  化瘀丹 = "化瘀丹",
  龙虎丹 = "龙虎丹",
  洗髓丹 = "洗髓丹",
  引灵丹 = "引灵丹",
  生骨丹 = "生骨丹",
  聚甲丹 = "聚甲丹",
  // 二品
  黄龙丹 = "黄龙丹",
  炼血丹 = "炼血丹",
  续命丹 = "续命丹",
  培元丹 = "培元丹",
  森木丹 = "森木丹",
  炼甲丹 = "炼甲丹",
  净血丹 = "净血丹",
  养气丹 = "养气丹",
  龟甲丹 = "龟甲丹",
  明心丹 = "明心丹",
  疾行丹 = "疾行丹",
  // 三品
  养魂丹 = "养魂丹",
  延寿丹 = "延寿丹",
  九转丹 = "九转丹",
}

/**
 * 丹药种类
 */
export type DanyaoKind =
  | "心境"
  | "战斗"
  | "恢复"
  | "修炼"
  | "遁速"
  | "悟性"
  | "神识"
  | "资质"
  | "气血";

/**
 * 丹药配置接口
 */
export interface DanyaoConfig extends BaseItemConfig {
  type: "丹药";
  /** 品级 */
  grade: number;
  /** 丹药种类 */
  kind: DanyaoKind;
  /** 服用限制，达到后无法再服用 */
  limit: number;
  /** 丹药效果 */
  effect: Partial<Record<keyof XiuXianZheAttributes, number>>;
}

/**
 * 所有丹药的配置
 */
export const DANYAO_CONFIGS: Record<DanyaoType, DanyaoConfig> = {
  // 一品
  冰心丹: {
    id: DanyaoType.冰心丹,
    type: "丹药",
    name: "冰心丹",
    description: "清心寡欲，平稳心境，短期减少走火入魔概率。",
    grade: 1,
    kind: "心境",
    limit: 100,
    effect: {
      xinjing: 1,
    },
  },
  龟灵丹: {
    id: DanyaoType.龟灵丹,
    type: "丹药",
    name: "龟灵丹",
    description: "滋补元气，缓慢恢复气血与灵力。",
    grade: 1,
    kind: "恢复",
    limit: 50,
    effect: {
      qixue: 20,
      lingli: 10,
    },
  },
  凝神丹: {
    id: DanyaoType.凝神丹,
    type: "丹药",
    name: "凝神丹",
    description: "凝神聚识，提高神识与集中力，短时提升法术命中。",
    grade: 1,
    kind: "神识",
    limit: 40,
    effect: {
      shenshi: 3,
    },
  },
  化瘀丹: {
    id: DanyaoType.化瘀丹,
    type: "丹药",
    name: "化瘀丹",
    description: "化解体内瘀血，快速回复气血。",
    grade: 1,
    kind: "气血",
    limit: 60,
    effect: {
      qixue: 35,
    },
  },
  龙虎丹: {
    id: DanyaoType.龙虎丹,
    type: "丹药",
    name: "龙虎丹",
    description: "提升下一场战斗力，增强攻防表现。",
    grade: 1,
    kind: "战斗",
    limit: 30,
    effect: {
      gongji: 10,
    },
  },
  洗髓丹: {
    id: DanyaoType.洗髓丹,
    type: "丹药",
    name: "洗髓丹",
    description: "重塑根骨，有概率小幅提升资质。",
    grade: 1,
    kind: "资质",
    limit: 10,
    effect: {
      zizhi: 1,
    },
  },
  引灵丹: {
    id: DanyaoType.引灵丹,
    type: "丹药",
    name: "引灵丹",
    description: "引动灵气，提升修炼效率与灵力恢复速度。",
    grade: 1,
    kind: "修炼",
    limit: 50,
    effect: {
      xiuwei: 100,
      lingli: 30,
    },
  },
  生骨丹: {
    id: DanyaoType.生骨丹,
    type: "丹药",
    name: "生骨丹",
    description: "强骨续元，显著恢复气血并增强体质。",
    grade: 1,
    kind: "气血",
    limit: 40,
    effect: {
      qixue: 50,
    },
  },
  聚甲丹: {
    id: DanyaoType.聚甲丹,
    type: "丹药",
    name: "聚甲丹",
    description: "凝聚真气为甲，短时大幅增强防御。",
    grade: 1,
    kind: "战斗",
    limit: 30,
    effect: {
      fangyu: 15,
    },
  },

  // 二品
  黄龙丹: {
    id: DanyaoType.黄龙丹,
    type: "丹药",
    name: "黄龙丹",
    description: "增长根骨与资质，利于后续突破。",
    grade: 2,
    kind: "资质",
    limit: 8,
    effect: {
      zizhi: 2,
    },
  },
  炼血丹: {
    id: DanyaoType.炼血丹,
    type: "丹药",
    name: "炼血丹",
    description: "炼化污血，极强的气血恢复并可能留下副作用。",
    grade: 2,
    kind: "恢复",
    limit: 12,
    effect: {
      qixue: 260,
    },
  },
  续命丹: {
    id: DanyaoType.续命丹,
    type: "丹药",
    name: "续命丹",
    description: "延续生命力，可大幅恢复气血并延长寿元。",
    grade: 2,
    kind: "恢复",
    limit: 4,
    effect: {
      qixue: 480,
      shouyuan: 10,
    },
  },
  培元丹: {
    id: DanyaoType.培元丹,
    type: "丹药",
    name: "培元丹",
    description: "培植真元，提升灵力上限与恢复效率。",
    grade: 2,
    kind: "修炼",
    limit: 18,
    effect: {
      lingli: 150,
    },
  },
  森木丹: {
    id: DanyaoType.森木丹,
    type: "丹药",
    name: "森木丹",
    description: "木灵荟聚，显著提升资质与悟性。",
    grade: 2,
    kind: "资质",
    limit: 10,
    effect: {
      zizhi: 3,
      wuxing: 1,
    },
  },
  炼甲丹: {
    id: DanyaoType.炼甲丹,
    type: "丹药",
    name: "炼甲丹",
    description: "淬炼肉身铠甲，提高防御。",
    grade: 2,
    kind: "战斗",
    limit: 12,
    effect: {
      fangyu: 30,
    },
  },
  净血丹: {
    id: DanyaoType.净血丹,
    type: "丹药",
    name: "净血丹",
    description: "净化血脉，解除中毒/瘀伤并回复气血。",
    grade: 2,
    kind: "恢复",
    limit: 16,
    effect: {
      qixue: 180,
    },
  },
  养气丹: {
    id: DanyaoType.养气丹,
    type: "丹药",
    name: "养气丹",
    description: "养护真元，大幅提升灵力恢复。",
    grade: 2,
    kind: "修炼",
    limit: 20,
    effect: {
      lingli: 150,
    },
  },
  龟甲丹: {
    id: DanyaoType.龟甲丹,
    type: "丹药",
    name: "龟甲丹",
    description: "以龟甲真元炼成，极大提升肉身防御。",
    grade: 2,
    kind: "战斗",
    limit: 10,
    effect: {
      fangyu: 50,
    },
  },
  明心丹: {
    id: DanyaoType.明心丹,
    type: "丹药",
    name: "明心丹",
    description: "开窍明心，短时提升心境并增加悟道概率。",
    grade: 2,
    kind: "心境",
    limit: 12,
    effect: {
      xinjing: 5,
    },
  },
  疾行丹: {
    id: DanyaoType.疾行丹,
    type: "丹药",
    name: "疾行丹",
    description: "迅捷如风，显著提升遁速和行动频率。",
    grade: 2,
    kind: "遁速",
    limit: 10,
    effect: {
      dunsu: 30,
    },
  },

  // 三品
  养魂丹: {
    id: DanyaoType.养魂丹,
    type: "丹药",
    name: "养魂丹",
    description: "润养魂魄，强化神识。",
    grade: 3,
    kind: "神识",
    limit: 5,
    effect: {
      shenshi: 20,
    },
  },
  延寿丹: {
    id: DanyaoType.延寿丹,
    type: "丹药",
    name: "延寿丹",
    description: "显著延长寿元。",
    grade: 3,
    kind: "恢复",
    limit: 5,
    effect: {
      shouyuan: 10,
    },
  },
  九转丹: {
    id: DanyaoType.九转丹,
    type: "丹药",
    name: "九转丹",
    description:
      "传世上品，可恢复元气、重塑资质并极大提升修炼效率，使用有风险但收益巨大。",
    grade: 3,
    kind: "修炼",
    limit: 100,
    effect: {
      xiuwei: 1000,
    },
  },
};

/**
 * 丹药炼制配方接口
 */
export interface DanyaoRecipe {
  /** 产出丹药 */
  output: DanyaoType;
  /** 需要的草药及数量 */
  materials: Partial<Record<CaoyaoType, number>>;
  /** 炼制所需时间，单位：天 */
  time: number;
}

/**
 * 所有丹药的炼制配方
 */
export const DANYAO_RECIPES: DanyaoRecipe[] = [
  // 一品配方（简单）
  {
    output: DanyaoType.冰心丹,
    materials: {
      [CaoyaoType.宁心草]: 3,
      [CaoyaoType.银月花]: 1,
    },
    time: 2,
  },
  {
    output: DanyaoType.龟灵丹,
    materials: {
      [CaoyaoType.何首乌]: 2,
      [CaoyaoType.天元果]: 1,
    },
    time: 2,
  },
  {
    output: DanyaoType.凝神丹,
    materials: {
      [CaoyaoType.宁心草]: 2,
      [CaoyaoType.玄参]: 1,
    },
    time: 1,
  },
  {
    output: DanyaoType.化瘀丹,
    materials: {
      [CaoyaoType.红绫草]: 3,
      [CaoyaoType.百草露]: 1,
    },
    time: 2,
  },
  {
    output: DanyaoType.龙虎丹,
    materials: {
      [CaoyaoType.龙鳞果]: 1,
      [CaoyaoType.火灵芝]: 1,
      [CaoyaoType.轻灵草]: 2,
    },
    time: 3,
  },
  {
    output: DanyaoType.洗髓丹,
    materials: {
      [CaoyaoType.雪凝花]: 2,
      [CaoyaoType.玉龙参]: 1,
    },
    time: 4,
  },
  {
    output: DanyaoType.引灵丹,
    materials: {
      [CaoyaoType.天灵果]: 1,
      [CaoyaoType.百草露]: 2,
    },
    time: 2,
  },
  {
    output: DanyaoType.生骨丹,
    materials: {
      [CaoyaoType.龙须藤]: 1,
      [CaoyaoType.雪骨玉参]: 1,
    },
    time: 3,
  },
  {
    output: DanyaoType.聚甲丹,
    materials: {
      [CaoyaoType.乌稠木]: 2,
      [CaoyaoType.龙鳞果]: 1,
    },
    time: 3,
  },

  // 二品配方（中等复杂度）
  {
    output: DanyaoType.黄龙丹,
    materials: {
      [CaoyaoType.天元果]: 2,
      [CaoyaoType.玉髓芝]: 1,
      [CaoyaoType.罗犀草]: 1,
    },
    time: 5,
  },
  {
    output: DanyaoType.炼血丹,
    materials: {
      [CaoyaoType.血莲精]: 2,
      [CaoyaoType.渊血冥花]: 1,
      [CaoyaoType.壁莹花]: 1,
    },
    time: 6,
  },
  {
    output: DanyaoType.续命丹,
    materials: {
      [CaoyaoType.玉龙参]: 2,
      [CaoyaoType.无垠灵参]: 1,
    },
    time: 7,
  },
  {
    output: DanyaoType.培元丹,
    materials: {
      [CaoyaoType.天灵果]: 2,
      [CaoyaoType.太清玄灵草]: 1,
    },
    time: 5,
  },
  {
    output: DanyaoType.森木丹,
    materials: {
      [CaoyaoType.森檀木]: 1,
      [CaoyaoType.七星草]: 2,
    },
    time: 4,
  },
  {
    output: DanyaoType.炼甲丹,
    materials: {
      [CaoyaoType.乌稠木]: 1,
      [CaoyaoType.枫香脂]: 1,
    },
    time: 4,
  },
  {
    output: DanyaoType.净血丹,
    materials: {
      [CaoyaoType.百草露]: 2,
      [CaoyaoType.黄泉花]: 1,
    },
    time: 3,
  },
  {
    output: DanyaoType.养气丹,
    materials: {
      [CaoyaoType.补天芝]: 1,
      [CaoyaoType.天元果]: 1,
      [CaoyaoType.银精芝]: 1,
    },
    time: 5,
  },
  {
    output: DanyaoType.龟甲丹,
    materials: {
      [CaoyaoType.乌稠木]: 2,
      [CaoyaoType.百草露]: 1,
    },
    time: 6,
  },
  {
    output: DanyaoType.明心丹,
    materials: {
      [CaoyaoType.叁叶清芝]: 1,
      [CaoyaoType.银月花]: 1,
    },
    time: 3,
  },
  {
    output: DanyaoType.疾行丹,
    materials: {
      [CaoyaoType.风灵花]: 2,
      [CaoyaoType.七星草]: 1,
    },
    time: 3,
  },

  // 三品配方（复杂、高级材料）
  {
    output: DanyaoType.养魂丹,
    materials: {
      [CaoyaoType.厉魂血魄]: 1,
      [CaoyaoType.鬼面花]: 1,
      [CaoyaoType.青灵芝]: 1,
    },
    time: 12,
  },
  {
    output: DanyaoType.延寿丹,
    materials: {
      [CaoyaoType.无垠灵参]: 1,
      [CaoyaoType.天蚕灵叶]: 2,
      [CaoyaoType.太玄问心果]: 1,
    },
    time: 20,
  },
  {
    output: DanyaoType.九转丹,
    materials: {
      [CaoyaoType.龙皇果]: 1,
      [CaoyaoType.无垠灵参]: 1,
      [CaoyaoType.青灵芝]: 1,
      [CaoyaoType.渊血冥花]: 1,
    },
    time: 30,
  },
];
