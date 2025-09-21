import { isInteger } from "koishi";
import { defineCommand } from "./types";
import { DANYAO_CONFIGS, DanyaoType } from "../items";
import { attributeKeyToNameMap } from "../beings/types";
import { saveXiuXianZhe } from "../db";

export default defineCommand({
  name: "吃药",
  register(ctx, gameData) {
    ctx
      .command("吃药 <丹药名称> 数量", "吃药，服用丹药，可以指定数量")
      .alias("吃药", "吃丹药", "服用丹药", "服药", "chiyao")
      .action(({ session }, name, number) => {
        const userId = session.userId;
        if (!gameData.xiuxianzhe[userId]) {
          return `你还不是修仙者，请先注册，指令：注册`;
        }

        // 丹药名称后面可能跟数字，需要解析
        const match = name.match(/^(.+?)(\d+)?$/);
        if (!match) {
          return `丹药名称格式错误，请使用：吃药 <丹药名称> 数量，例如：吃药 九转丹 3，数量默认为1`;
        }
        const danyao = match[1] as DanyaoType;
        const num = match[2] ? parseInt(match[2], 10) : parseInt(number) || 1;
        if (!isInteger(num) || num <= 0) {
          return `丹药数量必须是正整数`;
        }

        // 看一下丹药是否存在
        const xiuxianzhe = gameData.xiuxianzhe[userId];
        const bag = xiuxianzhe.storageBag;
        const item = bag.items.find(
          (i) => i.id === danyao && DANYAO_CONFIGS[i.id]
        );
        if (!item) {
          return `你的储物袋中没有${danyao}，无法服用，请确认名称是否正确`;
        }

        if (item.number < num) {
          return `你的储物袋中只有${item.number}颗${danyao}，无法服用${num}颗`;
        }

        // 考虑抗药性
        const { usedDanyao } = xiuxianzhe;
        const danyaoConfig = DANYAO_CONFIGS[danyao];
        // 最多吃这么多
        const max = Math.min(
          num,
          danyaoConfig.limit - (usedDanyao[danyao] || 0)
        );
        if (max <= 0) {
          return `你对${danyao}已经产生了抗药性${usedDanyao[danyao] || 0}/${
            danyaoConfig.limit
          }，无法继续服用`;
        }

        // 吃药
        item.number -= max;
        if (item.number <= 0) {
          // 数量为0，移除物品
          bag.items = bag.items.filter((i) => i !== item);
        }
        // 吃药的效果
        let message = `你服用了${max}颗${danyao}\n`;
        Object.entries(danyaoConfig.effect).forEach(([key, value]) => {
          xiuxianzhe.attributes[key] =
            (xiuxianzhe.attributes[key] || 0) + value * max;
          message += `【${attributeKeyToNameMap[key]}】增加了 ${value * max}\n`;
        });
        usedDanyao[danyao] = (usedDanyao[danyao] || 0) + max;
        message += `你对${danyao}的抗药性变为${usedDanyao[danyao] || 0}/${
          danyaoConfig.limit
        }\n`;
        saveXiuXianZhe(ctx.config.dbPath, xiuxianzhe);

        return message;
      });
  },
});
