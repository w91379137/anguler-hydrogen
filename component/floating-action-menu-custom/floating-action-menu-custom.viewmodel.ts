
export class FloatingActionMenuCustomViewModel {

  /** 是否打開 */
  isOpen = false

  /** 為了讓 ngTemplateOutletContext 傳遞 */
  get vm() {
    return this
  }
}
