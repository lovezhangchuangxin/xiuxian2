import { isInteger } from "koishi";
import { ActionBaseData } from "../actions/types";
import { switchToXiulianAction } from "../actions/xiulian";
import { Bag, DanyaoType, GongfaType, ItemType } from "../items";
import { DeepPartial, formatDaysToYearDay, formatNumber } from "../utils";
import {
  attributeKeyToNameMap,
  createXiuXianZheAttributes,
  XiuXianZheAttributes,
} from "./types";
import { defaultConfig, GameConfig } from "../configs/config";
import { handleAction } from "../actions";

/**
 * 修仙者数据
 */
export interface XiuXianZheData {
  /** 修仙者 id */
  id: string;
  /** 修仙者名称 */
  name: string;
  /** 属性 */
  attributes: XiuXianZheAttributes;
  /** 已服用的丹药数量 */
  usedDanyao: Partial<Record<DanyaoType, number>>;
  /** 已修炼的功法层数,从 1 开始 */
  usedGongfa: Partial<Record<GongfaType, number>>;
  /** 储物袋 */
  storageBag: Bag;
  /** 当前的动作数据 */
  actionData: ActionBaseData;
  /** 其他杂七杂八的数据 */
  meta: {
    qiandaoTime: number; // 上次签到时间
  } & Record<string, any>;
}

/**
 * 修仙者类
 */
export class XiuXianZhe implements XiuXianZheData {
  id: string;
  name: string;
  attributes: XiuXianZheAttributes;
  usedDanyao: Partial<Record<DanyaoType, number>>;
  usedGongfa: Partial<Record<GongfaType, number>>;
  storageBag: Bag;
  actionData: ActionBaseData;

  constructor(data: XiuXianZheData) {
    this.id = data.id;
    this.name = data.name;
    this.attributes = data.attributes;
    this.usedDanyao = data.usedDanyao;
    this.usedGongfa = data.usedGongfa;
    this.storageBag = data.storageBag;
    this.actionData = data.actionData;
    this.meta = data.meta || { qiandaoTime: 0 };
  }
  meta: {
    qiandaoTime: number; // 上次签到时间
  } & Record<string, any>;

  /**
   * 创建一个新的修仙者
   */
  static create(
    id: string,
    name: string,
    attributes: Partial<XiuXianZheAttributes> = {}
  ) {
    const actionData = switchToXiulianAction(Date.now());

    return new XiuXianZhe({
      id,
      name,
      attributes: createXiuXianZheAttributes(attributes),
      usedDanyao: {},
      usedGongfa: {},
      storageBag: { items: [] },
      actionData,
      meta: { qiandaoTime: 0 },
    });
  }

  /**
   * 是否老死
   */
  isDead(config: GameConfig = defaultConfig) {
    const age =
      ((Date.now() - this.attributes.bornTime) * config.timeScale) /
      (1000 * 60 * 60 * 24 * 365); // 年龄
    return age >= this.attributes.shouyuan;
  }

  /**
   * 更新动作
   */
  updateAction(gameConfig: GameConfig, actionData?: ActionBaseData) {
    const beforeData = this.clone();
    let result = handleAction(gameConfig, this);
    if (result) {
      // 如果动作提前结束了，自动切换回修炼状态
      const endTime =
        this.actionData.startTime +
        (this.actionData.duration * (1000 * 60 * 60 * 24)) /
          gameConfig.timeScale;
      actionData = switchToXiulianAction(endTime);
      result = handleAction(gameConfig, this);
    }
    const diff = this.diff(beforeData);
    const diffText = this.getDiffInfo(diff);
    if (actionData) {
      this.actionData = actionData;
    } else if (result) {
      // 动作结束，切换回修炼状态
      this.actionData = switchToXiulianAction(Date.now());
    }
    return diffText;
  }

