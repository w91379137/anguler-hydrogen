import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BannerViewModel } from './banner.viewmodel';

@Component({
  selector: 'h2-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject<void>();

  @Input()
  public viewModel: BannerViewModel | undefined;

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() { }

  ngOnInit(): void {
    interval(700)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.updateImage()
    })
    this.updateImage()
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  // action

  async updateImage() {
    if (!(this.viewModel instanceof BannerViewModel)) {
      return
    }

    let timepass = new Date().getTime() - this.viewModel.lastChangeTime.getTime();
    if (timepass <= this.viewModel.timeLength) {
      return;
    }
    this.viewModel.index += 1;

    const length = this.viewModel.list.length
    if (length === 0) {
      return;
    }

    this.viewModel.current = this.viewModel.list[this.viewModel.index % length];
    this.viewModel.lastChangeTime = new Date();
  }

  onImgError(event) {

    // 圖片錯誤
    // https://stackoverflow.com/questions/42135268/angular2-onerror-image-binding

    if (!(this.viewModel instanceof BannerViewModel)) {
      return
    }

    event.target.src = this.viewModel.default
  }
}
