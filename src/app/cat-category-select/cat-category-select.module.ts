import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatCategorySelectComponent } from './cat-category-select.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ CatCategorySelectComponent ],
    exports: [ CatCategorySelectComponent ]
})
export class CatCategorySelectModule {
}
