import { isInteger } from "koishi";
import { defineCommand } from "./types";
import {
  calculateMaxLiandanAmount,
  switchToLiandanAction,
} from "../actions/liandan";
import { DANYAO_CONFIGS, DANYAO_RECIPES, DanyaoType } from "../items";
import { parseTemplate, switchActionTemplate } from "../utils";
import { saveXiuXianZhe } from "../db";

export default defineCommand({
  name: "炼丹",
  register(ctx, gameData) {
    ctx
      .command("炼丹 <丹药名称数量>", "炼制丹药，需要消耗草药和一定时间")
      .alias("炼制丹药", "liandan")
      .action(({ session }, danyao) => {
        const userId = session.userId;
        if (!gameData.xiuxianzhe[userId]) {
          return `你还不是修仙者，请先注册，指令：注册`;
        }

        // 解析丹药名称和数量
        const match = danyao.match(/^(.+?)(\d+)$/);
        if (!match) {
          return `丹药名称数量格式错误，请使用：炼丹 <丹药名称数量>，例如：炼丹 还童丹3`;
        }
        const name = match[1];
        const number = parseInt(match[2], 10);
        if (!isInteger(number) || number <= 0) {
          return `丹药数量必须是正整数`;
        }

        // 看一下丹药是否存在
        const target = name as DanyaoType;
        if (!DANYAO_CONFIGS[target]) {
          return `丹药 ${name} 不存在，请确认名称是否正确`;
        }

        // 看一下有没有配方
        if (!DANYAO_RECIPES.find((r) => r.output === target)) {
          return `丹药 ${name} 目前还没有配方，无法炼制`;
        }

        // 看一下材料够不够
        const xiuxianzhe = gameData.xiuxianzhe[userId];
        // 算一下玩家最多能炼多少
        const max = calculateMaxLiandanAmount(xiuxianzhe, target);
        if (max < number) {
          return `根据你的草药数量，你最多只能炼制 ${max} 颗${name}，请先采集足够的草药`;
        }

        // 开始炼丹，设置新的动作
        // 记一下当前的修仙者数据，用于对比差异
        const beforeData = xiuxianzhe.clone();
        // 设置新的动作
        const newActionData = switchToLiandanAction(Date.now(), target, number);
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
