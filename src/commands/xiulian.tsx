import { switchToXiulianAction } from "../actions/xiulian";
import { saveXiuXianZhe } from "../db";
import { parseTemplate, switchActionTemplate } from "../utils";
import { defineCommand } from "./types";

export default defineCommand({
  name: "修炼",
  register(ctx, gameData) {
    ctx
      .command("修炼", "开始修炼，提升修为")
      .alias("打坐", "xiulian")
      .action(({ session }) => {
        const userId = session.userId;
        if (!gameData.xiuxianzhe[userId]) {
          return `你还不是修仙者，请先注册，指令：注册`;
        }

        const xiuxianzhe = gameData.xiuxianzhe[userId];
        // 记一下当前的修仙者数据，用于对比差异
        const beforeData = xiuxianzhe.clone();
        // 设置新的动作
        const newActionData = switchToXiulianAction(Date.now());
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
