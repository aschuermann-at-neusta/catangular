import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatConfigService } from './cat-config.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        CatConfigService
    ]
})
export class CatConfigModule {
}
