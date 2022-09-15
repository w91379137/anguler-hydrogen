import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { UpdateEvent } from './storage.schema';

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

  constructor() { }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  batchRead(keys: string[]) {
    for (const key of keys) {
      this.getObject(key);
    }
  }

  private getObject(key: string): void {
    this.updateEventSource$.next({
      key,
      value: localStorage.getItem(key)
    })
  }

  setObject(key: string, value: any): void {
    localStorage.setItem(key, value);
    this.getObject(key);
  }

  removeObject(key: string): void {
    localStorage.removeItem(key)
    this.getObject(key);
  }
}

// ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
// 需要(型別 T, 鑰匙 key, 預設值 defaultValue, 轉換式 converter, 檢查式 validation)
// 型別 T 影響到 > 序列化 / 反序列

// 得到(set value, get value, value$)
export class StorageItem<T> {

  private source$ = new BehaviorSubject<T>(this.defaultValue)

  value$ = this.source$.asObservable()

  get value(): T {
    return this.source$.value
  }

  set value(value: T) {
    this.storage.setObject(this.key, value);
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  constructor(
    private storage: StorageService,
    readonly key: string,
    private defaultValue: T,
    readonly converter: (str: string) => T | undefined = undefined,
    readonly validation: (str: string) => boolean = () => true,
  ) {
    this.storage.updateEvent$
    .pipe(filter(event => event.key === key))
    .pipe(map(event => {
      if (event.value === null) {
        return defaultValue
      }
      if (!validation(event.value)) {
        return defaultValue
      }
      if (converter) {
        return converter(event.value)
      }
      return event.value
    }))
    .pipe(tap(value => console.log(`${key}:${value}`)))
    .subscribe(this.source$);
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  remove() {
    this.storage.removeObject(this.key);
  }
}
