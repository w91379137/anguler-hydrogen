
export enum AlertTitle {
  Success = 'Common.Success',
  Warning = 'Common.Warning',
  Error = 'Common.Error',
}

export enum AlertButtonMode {
  yesno = 0,
  onlyyes = 1,
}

export class AlertViewModel {

  /** 是否按確定關閉 */
  isConfirm = false;

  /** 標題 */
  title: string = AlertTitle.Warning

  /** 提示 */
  messageList: string[] = []

  // 舊版的接口 以前只有一個 message
  set message(value: string) {
    this.messageList = [value]
  }
  get message(): string {
    return this.messageList[0] || ''
  }

  /** 按鈕控制 */
  mode = AlertButtonMode.yesno
}
