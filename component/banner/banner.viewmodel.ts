
// https://stackoverflow.com/questions/54550006/unsafedataimage-jpegbase64-neterr-unknown-url-scheme-in-angular-7

// 空圖片
// https://stackoverflow.com/questions/9126105/blank-image-encoded-as-data-uri

let emptyImage = "data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
export class BannerViewModel {

  /** 上次設定時間 */
  lastChangeTime = new Date();

  /** 變換間隔 */
  timeLength = 10 * 1000; // ms

  /** 選用序號 */
  index = -1;

  /** 現在內容網址 */
  current = emptyImage;

  /** 預設內容網址(載入錯誤也是) */
  default = emptyImage;

  /** 候選列表 */
  list: string[] = [];

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  // action

  /** 立即更換 */
  fire(): void {
    this.lastChangeTime.setMilliseconds(this.lastChangeTime.getMilliseconds() - this.timeLength);
  }
}


