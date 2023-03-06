
import { Observable, Subject, combineLatest, of, timer, BehaviorSubject } from 'rxjs';
import { publishBehavior, refCount, switchMap, tap, map, publish, share, multicast, take, shareReplay } from 'rxjs/operators';


/**
 * rxjs 範例都是一次一整個寫完
 * 但是斷開重連等 組合情況就要自己去想
 *
 * 用 pipe 把組合情況接好並不會馬上動作
 *
 * 初始值
 * 快取值
 * 有監聽才動作
 * 歸零 ？
 * 定時拿取
 * 掛上去之後 幾分鐘之內不重拿？
 */

// https://trilon.io/blog/dealing-with-late-subscribers-in-rxjs

export enum GetDataMode {
  OnlyOnce, // 只拿一次
  EverytimeUsed, // 每次用到
  Period, // 週期性檢查
}

// constructor 參數 dict 輸入
export interface IConnectDataConfig {
  periodMS: number
}

export class IConnectData<InputType = any, OutputType = any> {

  public outputSource$: Observable<OutputType>
  private cacheValue: OutputType

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    protected inputSource$: Observable<InputType>,
    protected initValue: OutputType,
    public mode: GetDataMode,
    private getData: (parameter: InputType) => Promise<OutputType>,
    private config: Partial<IConnectDataConfig> = {},
  ) {

    if (this.mode === GetDataMode.OnlyOnce) {
      this.outputSource$ = inputSource$.pipe(
          tap(input => console.log(`input: ${input}`)),
          switchMap(input => this.getData(input)),
          tap(output => console.log(`output: ${output}`)),
          shareReplay(1)
        )
      return
    }

    let source$: Observable<InputType>

    if (this.mode === GetDataMode.EverytimeUsed) {
      source$ = combineLatest([inputSource$, of(0)]).pipe(map(ele => ele[0]))
    }
    else if (this.mode === GetDataMode.Period) {
      let periodMS = this.config.periodMS ?? 1000
      source$ = combineLatest([inputSource$, timer(0, periodMS)]).pipe(map(ele => ele[0]))
    }
    if (source$) {
      this.outputSource$ = source$.pipe(
        tap(input => console.log(`input: ${input}`)),
        switchMap(input => this.getData(input)),
        tap(output => {
          console.log(`output: ${output}`)
          this.cacheValue = output
        }),
        // share(),
        // publishBehavior(this.initValue), // 怪怪的
        multicast(() => new BehaviorSubject<OutputType>(this.cacheValue ?? this.initValue)),
        refCount(),
      )
    }
  }
}
