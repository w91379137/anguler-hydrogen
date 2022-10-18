
export enum AlertTitle {
  Success = '成功',
  Warning = '警告',
  Error = '錯誤',
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
  message = ''

  /** 按鈕控制 */
  mode = AlertButtonMode.yesno
}
