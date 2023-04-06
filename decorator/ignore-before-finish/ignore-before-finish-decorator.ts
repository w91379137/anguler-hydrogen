
import { noop, Observable } from "rxjs"
import { timeout } from "rxjs/operators"
import { delay, randomInt } from "../../util/std-tool"

const BusyRecordDict = { }

export function IgnoreBeforeFinish(
  {
    uuid = `${randomInt(9999)}`,
    timeoutms = 1000,
  }) {

  let result = function (
    target: Object, // 目標物件(不要用這個 anguler 還會繼續 di 還有其他 Decorator)
    key: string | symbol, // 函數名稱
    descriptor: PropertyDescriptor
  ) {

    const oldFunction: Function = descriptor.value
    // 這邊禁止使用箭頭函數 因為會把目前的 this 綁定到這邊
    const newFunction: Function = function(...args: any[]) {

      let name = 'no name'
      if (typeof key === 'string') {
        name = key
      }
      if (typeof key === 'symbol') {
        name = Symbol.keyFor(key)
      }

      if (BusyRecordDict[uuid]) {
        console.log(`Busy_Group.uuid:${uuid}_function:${name}`)
        return null
      }

      // 開始執行
      const disable = () => {
        BusyRecordDict[uuid] = true
        // console.log(`disable.uuid:${uuid}_function:${name}`)
      }

      const enable = (error: any = undefined) => {
        BusyRecordDict[uuid] = false
        // console.log(`enable.uuid:${uuid}_function:${name}`)
        if (error) {
          console.warn(error)
        }
      }

      // console.log('操作物件 target:', this.constructor.name)
      let result = oldFunction.apply(this, args)

      if (typeof result.subscribe === 'function') {
        disable()
        let _ = (<Observable<any>>result)
        .pipe(timeout(timeoutms))
        .subscribe({
          next: noop,
          complete: () => { enable() },
          error: (error) => { enable(error) }
        })
      } else if (typeof result.then === 'function') {
        disable()
        Promise.race([
          <Promise<any>>result,
          delay(timeoutms),
        ])
        .then(() => { enable() })
        .catch((error) => { enable(error)})
      }
      else {
        console.log('IgnoreBeforeFinish: 未知的回傳型態', result)
      }
      return result
    }
    descriptor.value = newFunction
    return descriptor
  }
  return result
}
