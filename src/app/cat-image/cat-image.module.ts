import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatCategorySelectModule } from '../cat-category-select/cat-category-select.module';
import { ShowCountdownModule } from '../interval/show-countdown/show-countdown.module';
import { CatRandomImageComponent } from './cat-random-image/cat-random-image.component';
import { CatRefreshButtonComponent } from './cat-refresh-button/cat-refresh-button.component';
import { RefreshTimerButtonComponent } from './refresh-timer-button/refresh-timer-button.component';

@NgModule({
    declarations: [
        CatRandomImageComponent,
        CatRefreshButtonComponent,
        RefreshTimerButtonComponent
    ],
    imports: [
        CommonModule,
        ShowCountdownModule,
        CatCategorySelectModule
    ],
    exports: [
        CatRandomImageComponent
    ]
})
export class CatImageModule {
}
