import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ScrollItemViewModel, ScrollListViewModel } from './scroll-list.viewmodel';

@Component({
  selector: 'h2-scroll-list',
  templateUrl: './scroll-list.component.html',
  styleUrls: ['./scroll-list.component.scss']
})
export class ScrollListComponent implements OnInit, AfterViewInit {

  @ViewChild('card_container')
  container: ElementRef

  @ViewChildren('card_div')
  cardList: QueryList<ElementRef>;

  @Input()
  public viewModel: ScrollListViewModel;

  @Output()
  scrolled = new EventEmitter<ScrollItemViewModel[]>();

  @Output()
  cardClicked = new EventEmitter<ScrollItemViewModel>();

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onScrolled()
    }, 1);
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  onScrolled() {
    // 這邊可以查哪個只元件在畫面上
    // 然後去回報
    // console.log()
    let parentPos = this.container.nativeElement.getBoundingClientRect()

    let show: ScrollItemViewModel[] = []
    // console.log('位置', scrollTop)
    for (const card of this.cardList) {

      // https://stackoverflow.com/questions/26423335/elements-coordinates-relative-to-its-parent

      let childPos = card.nativeElement.getBoundingClientRect()
      let top = childPos.top - parentPos.top + 1 // 讓第 0 個能出現
      let bottom = childPos.bottom - parentPos.bottom - 1 // 讓最後一個 能出現
      // console.log('計算', top, bottom)
      if (top > 0 && bottom < 0) {

        let id = parseInt(card.nativeElement.id)
        // console.log('取得', id, top, bottom)
        let cardVM = this.viewModel.itemList.find(ele => ele.id === id)
        if (cardVM) {
          show.push(cardVM)
        }
      }
    }
    this.scrolled.emit(show)
  }

  onCardClicked(item: ScrollItemViewModel) {
    this.cardClicked.emit(item)
  }
}
