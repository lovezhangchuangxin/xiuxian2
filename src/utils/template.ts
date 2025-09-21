/**
 * 解析模版
 */
export function parseTemplate(template: string, data: Record<string, any>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    return key in data ? data[key] : `{${key}}`;
  });
}

export const switchActionTemplate = `\
结束上一个动作: {action}，变化如下：
{diff}
进行下一个动作: {newAction}
`;
