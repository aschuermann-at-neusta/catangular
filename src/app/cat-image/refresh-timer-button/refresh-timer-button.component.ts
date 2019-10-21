import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-refresh-timer-button',
    templateUrl: './refresh-timer-button.component.html',
    styleUrls: [ './refresh-timer-button.component.scss' ]
})
export class RefreshTimerButtonComponent {
    @Output() newInterval: EventEmitter<number> = new EventEmitter<number>();
    @Output() stopClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

    public setInterval(number: number) {
        this.newInterval.emit(number);
    }

    stopInterval() {
        this.stopClicked.emit(true);
    }
}
