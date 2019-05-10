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
        console.log('SET catsloaded:', value);
        this._catsLoaded = value;
    }

    get catsLoaded(): CatConfigInterface {
        return this._catsLoaded;
    }

    loadCats(cat: CatConfigInterface): void {
        console.log('loadCats with cat:', cat);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.subscription = this.httpClient.get<Cat[]>(`https://api.thecatapi.com/v1/images/search` + this.getParams(cat)).subscribe((cats: Cat[]) => {
            this._catSearchResultSubject.next(cats);
            console.log('catsLoaded set to:', cat);
            this.catsLoaded = cat;
        });

    }

    getParams(cat: CatConfigInterface) {
        console.log('getParams with cat:', cat);

        let params: string[] = [];

        Object.keys(cat).forEach((param) => {
            if (cat[ param ] != null) {
                params.push(param + '=' + cat[ param ]);
            }
        });

        return params.length > 0 ? '?' + params.join('&') : '';
    }

    getCatsByConfig(cat: CatConfigInterface): Observable<Cat[]> {
        console.log('getCatsByConfig catsLoaded:', JSON.stringify(this.catsLoaded));
        console.log('getCatsByConfig cat:', JSON.stringify(cat));
        if (JSON.stringify(this.catsLoaded) !== JSON.stringify(cat)) {
            this.loadCats(cat);
            this._catSearchResultSubject = new ReplaySubject<Cat[]>(1);
        }

        return this._catSearchResultSubject.asObservable().pipe(take(1));
    }
}
