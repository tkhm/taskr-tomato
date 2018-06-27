import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './api/task';

/**
 * pipe pure: falseは同期的な更新のためには必須
 * angular - NgFor doesn't update data with Pipe in Angular2 - Stack Overflow
 * https://stackoverflow.com/questions/34456430/ngfor-doesnt-update-data-with-pipe-in-angular2#34497504
 */
@Pipe({
  name: 'taskCategory',
  pure: false
})
export class TaskCategoryPipe implements PipeTransform {

  transform(value: Task[], category: string): Task[] {
    // pure pipeではない場合 再評価のタイミングでnullになってしまうこともあるため分岐で対応する
    if (value) {
      return value.filter(task => task.category === category);
    } else {
      return null;
    }
  }

}
