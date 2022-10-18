
export class FloatingActionMenuItemViewModel {

  /** 辨識用 id */
  id = -1

  /** 標題 */
  title = ''

  /** 符號 */
  icon = ''
}

export class FloatingActionMenuViewModel {

  /** 是否打開 */
  isOpen = false

  /** 子按鈕 */
  itemList: FloatingActionMenuItemViewModel[] = []

}
