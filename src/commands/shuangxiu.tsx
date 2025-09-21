import { defineCommand } from "./types";

export default defineCommand({
  name: "双修",
  register(ctx, gameData) {
    ctx
      .command("双修 <partner>", "和伴侣双修，提升一倍修炼速度")
      .alias("双休", "shuangxiu")
      .action(({ session }, partner: string) => {
        const userId = session.userId;
        if (!gameData.xiuxianzhe[userId]) {
          return `你还不是修仙者，请先注册，指令：注册`;
        }

        // 先看伴侣是不是修仙者
        const partnerXiuXianZhe = gameData.xiuxianzhe[partner];
        if (!partnerXiuXianZhe) {
          return `没有找到双修伴侣 ${partner}，请确认对方已经注册为修仙者`;
        }

        const xiuxianzhe = gameData.xiuxianzhe[userId];
        if (partnerXiuXianZhe.id === xiuxianzhe.id) {
          return `不能和自己双修`;
        }

        // 邀请对方双修
      });
  },
});
