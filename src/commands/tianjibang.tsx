import { attributeKeyToNameMap } from "../beings/types";
import { formatNumber } from "../utils";
import { defineCommand } from "./types";

export default defineCommand({
  name: "天机榜",
  register(ctx, gameData) {
    ctx
      .command(
        "天机榜 [排名字段]",
        "查看天机榜上玩家的排名，可以指定排名字段，默认修为"
      )
      .alias("查看天机榜", "排行榜", "tianjibang")
      .action(({ session }, field) => {
        // 先校验字段
        field = field || "修为";
        const fieldName = attributeKeyToNameMap[field];
        if (!fieldName) {
          field = Object.entries(attributeKeyToNameMap).find(
            ([_, name]) => name === field
          )?.[0];
          if (!field) {
            return `排名字段 ${field} 不存在，请使用以下字段：${Object.values(
              attributeKeyToNameMap
            ).join(", ")}`;
          }
        }

        // 获取所有修仙者，并按指定字段排序
        const xiuxianzhes = Object.values(gameData.xiuxianzhe);
        if (!xiuxianzhes || xiuxianzhes.length === 0) {
          return `当前没有修仙者`;
        }

        // 看一下字段对应的值是不是数字
        const isNumberField =
          typeof (xiuxianzhes[0].attributes as any)[field] === "number";
        if (!isNumberField) {
          return `排名字段 ${field} 不是数字类型，无法排序`;
        }

        xiuxianzhes.sort((a, b) => {
          return (b.attributes as any)[field] - (a.attributes as any)[field];
        });

        // 生成排名信息
        let message = `天机榜 - 按照【${attributeKeyToNameMap[field]}】排名\n`;
        // 获取我的排名
        const userId = session.userId;
        const myIndex = xiuxianzhes.findIndex((x) => x.id === userId);
        if (myIndex >= 0) {
          message += `${xiuxianzhes[myIndex].name}的排名：${myIndex + 1} / ${
            xiuxianzhes.length
          }\n`;
        } else {
          message += `你还不是修仙者，无法上榜\n`;
        }
        xiuxianzhes.forEach((x, index) => {
          message += `${index + 1}. ${x.name} - ${
            attributeKeyToNameMap[field]
          }: ${formatNumber((x.attributes as any)[field])}\n`;
        });
        return (
          <message forward>
            <message>{message}</message>
          </message>
        );
      });
  },
});
