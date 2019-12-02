import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material';
import { CommonSelectComponent } from './common-select.component';

@NgModule({
    declarations: [ CommonSelectComponent ],
    imports: [
        CommonModule,
        MatSelectModule
    ],
    exports: [ CommonSelectComponent ]
})
export class CommonSelectModule {
}
