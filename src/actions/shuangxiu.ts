import {
  JINGJIE_BREAK_XIUWEI,
  JINGJIE_LIST,
  JINGJIE_SHOUYUAN,
  JINGJIE_STAGE_LIST,
} from "../constants/attribute";
import { ActionBaseData, ActionEndHandler, ActionType } from "./types";
import { calculateXiulianSpeed } from "./xiulian";

/**
 * 双修动作数据
 */
export interface ShuangxiuActionData extends ActionBaseData {
  type: ActionType.双修;
  /** 双修对象 id */
  partnerId: string;
  /** 双修持续时间 */
  duration: number;
}

/**
 * 切换动作为双修
 */
export function switchToShuangxiuAction(
  currentTime: number,
  partnerId: string,
  duration: number
): ShuangxiuActionData {
  return {
    type: ActionType.双修,
    startTime: currentTime,
    duration,
    partnerId,
  };
}

/**
 * 双修结束时的处理函数
 */
export const shuangxiuActionEndHandler: ActionEndHandler<
  ShuangxiuActionData
> = (gameConfig, xiuxianzheData, actionData, currentTime) => {
  // 处理修炼结束后的逻辑
  const elapsedYears =
    ((currentTime - actionData.startTime) * gameConfig.timeScale) /
    (1000 * 60 * 60 * 24 * 365);
  const attributes = xiuxianzheData.attributes;
  // 双修修炼速度翻倍
  const speed = calculateXiulianSpeed(attributes) * 2;
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
  }

  return false;
};
