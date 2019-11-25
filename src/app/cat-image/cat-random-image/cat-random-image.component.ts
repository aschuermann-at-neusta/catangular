import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatCategoryInterface } from '../../cat-api/cat-category.interface';
import { CatCategoryService } from '../../cat-api/cat-category.service';
import { CatPublicImageService } from '../../cat-api/cat-public-image.service';
import { CatConfigService } from '../../cat-config/cat-config.service';
import { AutoRefreshService } from '../../interval/auto-refresh.service';
import { CatConfigInterface } from './cat-config-interface';

@Component({
    selector: 'app-cat-random-image',
    templateUrl: './cat-random-image.component.html',
    styleUrls: [ './cat-random-image.component.scss' ]
})
export class CatRandomImageComponent implements OnInit {

    randomCatImage$: Observable<string>;
    private config: BehaviorSubject<CatConfigInterface> =
        new BehaviorSubject<CatConfigInterface>({
            autoRefreshActive: false,
            catCategories: []
        });
    catCategories$: Observable<CatCategoryInterface[]>;

    constructor(private publicRandomImgService: CatPublicImageService,
                private autoRefreshService: AutoRefreshService,
                private catCategoryService: CatCategoryService,
                private catConfigService: CatConfigService) {
    }

    ngOnInit() {
        this.loadGetImage();
        this.catCategories$ = this.catCategoryService.getAll();
    }

    loadGetImage(): void {
        this.randomCatImage$ = this.publicRandomImgService.getOneRandomImage(this.catConfigService.getConfig())
            .pipe(
                map(cat => cat.url));
    }

    setAutoRefreshActive(seconds: number) {
        this.autoRefreshService.setTime(seconds, () => {
            this.loadGetImage();
        });
        this.catConfigService.setAutorefreshActive(true);
    }

    setAutoRefreshInactive() {
        this.autoRefreshService.stopRefresh();
        this.catConfigService.setAutorefreshActive(false);
    }

    refresh() {
        if (this.catConfigService.isAutorefreshActive()) {
            this.autoRefreshService.reset();
        }
        this.loadGetImage();
    }
}
