import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { CatCategoryInterface } from './cat-category.interface';
import { CatCategoryService } from './cat-category.service';

describe('CatCategoryService', () => {
    let service: CatCategoryService;
    let mockHttpClient: HttpClient;
    const searchUrl = 'https://api.thecatapi.com/v1/categories';
    const mockResultBody: CatCategoryInterface[] = [{
        id: 14,
        name: 'Titi'
    }];

    beforeEach(() => {
        mockHttpClient = mock(HttpClient);
        when(mockHttpClient.get(searchUrl)).thenReturn(of(mockResultBody));
        service = new CatCategoryService(
            instance(mockHttpClient)
        );
    });

    it('should load all cat categories', (done) => {
        when(mockHttpClient.get(searchUrl)).thenReturn(of(mockResultBody));
        service.getAll().subscribe((catCategories: CatCategoryInterface[]) => {
            expect(catCategories).toEqual(mockResultBody);
            done();
        });
        verify(mockHttpClient.get(searchUrl)).once();
    });
});

