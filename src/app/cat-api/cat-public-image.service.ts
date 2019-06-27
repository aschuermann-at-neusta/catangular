import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CatInterface {
    readonly url;
}

@Injectable({
    providedIn: 'root'
})
export class CatPublicImageService {

    constructor(private httpClient: HttpClient) {
    }

    getOneRandomImage(): Observable<CatInterface> {
        return this.httpClient.get<CatInterface[]>('https://api.thecatapi.com/v1/images/search')
            .pipe(
                map((data) => data[0])
            );
    }
}
