import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { Cat } from './cat-api/cat';
import { SearchService } from './cat-api/search/search.service';
import { RandomCatImageModule } from './modules/random-cat-image/random-cat-image.module';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let searchService: SearchService;

    const mockCatCata: Cat[] = [ { id: '14', url: 'foo', breeds: [], categories: [] }, {
        id: '15',
        url: 'boo',
        breeds: [],
        categories: []
    } ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                RandomCatImageModule
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                {
                    provide: SearchService, useValue: {
                        getCatsByConfig() {
                        }
                    }
                },
                {
                    provide: HttpClient, useValue: {
                        get() {
                        }
                    }
                }
            ]
        }).compileComponents();
        searchService = TestBed.get(SearchService);
        spyOn(searchService, 'getCatsByConfig').and.returnValue(of(mockCatCata));

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    }));

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    describe('html output', () => {
        it('should display one random cat picture on the page', fakeAsync(() => {
            fixture.detectChanges(); // THis was missing before and made our test fail despite the code working properly.
            tick();
            let imageElement = fixture.debugElement.query(By.css('img'));
            expect(imageElement.nativeElement.src).toContain(mockCatCata[0].url);
        }));
    });

});
