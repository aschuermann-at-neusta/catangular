import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CatCategoryInterface } from '../cat-api/cat-category.interface';
import { CommonSelectOptionInterface } from '../UI/common-select/common-select-option.interface';

@Component({
    selector: 'app-cat-category-select',
    templateUrl: './cat-category-select.component.html',
    styleUrls: [ './cat-category-select.component.scss' ]
})
export class CatCategorySelectComponent {
    @Input() catCategories: CatCategoryInterface[];
    @Output() selectedCategory: EventEmitter<CatCategoryInterface> = new EventEmitter<CatCategoryInterface>();

    selectionChanged(commonSelectOption: CommonSelectOptionInterface) {
        this.selectedCategory.emit(commonSelectOption);
    }
}

