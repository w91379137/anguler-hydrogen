import { combineLatest, from, of } from 'rxjs';
import { delay } from '../../std-tool';
import { GetDataMode, IConnectData } from './i-connect-data';


// 測試 a 前後2次拿到一樣 各1次
// 測試 b 前後2次拿到不一樣 各1次
// 測試 c 前後2次拿到不一樣 各2次

export async function testIConnectData() {

  console.log("Start : " + new Date().toISOString())

  let getData = async (name) => {
    delay(333)
    let result = `${name} : ${new Date().toISOString()}`
    return result
  }
  let a = new IConnectData<string, string>(
    of('A'),
    undefined,
    GetDataMode.OnlyOnce,
    getData,
  )
  let b = new IConnectData<string, string>(
    of('B'),
    'B : Default',
    GetDataMode.EverytimeUsed,
    getData,
  )

  let c = new IConnectData<string, string>(
    of('C'),
    undefined,
    GetDataMode.Period,
    getData,
  )

  {
    // let d = combineLatest([a.outputSource$])
    // let d = combineLatest([b.outputSource$])
    let d = combineLatest([c.outputSource$])
    // let d = combineLatest([a.outputSource$, b.outputSource$])
    let ds
    await delay(0)
    ds = d.subscribe((d) =>
      console.log("D1 : " + new Date().toISOString() + "\n" + d.join(", "))
    )
    await delay(2100)
    ds.unsubscribe()
    await delay(2000)
    ds = d.subscribe((d) =>
      console.log("D2 : " + new Date().toISOString() + "\n" + d.join(", "))
    )
    await delay(2100)
    ds.unsubscribe()
  }
  // {
  //   let e = combineLatest([c.outputSource$, b.outputSource$]);
  //   let es
  //   setTimeout(() => {
  //     es = e.subscribe((e) =>
  //       console.log("E : " + new Date().toISOString() + "\n" + e.join(", "))
  //     )
  //   }, 4000)

  //   setTimeout(() => {
  //     es.unsubscribe()
  //   }, 6000)
  // }
}
