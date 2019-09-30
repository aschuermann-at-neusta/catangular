import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IntervalService } from './interval.service';

@Injectable({
  providedIn: 'root'
})
export class AutoRefreshService {
    private timeLeft: Subject<number> = new Subject<number>();
    public timeLeft$: Observable<number> = this.timeLeft.asObservable();
    public secondsLeft: number;
    public handler;

  constructor(private interval: IntervalService) { }

    setTime(seconds: number, callback: any) {
      this.secondsLeft = seconds;
      this.handler = this.startCountDown();
      this.interval.setTime(seconds);
      this.interval.interval$.subscribe(_ => {
          callback();
          clearInterval(this.handler);
          this.handler = this.startCountDown();
      });
    }
    private startCountDown() {
        return setInterval(() => {
            this.calculateTimeLeft();
        }, 1000);
    }

    private calculateTimeLeft() {
      this.secondsLeft--;
      this.timeLeft.next(this.secondsLeft);
      console.log('Calculate Time: ', this.secondsLeft);
    }
}
