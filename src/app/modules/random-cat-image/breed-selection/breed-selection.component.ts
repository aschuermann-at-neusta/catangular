import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-breed-selection',
  templateUrl: './breed-selection.component.html',
  styleUrls: ['./breed-selection.component.scss']
})
export class BreedSelectionComponent{
    @Input() breeds: string[];
    @Output() clickedBreed: EventEmitter<string> = new EventEmitter<string>();

    getBreeds(): string[]{
        return this.breeds;
    }

    click(breed: string): void {
        this.clickedBreed.emit(breed);
    }
}