  /**
   * 获取修仙者的基本信息
   */
  getBasicInfo(config: GameConfig = defaultConfig) {
    const { jingjie, jingjieStage } = this.attributes;
    let info = `修仙者：${this.name}\n`;
    info += `境界：${jingjie}${jingjieStage}\n`;
    info += `属性：\n`;
    for (const [key, val] of Object.entries(this.attributes)) {
      if (key === "linggen") {
        info += `  灵根: ${val.join(", ")}\n`;
      } else if (key === "jingjie" || key === "jingjieStage") {
        // 已经单独输出过了
        continue;
      } else if (key === "bornTime") {
        if (isInteger(val)) {
          info += `  年龄: ${Math.floor(
            ((Date.now() - val) * config.timeScale) /
              (1000 * 60 * 60 * 24 * 365)
          )}岁\n`;
        }
      } else {
        info += `  ${attributeKeyToNameMap[key]}: ${formatNumber(val)}\n`;
      }
    }
    info += `功法：\n`;

    if (Object.keys(this.usedGongfa).length === 0) {
      info += `  无\n`;
    } else {
      for (const [key, level] of Object.entries(this.usedGongfa)) {
        info += `  ${key}: ${level}\n`;
      }
    }
    info += `储物袋：\n`;
    if (this.storageBag.items.length === 0) {
      info += `  空\n`;
    } else {
      this.storageBag.items.forEach((item) => {
        info += `  ${item.id} x${item.number}\n`;
      });
    }
    info += `当前动作：${this.actionData.type}\n`;
    if (this.actionData.duration) {
      const ellapsedDays =
        ((Date.now() - this.actionData.startTime) * config.timeScale) /
        (1000 * 60 * 60 * 24);
      const remaining = this.actionData.duration - ellapsedDays;
      if (remaining > 0) {
        info += `  已经持续：${formatDaysToYearDay(
          Math.floor(ellapsedDays)
        )}\n`;
        info += `  剩余时间：${formatDaysToYearDay(Math.ceil(remaining))}\n`;
      }
    }

    return info;
  }

  /**
   * 深拷贝当前修仙者数据
   */
  clone(): XiuXianZheData {
    return structuredClone(this);
  }

  /**
   * 对比与另一个修仙者数据的差异
   */
  diff(other: XiuXianZheData): DeepPartial<XiuXianZheData> {
    const diff: DeepPartial<XiuXianZheData> = {
      attributes: {},
      usedGongfa: {},
      storageBag: { items: [] },
    };
    // 对比属性
    for (const key in this.attributes) {
      if (this.attributes[key] !== other.attributes[key]) {
        diff.attributes[key] = other.attributes[key];
      }
    }
    // 特殊处理：灵根
    if (
      this.attributes.linggen.join(",") !== other.attributes.linggen.join(",")
    ) {
      diff.attributes.linggen = other.attributes.linggen;
    } else {
      delete diff.attributes.linggen;
    }

    // 对比功法
    for (const key in this.usedGongfa) {
      if (this.usedGongfa[key] !== other.usedGongfa[key]) {
        if (!diff.usedGongfa) diff.usedGongfa = {};
        diff.usedGongfa[key] = other.usedGongfa[key];
      }
    }
    // 对比储物袋
    const map = new Map<string, number>();
    other.storageBag.items.forEach((item) => {
      map.set(`${item.id}_${item.type}`, item.number);
    });
    this.storageBag.items.forEach((item) => {
      const key = `${item.id}_${item.type}`;
      const prev = map.get(key) || 0;
      if (prev !== item.number) {
        diff.storageBag!.items!.push({
          ...item,
          number: item.number - prev,
        });
      }
      map.delete(key);
    });
    map.forEach((number, key) => {
      const [id, type] = key.split("_") as [string, ItemType];
      diff.storageBag!.items!.push({ id, type, number: -number });
    });

    return diff;
  }

  /**
   * 根据 diff 输出对比结果信息
   */
  getDiffInfo(diff: DeepPartial<XiuXianZheData>) {
    let info = "";
    if (diff.attributes && Object.keys(diff.attributes).length > 0) {
      info += "【属性变化】\n";
      for (const key in diff.attributes) {
        const val = this.attributes[key];
        const oldVal = diff.attributes[key];
        info += `${attributeKeyToNameMap[key]}: ${formatNumber(
          oldVal
        )} -> ${formatNumber(val)}\n`;
      }
    }

    if (diff.usedGongfa && Object.keys(diff.usedGongfa).length > 0) {
      info += "【功法层数变化】\n";
      for (const key in diff.usedGongfa) {
        info += `${key}: ${diff.usedGongfa[key] || 0} -> ${
          this.usedGongfa[key]
        }\n`;
      }
    }

    if (diff.storageBag && diff.storageBag.items?.length > 0) {
      info += "【储物袋变化】\n";
      diff.storageBag.items.forEach((item) => {
        if (item.number > 0) {
          info += `获得 ${item.id} x${item.number}\n`;
        } else {
          info += `失去 ${item.id} x${-item.number}\n`;
        }
      });
    }

    if (!info) {
      info = "无变化";
    }

    return info;
  }
}
