import { FloatingActionMenuItemViewModel, FloatingActionMenuViewModel } from "./floating-action-menu.viewmodel";

export function demoFloatingActionMenuViewModel(): FloatingActionMenuViewModel {

  const result = new FloatingActionMenuViewModel()

  for (let index = 0; index < 2; index++) {
    const item = new FloatingActionMenuItemViewModel()
    item.id = index
    item.title = `＊${index}`
    result.itemList.push(item)
  }

  return result;
}
