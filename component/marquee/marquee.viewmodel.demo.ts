import { MarqueeViewModel } from "./marquee.viewmodel";

let demoString = '測試字𓇽𖤐✯☆☪_'

export function demoMarqueeViewModel(): MarqueeViewModel {

  const result = new MarqueeViewModel()

  result.list.push(`1_${demoString.repeat(2)}_1`)
  result.list.push(`2_${demoString.repeat(10)}_2`)
  result.list.push(`3_${demoString.repeat(16)}_3`)

  return result;
}
