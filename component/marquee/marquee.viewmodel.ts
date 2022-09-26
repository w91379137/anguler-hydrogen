
// 行為是
// 每次正常跑完一輪就 index += 1
// 除了數量是 0 個之外 必然可以取得 current
// 拿著 current 去對外問 time 計算時間
//
// list 想改就改
// starttime
// 每1秒檢查一次 starttime
// 如果超過就 作動

export enum MarqueeAnimationName {
  Hidden = 'marquee-hidden',
  Slide = 'marquee-slide',
}
export class MarqueeViewModel {

  /** 開始動畫時間 */
  startAnimationTime = new Date();

  /** 使用動畫名稱 */
  animationName = MarqueeAnimationName.Hidden;

  /** 動畫時間(ms) */
  timeLength = 0; // ms

  /** css 用時間 */
  get animationDuration(): string {
    return `${this.timeLength}ms`;
  }

  /** 結束動畫時間 */
  get stopAnimationTime(): Date {
    return new Date(this.startAnimationTime.getTime() + this.timeLength);
  }

  /** 取用索引 */
  index = -1;

  /** 現在內容 */
  current = '';

  /** 等待內容 */
  list = [];
}
