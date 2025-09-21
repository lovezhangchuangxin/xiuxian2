import {
  XiuXianZheAttributes,
  XiuXianZheNumberAttributeKey,
} from "../beings/types";
import { XiuXianZheData } from "../beings/xiu-xian-zhe";
import { GONGFA_CONFIGS, GongfaType } from "../items/gongfa";
import { ActionBaseData, ActionEndHandler, ActionType } from "./types";

/**
 * 领悟动作数据
 */
export interface LingwuActionData extends ActionBaseData {
  type: ActionType.领悟;
  target: GongfaType;
}

/**
 * 开始领悟一个功法
 */
export function switchToLingwuAction(
  currentTime: number,
  data: XiuXianZheData,
  gongfa: GongfaType
): LingwuActionData {
  const duration = calculateLingwuTime(data, gongfa);
  return {
    type: ActionType.领悟,
    startTime: currentTime,
    duration,
    target: gongfa,
  };
}

/**
 * 计算领悟功法需要的时间，单位天
 */
export function calculateLingwuTime(
  data: XiuXianZheData,
  gongfa: GongfaType
): number {
  // 领悟时间只和功法本身需要的时间和悟性有关
  const { wuxing } = data.attributes;
  const currentLayer = data.usedGongfa[gongfa] || 0;
  const effects = GONGFA_CONFIGS[gongfa].effects;
  if (currentLayer > effects.length - 1) {
    // 已经领悟到最高层了
    return Infinity;
  }
  const baseTime = effects[currentLayer].time;
  return baseTime / Math.log10(wuxing + 10);
}

/**
 * 领悟的处理函数
 */
export const lingwuActionEndHandler: ActionEndHandler<LingwuActionData> = (
  gameConfig,
  xiuxianzheData,
  actionData,
  currentTime
) => {
  // 处理领悟结束后的逻辑
  const { startTime, duration } = actionData;
  const elapsedDays =
    ((currentTime - startTime) * gameConfig.timeScale) / (1000 * 60 * 60 * 24);
  if (elapsedDays < duration) {
    return false;
  }

  // 领悟成功，提升功法层数
  const { target } = actionData;
  const layer = (xiuxianzheData.usedGongfa[target] =
    (xiuxianzheData.usedGongfa[target] || 0) + 1);
  // 增加属性
  const effect = GONGFA_CONFIGS[target].effects[layer - 1].effect;
  // TODO：暂时直接加，实际上应该做成多种功法对同一属性不能叠加，而是选择更高的一个
  for (const [key, value] of Object.entries(effect)) {
    const attrKey = key as XiuXianZheNumberAttributeKey;
    xiuxianzheData.attributes[attrKey] =
      (xiuxianzheData.attributes[attrKey] || 0) + value;
  }

  return true;
};
