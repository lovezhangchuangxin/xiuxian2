import { Context } from "koishi";
import { GameData } from "../db";

export interface CommandConfig {
  name: string;
  register: (ctx: Context, gameData: GameData) => void;
}

export const defineCommand = (config: CommandConfig) => {
  return config;
};
