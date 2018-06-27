import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';

import { StockedTomatoService } from '../stocked-tomato.service';
import { Task } from '../api/task';
import { Tomato } from '../api/tomato';

@Component({
  selector: 'app-tomato',
  templateUrl: './tomato.component.html',
  styleUrls: ['./tomato.component.css']
})
export class TomatoComponent implements OnInit, OnDestroy {
  /** 登録用Task */
  task: Task;
  /** 登録用Tomato */
  tomato: Tomato;
  /** ポモドーロ用のカウントダウン */
  timerSeconds: number;

  categoryList = Array<string>();
  taskList =  Array<Task>();

  /** コンポーネント上のi18nSelectで使う表示分け用のMap */
  isFinishedMessages = {
    true : 'レ',
    false : '...'
  };

  private defaultTimerSeconds: number;
  // async pipeを使うのも手だがstopTimerなどで明示的に止めたいケースなども考慮してSubscriptionにする
  private timerSubscription: Subscription;

  constructor(private stockedTomatoService: StockedTomatoService) { }

  ngOnInit() {
    const pomodoroMinutes = 25;
    this.defaultTimerSeconds = pomodoroMinutes * 60;
    this.timerSeconds = this.defaultTimerSeconds;

    this.tomato = new Tomato();
    this.task = new Task();

    this.categoryList = this.stockedTomatoService.categoryList;

    this.stockedTomatoService.getTaskList().subscribe(
      data => {
        this.taskList = data;
      }
    );
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

  startTimer() {
    // 開始から0.3秒待って1秒ごとに加算
    const timer = TimerObservable.create(300, 1000);
    let lastTime = 0;
    this.timerSubscription = timer.subscribe(t => {
      // tはどんどん加算されるので前回値からの加算の値の分を引く
      this.timerSeconds += (lastTime - t);
      lastTime = t;

      this.finishCheck();
    });
  }

  /** タイマーを一時停止する */
  stopTimer() {
    this.timerSubscription.unsubscribe();
  }

  /** タイマーを一時停止した上で元の状態にリセットする */
  resetTimer() {
    this.stopTimer();
    this.timerSeconds = this.defaultTimerSeconds;
    this.tomato = new Tomato();
  }

  /** タイマーを止めた上でtaskIdが合致するタスクオブジェクトにtomatoを追加してからリセットする */
  doneTimer() {
    // resetで止められるが直ちに止めて0未満になってしまうことを防ぎたい
    this.stopTimer();
    alert('done');
    const targetTaskList = this.taskList.filter(task => task.id === this.tomato.taskId);
    if (targetTaskList.length === 1) {
      targetTaskList[0].tomatoes.push(this.tomato);
    }
    this.stockedTomatoService.saveTomato(this.tomato).subscribe(
      data => {}
    );
    this.resetTimer();
  }

  /** subscribe内で呼ばれることを前提, subscribeの外に出ないと表示上の値に反映されないため0未満になったことを検知してから止める */
  finishCheck() {
    if (this.timerSeconds < 0) {
      this.doneTimer();
    }
  }

  /** 定義済みのタスクをリストにPushし次のタスクを生成可能な状態にする */
  createTask() {
    this.taskList.push(this.task);
    this.stockedTomatoService.saveTask(this.task).subscribe(
      data => {
        this.task = new Task();
      }
    );
  }
}
