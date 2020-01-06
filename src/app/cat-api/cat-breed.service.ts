import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CatBreedInterface } from './cat-breed.interface';

@Injectable({
    providedIn: 'root'
})
export class CatBreedService {
    private breedsURL = 'https://api.thecatapi.com/v1/breeds';
    private breeds: BehaviorSubject<CatBreedInterface[]>
        = new BehaviorSubject<CatBreedInterface[]>(null);
    public breeds$: Observable<CatBreedInterface[]> = this.breeds.asObservable();

    constructor(private httpClient: HttpClient) {
    }

    getAll(): Observable<CatBreedInterface[]> {
        return this.httpClient.get<CatBreedInterface[]>(this.breedsURL);
    }
}
