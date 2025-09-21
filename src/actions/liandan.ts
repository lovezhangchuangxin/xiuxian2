import { XiuXianZheData } from "../beings/xiu-xian-zhe";
import { addItemsToBag, Item } from "../items/bag";
import { CaoyaoType } from "../items/caoyao";
import { DANYAO_RECIPES, DanyaoType } from "../items/danyao";
import { ActionBaseData, ActionEndHandler, ActionType } from "./types";

/**
 * 炼丹动作数据
 */
export interface LiandanActionData extends ActionBaseData {
  type: ActionType.炼丹;
  /** 目标丹药 */
  target: DanyaoType;
  /** 炼丹数量 */
  amount: number;
}

/**
 * 切换动作为炼丹
 */
export function switchToLiandanAction(
  currentTime: number,
  target: DanyaoType,
  amount: number
): LiandanActionData {
  return {
    type: ActionType.炼丹,
    startTime: currentTime,
    duration: calculateLiandanTime(target, amount),
    target,
    amount,
  };
}

/**
 * 计算炼丹需要的时间，单位天
 */
export function calculateLiandanTime(
  target: DanyaoType,
  amount: number
): number {
  // 根据丹药类型和数量计算炼丹时间
  const time = DANYAO_RECIPES.find((recipe) => recipe.output === target)?.time;
  if (!time) {
    return Infinity; // 找不到配方，无法炼制
  }

  return time * amount;
}

/**
 * 计算炼丹需要的草药
 */
export function calculateLiandanHerbs(
  target: DanyaoType,
  amount: number
): Partial<Record<CaoyaoType, number>> {
  const herbs: Partial<Record<CaoyaoType, number>> = {};
  const recipe = DANYAO_RECIPES.find((r) => r.output === target);
  if (!recipe) {
    return herbs;
  }

  for (const [herb, qty] of Object.entries(recipe.materials)) {
    herbs[herb as CaoyaoType] = qty * amount;
  }

  return herbs;
}

/**
 * 计算修仙者能炼制指定丹药的最大数量
 */
export function calculateMaxLiandanAmount(
  data: XiuXianZheData,
  target: DanyaoType
): number {
  const herbsNeeded = calculateLiandanHerbs(target, 1); // 先计算炼制1个所需草药
  let maxAmount = Infinity;

  for (const [herb, qtyNeeded] of Object.entries(herbsNeeded)) {
    const herbInBag = data.storageBag.items.find((item) => item.id === herb);
    const availableQty = herbInBag ? herbInBag.number : 0;
    const possibleAmount = Math.floor(availableQty / qtyNeeded);
    if (possibleAmount < maxAmount) {
      maxAmount = possibleAmount;
    }
  }

  return maxAmount === Infinity ? 0 : maxAmount;
}

/**
 * 炼丹的处理函数
 */
export const liandanActionEndHandler: ActionEndHandler<LiandanActionData> = (
  gameConfig,
  xiuxianzheData,
  actionData,
  currentTime
) => {
  // 处理炼丹结束后的逻辑
  const { startTime, duration, target, amount } = actionData;
  const ellapsedDays =
    ((currentTime - startTime) * gameConfig.timeScale) / (1000 * 60 * 60 * 24);
  // 能全部练完
  if (ellapsedDays >= duration) {
    // 炼丹完成，添加丹药到储物袋
    const items: Item[] = [
      {
        id: target,
        type: "丹药",
        number: amount,
      },
    ];
    addItemsToBag(xiuxianzheData.storageBag, items);
    actionData.amount = 0;
    return true;
  }

  // 只能练完一部分
  const partialAmount = Math.floor((ellapsedDays / duration) * amount);
  if (partialAmount > 0) {
    const items: Item[] = [
      {
        id: target,
        type: "丹药",
        number: partialAmount,
      },
    ];
    addItemsToBag(xiuxianzheData.storageBag, items);
    // 更新数据，继续炼剩下的丹药
    actionData.amount -= partialAmount;
    actionData.startTime +=
      ((partialAmount / amount) * duration * (1000 * 60 * 60 * 24)) /
      gameConfig.timeScale;
    actionData.duration = calculateLiandanTime(target, actionData.amount);
  }

  return false;
};
