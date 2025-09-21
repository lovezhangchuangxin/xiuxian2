import { Context, Schema } from "koishi";
import { loadGameData } from "./db";
import { commands } from "./commands";

export const name = "xiuxian2";

export interface Config {
  dbPath?: string;
}

export const Config: Schema<Config> = Schema.object({
  dbPath: Schema.string().description("数据文件夹路径").default("xiuxian_data"),
});

export function apply(ctx: Context, config: Config) {
  const gameData = loadGameData(config.dbPath);

  commands.forEach((command) => {
    command.register(ctx, gameData);
  });
}
