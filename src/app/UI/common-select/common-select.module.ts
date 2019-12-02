import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonSelectComponent } from './common-select.component';

@NgModule({
    declarations: [ CommonSelectComponent ],
    imports: [
        CommonModule,
        MatSelectModule,
        BrowserAnimationsModule
    ],
    exports: [ CommonSelectComponent ]
})
export class CommonSelectModule {
}
