import { ScrollItemViewModel, ScrollListViewModel } from "./scroll-list.viewmodel";

export function demoScrollListViewModel(): ScrollListViewModel {

  const result = new ScrollListViewModel()

  for (let index = 0; index < 10; index++) {
    const item = new ScrollItemViewModel()
    item.id = index
    item.title = index.toString()
    item.content = index.toString()
    result.itemList.push(item)
  }

  return result;
}
