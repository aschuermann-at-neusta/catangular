import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCountdownComponent } from './show-countdown.component';

@NgModule({
  declarations: [ShowCountdownComponent],
  imports: [
    CommonModule
  ],
    exports: [ShowCountdownComponent]
})
export class ShowCountdownModule { }
