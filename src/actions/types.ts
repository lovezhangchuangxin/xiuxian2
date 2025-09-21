/**
 * 修仙者可以执行一些动作，当这些动作执行完后又会自动回到修炼状态
 */

import { XiuXianZheData } from "../beings/xiu-xian-zhe";
import { GameConfig } from "../configs/config";

/**
 * 修仙者动作类型
 */
export enum ActionType {
  修炼 = "修炼",
  领悟 = "领悟",
  采药 = "采药",
  挖矿 = "挖矿",
  炼丹 = "炼丹",
  炼器 = "炼器",
  历练 = "历练",
  双修 = "双修",
}

/**
 * 修仙者动作基本数据
 */
export interface ActionBaseData {
  /** 动作类型 */
  type: ActionType;
  /** 动作开始时间戳 */
  startTime: number;
  /** 动作持续时间，单位天 */
  duration: number;
}

/**
 * 动作结束时的处理函数，返回 true 表示该动作已完成，可以切换到修炼状态
 */
export type ActionEndHandler<T extends ActionBaseData> = (
  /** 游戏配置 */
  gameConfig: GameConfig,
  /** 修仙者数据 */
  xiuxianzheData: XiuXianZheData,
  /** 动作数据 */
  actionData: T,
  /** 当前时间戳 */
  currentTime: number
) => boolean;
