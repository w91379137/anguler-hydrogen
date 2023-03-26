
import { noop, Observable } from "rxjs"
import { timeout } from "rxjs/operators"
import { delay } from "../../util/std-tool"

const BusyRecordDict = { }

export function IgnoreBeforeFinish(
  {
    uuid = `${Math.random()}`,
    timeoutms = 1000,
  }) {

  let result = function (
    target: Object,
    key: string | symbol, // 名稱
    descriptor: PropertyDescriptor
  ) {

    const childFunction = descriptor.value

    descriptor.value = (...args: any[]) => {
      if (BusyRecordDict[uuid]) {
        let name = ''
        if (typeof key === 'string') {
          name = key
        }
        if (typeof key === 'symbol') {
          name = Symbol.keyFor(key)
        }
        console.log(`Busy_Group.uuid:${uuid}_function:${name}`)
        return null
      }

      const enable = () => { BusyRecordDict[uuid] = false }

      let result = childFunction.apply(this, args)
      if (typeof result.subscribe === 'function') {
        BusyRecordDict[uuid] = true
        let _ = (<Observable<any>>result)
        .pipe(timeout(timeoutms))
        .subscribe({
          next: noop,
          complete: enable,
          error: enable
        })
      } else if (typeof result.then === 'function') {
        BusyRecordDict[uuid] = true
        Promise.race([
          <Promise<any>>result,
          delay(timeoutms),
        ])
        .then(enable).catch(enable)
      }
      return result
    }
    return descriptor
  }
  return result
}
