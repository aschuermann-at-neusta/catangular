import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CatBreedInterface } from '../cat-api/cat-breed.interface';
import { CatCategoryInterface } from '../cat-api/cat-category.interface';
import { CatConfigInterface } from '../cat-image/cat-random-image/cat-config-interface';

@Injectable({
    providedIn: 'root'
})
export class CatConfigService {
    private config: BehaviorSubject<CatConfigInterface> = new BehaviorSubject<CatConfigInterface>({
        autoRefreshActive: false,
        catCategories: undefined,
        catBreed: undefined
    });
    public config$: Observable<CatConfigInterface> = this.config.asObservable();

    constructor() {
    }

    setAutorefreshActive(active: boolean = true) {
        this.config.next( { ...this.config.value, autoRefreshActive: active });
    }

    setCatCategories(categories: CatCategoryInterface[]) {
        this.config.next( { ...this.config.value, catCategories: categories });
    }

    isAutorefreshActive(): boolean {
        return this.config.value.autoRefreshActive;
    }

    getConfig(): CatConfigInterface {
        return this.config.value;
    }

    setCatBreed(catBreedInterface: CatBreedInterface) {
        this.config.next({...this.config.value, catBreed: catBreedInterface});
    }
}
