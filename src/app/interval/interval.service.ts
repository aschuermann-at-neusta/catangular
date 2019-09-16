import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntervalService {

  constructor() { }

  private interval: Subject<boolean> = new Subject<boolean>();
  interval$: Observable<boolean> = this.interval.asObservable();
    private handler: NodeJS.Timer;


    setTime(seconds: number) {
      this.handler = setInterval(() => { this.interval.next(true); }, seconds * 1000);
    }

    stopInterval() {
        clearInterval(this.handler);
    }


}
