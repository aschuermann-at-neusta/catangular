import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CountdownService {
    private countdown: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public count$: Observable<number> = this.countdown.asObservable();
    public handler;

    constructor() {
    }

    setCount(seconds: number) {
        if (this.handler) {
            clearInterval(this.handler);
        }
        this.handler = this.startCountDown(seconds);
    }

    private startCountDown(seconds: number) {
        this.countdown.next(seconds);
        return setInterval(() => {
            this.calculateTimeLeft();
            this.stopIntervalIfZero();
        }, 1000);
    }

    private stopIntervalIfZero() {
        if (this.countdown.value === 0) {
            clearInterval(this.handler);
        }
    }

    private calculateTimeLeft() {
        if (this.countdown.value > 0) {
            this.countdown.next(this.countdown.value - 1);
        }
    }
}
