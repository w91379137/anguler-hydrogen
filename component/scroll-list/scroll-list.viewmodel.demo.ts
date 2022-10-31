import { ScrollItemViewModel, ScrollListViewModel } from "./scroll-list.viewmodel";

export function demoScrollListViewModel(): ScrollListViewModel {

  const result = new ScrollListViewModel()

  for (let index = 0; index < 30; index++) {
    const item = new ScrollItemViewModel()
    item.id = index
    item.title = '標題' + index.toString()
    item.content = '內文' + index.toString()
    result.itemList.push(item)
  }

  return result;
}
