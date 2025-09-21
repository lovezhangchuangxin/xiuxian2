/**
 * 本模块定义游戏中所有的功法
 * 注意：玩家可以修炼多种功法，但是多种功法对属性的提升并不是叠加的，但是选最大的那个
 * 目前先不考虑功法对修炼速度的影响，修炼速度暂时只和灵根、资质、心境有关
 */

import { XiuXianZheAttributes } from "../beings/types";
import { LinggenType } from "../constants/attribute";
import { BaseItemConfig } from "./types";

/**
 * 功法类型
 */
export enum GongfaType {
  // 人阶
  剑术要诀 = "剑术要诀",
  吐纳功法 = "吐纳功法",
  轻身术 = "轻身术",
  冰心诀 = "冰心诀",
  飞云劲 = "飞云劲",
  弄焰诀 = "弄焰诀",
  问水剑典 = "问水剑典",
  生木诀 = "生木诀",
  化尘诀 = "化尘诀",
  凌云诀 = "凌云诀",
  沧海诀 = "沧海诀",
  玉云功 = "玉云功",
  神蚀法 = "神蚀法",
  化焰诀 = "化焰诀",
  青藤诀 = "青藤诀",
  禾山经 = "禾山经",
  土御诀 = "土御诀",
  化雨诀 = "化雨诀",
  藏剑诀 = "藏剑诀",
  天刃诀 = "天刃诀",
  魔焰诀 = "魔焰诀",
  春草诀 = "春草诀",
  五内观想法 = "五内观想法",
  魔典 = "魔典",
  冰霜诀 = "冰霜诀",
  引火诀 = "引火诀",
  地元炼体功 = "地元炼体功",
  重元如意体 = "重元如意体",
  金芒诀 = "金芒诀",
  撼山诀 = "撼山诀",
  上青诀 = "上青诀",
  长生诀 = "长生诀",
  御风术 = "御风术",
  // 地阶
  聚尘诀 = "聚尘诀",
  九冲图集 = "九冲图集",
  流光真诀 = "流光真诀",
  重元无锋功 = "重元无锋功",
  五府锻元诀 = "五府锻元诀",
  生生造化诀 = "生生造化诀",
  大衍诀 = "大衍诀",
}

/**
 * 功法配置接口
 */
export interface GongfaConfig extends BaseItemConfig {
  type: "功法";
  /** 品级 */
  grade: string;
  /** 修炼需要的灵根 */
  linggen?: LinggenType[];
  /** 功法不同阶段的效果和修炼需要的时间，effects 有多少个就表示该功法有几层 */
  effects: GongfaStageEffect[];
}

/**
 * 功法不同阶段提升的效果
 */
export interface GongfaStageEffect {
  /** 功法对修仙者的增益 */
  effect: Partial<Record<keyof XiuXianZheAttributes, number>>;
  /** 修炼到该阶段需要的时间，单位：天 */
  time: number;
}

/**
 * 所有功法的配置
 */
