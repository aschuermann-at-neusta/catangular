import { Observable, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { CatBreedInterface } from '../../cat-api/cat-breed.interface';
import { CatBreedService } from '../../cat-api/cat-breed.service';
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
    let mockCatBreedService: CatBreedService;

    const mockCatUrl = 'fdlkjgrdlfkgj';
    const mockCat: CatInterface = { url: mockCatUrl };
    const mockCatImageSubject: Subject<CatInterface> = new Subject<CatInterface>();
    const mockCatCategory1 = {
        id: 1,
        name: 'one'
    };
    const mockCatCategories: CatCategoryInterface[] = [
        mockCatCategory1,
        {
            id: 2,
            name: 'two'
        } ];
    const mockCatConfig: CatConfigInterface = {
        autoRefreshActive: false,
        catCategories: undefined
    };


    const mockCatBreed3: CatBreedInterface = {
        id: 3
    } as CatBreedInterface;

    const mockCatBreeds: CatBreedInterface[] = [
        mockCatBreed3,
        {
            id: 4
        } as CatBreedInterface ];

    beforeEach(() => {
        mockCatPublicImageService = mock(CatPublicImageService);
        mockAutoRefreshService = mock(AutoRefreshService);
        mockCatCategoryService = mock(CatCategoryService);
        mockCatConfigService = mock(CatConfigService);
        mockCatBreedService = mock(CatBreedService);
        component = new CatRandomImageComponent(
            instance(mockCatPublicImageService),
            instance(mockAutoRefreshService),
            instance(mockCatCategoryService),
            instance(mockCatConfigService),
            instance(mockCatBreedService));

        when(mockCatPublicImageService.getOneRandomImage(anything()))
            .thenReturn(mockCatImageSubject.asObservable());
        when(mockCatCategoryService.getAll())
            .thenReturn(of(mockCatCategories));
        when(mockCatConfigService.config$).thenReturn(of(mockCatConfig));
        when(mockCatConfigService.getConfig()).thenReturn(mockCatConfig);
        when(mockCatBreedService.getAll()).thenReturn(of(mockCatBreeds));

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

        it('should set selected category config', () => {
            component.selectedCategory(mockCatCategory1);
            verify(mockCatConfigService.setCatCategories(deepEqual([ mockCatCategory1 ]))).once();
        });

        it('should load new image on category change', async () => {
            const mockUrl = 'blac';

            const mockNewCatConfig: CatConfigInterface = {
                ...mockCatConfig,
                catCategories: undefined
            };
            const mockObservable: Observable<CatInterface> = of({
                url: mockUrl
            } as CatInterface);

            when(mockCatPublicImageService.getOneRandomImage(mockNewCatConfig)).thenReturn(mockObservable);
            when(mockCatConfigService.getConfig()).thenReturn(mockNewCatConfig);

            component.selectedCategory(mockCatCategory1);

            expect(await component.randomCatImage$.pipe(take(1)).toPromise())
                .toEqual(mockUrl);
        });

        it('should set unselected category config', () => {
            component.selectedCategory(null);
            verify(mockCatConfigService.setCatCategories(undefined)).once();
        });
    });

    describe('Cat Breeds', () => {
        it('should load cat breeds on init', async () => {
            component.ngOnInit();
            const breeds = await component.catBreeds$.pipe(take(1)).toPromise();
            expect(breeds).toEqual(mockCatBreeds);
        });

        it('should set selected breed config', () => {
            component.selectedBreed(mockCatBreed3);
            verify(mockCatConfigService.setCatBreed(deepEqual( mockCatBreed3 ))).once();
        });

        it('should load new image when breed is selected', async () => {
            const mockUrl = 'blac';

            const mockNewCatConfig: CatConfigInterface = {
                ...mockCatConfig
            };
            const mockObservable: Observable<CatInterface> = of({
                url: mockUrl
            } as CatInterface);

            when(mockCatPublicImageService.getOneRandomImage(mockNewCatConfig)).thenReturn(mockObservable);
            when(mockCatConfigService.getConfig()).thenReturn(mockNewCatConfig);

            component.selectedBreed(mockCatBreed3);

            expect(await component.randomCatImage$.pipe(take(1)).toPromise()).toEqual(mockUrl);
        });

    });
});
