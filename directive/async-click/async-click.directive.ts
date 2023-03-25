import { Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { Subscription, Observable, noop } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { AsyncClickCenter } from './async-click.center';
import { changeDisabled } from './async-click.html';

// https://stackoverflow.com/questions/61221668/holding-a-button-state-until-a-promise-is-resolved-in-angular-9

// https://stackblitz.com/edit/angular-async-await-click?file=app%2Fasync_click.directive.ts

@Directive({
  selector: '[h2-asyncClick]'
})
export class AsyncClickDirective implements OnChanges, OnDestroy {

  private _pending = false
  private isSlave = false

  private set pending(value: boolean) {
    this._pending = value

    if (!this.isSlave && this.changeKey) {
      AsyncClickCenter.changePending(this.changeKey, value)
    }

    try {
      this.changeFunc(this._renderer, this._elementRef, value)
    } catch (error) {
      console.log(error)
    }
  }
  private get pending(): boolean {
    return this._pending
  }

  private clickSubscription: Subscription | undefined = undefined
  private centerSubscription: Subscription | undefined = undefined

  @Input('h2-asyncClick')
  clickFunc: () => Promise<any> = () => Promise.resolve()

  @Input('h2-asyncClickChange')
  changeFunc: (Renderer2, ElementRef, boolean) => void = (...args) => changeDisabled(...args)

  @Input('h2-asyncClickKey')
  changeKey = ''

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef
  ) {
    // console.log(this._elementRef)
    this.hookAsyncClickCenterPendingKey()
  }

  ngOnChanges(changes: SimpleChanges) {
    // 如果中途替換 clickFunc
    if (this.pending) {
      this.pending = false
    }
    if (this.clickSubscription) {
      this.clickSubscription.unsubscribe()
    }
  }

  ngOnDestroy() {
    if (this.clickSubscription) {
      this.clickSubscription.unsubscribe()
    }
    if (this.centerSubscription) {
      this.centerSubscription.unsubscribe()
    }
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  hookAsyncClickCenterPendingKey() {
    this.centerSubscription = AsyncClickCenter.pendingKey$
    .pipe(filter(key => key === this.changeKey))
    .pipe(filter(key => AsyncClickCenter.isPending(key) !== this.pending))
    .subscribe(key => {
      let remotePending = AsyncClickCenter.isPending(key)
      if (remotePending) {
        this.isSlave = true
        this.pending = remotePending
      }
      else {
        this.pending = remotePending
        this.isSlave = false
      }
      // console.log(`相異,${key},${remotePending},${this.pending}`)
    })
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  @HostListener('click')
  onClick() {
    // console.log('click')
    if (this.pending) {
      console.warn(`click: pending`)
      return
    }
    if (typeof this.clickFunc !== 'function') {
      console.warn(`click: no function`)
      return
    }
    this.handle(this.clickFunc())
  }

  async handle(result) {
    const enable = () => { this.pending = false } // bind this

    if (typeof result.subscribe === 'function') {
      this.pending = true
      this.clickSubscription = (<Observable<any>>result).subscribe({
        next: noop,
        complete: enable,
        error: enable
      })

    } else if (typeof result.then === 'function') {
      this.pending = true
      let _ = (<Promise<any>>result).then(enable).catch(enable)
      this.clickSubscription = undefined
    }
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

}
