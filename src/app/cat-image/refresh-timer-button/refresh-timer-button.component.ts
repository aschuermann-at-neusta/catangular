import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-refresh-timer-button',
    templateUrl: './refresh-timer-button.component.html',
    styleUrls: [ './refresh-timer-button.component.scss' ]
})
export class RefreshTimerButtonComponent implements OnInit {
    @Output() newInterval: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
    }

    public setInterval(number: number) {
        this.newInterval.emit(number);
    }
}
