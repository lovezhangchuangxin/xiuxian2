import { addItemsToBag } from "../items/bag";
import {
  CAOYAO_CONFIGS,
  CAOYAO_GATHER_TIME,
  CaoyaoType,
} from "../items/caoyao";
import { ActionBaseData, ActionEndHandler, ActionType } from "./types";

/**
 * 采药动作数据
 */
export interface CaiyaoActionData extends ActionBaseData {
  type: ActionType.采药;
  /** 目标草药 */
  targets: Partial<Record<CaoyaoType, number>>;
}

/**
 * 切换动作为采药
 */
export function switchToCaiyaoAction(
  currentTime: number,
  targets: Partial<Record<CaoyaoType, number>>
): CaiyaoActionData {
  return {
    type: ActionType.采药,
    startTime: currentTime,
    duration: calculateCaiyaoTime(targets),
    targets,
  };
}

/**
 * 计算采药的时间，单位天
 */
export function calculateCaiyaoTime(
  targets: Partial<Record<CaoyaoType, number>>
): number {
  // 根据草药品级和数量计算采药时间
  let totalTime = 0;
  for (const [type, amount] of Object.entries(targets)) {
    // 先获取草药的品级
    const config = CAOYAO_CONFIGS[type as CaoyaoType];
    if (config) {
      // 每种草药的采集时间 = 品级对应的采集时间 * 数量
      totalTime += CAOYAO_GATHER_TIME[config.grade] * amount;
    }
  }
  return totalTime;
}

/**
 * 采药动作结束时的处理函数
 */
export const caiyaoActionEndHandler: ActionEndHandler<CaiyaoActionData> = (
  gameConfig,
  xiuxianzheData,
  actionData,
  currentTime
) => {
  // 处理采药结束后的逻辑
  const { startTime, duration, targets } = actionData;
  const ellapsedDays =
    ((currentTime - startTime) * gameConfig.timeScale) / (1000 * 60 * 60 * 24);
  if (ellapsedDays >= duration) {
    // 采药完成，添加草药到储物袋
    const items = Object.entries(targets).map(([type, amount]) => ({
      id: type,
      type: "草药" as const,
      number: amount,
    }));
    addItemsToBag(xiuxianzheData.storageBag, items);

    return true;
  }

  // 采药只进行了一部分，优先采品级最小的药
  let remainingDays = ellapsedDays;
  const sortedTargets = Object.entries(targets).sort((a, b) => {
    const gradeA = CAOYAO_CONFIGS[a[0] as CaoyaoType]?.grade || 0;
    const gradeB = CAOYAO_CONFIGS[b[0] as CaoyaoType]?.grade || 0;
    return gradeA - gradeB;
  });

  for (const [type, amount] of sortedTargets) {
    const config = CAOYAO_CONFIGS[type as CaoyaoType];
    if (!config) continue;
    const timePerUnit = CAOYAO_GATHER_TIME[config.grade];
    const maxCollectable = Math.floor(remainingDays / timePerUnit);
    if (maxCollectable > 0) {
      const collectAmount = Math.min(maxCollectable, amount);
      // 添加采集到的草药
      addItemsToBag(xiuxianzheData.storageBag, [
        {
          id: type,
          type: "草药" as const,
          number: collectAmount,
        },
      ]);
      remainingDays -= collectAmount * timePerUnit;
      actionData.targets[type as CaoyaoType] = amount - collectAmount;
      if (remainingDays <= 0) {
        break;
      }
    }
  }
  // 继续采剩下的草药
  actionData.startTime +=
    ((ellapsedDays - remainingDays) * (1000 * 60 * 60 * 24)) /
    gameConfig.timeScale;
  actionData.duration = calculateCaiyaoTime(actionData.targets);

  return false;
};
