import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonSelectModule } from '../UI/common-select/common-select.module';
import { CatBreedSelectComponent } from './cat-breed-select.component';

@NgModule({
    declarations: [ CatBreedSelectComponent ],
    imports: [
        CommonModule,
        CommonSelectModule
    ],
    exports: [CatBreedSelectComponent]
})
export class CatBreedSelectModule {
}
