import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';
import { CatConfigInterface } from '../cat-image/cat-random-image/cat-config-interface';
import { CatInterface, CatPublicImageService } from './cat-public-image.service';

describe('CatPublicImageService', () => {
    let service: CatPublicImageService;
    let mockHttpClient: HttpClient;
    const mockCatConfig: CatConfigInterface = {
        autoRefreshActive: false,
        catCategories: undefined
    };
    const searchUrl = 'https://api.thecatapi.com/v1/images/search';
    const cat1 = { url: 'rth5dh' } as CatInterface;
    const cat2 = { url: '54uwehj' } as CatInterface;
    const mockResultBody = [
        cat1, cat2
    ];

    beforeEach(() => {
        mockHttpClient = mock(HttpClient);
        when(mockHttpClient.get(searchUrl)).thenReturn(of(mockResultBody));
        service = new CatPublicImageService(
            instance(mockHttpClient)
        );
    });

    describe('Cat Config', () => {
        it('should use the config parameter', () => {
            const mockUrl = `${searchUrl}?category_ids=4`;
            when(mockHttpClient.get(mockUrl)).thenReturn(of(mockResultBody));
            service.getOneRandomImage({
                ...mockCatConfig,
                catCategories: [
                    { id: 4, name: 'box' }
                ]
            }).subscribe();
            verify(mockHttpClient.get(mockUrl)).once();
        });
    });
    describe('receive images', () => {
        it('should send get request to catApi server', () => {
            service.getOneRandomImage(mockCatConfig).subscribe();
            verify(mockHttpClient.get(searchUrl)).once();
        });

        it('should return an observable containing the first element of the list', () => {
            service.getOneRandomImage(mockCatConfig).subscribe((resultBody: CatInterface) => {
                expect(resultBody).toEqual(mockResultBody[ 0 ]);
            });
        });

    });

});
