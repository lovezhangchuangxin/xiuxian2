// 本模块定义修仙中的属性和常量

// 境界名称，逐级提升，每个境界可细分为初、中、后期阶段
export const JINGJIE_LIST = ["练气", "筑基", "结丹", "元婴", "化神"] as const;
// 境界类型
export type JingjieType = (typeof JINGJIE_LIST)[number];
// 境界描述
export const jingjieDesc: Record<JingjieType, string> = {
  练气: "始入修道，静坐调息，纳天地之灵，以养根骨。",
  筑基: "通经贯脉，筑固根基，为承大道之力。",
  结丹: "聚精化气，凝为金丹，体内丹胎渐成。",
  元婴: "元婴孕成，法则初彰，能御天地之气。",
  化神: "化形为神，合道无形，超凡入圣。",
};

// 境界阶段
export const JINGJIE_STAGE_LIST = ["初期", "中期", "后期"] as const;
// 境界阶段类型
export type JingjieStageType = (typeof JINGJIE_STAGE_LIST)[number];

// 完全的境界类型
export type CompleteJingjieType = `${JingjieType}${JingjieStageType}`;

// 灵根名称
export const LINGGEN_LIST = ["金", "木", "水", "火", "土"] as const;
// 灵根类型
export type LinggenType = (typeof LINGGEN_LIST)[number];
// 灵根描述
export const linggenDesc: Record<LinggenType, string> = {
  金: "金属性灵根，坚韧不拔，适合炼器。",
  木: "木属性灵根，生生不息，适合炼丹。",
  水: "水属性灵根，柔韧流畅，适合隐匿。",
  火: "火属性灵根，热烈奔放，适合攻击。",
  土: "土属性灵根，厚重稳固，适合防御。",
};

// 不同境界突破所需的修为
export const JINGJIE_BREAK_XIUWEI: Record<CompleteJingjieType, number> = {
  练气初期: 100,
  练气中期: 200,
  练气后期: 400,
  筑基初期: 800,
  筑基中期: 1600,
  筑基后期: 3200,
  结丹初期: 6400,
  结丹中期: 12800,
  结丹后期: 25600,
  元婴初期: 51200,
  元婴中期: 102400,
  元婴后期: 204800,
  化神初期: 409600,
  化神中期: 819200,
  化神后期: 1638400,
};

// 不同境界的寿元，单位年
export const JINGJIE_SHOUYUAN: Record<JingjieType, number> = {
  练气: 100,
  筑基: 200,
  结丹: 500,
  元婴: 1000,
  化神: 2000,
};
