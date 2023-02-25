
// 所以不是把原始源頭 改造 而是透過 pipe 在中間去監聽

import { BehaviorSubject, Observable, PartialObserver } from "rxjs"

// ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
// https://github.com/LayZeeDK/rxjs-subscription-count

// function notifyObserver<T>(message: T, observer: PartialObserver<T>): void {
//   if (!observer
//     || observer.closed === true
//     || observer.next === undefined
//   ) {
//     return
//   }
//   observer.next(message)
// }

// 這邊是透過 pipe 把數量丟給 counterObserver
function subscriptionCount<T>(
  counter: BehaviorSubject<number>,
): (source: Observable<T>) => Observable<T> {

  let result = (source: Observable<T>): Observable<T> => {

    let result = new Observable((observer: PartialObserver<T>): (() => void) => {

      const innerSubscription = source.subscribe(observer)
      counter.next(counter.value + 1)

      let result = (): void => {
        // 結束會被叫
        innerSubscription.unsubscribe()
        counter.next(counter.value - 1)
      }

      return result
    })

    return result
  }

  return result
}

// 客製化 operators
// https://netbasal.com/creating-custom-operators-in-rxjs-32f052d69457
