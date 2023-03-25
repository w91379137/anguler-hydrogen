import { Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { Subscription, Observable, noop } from 'rxjs';

// https://stackoverflow.com/questions/61221668/holding-a-button-state-until-a-promise-is-resolved-in-angular-9

// https://stackblitz.com/edit/angular-async-await-click?file=app%2Fasync_click.directive.ts

@Directive({
  selector: '[h2-asyncClick]'
})
export class AsyncClickDirective implements OnChanges, OnDestroy {

  private pending = true
  private subscription: Subscription | undefined = undefined

  @Input('h2-asyncClick')
  clickFunc: () => Promise<any> = () => Promise.resolve()

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef
  ) {
    // console.log(this._elementRef)
  }

  ngOnChanges(changes: SimpleChanges) {
    // 如果中途替換 clickFunc
    if (this.pending) {
      this.enable()
    }
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  enable() {
    this.pending = true
    this._renderer.removeAttribute(
      this._elementRef.nativeElement,
      'disabled'
    );
  }

  disable() {
    this.pending = false
    this._renderer.setAttribute(
      this._elementRef.nativeElement,
      'disabled',
      'true'
    );
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  @HostListener('click')
  onClick() {
    // console.log('click')
    if (typeof this.clickFunc === 'function') {
      this.subscribe(this.clickFunc())
    }
  }

  subscribe(r) {
    this.disable()
    const enable = () => this.enable()
    if (typeof r.subscribe === 'function') {
      this.subscription = (<Observable<any>>r).subscribe({
        next: noop,
        complete: enable,
        error: enable
      })
    } else if (typeof r.then === 'function') {
      (<Promise<any>>r).then(enable).catch(enable)
      this.subscription = undefined
    }
    else {
      enable()
    }
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

}
