import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonSelectModule } from '../UI/common-select/common-select.module';
import { CatCategorySelectComponent } from './cat-category-select.component';

@NgModule({
    imports: [ CommonModule, CommonSelectModule ],
    declarations: [ CatCategorySelectComponent ],
    exports: [ CatCategorySelectComponent ]
})
export class CatCategorySelectModule {
}
