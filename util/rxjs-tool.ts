import { Subject } from 'rxjs';

// 輸出 輸入的規格 跟 rxjs 有關的

export function retryTask<T>(
  task: () => Promise<T>,
  maxTimes = 3,
  intervalMS = 1000,
) {

  // 有鑒於 不理解 retry retryWhen 用法
  // 儘量不要在 pipe 中回傳 observer

  let result$ = new Subject<T>()
  let trigger$ = new Subject<number>()

  trigger$
  .subscribe(async (times) => {
    try {
      let result = await task()
      result$.next(result)
      result$.complete()
      trigger$.complete()
    } catch (error) {
      if (times > 0) {
        setTimeout(() => {
          trigger$.next(times - 1)
        }, intervalMS)
      }
      else {
        result$.next(undefined)
        result$.complete()
        trigger$.complete()
      }
    }
  })
  trigger$.next(maxTimes)

  return result$
}

