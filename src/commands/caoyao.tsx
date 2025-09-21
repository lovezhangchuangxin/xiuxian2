import { CAOYAO_CONFIGS, CAOYAO_GATHER_TIME, CaoyaoType } from "../items";
import { defineCommand } from "./types";

export default defineCommand({
  name: "草药",
  register(ctx, gameData) {
    ctx
      .command(
        "草药 [...草药名称]",
        "查看草药信息，不指定名称则查看完整的草药列表"
      )
      .alias("查看草药", "草药列表", "caoyao")
      .action(({ session }, ...rest) => {
        let validHerbs: string[] = [];
        let invalidHerbs: string[] = [];
        if (rest.length === 0) {
          validHerbs = Object.keys(CAOYAO_CONFIGS);
        } else {
          rest.forEach((herb) => {
            if (CAOYAO_CONFIGS[herb]) {
              validHerbs.push(herb);
            } else {
              invalidHerbs.push(herb);
            }
          });
        }
        if (invalidHerbs.length > 0) {
          return `以下草药不存在：${invalidHerbs.join(", ")}`;
        }

        if (validHerbs.length === 0) {
          return `没有指定任何有效的草药名称`;
        }

        let message = `草药信息：\n`;
        validHerbs.forEach((herb) => {
          const config = CAOYAO_CONFIGS[herb as CaoyaoType];
          const time = Math.ceil(
            (CAOYAO_GATHER_TIME[config.grade] * (60 * 60 * 24)) /
              gameData.config.timeScale
          );
          message += `\n名称：${herb}（${config.grade}品）\n描述：${config.description}\n采集时间：${time}秒\n`;
        });
        // 如果草药数量不多，直接返回文本，否则使用转发消息
        if (validHerbs.length <= 1) {
          return message;
        }
        return (
          <message forward>
            <message>{message}</message>
          </message>
        );
      });
  },
});
