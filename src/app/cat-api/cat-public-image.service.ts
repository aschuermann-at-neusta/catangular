import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatConfigInterface } from '../cat-image/cat-random-image/cat-config-interface';
import { CatBreedInterface } from './cat-breed.interface';
import { CatCategoryInterface } from './cat-category.interface';

export interface CatInterface {
    readonly url;
}

@Injectable({
    providedIn: 'root'
})
export class CatPublicImageService {
    apiUrl = 'https://api.thecatapi.com/v1/images/search';
    private validParameters: Map<string, (unknown) => string> = new Map<string, (unknown) => string>();

    constructor(private httpClient: HttpClient) {
        this.validParameters.set(
            'catCategories',
            (catCategories: CatCategoryInterface[]) =>
                this.getCatCategoriesParameter(catCategories)
        );
        this.validParameters.set(
            'catBreed',
            (catBreed: CatBreedInterface) =>
                this.getCatBreedParameter(catBreed)
        );
    }

    getOneRandomImage(catConfig: CatConfigInterface): Observable<CatInterface> {
        const params = this.getParamsFromConfig(catConfig);

        return this.httpClient.get<CatInterface[]>(this.getUrl(params))
            .pipe(
                map((data) => data[ 0 ])
            );
    }

    private getCatCategoriesParameter(catCategories: CatCategoryInterface[]): string {
        const mapIds = catCategories.map(catCategory => catCategory.id).join(',');
        return `category_ids=${mapIds}`;
    }

    private getCatBreedParameter(catBreed: CatBreedInterface): string {
        return `breed_id=${catBreed.id}`;
    }

    private getUrl(params: string[]) {
        console.log('getUrl:', this.apiUrl + (params.length > 0 ? '?' + params.join('&') : ''));
        return this.apiUrl + (params.length > 0 ? '?' + params.join('&') : '');
    }

    private getParamsFromConfig(catConfig: CatConfigInterface): string[] {
        console.log('getParamsFromConfig:', catConfig);
        return Object.keys(catConfig)
            .filter((parameterKey) =>
                this.validParameters.has(parameterKey) && !!catConfig[ parameterKey ])
            .map((parameterKey) =>
                this.validParameters.get(parameterKey)(catConfig[ parameterKey ]));
    }
}
