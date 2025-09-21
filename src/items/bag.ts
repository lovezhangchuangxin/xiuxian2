import { ItemType } from "./types";

/**
 * 基础物品接口，可放入背包
 */
export interface Item {
  id: string; // 物品ID
  type: ItemType; // 物品类型
  number: number; // 物品数量
}

/**
 * 储物袋接口
 */
export interface Bag {
  /** 物品列表 */
  items: Item[];
}

/**
 * 从储物袋中取出物品
 */
export function takeOutItemsFromBag(bag: Bag, items: Item[]) {
  for (const itemToTake of items) {
    const existingItem = bag.items.find(
      (item) => item.id === itemToTake.id && item.type === itemToTake.type
    );
    if (existingItem) {
      existingItem.number -= itemToTake.number;
    }
  }

  // 移除数量为 0 的物品
  bag.items = bag.items.filter((item) => item.number > 0);
}

/**
 * 向储物袋中添加物品
 */
export function addItemsToBag(bag: Bag, items: Item[]) {
  for (const newItem of items) {
    const existingItem = bag.items.find(
      (item) => item.id === newItem.id && item.type === newItem.type
    );
    if (existingItem) {
      existingItem.number += newItem.number;
    } else {
      bag.items.push(newItem);
    }
  }
}
