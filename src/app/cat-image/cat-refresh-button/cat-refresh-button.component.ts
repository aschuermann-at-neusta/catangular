import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cat-refresh-button',
  templateUrl: './cat-refresh-button.component.html'
})
export class CatRefreshButtonComponent {
    @Output() refreshClicked: EventEmitter<boolean> = new EventEmitter<boolean>();


    refresh(): void {
        this.refreshClicked.emit(true);
    }
}
