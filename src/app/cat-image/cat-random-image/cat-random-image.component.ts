import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatPublicImageService } from '../../cat-api/cat-public-image.service';
import { IntervalService } from '../../interval/interval.service';
import { CatConfigInterface } from './cat-config-interface';

@Component({
    selector: 'app-cat-random-image',
    templateUrl: './cat-random-image.component.html',
    styleUrls: [ './cat-random-image.component.scss' ]
})
export class CatRandomImageComponent implements OnInit {

    randomCatImage$: Observable<string>;
    config: BehaviorSubject<CatConfigInterface> = new BehaviorSubject({ autoRefreshActive: false });
    config$: Observable<CatConfigInterface> = this.config.asObservable();

    constructor(private publicRandomImgService: CatPublicImageService, private intervalService: IntervalService) {
    }

    ngOnInit() {
        this.intervalService.interval$.subscribe((_) => {
            this.loadGetImage();
        });
        this.loadGetImage();
    }

    loadGetImage(): void {
        this.randomCatImage$ = this.publicRandomImgService.getOneRandomImage()
            .pipe(
                map(cat => cat.url));
    }

    setAutoRefreshActive(seconds: number) {
        this.intervalService.setTime(seconds);
        this.config.next({ autoRefreshActive: true });
    }
}
