import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatBreedBe } from './cat-breed-be';

@Injectable({
  providedIn: 'root'
})
export class BreedsService {

    apiBaseUrl: string = 'https://api.thecatapi.com/v1/';

    constructor(private httpClient: HttpClient) {
    }

    getAllBreeds(): Observable<CatBreedBe[]> {
        return this.httpClient.get<CatBreedBe[]>(this.apiBaseUrl + 'breeds');
    }
}
