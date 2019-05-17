import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Cat } from '../cat';

import { BreedsService } from './breeds.service';
import { CatBreedBe } from './cat-breed-be';

describe('BreedsService', () => {
    const apiBaseUrl: string = 'https://api.thecatapi.com/v1/';
    let service: BreedsService;
    let httpMock: HttpTestingController;
    const mockBreeds: CatBreedBe = {
        alt_names: '',
        experimental: 0,
        hairless: 0,
        hypoallergenic: 0,
        id: 'abys',
        life_span: '14 - 15',
        name: 'Abyssinian',
        natural: 1,
        origin: 'Egypt',
        rare: 0,
        reference_image_id: null,
        rex: 0,
        short_legs: 0,
        suppressed_tail: 0,
        temperament: 'Active',
        weight_imperial: '7  -  10',
        wikipedia_url: 'https://en.wikipedia.org/wiki/Abyssinian_(cat)'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                BreedsService
            ]
        });

        service = TestBed.get(BreedsService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getAllBreeds()', () => {
        it('should call the rest api', fakeAsync(() => {
            service.getAllBreeds().subscribe((breeds: CatBreedBe[]) => {
                expect(breeds).toEqual([mockBreeds]);
            });
            tick();

            const req = httpMock.expectOne(`${apiBaseUrl}breeds`);
            expect(req.request.method).toBe('GET');
            req.flush([mockBreeds]);
            httpMock.verify();
        }));
    });
});
