import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CatCategoryInterface } from './cat-category.interface';

@Injectable({
    providedIn: 'root'
})
export class CatCategoryService {
    private searchUrl = 'https://api.thecatapi.com/v1/categories';
    constructor(
        private httpClient: HttpClient
    ) {
    }

    getAll(): Observable<CatCategoryInterface[]> {
        return this.httpClient.get<CatCategoryInterface[]>(this.searchUrl);
    }
}
