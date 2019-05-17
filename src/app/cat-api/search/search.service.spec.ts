import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { Cat } from '../cat';
import { SearchService } from './search.service';

describe('CatApi > SearchService', () => {
    const apiBaseUrl: string = 'https://api.thecatapi.com/v1/';
    const mockAbysCat1: Cat = { id: '14', url: 'foo', breeds: [], categories: [] };
    const mockAbysCats: Cat[] = [
        mockAbysCat1
    ];

    const mockAbysCat2: Cat = { id: '1485', url: 'bar', breeds: [], categories: [] };
    const mockAbysCats2: Cat[] = [
        mockAbysCat2
    ];
    let httpMock: HttpTestingController;
    let service: SearchService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                SearchService
            ]
        });
        httpMock = TestBed.get(HttpTestingController);
        service = TestBed.get(SearchService);
    });

    it('should exist', () => {
        expect(TestBed.get(SearchService)).toBeDefined();

    });

    describe('getCatsByConfig', () => {

        describe('no parameters', () => {
            it('should be able to make a call without parameters', fakeAsync(() => {
                service.getCatsByConfig({}).subscribe((cats: Cat[]) => {
                    expect(cats).toEqual(mockAbysCats);
                });
                tick();

                const req = httpMock.expectOne(`${apiBaseUrl}images/search`);
                expect(req.request.method).toBe('GET');
                req.flush(mockAbysCats);
                httpMock.verify();
            }));

            it('should be able to make a call with parameter being null', fakeAsync(() => {
                service.getCatsByConfig({breed_id: null}).subscribe((cats: Cat[]) => {
                    expect(cats).toEqual(mockAbysCats);
                });
                tick();

                const req = httpMock.expectOne(`${apiBaseUrl}images/search`);
                expect(req.request.method).toBe('GET');
                req.flush(mockAbysCats);
                httpMock.verify();
            }));
        });

        it('should call images/search endpoint with breed_id parameter', () => {
            service.getCatsByConfig({ breed_id: 'abys' }).subscribe((cats: Cat[]) => {
                expect(cats).toEqual(mockAbysCats);
            });

            const req = httpMock.expectOne(`${apiBaseUrl}images/search?breed_id=abys`);
            expect(req.request.method).toBe('GET');
            req.flush(mockAbysCats);
            httpMock.verify();
        });
        it('should call images/search endpoint with breed_id parameter and size parameter', () => {
            service.getCatsByConfig({ breed_id: 'abys', size: 'thumb' }).subscribe((cats: Cat[]) => {
                expect(cats).toEqual(mockAbysCats);
            });

            const req = httpMock.expectOne(`${apiBaseUrl}images/search?breed_id=abys&size=thumb`);
            expect(req.request.method).toBe('GET');
            req.flush(mockAbysCats);
            httpMock.verify();
        });

        it('should reload if another bread is selected', () => {

            service.getCatsByConfig({ breed_id: 'abys' }).subscribe((cats: Cat[]) => {
                expect(cats).toEqual(mockAbysCats);
            });

            const firstRequest = httpMock.expectOne(`${apiBaseUrl}images/search?breed_id=abys`);
            expect(firstRequest.request.method).toBe('GET');
            firstRequest.flush(mockAbysCats);
            httpMock.verify();

            service.getCatsByConfig({ breed_id: 'wurst' }).subscribe((cats: Cat[]) => {
                expect(cats).toEqual(mockAbysCats);
            });

            const secondRequest = httpMock.expectOne(`${apiBaseUrl}images/search?breed_id=wurst`);
            expect(secondRequest.request.method).toBe('GET');
            secondRequest.flush(mockAbysCats);
            httpMock.verify();
        });

        it('should unsubscribe after reload with different breed_id', fakeAsync(() => {
            let resolved = 0;

            function handleSubscription(cats: Cat[]) {
                expect(cats).toEqual(mockAbysCats);
                resolved++;
            }

            service.getCatsByConfig({ breed_id: 'abys' }).subscribe(handleSubscription);

            const firstRequest = httpMock.expectOne(`${apiBaseUrl}images/search?breed_id=abys`);
            expect(firstRequest.request.method).toBe('GET');
            firstRequest.flush(mockAbysCats);
            httpMock.verify();

            tick();

            const subscription: Subscription = service.subscription;

            service.getCatsByConfig({ breed_id: 'abys' }).subscribe(handleSubscription);


            expect(resolved).toEqual(2);
            expect(subscription.closed).toBeTruthy();


        }));

        it('should load twice, if second parameter changes', fakeAsync(() => {


            let resolved = 0;

            function handleSubscription(cats: Cat[]) {
                expect(cats).toEqual(mockAbysCats);
                resolved++;
            }

            function handleSubscription2(cats: Cat[]) {
                expect(cats).toEqual(mockAbysCats2);
                resolved++;
            }

            service.getCatsByConfig({ breed_id: 'abys', size: 'medium' }).subscribe(handleSubscription);
            const req = httpMock.expectOne(`${apiBaseUrl}images/search?breed_id=abys&size=medium`);
            expect(req.request.method).toBe('GET');
            req.flush(mockAbysCats);
            tick();
            service.getCatsByConfig({ breed_id: 'abys', size: 'medium' }).subscribe(handleSubscription);
            tick();
            service.getCatsByConfig({ breed_id: 'abys', size: 'large' }).subscribe(handleSubscription2);
            const req2 = httpMock.expectOne(`${apiBaseUrl}images/search?breed_id=abys&size=large`);
            expect(req2.request.method).toBe('GET');
            req2.flush(mockAbysCats2);
            tick();
            service.getCatsByConfig({ breed_id: 'abys', size: 'large' }).subscribe(handleSubscription2);
            tick();

            expect(resolved).toEqual(4);
            httpMock.verify();
        }));

    });

    describe('funny error', () => {
        it('should not be null', fakeAsync(() => {
            service.getCatsByConfig({breed_id: 'a', size: 'thumb'}).subscribe((cats: Cat[]) => {
                expect(cats).toEqual(mockAbysCats);
            });
            tick();

            const req = httpMock.expectOne(`${apiBaseUrl}images/search?breed_id=a&size=thumb`);
            expect(req.request.method).toBe('GET');
            req.flush(mockAbysCats);
            httpMock.verify();
            tick();
            expect(service.catsLoaded).toEqual({breed_id: 'a', size: 'thumb'});
        }));
    });
});
