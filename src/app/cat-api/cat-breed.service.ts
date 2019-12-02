import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CatBreedInterface } from './cat-breed.interface';

@Injectable({
    providedIn: 'root'
})
export class CatBreedService {
    private breeds: BehaviorSubject<CatBreedInterface[]>
        = new BehaviorSubject<CatBreedInterface[]>(null);
    public breeds$: Observable<CatBreedInterface[]> = this.breeds.asObservable();

    constructor() {
    }
}
