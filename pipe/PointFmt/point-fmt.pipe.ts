import { Pipe, PipeTransform } from '@angular/core';

const DefaultBasePointDivisor = 10000
export let BasePointDivisor = DefaultBasePointDivisor

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
// https://segmentfault.com/a/1190000043627884

const formatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
} as any )
@Pipe({
  name: 'pointFmt'
})
export class PointFmtPipe implements PipeTransform {

  transform(value: number, isCompact: number = 0, ...args: unknown[]): unknown {
    if (typeof value !== 'number') {
      return ''
    }

    if (isCompact) {
      return formatter.format(value / BasePointDivisor)
    }
    return (value / DefaultBasePointDivisor).toLocaleString();
  }

}
