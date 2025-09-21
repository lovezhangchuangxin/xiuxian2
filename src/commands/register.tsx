import { XiuXianZhe } from "../beings/xiu-xian-zhe";
import { saveXiuXianZhe } from "../db";
import { defineCommand } from "./types";

export default defineCommand({
  name: "注册",
  register(ctx, gameData) {
    ctx
      .command("注册", "注册成为修仙者")
      .alias("register", "login")
      .action(({ session }) => {
        const userId = session.userId;
        const username = session.username;
        if (gameData.xiuxianzhe[userId]) {
          return `你已经是修仙者了，名称：${gameData.xiuxianzhe[userId].name}`;
        }
        const xiuxianzhe = XiuXianZhe.create(userId, username);
        gameData.xiuxianzhe[userId] = xiuxianzhe;
        saveXiuXianZhe(ctx.config.dbPath, xiuxianzhe);
        return `注册成功，你现在是修仙者，名称：${xiuxianzhe.name}`;
      });
  },
});
