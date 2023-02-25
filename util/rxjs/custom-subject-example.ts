
// https://github.com/ReactiveX/rxjs/blob/master/src/internal/BehaviorSubject.ts

import { Subject, Subscriber, Subscription } from "rxjs"

class MySubject<T> extends Subject<T> {

  constructor(private _value: T) {
    super()
  }

  get value(): T {
    return this.getValue()
  }

  public _subscribe(subscriber: Subscriber<T>): Subscription {
    const subscription = super._subscribe(subscriber)
    if (!subscription.closed) {
      subscriber.next(this._value) // 一訂閱就送一個
    }
    return subscription
  }

  getValue(): T {
    const { hasError, thrownError, _value } = this;
    if (hasError) {
      throw thrownError
    }
    // this._throwIfClosed()
    return _value;
  }

  next(value: T): void {
    super.next((this._value = value)) // 全部送一個
  }
}
