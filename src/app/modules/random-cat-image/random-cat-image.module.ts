import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatApiModule } from '../../cat-api/cat-api.module';
import { RandomCatImageComponent } from './random-cat-image/random-cat-image.component';
import { BreedSelectionComponent } from './breed-selection/breed-selection.component';

@NgModule({
    declarations: [ RandomCatImageComponent, BreedSelectionComponent ],
    imports: [
        CommonModule,
        CatApiModule
    ],
    exports: [
        RandomCatImageComponent
    ]
})
export class RandomCatImageModule {
}
