import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';
import { CatBreedInterface } from './cat-breed.interface';
import { CatBreedService } from './cat-breed.service';
import { CatCategoryInterface } from './cat-category.interface';

describe('CatBreedService', () => {
    let service: CatBreedService;
    let mockHttpClient: HttpClient;
    const breedsUrl = 'https://api.thecatapi.com/v1/breeds';
    const mockResultBody: CatBreedInterface[] = [{
        id: 14,
        name: 'Titi'
    }];

    beforeEach(() => {
        mockHttpClient = mock(HttpClient);
        service = new CatBreedService(instance(mockHttpClient));
    });
    it('should have an observable of breed', () => {
        expect(service.breeds$).toBeDefined();
    });

    it('should load all cat breeds', (done) => {
        when(mockHttpClient.get(breedsUrl)).thenReturn(of(mockResultBody));
        service.getAll().subscribe((catCategories: CatCategoryInterface[]) => {
            expect(catCategories).toEqual(mockResultBody);
            done();
        });
    });
});
