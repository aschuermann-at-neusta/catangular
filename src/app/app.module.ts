import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatApiModule } from './cat-api/cat-api.module';
import { BreedSelectionComponent } from './modules/random-cat-image/breed-selection/breed-selection.component';
import { RandomCatImageModule } from './modules/random-cat-image/random-cat-image.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CatApiModule,
        RandomCatImageModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
