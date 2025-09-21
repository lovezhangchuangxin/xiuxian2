/**
 * 物品类型
 */
export type ItemType = "丹药" | "法宝" | "草药" | "材料" | "功法" | "其他";

/**
 * 基础物品配置接口
 */
export interface BaseItemConfig {
  id: string; // 物品ID
  type: ItemType; // 物品类型
  name: string; // 物品名称
  description: string; // 物品描述
}
