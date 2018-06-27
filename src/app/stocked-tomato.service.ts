import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Subject } from 'rxjs/Subject';
import { Tomato } from './api/tomato';
import { Task } from './api/task';

@Injectable()
export class StockedTomatoService {
  private sharedTomato = new Subject<Tomato>();
  sharedTomato$ = this.sharedTomato.asObservable();

  // tomato-basketの変数名と連動させる
  categoryList = ['edge', 'advanced', 'basic', 'fundamental', 'others'];

  constructor(private http: Http) { }

  onNotifySharedTomatoHarvested(harvested: Tomato) {
    console.log('new Tomato is coming!');
    this.sharedTomato.next(harvested);
  }

  getTaskList(): Observable<Task[]> {
    return this.http.get('/taskr-tomato-api/v1/tasks', {
      params: {}
  }).map( response => {
      return response.json() as Task[];
    });
  }

  saveTask(task: Task): Observable<void> {
    if (!task) {
      alert('no!');
      return;
    }
    return this.http.post('/taskr-tomato-api/v1/tasks', task, {
      params: {}
    }).map( response => {
      alert('Saved.');
    });
  }

  saveTomato(tomato: Tomato): Observable<void> {
    if (!tomato) {
      alert('no!');
      return;
    }
    return this.http.post('/taskr-tomato-api/v1/tomatoes', tomato, {
      params: {}
    }).map( response => {
      alert('Saved.');
    });
  }
}
