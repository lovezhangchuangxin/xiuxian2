import { isInteger } from "koishi";
import { handleAction } from "../actions";
import { saveXiuXianZhe } from "../db";
import { CAOYAO_CONFIGS, DANYAO_CONFIGS, DANYAO_RECIPES } from "../items";
import { parseTemplate, switchActionTemplate } from "../utils";
import { defineCommand } from "./types";
import { switchToCaiyaoAction } from "../actions/caiyao";

export default defineCommand({
  name: "采药",
  register(ctx, gameData) {
    ctx
      .command(
        "采药 [...草药名称or丹药名称]",
        "采集草药，需要指定要采集的草药名称，如果指定丹药会自动采集该丹所需的草药"
      )
      .alias("采集草药", "caiyao")
      .action(({ session }, ...rest) => {
        const userId = session.userId;
        // 检查是否注册
        const xiuxianzhe = gameData.xiuxianzhe[userId];
        if (!xiuxianzhe) {
          return `你还不是修仙者，请先注册，指令：注册`;
        }

        // 检查参数
        if (rest.length === 0) {
          return `请指定要采集的草药名称，指令：采药 [...草药名称]\n例如：采药 宁心草 银月花`;
        }
        // 对参数进行处理，去除逗号和重复的
        // 假如某个参数后面跟着数字，则表示采集该草药的数量
        // 比如下面的都要能解析:
        // 采药 宁心草,2 银月花,3
        // 采药 宁心草2 银月花3
        const herbs: Record<string, number> = {};
        for (const part of rest) {
          const parts = part.split(/[,，]/).map((p) => p.trim());
          for (const p of parts) {
            const match = p.match(/^(.+?)(\d+)$/);
            if (match) {
              const name = match[1];
              const count = parseInt(match[2]);
              if (!isInteger(count) || count <= 0) {
                return `草药或丹药 ${name} 数量必须是大于0的整数：${match[2]}`;
              }

              herbs[name] = (herbs[name] || 0) + count;
            } else {
              herbs[p] = (herbs[p] || 0) + 1;
            }
          }
        }

        // 检查草药名称是否存在
        const invalidHerbs = Object.keys(herbs).filter(
          (herb) => !CAOYAO_CONFIGS[herb] && !DANYAO_CONFIGS[herb]
        );
        if (invalidHerbs.length > 0) {
          return `以下草药或丹药不存在：${invalidHerbs.join(", ")}`;
        }
        // 将丹药转换为对应的草药
        Object.entries(herbs).forEach(([name, count]) => {
          if (DANYAO_CONFIGS[name]) {
            // 找到对应的配方
            const recipe = DANYAO_RECIPES.find((r) => r.output === name);
            if (recipe) {
              Object.entries(recipe.materials).forEach(([material, num]) => {
                herbs[material] = (herbs[material] || 0) + num * count;
              });
              delete herbs[name];
            }
          }
        });

        // 记一下当前的修仙者数据，用于对比差异
        const beforeData = xiuxianzhe.clone();
        // 设置新的动作
        const newActionData = switchToCaiyaoAction(Date.now(), herbs);
        const diffText = xiuxianzhe.updateAction(
          gameData.config,
          newActionData
        );

        const message = parseTemplate(switchActionTemplate, {
          action: beforeData.actionData.type,
          diff: diffText,
          newAction: xiuxianzhe.actionData.type,
        });

        saveXiuXianZhe(ctx.config.dbPath, xiuxianzhe);

        if (message.split("\n").length <= 8) {
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
