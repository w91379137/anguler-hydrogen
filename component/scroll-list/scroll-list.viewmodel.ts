export class ScrollListViewModel {

  id = -1;
  itemList: ScrollItemViewModel[] = [];
  target = -1;
  isChanged = false

}

export class ScrollItemViewModel {
  id = -1

  icon = ""
  title = ""
  content = ""

  verticalPercent = 0

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  get vm() {
    return this;
  }
}
