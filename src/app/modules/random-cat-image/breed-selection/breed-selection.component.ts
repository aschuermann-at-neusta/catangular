import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreedsService } from '../../../cat-api/breed/breeds.service';
import { CatBreed } from '../../../cat-api/breed/cat-breed';

@Component({
    selector: 'app-breed-selection',
    templateUrl: './breed-selection.component.html',
    styleUrls: [ './breed-selection.component.scss' ]
})
export class BreedSelectionComponent {
    @Input() breeds: CatBreed[];
    @Output() clickedBreed: EventEmitter<string> = new EventEmitter<string>();

    getBreeds(): CatBreed[] {
        return this.breeds;
    }

    click(breed: CatBreed): void {
        this.clickedBreed.emit(breed.id);
    }
}
