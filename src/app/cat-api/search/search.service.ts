import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Cat } from '../cat';
import { CatConfigInterface } from './cat-config.interface';

@Injectable()
export class SearchService {

    private _catSearchResultSubject: ReplaySubject<Cat[]> = new ReplaySubject<Cat[]>(1);
    private _catsLoaded: CatConfigInterface;

    subscription: Subscription;

    constructor(private httpClient: HttpClient) {
    }

    set catsLoaded(value: CatConfigInterface) {
        this._catsLoaded = value;
    }

    get catsLoaded(): CatConfigInterface {
        return this._catsLoaded;
    }


    getCatsByConfig(catConfig: CatConfigInterface): Observable<Cat[]> {
        if (JSON.stringify(this.catsLoaded) !== JSON.stringify(catConfig)) {
            this.loadCats(catConfig);
            this._catSearchResultSubject = new ReplaySubject<Cat[]>(1);
        }

        return this._catSearchResultSubject.asObservable().pipe(take(1));
    }

    loadCats(catConfig: CatConfigInterface): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.subscription = this.httpClient.get<Cat[]>(this.getUrl(catConfig)).subscribe((cats: Cat[]) => {
            this._catSearchResultSubject.next(cats);
            this.catsLoaded = { ...catConfig }; // This was the problem since before we passed the object reference, not just the content
        });

    }

    private getUrl(catConfig: CatConfigInterface) {
        return `https://api.thecatapi.com/v1/images/search` + this.getParams(catConfig);
    }
    private getParams(catConfig: CatConfigInterface) {
        console.log('getParams with catConfig:', catConfig);

        const params: string[] = [];

        Object.keys(catConfig).forEach((param) => {
            if (catConfig[ param ] != null) {
                params.push(param + '=' + catConfig[ param ]);
            }
        });

        return params.length > 0 ? '?' + params.join('&') : '';
    }
}
