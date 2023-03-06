
import { interval, merge, BehaviorSubject, Subject } from 'rxjs';
import {
  fromEvent,
  of,
  from,
  combineLatest,
  timer,
} from "rxjs";
import { delay, publishReplay, share, shareReplay, switchMap, takeUntil, tap, refCount, startWith, publishBehavior } from 'rxjs/operators';

export async function exampleIConnectData() {
  console.log("Start at: " + new Date().toISOString());

  let getData = (name) =>
    of(name + ":" + new Date().toISOString()).pipe(delay(333));

  let a = of([0]).pipe(
    // tap(r => console.log(r)),
    switchMap((r) => getData("a")),
    share(),
  )

  // let b_init = new BehaviorSubject<string>()
  let b = timer(0, 1000).pipe(
    tap(r => console.log(r)),
    switchMap((r) => getData("b")),
    // startWith("Default"),
    tap((r) => console.log("B: " + new Date().toISOString() + ", " + r)),
    // share(),
    // shareReplay(1), 不行 會一直跑
    // startWith("B: default"),
    // publishReplay(1),
    publishBehavior("B: default"),
    refCount(),
  );

  // let b = merge(b_init, b_normal).pipe(
    // publishReplay(1),
    // refCount(),
  // )
  let c = getData("c");

  {
    let d = combineLatest([a, b]);
    let ds
    setTimeout(() => {
      ds = d.subscribe((d) =>
        console.log("D: " + new Date().toISOString() + ", " + d.join(", "))
      );
    }, 1000)

    setTimeout(() => {
      ds.unsubscribe();
    }, 3000)
  }
  {
    let e = combineLatest([c, b]);
    let es
    setTimeout(() => {
      es = e.subscribe((e) =>
        console.log("E: " + new Date().toISOString() + ", " + e.join(", "))
      );
    }, 4000)

    setTimeout(() => {
      es.unsubscribe();
    }, 6000);

    setTimeout(() => {
      es = e.subscribe((e) =>
        console.log("E: " + new Date().toISOString() + ", " + e.join(", "))
      );
    }, 8000)

    setTimeout(() => {
      es.unsubscribe();
    }, 10000);
  }



}
