
// 原生方法改進

export function delay(ms): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function randomInt(max) {
  return Math.floor(Math.random() * max);
}

// ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
export function isNotEmptyStringKey(obj: object, key: string): boolean {
  const value = obj[key];
  if (typeof value === 'string') {
    return !!value;
  }
  return true;
}

export function clearDict(
  obj: object,
  filterFunc: (obj: object, key: string) => boolean = isNotEmptyStringKey
): object {

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const isSave = filterFunc(obj, key);
      if (!isSave) {
        delete obj[key];
      }
    }
  }

  return obj;
}

// ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

/** 取得某時區在某個時間點之後的下一個午夜 */
export function TimezoneNextMidnight(
  timeZoneOffset: number,
  targetTime: Date = new Date()
): Date {

  // https://zh.wikipedia.org/wiki/%E6%97%B6%E5%8C%BA%E5%88%97%E8%A1%A8
  // 時區是 -12 ~ +14

  // 當下時間 保留年月日
  const result = new Date(targetTime.getTime());

  // 直接改成該時區的小時
  const hour = Math.floor(timeZoneOffset);
  const min = Math.floor((timeZoneOffset - hour) / 0.25) * 15;
  // console.log(hour, min);

  // 讓這個時區的 午夜 12點 變成交界
  result.setUTCHours(-hour, -min, 0, 0);

  // 找到超過 targetTime 的下一個午夜
  let limit = 0;
  while (targetTime.getTime() > result.getTime() && limit < 10) {
    result.setDate(result.getDate() + 1);
    limit ++;
  }

  // console.log('TimezoneNextMidnight', timeZoneOffset, result.toISOString());
  return result;
}
