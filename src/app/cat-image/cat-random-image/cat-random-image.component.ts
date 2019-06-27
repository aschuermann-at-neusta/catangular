import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatPublicImageService } from '../../cat-api/cat-public-image.service';

@Component({
    selector: 'app-cat-random-image',
    templateUrl: './cat-random-image.component.html',
    styleUrls: [ './cat-random-image.component.scss' ]
})
export class CatRandomImageComponent implements OnInit {

    randomCatImage$: Observable<string>;

    constructor(private publicRandomImgService: CatPublicImageService) {
    }

    ngOnInit() {
        this.loadGetImage();
    }

    loadGetImage(): void {
        this.randomCatImage$ = this.publicRandomImgService.getOneRandomImage().pipe(map(cat => cat.url));
    }
}
