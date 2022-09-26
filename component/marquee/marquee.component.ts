import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { delay } from '../../service/const/tool';
import { MarqueeAnimationName, MarqueeViewModel } from './marquee.viewmodel';

@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.scss']
})
export class MarqueeComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject<void>();

  @Input()
  public viewModel: MarqueeViewModel;

  // 用 # 去設定而 name 是用來 debug 可以看到的
  @ViewChild('marqueeBox') marqueeBox: ElementRef;
  @ViewChild('marqueeContent') marqueeContent: ElementRef;

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    interval(1000)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(async () => {

      if (this.viewModel.animationName === MarqueeAnimationName.Slide) {
        // 如果運作中

        if (new Date().getTime() - this.viewModel.stopAnimationTime.getTime() > 0) {
          this.viewModel.animationName = MarqueeAnimationName.Hidden;
        }
      }
      // 如果用 else if 就會有間隔 1 秒
      if (this.viewModel.animationName === MarqueeAnimationName.Hidden) {
        // 如果非運作中
        this.viewModel.index += 1;

        const length = this.viewModel.list.length
        if (length === 0) {
          return;
        }

        this.viewModel.current = this.viewModel.list[this.viewModel.index % length];

        // 需要一段時間給 dom 改變寬度
        await delay(10);
        const totalLength = this.marqueeBox.nativeElement.offsetWidth + this.marqueeContent.nativeElement.offsetWidth;

        this.viewModel.timeLength = totalLength * 11;
        this.viewModel.startAnimationTime = new Date();
        this.viewModel.animationName = MarqueeAnimationName.Slide;
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
}
