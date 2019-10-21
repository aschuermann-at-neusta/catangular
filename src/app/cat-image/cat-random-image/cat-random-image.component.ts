import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatPublicImageService } from '../../cat-api/cat-public-image.service';
import { AutoRefreshService } from '../../interval/auto-refresh.service';
import { CatConfigInterface } from './cat-config-interface';

@Component({
    selector: 'app-cat-random-image',
    templateUrl: './cat-random-image.component.html',
    styleUrls: [ './cat-random-image.component.scss' ]
})
export class CatRandomImageComponent implements OnInit {

    randomCatImage$: Observable<string>;
    private config: BehaviorSubject<CatConfigInterface> = new BehaviorSubject({ autoRefreshActive: false });
    public config$: Observable<CatConfigInterface> = this.config.asObservable();
    public countdown$: Observable<number> = this.autoRefreshService.timeLeft$;

    constructor(private publicRandomImgService: CatPublicImageService,
                private autoRefreshService: AutoRefreshService) {
    }

    ngOnInit() {
        this.loadGetImage();
    }

    loadGetImage(): void {
        this.randomCatImage$ = this.publicRandomImgService.getOneRandomImage()
            .pipe(
                map(cat => cat.url));
    }

    setAutoRefreshActive(seconds: number) {
        this.autoRefreshService.setTime(seconds, () => {
            this.loadGetImage();
        });
        this.config.next({ autoRefreshActive: true });
    }

    setAutoRefreshInactive() {
        this.autoRefreshService.stopRefresh();
        this.config.next({ autoRefreshActive: false });
    }

    refresh() {
        this.autoRefreshService.reset();
    }
}
