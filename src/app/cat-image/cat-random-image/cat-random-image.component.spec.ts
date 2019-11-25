import { Observable, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { CatCategoryInterface } from '../../cat-api/cat-category.interface';
import { CatCategoryService } from '../../cat-api/cat-category.service';
import { CatInterface, CatPublicImageService } from '../../cat-api/cat-public-image.service';
import { CatConfigService } from '../../cat-config/cat-config.service';
import { AutoRefreshService } from '../../interval/auto-refresh.service';
import { CatConfigInterface } from './cat-config-interface';
import { CatRandomImageComponent } from './cat-random-image.component';

function expectNewImageToBeLoaded(component: CatRandomImageComponent,
                                  mockCatUrl: string, done,
                                  mockCatImageSubject: Subject<CatInterface>,
                                  mockCat: CatInterface,
                                  mockCatPublicImageService: CatPublicImageService) {
    component.randomCatImage$.subscribe((url: string) => {
        expect(url).toEqual(mockCatUrl);
        done();
    });
    mockCatImageSubject.next(mockCat);
    verify(mockCatPublicImageService.getOneRandomImage(anything())).once();
}

describe('CatRandomImageComponent', () => {
    let component: CatRandomImageComponent;
    let mockCatPublicImageService: CatPublicImageService;
    let mockAutoRefreshService: AutoRefreshService;
    let mockCatCategoryService: CatCategoryService;
    let mockCatConfigService: CatConfigService;

    const mockCatUrl = 'fdlkjgrdlfkgj';
    const mockCat: CatInterface = { url: mockCatUrl };
    const mockCatImageSubject: Subject<CatInterface> = new Subject<CatInterface>();
    const mockCatCategories: CatCategoryInterface[] = [
        {
            id: 1,
            name: 'one'
        },
        {
            id: 2,
            name: 'two'
        } ];
    const mockCatConfig: CatConfigInterface = {
        autoRefreshActive: false,
        catCategories: undefined
    };

    beforeEach(() => {
        mockCatPublicImageService = mock(CatPublicImageService);
        mockAutoRefreshService = mock(AutoRefreshService);
        mockCatCategoryService = mock(CatCategoryService);
        mockCatConfigService = mock(CatConfigService);
        component = new CatRandomImageComponent(
            instance(mockCatPublicImageService),
            instance(mockAutoRefreshService),
            instance(mockCatCategoryService),
            instance(mockCatConfigService));

        when(mockCatPublicImageService.getOneRandomImage(anything()))
            .thenReturn(mockCatImageSubject.asObservable());
        when(mockCatCategoryService.getAll())
            .thenReturn(of(mockCatCategories));
        when(mockCatConfigService.config$).thenReturn(of(mockCatConfig));
        when(mockCatConfigService.getConfig()).thenReturn(mockCatConfig);
    });

    describe('random image', () => {
        it('should define randomCatImage$', (done) => {
            component.loadGetImage();
            expectNewImageToBeLoaded(component, mockCatUrl, done, mockCatImageSubject, mockCat, mockCatPublicImageService);
        });
    });

    describe('autorefresh', () => {
        it('should deactivate autorefresh', async () => {
            component.setAutoRefreshActive(12);
            verify(mockCatConfigService.setAutorefreshActive(true)).once();
            component.setAutoRefreshInactive();
            verify(mockCatConfigService.setAutorefreshActive(false)).once();
        });

        it('should have a function setAutoRefreshActive', async () => {
            component.setAutoRefreshActive(2);
            verify(mockCatConfigService.setAutorefreshActive(true)).once();
        });

        it('should start the interval', () => {
            component.setAutoRefreshActive(1);
            verify(mockAutoRefreshService.setTime(1, anything())).once();
        });

        it('should stop refreshing', () => {
            component.setAutoRefreshInactive();
            verify(mockAutoRefreshService.stopRefresh()).once();
        });
    });

    describe('refresh', () => {
        it('should reset the interval on refresh', () => {
            when(mockCatConfigService.isAutorefreshActive()).thenReturn(true);
            component.refresh();
            verify(mockAutoRefreshService.reset()).once();
        });

        it('should reset only if auto refresh is active', () => {
            when(mockCatConfigService.isAutorefreshActive()).thenReturn(false);
            component.refresh();
            verify(mockAutoRefreshService.reset()).never();
        });

        it('should load a new image on refresh', () => {
            component.refresh();
            verify(mockCatPublicImageService.getOneRandomImage(mockCatConfig)).once();
        });

        it('should load a new image on refresh (2)', (done) => {
            component.refresh();
            expectNewImageToBeLoaded(component, mockCatUrl, done, mockCatImageSubject, mockCat, mockCatPublicImageService);
        });
    });

    describe('Cat Categories', () => {
        it('should load categories initially', async () => {
            component.ngOnInit();
            const categories = await component.catCategories$.pipe(take(1)).toPromise();
            expect(categories).toEqual(mockCatCategories);
        });
    });
});
