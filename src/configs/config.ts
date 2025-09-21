/**
 * 游戏配置
 */
export interface GameConfig {
  /** 修仙世界的时间比现实世界快多少倍 */
  timeScale: number;
}

export const defaultConfig: GameConfig = {
  // 1天模拟成100年
  timeScale: 36500,
};
