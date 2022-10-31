export class ScrollListViewModel {
  id = -1;
  itemList: ScrollItemViewModel[] = [];
  target = -1;
}

export class ScrollItemViewModel {
  id = -1;

  icon = "";
  title = "";
  content = "";
}
