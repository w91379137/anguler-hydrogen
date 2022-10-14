import { Pipe, PipeTransform } from '@angular/core';

const DefaultBasePointDivisor = 10000
export let BasePointDivisor = DefaultBasePointDivisor

@Pipe({
  name: 'pointFmt'
})
export class PointFmtPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value !== 'number') {
      return ''
    }
    return (value / DefaultBasePointDivisor).toLocaleString();
  }

}
