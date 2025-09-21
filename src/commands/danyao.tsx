import { DANYAO_CONFIGS, DANYAO_RECIPES, DanyaoType } from "../items";
import { defineCommand } from "./types";

export default defineCommand({
  name: "丹药",
  register(ctx, gameData) {
    ctx
      .command(
        "丹药 [...丹药名称]",
        "查看丹药信息，不指定名称则查看完整的丹药列表"
      )
      .alias("查看丹药", "丹药列表", "danyao")
      .action(({ session }, ...rest) => {
        let validDanyao: string[] = [];
        let invalidDanyao: string[] = [];
        if (rest.length === 0) {
          validDanyao = Object.keys(DANYAO_CONFIGS);
        } else {
          rest.forEach((danyao) => {
            if (DANYAO_CONFIGS[danyao]) {
              validDanyao.push(danyao);
            } else {
              invalidDanyao.push(danyao);
            }
          });
        }
        if (invalidDanyao.length > 0) {
          return `以下丹药不存在：${invalidDanyao.join(", ")}`;
        }

        if (validDanyao.length === 0) {
          return `没有指定任何有效的丹药名称`;
        }

        let message = `丹药信息：\n`;
        validDanyao.forEach((danyao) => {
          const config = DANYAO_CONFIGS[danyao as DanyaoType];
          const recipe = DANYAO_RECIPES.find((r) => r.output === danyao);
          const time = Math.ceil(
            ((recipe?.time || 0) * (60 * 60 * 24)) / gameData.config.timeScale
          );
          // 配方描述
          const recipeDesc = recipe
            ? Object.entries(recipe.materials)
                .map(([name, num]) => `${name} x${num}\n`)
                .join("")
            : "无";
          message += `\n名称：${danyao}（${config.grade}品）\n描述：${config.description}\n炼制配方：\n${recipeDesc}\n炼制时间：${time}秒\n`;
        });
        // 如果草药数量不多，直接返回文本，否则使用转发消息
        if (validDanyao.length <= 1) {
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
