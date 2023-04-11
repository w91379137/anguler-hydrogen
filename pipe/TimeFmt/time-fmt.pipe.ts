import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFmt'
})
export class TimeFmtPipe implements PipeTransform {

  transform(value: Date | string, ...args: unknown[]): unknown {

    let target = value;
    let result = '';
    if (typeof target === 'string') {
      target = new Date(target);
    }

    if (target instanceof Date) {
      const year = `${target.getFullYear()}`.padStart(4, '0');
      const month = `${target.getMonth() + 1}`.padStart(2, '0');
      const day = `${target.getDate()}`.padStart(2, '0');

      const hours = `${target.getHours()}`.padStart(2, '0');
      const minutes = `${target.getMinutes()}`.padStart(2, '0');
      const seconds = `${target.getSeconds()}`.padStart(2, '0');

      if (args[1] === 1) {
        result = `${month}-${day} ${hours}:${minutes}`;

      }
      else if (args[1] === 2) {
        result = `${year}-${month}-${day} ${hours}:${minutes}`;
      }
      else {
        result = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
    }

    if (args[0] === 1) {
      result = result.replace(' ', '\n');
    }
    return result;
  }

}
