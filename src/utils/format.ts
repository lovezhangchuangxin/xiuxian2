/**
 * 如果是小数，保留指定位数，否则直接返回
 *
 * @param num 要格式化的数字
 * @param decimalPlaces 小数位数，默认 3
 */
export function formatNumber<T>(num: T, decimalPlaces: number = 3): T {
  if (typeof num === "number" && !Number.isInteger(num)) {
    return num.toFixed(decimalPlaces) as T;
  }
  return num;
}

/**
 * 将时间转为年天的形式，小于1年只显示天数，大于1年显示 年+天
 * @param ms 毫秒数
 * @returns 年天字符串
 */
export function formatTimeToYearDay(ms: number): string {
  const totalDays = Math.floor(ms / (1000 * 60 * 60 * 24));
  if (totalDays < 365) {
    return `${totalDays}天`;
  } else {
    const years = Math.floor(totalDays / 365);
    const days = totalDays % 365;
    return `${years}年${days}天`;
  }
}

/**
 * 将天数转换为年天的形式
 * @param days 天数
 * @returns 年天字符串
 */
export function formatDaysToYearDay(days: number): string {
  if (days < 365) {
    return `${days}天`;
  } else {
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    return `${years}年${remainingDays}天`;
  }
}
