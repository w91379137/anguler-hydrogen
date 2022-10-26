
export class FloatingActionMenuItemViewModel {

  /** 辨識用 id */
  id = -1

  /** 標題 */
  title = ''

  /** 符號 */
  icon = ''

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(title: string = '') {
    this.title = title
  }
}

export class FloatingActionMenuViewModel {

  /** 是否打開 */
  isOpen = false

  /** 主按鈕 */
  mainItem = new FloatingActionMenuItemViewModel('展開')

  /** 子按鈕 */
  itemList: FloatingActionMenuItemViewModel[] = []

}
