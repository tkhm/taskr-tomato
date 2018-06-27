import * as uuid from 'node-uuid';
import { Tomato } from './tomato';

export class Task {
  /** uuid形式のタスクID */
  id: string;
  category: string;
  title: string;
  description: string;
  isFinished: boolean;
  tomatoes: Array<Tomato>;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = uuid.v1();
    this.category = 'others';
    this.title = '';
    this.description = '';
    this.isFinished = false;
    this.tomatoes = new Array<Tomato>();
  }
}
