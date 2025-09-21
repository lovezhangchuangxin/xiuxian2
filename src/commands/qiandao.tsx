import { saveXiuXianZhe } from "../db";
import { addItemsToBag, Item } from "../items";
import { defineCommand } from "./types";

export default defineCommand({
  name: "签到",
  register(ctx, gameData) {
    ctx
      .command("签到", "签到，领取每日奖励")
      .alias("干活", "qiandao")
      .action(({ session }) => {
        const userId = session.userId;
        if (!gameData.xiuxianzhe[userId]) {
          return `你还不是修仙者，请先注册，指令：注册`;
        }

        // 先看今天是不是已经签到过了
        const xiuxianzhe = gameData.xiuxianzhe[userId];
        const now = Date.now();
        const lastQiandao = xiuxianzhe.meta.qiandaoTime || 0;
        const lastDate = new Date(lastQiandao);
        const nowDate = new Date(now);
        if (
          lastDate.getFullYear() === nowDate.getFullYear() &&
          lastDate.getMonth() === nowDate.getMonth() &&
          lastDate.getDate() === nowDate.getDate()
        ) {
          return `你今天已经签到过了，明天再来吧`;
        }
        const reward = getRandomReward();
        const items: Item[] = Object.entries(reward).map(([name, count]) => ({
          id: "灵石",
          type: "其他",
          number: count,
        }));
        // 添加到储物袋
        addItemsToBag(xiuxianzhe.storageBag, items);
        // 更新签到时间
        xiuxianzhe.meta.qiandaoTime = now;
        // 保存数据
        saveXiuXianZhe(ctx.config.dbPath, xiuxianzhe);

        return `签到成功，获得奖励：\n${Object.entries(reward)
          .map(([name, count]) => `${name} x${count}\n`)
          .join("")}`;
      });
  },
});

/**
 * 获取随机奖励
 */
function getRandomReward() {
  // 先随机给些灵石，分为三档
  const rand = Math.random();
  if (rand < 0.5) {
    return { 灵石: 100 + Math.floor(Math.random() * 100) };
  } else if (rand < 0.9) {
    return { 灵石: 300 + Math.floor(Math.random() * 200) };
  } else {
    return { 灵石: 1000 + Math.floor(Math.random() * 400) };
  }
}
