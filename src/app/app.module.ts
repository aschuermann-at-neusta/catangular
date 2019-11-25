import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatCategorySelectModule } from './cat-category-select/cat-category-select.module';
import { CatImageModule } from './cat-image/cat-image.module';
import { ShowCountdownComponent } from './interval/show-countdown/show-countdown.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        CatImageModule,
        CatCategorySelectModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
