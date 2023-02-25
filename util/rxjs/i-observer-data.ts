import { BehaviorSubject, Observable, PartialObserver } from "rxjs"
import { takeUntil } from "rxjs/operators"

/**
 * 可以知道後面有幾個人訂閱 進而可以決定是否定期取得資料
 * T 是輸出的型別
 */
export class IObserverData<OutputType = any, InfoType = Partial<ClassInfo>> {

  /**
   * 訂閱管理
   * 可以參照有幾個人監聽中 >> 可以決定是否定時呼叫
   */
  traceDict$ = new BehaviorSubject<IDDict<InfoType>>(new IDDict<InfoType>())

  constructor(
    /**
     * 輸出資料 請用 manage 來訂閱
     */
    public output$ = new BehaviorSubject<OutputType>(undefined)
  ) { }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  /**
   * 加入管理
   * @param until 直到有訊號則中斷 自動中斷
   * @param info 追蹤的id
   * @returns
   */
  manage(
    until: Observable<any>,
    info: InfoType = undefined
  ): Observable<OutputType> {

    let result = this.output$
    .pipe(takeUntil(until))
    .pipe(subscriptionManager<OutputType>(this.traceDict$, info))

    return result
  }
}

type ClassInfo = {
  className: string
  data: any
}

class IDDict<InfoType = Partial<ClassInfo>> {

  indexKey = 0
  dict: { [index: string]: InfoType } = {}

  add(info: InfoType): number {
    let result = this.indexKey
    this.dict[result] = info
    this.indexKey += 1
    return result
  }
  remove(indexKey: number) {
    delete this.dict[indexKey]
  }

  get size(): number {
    return Object.keys(this.dict).length
  }
}

function subscriptionManager<OutType = any, InfoType = Partial<ClassInfo>>(
  trace: BehaviorSubject<IDDict<InfoType>>,
  info: InfoType
): (source: Observable<OutType>) => Observable<OutType> {

  let result = (source: Observable<OutType>): Observable<OutType> => {

    let result = new Observable((observer: PartialObserver<OutType>): (() => void) => {

      const innerSubscription = source.subscribe(observer)
      let indexKey = trace.value.add(info)
      trace.next(trace.value)

      let result = (): void => {
        // 結束會被叫
        innerSubscription.unsubscribe()
        trace.value.remove(indexKey)
        trace.next(trace.value)
      }

      return result
    })

    return result
  }

  return result
}
