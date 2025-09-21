import { XiuXianZheData } from "../beings/xiu-xian-zhe";
import { GameConfig } from "../configs/config";
import { CaiyaoActionData, caiyaoActionEndHandler } from "./caiyao";
import { LiandanActionData, liandanActionEndHandler } from "./liandan";
import { LingwuActionData, lingwuActionEndHandler } from "./lingwu";
import { ShuangxiuActionData, shuangxiuActionEndHandler } from "./shuangxiu";
import { ActionBaseData, ActionType } from "./types";
import {
  switchToXiulianAction,
  XiulianActionData,
  xiulianActionEndHandler,
} from "./xiulian";

/**
 * 所有的动作数据接口
 */
export type AllActionData =
  | LingwuActionData
  | CaiyaoActionData
  | LiandanActionData
  | ShuangxiuActionData
  | XiuXianZheData;

/**
 * 动作处理器
 */
export const handleAction = (
  gameConfig: GameConfig,
  xiuxianzheData: XiuXianZheData
): boolean => {
  const actionData = xiuxianzheData.actionData;
  const now = Date.now();
  if (actionData.type === ActionType.修炼) {
    // 处理修炼动作有点复杂，因为如果直接按距离上一次的时间来算，玩家有可能突破而增加寿元
    // 而实际玩家却可能寿终正寝了来不及突破
    // 所以需要针对剩余的寿元来判断玩家是否能突破
    const { bornTime, shouyuan } = xiuxianzheData.attributes;
    const age =
      ((now - bornTime) * gameConfig.timeScale) / (1000 * 60 * 60 * 24 * 365); // 年龄
    // 剩余寿命
    const remainingShouyu = shouyuan - age;
    // 计算从上次动作到现在经过了多少时间，单位年
    const elapsedYears =
      ((now - actionData.startTime) * gameConfig.timeScale) /
      (1000 * 60 * 60 * 24 * 365);
    if (remainingShouyu > elapsedYears) {
      return xiulianActionEndHandler(
        gameConfig,
        xiuxianzheData,
        actionData as XiulianActionData,
        Date.now()
      );
    }

    if (remainingShouyu > 0) {
      const currentJingjie = xiuxianzheData.attributes.jingjie;
      const currentTime =
        actionData.startTime +
        (remainingShouyu * 1000 * 60 * 60 * 24 * 365) / gameConfig.timeScale;
      xiulianActionEndHandler(
        gameConfig,
        xiuxianzheData,
        actionData as XiulianActionData,
        currentTime
      );
      const nowJingjie = xiuxianzheData.attributes.jingjie;
      if (nowJingjie === currentJingjie) {
        // 没有突破，寿终正寝
        return true;
      } else {
        // 递归计算
        actionData.startTime = currentTime;
        return handleAction(gameConfig, xiuxianzheData);
      }
    }
  } else if (actionData.type === ActionType.领悟) {
    // 处理领悟动作
    return lingwuActionEndHandler(
      gameConfig,
      xiuxianzheData,
      actionData as LingwuActionData,
      now
    );
  } else if (actionData.type === ActionType.采药) {
    // 处理采药动作
    return caiyaoActionEndHandler(
      gameConfig,
      xiuxianzheData,
      actionData as CaiyaoActionData,
      now
    );
  } else if (actionData.type === ActionType.炼丹) {
    // 处理炼丹动作
    return liandanActionEndHandler(
      gameConfig,
      xiuxianzheData,
      actionData as LiandanActionData,
      now
    );
  } else if (actionData.type === ActionType.双修) {
    // 处理双修动作
    return shuangxiuActionEndHandler(
      gameConfig,
      xiuxianzheData,
      actionData as ShuangxiuActionData,
      now
    );
  } else {
    // 未知动作类型，切换回修炼状态
    xiuxianzheData.actionData = switchToXiulianAction(Date.now());
    return false;
  }

  return false;
};

/**
 * 切换到新动作
 */
export function switchToNewAction<T extends ActionBaseData>(
  gameConfig: GameConfig,
  xiuxianzheData: XiuXianZheData,
  newActionData: T,
  isManual: boolean // 是否是手动切换
): T {
  if (isManual) {
    // 手动切换要处理旧动作的收尾工作
    handleAction(gameConfig, xiuxianzheData);
  }
  xiuxianzheData.actionData = newActionData;
  return newActionData;
}
