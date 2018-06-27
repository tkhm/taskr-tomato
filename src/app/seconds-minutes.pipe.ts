import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsMinutes'
})
export class SecondsMinutesPipe implements PipeTransform {

  transform(value: number): string {
    // countdown用なのでfloor(25:00-1秒→24分として表示)
    const minutes = Math.floor(value / 60);
    const seconds = value % 60; // 00形式に要変更
    return minutes + ':' + seconds;
  }

}
