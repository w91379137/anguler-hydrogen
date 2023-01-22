import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { intersectRect } from '../../util/geometry';
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
  container: ElementRef;

  @ViewChildren('card_div')
  cardList: QueryList<ElementRef>;

  @Input()
  public viewModel: ScrollListViewModel;

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  private scrolled$ = new Subject<number[]>();

  @Output()
  scrolled = new EventEmitter<number[]>();

  @Output()
  cardClicked = new EventEmitter<ScrollItemViewModel>();

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() { }

  ngOnInit(): void {
    this.scrolled$
    .pipe(takeUntil(this.ngUnsubscribe))
    .pipe(distinctUntilChanged((a, b) => {
      if (a.length != b.length) {
        // console.log(a)
        return false;
      }
      // forEach return 是無效的
      let result = true
      a.forEach((ele, idx) => {
        if (result) {
          // console.log(ele, b[idx], idx)
          if (ele !== b[idx]) {
            result = false;
          }
        }
      });
      // console.log('是否相同', result);
      return result;
    }))
    .subscribe(this.scrolled)
  }

  ngOnChanges() {
    setTimeout(() => {
      this.onScrolled();
    }, 1);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onScrolled();
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
    // console.log('位置', parentRect);
    for (const card of this.cardList) {

      // https://stackoverflow.com/questions/26423335/elements-coordinates-relative-to-its-parent

      let childRect: DOMRect = card.nativeElement.getBoundingClientRect()
      if (intersectRect(parentRect, childRect)) {
        let id = parseInt(card.nativeElement.id)
        // console.log('取得', id, parentRect, childRect)
        show.push(id)
      }
    }
    // console.log('顯示中', show);
    this.scrolled$.next(show);
  }

  onCardClicked(item: ScrollItemViewModel) {
    this.cardClicked.emit(item)
  }
}
