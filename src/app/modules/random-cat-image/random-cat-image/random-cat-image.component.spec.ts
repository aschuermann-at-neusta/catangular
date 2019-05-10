import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Cat } from '../../../cat-api/cat';
import { SearchService } from '../../../cat-api/search/search.service';

import { RandomCatImageComponent } from './random-cat-image.component';

describe('RandomCatImageComponent', () => {
    let component: RandomCatImageComponent;
    let fixture: ComponentFixture<RandomCatImageComponent>;
    let searchService: SearchService;
    const mockCatData: Cat[] = [ { id: '14', url: 'foo', breeds: [], categories: [] }, {
        id: '15',
        url: 'boo',
        breeds: [],
        categories: []
    } ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: SearchService, useValue: {
                        getCatsByConfig() {
                        }
                    }
                } ],
            declarations: [ RandomCatImageComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        searchService = TestBed.get(SearchService);
        spyOn(searchService, 'getCatsByConfig').and.returnValue(of(mockCatData));
        fixture = TestBed.createComponent(RandomCatImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should have breed_id null initially', () => {
            expect(component.catConfig.breed_id).toBeNull();
        });

        it('should have size null initially', () => {
            expect(component.catConfig.size).toEqual('thumb');
        });
    });

    describe('getRandomCatImage()', () => {
        it('should call the api', () => {
            component.getRandomCatImage();
            expect(searchService.getCatsByConfig).toHaveBeenCalled();
        });
        it('should return an observable of cat-image', fakeAsync(() => {
            component.getRandomCatImage().subscribe((image: string) => {
                expect(image).toEqual(mockCatData[ 0 ].url);
            });
            tick();
            expect(searchService.getCatsByConfig).toHaveBeenCalled();

        }));
        it('should use breed_id if defined to call service', fakeAsync(() => {
            component.getRandomCatImage({ breed_id: 'cat' }).subscribe((image: string) => {
                expect(image).toEqual(mockCatData[ 0 ].url);
            });
            tick();
            expect(searchService.getCatsByConfig).toHaveBeenCalledWith({ breed_id: 'cat' });
        }));
    });


    describe('onClickedBreed', () => {
        it('should set local variable from event', () => {
            component.onClickedBreed('cat');
            expect(component.catConfig.breed_id).toEqual('cat');
        });
    });
});
