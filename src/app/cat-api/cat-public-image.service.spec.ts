import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';
import { CatInterface, CatPublicImageService } from './cat-public-image.service';

describe('CatPublicImageService', () => {
    let service: CatPublicImageService;
    let mockHttpClient: HttpClient;
    const searchUrl = 'https://api.thecatapi.com/v1/images/search';
    const cat1 = {url: 'rth5dh'} as CatInterface;
    const cat2 = {url: '54uwehj'} as CatInterface;
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

    describe('receive images', () => {
        it('should send get request to catApi server', () => {
            service.getOneRandomImage().subscribe();
            verify(mockHttpClient.get(searchUrl)).once();
        });

        it('should return an observable containing the first element of the list', () => {
            service.getOneRandomImage().subscribe((resultBody: CatInterface) => {
                expect(resultBody).toEqual(mockResultBody[0]);
            });
        });

    });

});
