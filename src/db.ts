import { existsSync, mkdirSync, readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import { XiuXianZhe, XiuXianZheData } from "./beings/xiu-xian-zhe";
import { defaultConfig, GameConfig } from "./configs/config";

export interface GameData {
  /** 修仙者数据，key 为修仙者 id */
  xiuxianzhe: Record<string, XiuXianZhe>;
  /** 游戏配置 */
  config: GameConfig;
}

const gameData: GameData = {
  xiuxianzhe: {},
  config: defaultConfig,
};

/**
 * 读取游戏数据到内存
 */
export function loadGameData(dbPath: string) {
  // 游戏数据文件夹的路径
  const path = resolve(process.cwd(), dbPath);
  console.log(`[xiuxian] 加载游戏数据，路径：${path}`);
  // 遍历修仙者文件夹
  const xiuxianzheDir = resolve(path, "xiuxianzhe");
  if (existsSync(xiuxianzheDir)) {
    const files = readdirSync(xiuxianzheDir);
    files.forEach((file) => {
      const xiuxianzheFile = resolve(xiuxianzheDir, file);
      const content = readFileSync(xiuxianzheFile, "utf-8");
      try {
        const data = JSON.parse(content) as XiuXianZheData;
        gameData.xiuxianzhe[data.id] = new XiuXianZhe(data);
        console.log(`[xiuxian] 加载修仙者数据：${data.name}（ID：${data.id}）`);
      } catch (error) {
        console.error(
          `[xiuxian] 解析修仙者数据失败，文件：${xiuxianzheFile}，错误：${error}`
        );
      }
    });
  } else {
    // 不存在就创建修仙者文件夹
    mkdirSync(xiuxianzheDir, { recursive: true });
    console.log(`[xiuxian] 创建修仙者数据文件夹：${xiuxianzheDir}`);
  }

  return gameData;
}

/**
 * 保存游戏数据到文件
 */
export function saveGameData(dbPath: string) {
  // 游戏数据文件夹的路径
  const path = resolve(process.cwd(), dbPath);
  console.log(`[xiuxian] 保存游戏数据，路径：${path}`);
  // 遍历修仙者数据，保存到文件
  const xiuxianzheDir = resolve(path, "xiuxianzhe");
  if (!existsSync(xiuxianzheDir)) {
    mkdirSync(xiuxianzheDir, { recursive: true });
    console.log(`[xiuxian] 创建修仙者数据文件夹：${xiuxianzheDir}`);
  }
  Object.values(gameData.xiuxianzhe).forEach((xiuxianzhe) => {
    const xiuxianzheFile = resolve(xiuxianzheDir, `${xiuxianzhe.id}.json`);
    try {
      const content = JSON.stringify(xiuxianzhe, null, 2);
      require("fs").writeFileSync(xiuxianzheFile, content, "utf-8");
      console.log(
        `[xiuxian] 保存修仙者数据：${xiuxianzhe.name}（ID：${xiuxianzhe.id}）`
      );
    } catch (error) {
      console.error(
        `[xiuxian] 保存修仙者数据失败，文件：${xiuxianzheFile}，错误：${error}`
      );
    }
  });
}

/**
 * 保存修仙者数据到文件
 */
export function saveXiuXianZhe(dbPath: string, xiuxianzhe: XiuXianZhe) {
  // 游戏数据文件夹的路径
  const path = resolve(process.cwd(), dbPath);
  // 保存修仙者数据到文件
  const xiuxianzheDir = resolve(path, "xiuxianzhe");
  if (!existsSync(xiuxianzheDir)) {
    mkdirSync(xiuxianzheDir, { recursive: true });
  }
  const xiuxianzheFile = resolve(xiuxianzheDir, `${xiuxianzhe.id}.json`);
  try {
    const content = JSON.stringify(xiuxianzhe, null, 2);
    require("fs").writeFileSync(xiuxianzheFile, content, "utf-8");
    console.log(
      `[xiuxian] 保存修仙者数据：${xiuxianzhe.name}（ID：${xiuxianzhe.id}）`
    );
  } catch (error) {
    console.error(
      `[xiuxian] 保存修仙者数据失败，文件：${xiuxianzheFile}，错误：${error}`
    );
  }
}

/**
 * 获取游戏数据
 */
export function getGameData() {
  return gameData;
}
