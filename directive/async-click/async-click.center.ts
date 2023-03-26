import { Subject } from 'rxjs';

class AsyncClickManager {

  private _pendingDict: { [id: string]: boolean; } = { }
  pendingKey$ = new Subject<string>()

  changePending(key: string, value: boolean) {
    this._pendingDict[key] = value
    this.pendingKey$.next(key)
    // console.log(`changePending ${key}`)
  }

  isPending(key: string) {
    return this._pendingDict[key]
  }
}

export const AsyncClickCenter = new AsyncClickManager()
