import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CatBreedInterface } from '../cat-api/cat-breed.interface';
import { CommonSelectOptionInterface } from '../UI/common-select/common-select-option.interface';

@Component({
    selector: 'app-cat-breed-select',
    templateUrl: './cat-breed-select.component.html',
    styleUrls: [ './cat-breed-select.component.scss' ]
})
export class CatBreedSelectComponent implements OnInit {
    @Output() selectedBreed: EventEmitter<CatBreedInterface>
        = new EventEmitter<CatBreedInterface>();
    @Input() breeds: CatBreedInterface[];

    constructor() {
    }

    ngOnInit() {
    }

    selectionChanged(commonSelectOption: CommonSelectOptionInterface) {
        this.selectedBreed.emit(commonSelectOption);
    }
}
