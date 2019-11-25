import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CatCategoryInterface } from '../cat-api/cat-category.interface';

@Component({
    selector: 'app-cat-category-select',
    templateUrl: './cat-category-select.component.html',
    styleUrls: [ './cat-category-select.component.scss' ]
})
export class CatCategorySelectComponent {
    @Input() catCategories: CatCategoryInterface[];
    @Output() selected: EventEmitter<CatCategoryInterface> = new EventEmitter<CatCategoryInterface>();

    select(category: CatCategoryInterface) {
        this.selected.emit(category);
    }
}

