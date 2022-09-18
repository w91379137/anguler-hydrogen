import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, distinctUntilChanged, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // 1 專注在各種型別的提取建立
  // 2? 組合物件 / namespace /放入
  // 3 rx 通知

  private updateEventSource$ = new Subject<UpdateEvent>();
  updateEvent$ = this.updateEventSource$.asObservable();

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  batchRead(keys: string[]) {
    for (const key of keys) {
      this.getObject(key);
    }
  }

  private getObject(key: string): void {
    this.updateEventSource$.next({
      key,
      stringValue: localStorage.getItem(key)
    })
  }

  setObject(key: string, value: any): void {
    localStorage.setItem(key, value);
    this.getObject(key);
  }

  removeObject(key: string): void {
    localStorage.removeItem(key);
    this.getObject(key);
  }
}

// ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
interface UpdateEvent {
  key: string
  stringValue: string | null
}

// ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
// 需要(型別 T, 鑰匙 key, 預設值 defaultValue, 檢查式 validation)
// 型別 T 影響到 > 序列化 / 反序列 全部用 JSON

// 其他型別需要 實作 toJSON() 反序列化還是要寫
// https://yonatankra.com/custom-json-stringify-to-classes-with-the-tojson-method/

// 得到(set value / get value / value$)
export class StorageItem<T extends string | number | boolean> {

  private source$ = new BehaviorSubject<T>(this.defaultValue)

  // 轉換事件流 方便 KVO
  value$ = this.source$.asObservable()

  get value(): T {
    // 依照事件流 取值
    return this.source$.value
  }

  set value(value: T) {
    // 回到源頭去設定
    this.storage.setObject(this.key, JSON.stringify(value));
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  constructor(
    private storage: StorageService,
    readonly key: string,
    private defaultValue: T,
    readonly validation: ((str: string) => boolean) | undefined = undefined,
  ) {
    this.storage.updateEvent$
    .pipe(filter(event => event.key === key))
    .pipe(distinctUntilChanged((x, y) => x.stringValue === y.stringValue))
    .pipe(map(event => event.stringValue))
    .pipe(map(stringValue => {
      if (stringValue === null) {
        return defaultValue
      }
      if (validation && !validation(stringValue)) {
        return defaultValue
      }
      try {
        return JSON.parse(stringValue)
      } catch (error) {
        console.log(error)
      }
      return stringValue
    }))
    // debug 時打開
    // .pipe(tap(value => console.log(`${key}:${value}`)))
    .subscribe(this.source$);
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  remove() {
    this.storage.removeObject(this.key);
  }
}
