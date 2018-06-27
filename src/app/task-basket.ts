import { Task } from './api/task';

export class TaskBasket {
  /** カテゴリ名 */
  label: string;
  container: Array<Task>;

  constructor() {
    this.container = new Array<Task>();
  }
}
