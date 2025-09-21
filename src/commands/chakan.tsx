import { saveXiuXianZhe } from "../db";
import { defineCommand } from "./types";

export default defineCommand({
  name: "查看",
  register(ctx, gameData) {
    ctx
      .command("查看 [目标]", "查看目标信息，缺省目标则查看自己")
      .alias("查找", "查询", "chakan")
      .action(({ session, args }, target) => {
        const userId = session.userId;
        if (!gameData.xiuxianzhe[userId]) {
          return `你还不是修仙者，请先注册，指令：注册`;
        }
        if (args.length) {
          // 解析 <at id="111"/> 中的 id
          const match = args[0].match(/<at id="(\d+)"\/>/);
          if (match) {
            target = match[1];
          }
        }

        const targetId = target || userId;
        // 先看是不是修仙者
        const xiuxianzhe = gameData.xiuxianzhe[targetId];
        if (xiuxianzhe) {
          // 想查看别的修仙者，需要比神识
          if (targetId !== userId) {
            const me = gameData.xiuxianzhe[userId];
            if (me.attributes.shenshi < xiuxianzhe.attributes.shenshi) {
              return `你的神识不够，无法查看对方的信息`;
            }
          } else {
            // 查看自己的先要更新一下
            xiuxianzhe.updateAction(gameData.config);
          }

          saveXiuXianZhe(ctx.config.dbPath, xiuxianzhe);

          return (
            <message forward>
              <message>{xiuxianzhe.getBasicInfo()}</message>
            </message>
          );
        }

        return `没有找到修仙者，id：${targetId}`;
      });
  },
});