export const GONGFA_CONFIGS: Record<GongfaType, GongfaConfig> = {
  // 人阶
  剑术要诀: {
    id: GongfaType.剑术要诀,
    type: "功法",
    name: "剑术要诀",
    description: "基础剑术修炼之法，提升攻击力",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { gongji: 5 }, time: 30 },
      { effect: { gongji: 12 }, time: 90 },
      { effect: { gongji: 30 }, time: 150 },
    ],
  },
  吐纳功法: {
    id: GongfaType.吐纳功法,
    type: "功法",
    name: "吐纳功法",
    description: "调息吐纳，提升灵力上限",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { maxLingli: 30 }, time: 20 },
      { effect: { maxLingli: 80 }, time: 70 },
      { effect: { maxLingli: 180 }, time: 200 },
    ],
  },
  轻身术: {
    id: GongfaType.轻身术,
    type: "功法",
    name: "轻身术",
    description: "身形轻盈，提升遁速",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { dunsu: 5 }, time: 15 },
      { effect: { dunsu: 10 }, time: 60 },
      { effect: { dunsu: 20 }, time: 150 },
    ],
  },
  冰心诀: {
    id: GongfaType.冰心诀,
    type: "功法",
    name: "冰心诀",
    description: "静心定性，提升心境",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { xinjing: 2 }, time: 25 },
      { effect: { xinjing: 6 }, time: 80 },
      { effect: { xinjing: 12 }, time: 220 },
    ],
  },
  飞云劲: {
    id: GongfaType.飞云劲,
    type: "功法",
    name: "飞云劲",
    description: "轻快内劲，提升攻击和遁速",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { gongji: 6, dunsu: 1 }, time: 20 },
      { effect: { gongji: 15, dunsu: 3 }, time: 70 },
      { effect: { gongji: 30, dunsu: 5 }, time: 180 },
    ],
  },
  弄焰诀: {
    id: GongfaType.弄焰诀,
    type: "功法",
    name: "弄焰诀",
    description: "火系法诀，提升攻击",
    grade: "人阶",
    linggen: ["火"],
    effects: [
      { effect: { gongji: 10 }, time: 25 },
      { effect: { gongji: 20 }, time: 90 },
      { effect: { gongji: 40 }, time: 260 },
    ],
  },
  问水剑典: {
    id: GongfaType.问水剑典,
    type: "功法",
    name: "问水剑典",
    description: "以柔克刚的剑法，兼顾攻击与防御",
    grade: "人阶",
    linggen: ["水"],
    effects: [
      { effect: { gongji: 7, fangyu: 3 }, time: 30 },
      { effect: { gongji: 18, fangyu: 8 }, time: 100 },
      { effect: { gongji: 36, fangyu: 20 }, time: 300 },
    ],
  },
  生木诀: {
    id: GongfaType.生木诀,
    type: "功法",
    name: "生木诀",
    description: "以木属性滋养肉身，提升资质和神识",
    grade: "人阶",
    linggen: ["木"],
    effects: [
      { effect: { zizhi: 1, shenshi: 1 }, time: 30 },
      { effect: { zizhi: 2, shenshi: 2 }, time: 100 },
      { effect: { zizhi: 4, shenshi: 4 }, time: 300 },
    ],
  },
  化尘诀: {
    id: GongfaType.化尘诀,
    type: "功法",
    name: "化尘诀",
    description: "御气化尘，提升攻击和防御",
    grade: "人阶",
    linggen: ["土"],
    effects: [
      { effect: { gongji: 5, fangyu: 8 }, time: 20 },
      { effect: { gongji: 15, fangyu: 10 }, time: 80 },
      { effect: { gongji: 30, fangyu: 20 }, time: 200 },
    ],
  },
  凌云诀: {
    id: GongfaType.凌云诀,
    type: "功法",
    name: "凌云诀",
    description: "身法与剑意合一，提升攻击和遁速",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { gongji: 8, dunsu: 1 }, time: 18 },
      { effect: { gongji: 12, dunsu: 3 }, time: 70 },
      { effect: { gongji: 30, dunsu: 5 }, time: 180 },
    ],
  },
  沧海诀: {
    id: GongfaType.沧海诀,
    type: "功法",
    name: "沧海诀",
    description: "宏阔法门，增加灵力和神识",
    grade: "人阶",
    linggen: ["水"],
    effects: [
      { effect: { maxLingli: 10, shenshi: 1 }, time: 40 },
      { effect: { maxLingli: 30, shenshi: 3 }, time: 140 },
      { effect: { maxLingli: 50, shenshi: 7 }, time: 420 },
    ],
  },
  玉云功: {
    id: GongfaType.玉云功,
    type: "功法",
    name: "玉云功",
    description: "温柔内功，平稳提升综合属性，适合入门",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { gongji: 4, fangyu: 4 }, time: 25 },
      { effect: { gongji: 12, fangyu: 12 }, time: 90 },
      { effect: { gongji: 28, fangyu: 28 }, time: 260 },
    ],
  },
  神蚀法: {
    id: GongfaType.神蚀法,
    type: "功法",
    name: "神蚀法",
    description: "噬灵法诀，提升神识",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { shenshi: 3 }, time: 35 },
      { effect: { shenshi: 8 }, time: 120 },
      { effect: { shenshi: 15 }, time: 360 },
    ],
  },
  化焰诀: {
    id: GongfaType.化焰诀,
    type: "功法",
    name: "化焰诀",
    description: "火焰变幻之术，提供攻击和防御",
    grade: "人阶",
    linggen: ["火"],
    effects: [
      { effect: { gongji: 10, fangyu: 5 }, time: 22 },
      { effect: { gongji: 14, fangyu: 7 }, time: 75 },
      { effect: { gongji: 32, fangyu: 15 }, time: 210 },
    ],
  },
  青藤诀: {
    id: GongfaType.青藤诀,
    type: "功法",
    name: "青藤诀",
    description: "藤蔓相生，提升防御",
    grade: "人阶",
    linggen: ["木"],
    effects: [
      { effect: { shenshi: 3, fangyu: 2 }, time: 20 },
      { effect: { shenshi: 9, fangyu: 5 }, time: 70 },
      { effect: { shenshi: 20, fangyu: 10 }, time: 200 },
    ],
  },
  禾山经: {
    id: GongfaType.禾山经,
    type: "功法",
    name: "禾山经",
    description: "古老地术，提升防御和气血",
    grade: "人阶",
    linggen: ["金"],
    effects: [
      { effect: { fangyu: 10, maxQixue: 40 }, time: 30 },
      { effect: { fangyu: 20, maxQixue: 120 }, time: 100 },
      { effect: { fangyu: 30, maxQixue: 320 }, time: 300 },
    ],
  },
  土御诀: {
    id: GongfaType.土御诀,
    type: "功法",
    name: "土御诀",
    description: "以土守身，增强防御",
    grade: "人阶",
    linggen: ["土"],
    effects: [
      { effect: { fangyu: 12 }, time: 25 },
      { effect: { fangyu: 22 }, time: 90 },
      { effect: { fangyu: 32 }, time: 260 },
    ],
  },
  化雨诀: {
    id: GongfaType.化雨诀,
    type: "功法",
    name: "化雨诀",
    description: "滋润万物，提升气血",
    grade: "人阶",
    linggen: ["水"],
    effects: [
      { effect: { maxQixue: 30 }, time: 18 },
      { effect: { maxQixue: 90 }, time: 60 },
      { effect: { maxQixue: 240 }, time: 180 },
    ],
  },
  藏剑诀: {
    id: GongfaType.藏剑诀,
    type: "功法",
    name: "藏剑诀",
    description: "剑法心诀，提升攻击力",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { gongji: 6 }, time: 28 },
      { effect: { gongji: 16 }, time: 95 },
      { effect: { gongji: 36 }, time: 280 },
    ],
  },
  天刃诀: {
    id: GongfaType.天刃诀,
    type: "功法",
    name: "天刃诀",
    description: "锋锐身法，提升攻击力",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { gongji: 8 }, time: 20 },
      { effect: { gongji: 20 }, time: 70 },
      { effect: { gongji: 45 }, time: 200 },
    ],
  },
  魔焰诀: {
    id: GongfaType.魔焰诀,
    type: "功法",
    name: "魔焰诀",
    description: "偏邪火术，提升攻击力，但可能影响心境",
    grade: "人阶",
    linggen: ["火"],
    effects: [
      { effect: { gongji: 10, xinjing: -5 }, time: 30 },
      { effect: { gongji: 30, xinjing: -10 }, time: 100 },
      { effect: { gongji: 60, xinjing: -20 }, time: 300 },
    ],
  },
  春草诀: {
    id: GongfaType.春草诀,
    type: "功法",
    name: "春草诀",
    description: "医理兼修，提升气血",
    grade: "人阶",
    linggen: ["木"],
    effects: [
      { effect: { maxQixue: 20 }, time: 15 },
      { effect: { maxQixue: 60 }, time: 50 },
      { effect: { maxQixue: 160 }, time: 140 },
    ],
  },
  五内观想法: {
    id: GongfaType.五内观想法,
    type: "功法",
    name: "五内观想法",
    description: "调节五脏，提升神识",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { shenshi: 5 }, time: 40 },
      { effect: { shenshi: 10 }, time: 140 },
      { effect: { shenshi: 15 }, time: 420 },
    ],
  },
  魔典: {
    id: GongfaType.魔典,
    type: "功法",
    name: "魔典",
    description: "禁术汇编，提升攻击但可能影响心境",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { shenshi: 12, xinjing: -5 }, time: 50 },
      { effect: { shenshi: 34, xinjing: -10 }, time: 160 },
      { effect: { shenshi: 80, xinjing: -20 }, time: 480 },
    ],
  },
  冰霜诀: {
    id: GongfaType.冰霜诀,
    type: "功法",
    name: "冰霜诀",
    description: "寒气法门，提升攻击",
    grade: "人阶",
    linggen: ["水"],
    effects: [
      { effect: { gongji: 5 }, time: 22 },
      { effect: { shenshi: 14 }, time: 75 },
      { effect: { shenshi: 32 }, time: 210 },
    ],
  },
  引火诀: {
    id: GongfaType.引火诀,
    type: "功法",
    name: "引火诀",
    description: "引导火性真元，提升攻击",
    grade: "人阶",
    linggen: ["火"],
    effects: [
      { effect: { gongji: 6 }, time: 20 },
      { effect: { gongji: 18 }, time: 70 },
      { effect: { gongji: 42 }, time: 180 },
    ],
  },
  地元炼体功: {
    id: GongfaType.地元炼体功,
    type: "功法",
    name: "地元炼体功",
    description: "以地元锻体，提高气血和防御",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { maxQixue: 2, fangyu: 8 }, time: 30 },
      { effect: { maxQixue: 6, fangyu: 22 }, time: 100 },
      { effect: { maxQixue: 14, fangyu: 50 }, time: 300 },
    ],
  },
  重元如意体: {
    id: GongfaType.重元如意体,
    type: "功法",
    name: "重元如意体",
    description: "均衡体术，提升遁速、防御和气血",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { dunsu: 1, fangyu: 6, maxQixue: 40 }, time: 25 },
      { effect: { dunsu: 3, fangyu: 18, maxQixue: 120 }, time: 90 },
      { effect: { dunsu: 7, fangyu: 42, maxQixue: 360 }, time: 260 },
    ],
  },
  金芒诀: {
    id: GongfaType.金芒诀,
    type: "功法",
    name: "金芒诀",
    description: "金系强攻心法，提升攻击",
    grade: "人阶",
    linggen: ["金"],
    effects: [
      { effect: { gongji: 8 }, time: 20 },
      { effect: { gongji: 22 }, time: 70 },
      { effect: { gongji: 50 }, time: 200 },
    ],
  },
  撼山诀: {
    id: GongfaType.撼山诀,
    type: "功法",
    name: "撼山诀",
    description: "重拳式功法，提升攻击力",
    grade: "人阶",
    linggen: ["土"],
    effects: [
      { effect: { gongji: 10 }, time: 30 },
      { effect: { gongji: 28 }, time: 100 },
      { effect: { gongji: 54 }, time: 300 },
    ],
  },
  上青诀: {
    id: GongfaType.上青诀,
    type: "功法",
    name: "上青诀",
    description: "灵气清净，提升悟性与心境",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { xinjing: 2, wuxing: 1 }, time: 35 },
      { effect: { xinjing: 6, wuxing: 2 }, time: 120 },
      { effect: { xinjing: 14, wuxing: 4 }, time: 360 },
    ],
  },
  长生诀: {
    id: GongfaType.长生诀,
    type: "功法",
    name: "长生诀",
    description: "修身求长，提升气血和寿命",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { maxQixue: 50, shouyuan: 5 }, time: 60 },
      { effect: { maxQixue: 150, shouyuan: 15 }, time: 180 },
      { effect: { maxQixue: 420, shouyuan: 30 }, time: 540 },
    ],
  },
  御风术: {
    id: GongfaType.御风术,
    type: "功法",
    name: "御风术",
    description: "操控风之术，显著提升遁速",
    grade: "人阶",
    linggen: [],
    effects: [
      { effect: { dunsu: 5 }, time: 20 },
      { effect: { dunsu: 10 }, time: 70 },
      { effect: { dunsu: 15 }, time: 200 },
    ],
  },

  // 地阶
  聚尘诀: {
    id: GongfaType.聚尘诀,
    type: "功法",
    name: "聚尘诀",
    description: "地阶中低阶功法，提升攻击和防御",
    grade: "地阶",
    linggen: ["土"],
    effects: [
      { effect: { gongji: 30, fangyu: 30 }, time: 60 },
      { effect: { gongji: 100, fangyu: 80 }, time: 200 },
      { effect: { gongji: 200, fangyu: 150 }, time: 600 },
    ],
  },
  九冲图集: {
    id: GongfaType.九冲图集,
    type: "功法",
    name: "九冲图集",
    description: "包含多样攻防套路，提升攻击与防御",
    grade: "地阶",
    linggen: ["木"],
    effects: [
      { effect: { gongji: 25, fangyu: 12 }, time: 80 },
      { effect: { gongji: 70, fangyu: 36 }, time: 260 },
      { effect: { gongji: 180, fangyu: 90 }, time: 780 },
    ],
  },
  流光真诀: {
    id: GongfaType.流光真诀,
    type: "功法",
    name: "流光真诀",
    description: "以光速施法为长，提升遁速与神识",
    grade: "地阶",
    linggen: [],
    effects: [
      { effect: { dunsu: 10, shenshi: 10 }, time: 70 },
      { effect: { dunsu: 20, shenshi: 20 }, time: 240 },
      { effect: { dunsu: 30, shenshi: 30 }, time: 720 },
    ],
  },
  重元无锋功: {
    id: GongfaType.重元无锋功,
    type: "功法",
    name: "重元无锋功",
    description: "以柔克刚的高阶体术，提升攻击与防御",
    grade: "地阶",
    linggen: [],
    effects: [
      { effect: { gongji: 20, fangyu: 28 }, time: 80 },
      { effect: { gongji: 50, fangyu: 72 }, time: 260 },
      { effect: { gongji: 150, fangyu: 180 }, time: 780 },
    ],
  },
  五府锻元诀: {
    id: GongfaType.五府锻元诀,
    type: "功法",
    name: "五府锻元诀",
    description: "深层锻体与内元凝练，提升气血与灵力",
    grade: "地阶",
    linggen: [],
    effects: [
      { effect: { maxLingli: 40, maxQixue: 60 }, time: 100 },
      { effect: { maxLingli: 80, maxQixue: 180 }, time: 300 },
      { effect: { maxLingli: 200, maxQixue: 480 }, time: 900 },
    ],
  },
  生生造化诀: {
    id: GongfaType.生生造化诀,
    type: "功法",
    name: "生生造化诀",
    description: "天道化生之法，提升气血",
    grade: "地阶",
    linggen: [],
    effects: [
      { effect: { maxQixue: 200 }, time: 160 },
      { effect: { maxQixue: 500 }, time: 480 },
      { effect: { maxQixue: 1000 }, time: 1440 },
    ],
  },
  大衍诀: {
    id: GongfaType.大衍诀,
    type: "功法",
    name: "大衍诀",
    description: "高深道法，提升神识与灵力",
    grade: "地阶",
    linggen: [],
    effects: [
      { effect: { maxLingli: 40, shenshi: 10 }, time: 200 },
      { effect: { maxLingli: 100, shenshi: 30 }, time: 600 },
      { effect: { maxLingli: 200, shenshi: 60 }, time: 1800 },
    ],
  },
};
