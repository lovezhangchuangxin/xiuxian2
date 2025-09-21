import { XiuXianZheAttributes } from "../beings/types";
import {
  JINGJIE_BREAK_XIUWEI,
  JINGJIE_LIST,
  JINGJIE_SHOUYUAN,
  JINGJIE_STAGE_LIST,
} from "../constants/attribute";
import { ActionBaseData, ActionEndHandler, ActionType } from "./types";

/**
 * 修炼动作数据
 */
export interface XiulianActionData extends ActionBaseData {
  type: ActionType.修炼;
}

/**
 * 切换动作为修炼
 */
export function switchToXiulianAction(currentTime: number): XiulianActionData {
  return {
    type: ActionType.修炼,
    startTime: currentTime,
    duration: Infinity, // 修炼动作持续时间无限
  };
}

/**
 * 计算修炼速度，即每年增常的修为
 */
export function calculateXiulianSpeed(attribute: XiuXianZheAttributes): number {
  // 修炼速度只和当前境界、灵根和资质有关，当前境界越高、灵根越少，资质越好，修炼速度越快
  const { linggen, jingjie, jingjieStage, zizhi } = attribute;
  const jingjiePos = JINGJIE_LIST.indexOf(jingjie) + 1;
  const stagePos = JINGJIE_STAGE_LIST.indexOf(jingjieStage) + 1;
  const linggenFactor = Math.max(1, 6 - linggen.length); // 灵根越少，修炼速度越快
  const speed =
    (jingjiePos + stagePos / 10) ** 2 * linggenFactor * Math.log10(zizhi + 10);
  return speed;
}

/**
 * 计算突破所需时间，单位年
 */
export function calculateBreakTime(attribute: XiuXianZheAttributes): number {
  const { xiuwei, breakXiuwei } = attribute;
  const remainingXiuwei = breakXiuwei - xiuwei;
  if (remainingXiuwei <= 0) {
    return 0;
  }
  const speed = calculateXiulianSpeed(attribute);
  return remainingXiuwei / speed;
}

/**
 * 修炼的处理函数
 */
export const xiulianActionEndHandler: ActionEndHandler<XiulianActionData> = (
  gameConfig,
  xiuxianzheData,
  actionData,
  currentTime
) => {
  // 处理修炼结束后的逻辑
  const elapsedYears =
    ((currentTime - actionData.startTime) * gameConfig.timeScale) /
    (1000 * 60 * 60 * 24 * 365);
  const attributes = xiuxianzheData.attributes;
  const speed = calculateXiulianSpeed(attributes);
  const gainedXiuwei = speed * elapsedYears;
  attributes.xiuwei += gainedXiuwei;
  // 检查是否可以突破
  while (attributes.xiuwei >= attributes.breakXiuwei) {
    const jingjie = attributes.jingjie;
    const jingjieStage = attributes.jingjieStage;
    // 化身后期不能突破
    if (jingjie === "化神" && jingjieStage === "后期") {
      attributes.xiuwei = attributes.breakXiuwei; // 修为不再增长
      return false;
    }

    // 突破
    const currentJingjieIndex = JINGJIE_LIST.indexOf(jingjie);
    const currentStageIndex = JINGJIE_STAGE_LIST.indexOf(jingjieStage);
    if (currentStageIndex < JINGJIE_STAGE_LIST.length - 1) {
      // 先提升阶段
      attributes.jingjieStage = JINGJIE_STAGE_LIST[currentStageIndex + 1];
    } else if (currentJingjieIndex < JINGJIE_LIST.length - 1) {
      // 再提升境界
      attributes.jingjie = JINGJIE_LIST[currentJingjieIndex + 1];
      attributes.jingjieStage = JINGJIE_STAGE_LIST[0];
    }
    // 重置修为和突破修为
    attributes.xiuwei -= attributes.breakXiuwei;
    attributes.breakXiuwei =
      JINGJIE_BREAK_XIUWEI[`${attributes.jingjie}${attributes.jingjieStage}`];
    // 提升寿元
    attributes.shouyuan +=
      JINGJIE_SHOUYUAN[attributes.jingjie] - JINGJIE_SHOUYUAN[jingjie];
    // TODO: 增加各种属性
  }

  return false;
};
