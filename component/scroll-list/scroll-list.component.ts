import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScrollItemViewModel, ScrollListViewModel } from './scroll-list.viewmodel';

@Component({
  selector: 'h2-scroll-list',
  templateUrl: './scroll-list.component.html',
  styleUrls: ['./scroll-list.component.scss']
})
export class ScrollListComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject<void>();

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  @Input()
  customCard: TemplateRef<any>;

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  @ViewChild('card_container')
  container: ElementRef

  @ViewChildren('card_div')
  cardList: QueryList<ElementRef>;

  @Input()
  public viewModel: ScrollListViewModel;

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  @Output()
  scrolled = new EventEmitter<number[]>();

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
    interval(300)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(async () => {

      if (!(this.viewModel instanceof ScrollListViewModel)) {
        return
      }
      if (this.viewModel.target === -1) {
        return
      }
      let idStr = this.viewModel.target.toString()
      let card = this.cardList.find(ele => ele.nativeElement.id === idStr)
      if (card) {
        card.nativeElement.scrollIntoView({behavior:"smooth"});
      }
      this.viewModel.target = -1

    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  onScrolled() {
    // 這邊可以查哪個只元件在畫面上
    // 然後去回報
    // console.log()
    let parentRect: DOMRect = this.container.nativeElement.getBoundingClientRect()

    let show: number[] = []
    // console.log('位置', scrollTop)
    for (const card of this.cardList) {

      // https://stackoverflow.com/questions/26423335/elements-coordinates-relative-to-its-parent

      let childRect: DOMRect = card.nativeElement.getBoundingClientRect()
      if (intersectRect(parentRect, childRect)) {

        let id = parseInt(card.nativeElement.id)
        // console.log('取得', id, top, bottom)
        show.push(id)
      }
    }
    this.scrolled.emit(show)
  }

  onCardClicked(item: ScrollItemViewModel) {
    this.cardClicked.emit(item)
  }
}

function intersectRect(rect1: DOMRect, rect2: DOMRect) {
  return !(rect2.left > rect1.right ||
           rect2.right < rect1.left ||
           rect2.top > rect1.bottom ||
           rect2.bottom < rect1.top);
}
