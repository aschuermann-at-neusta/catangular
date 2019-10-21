import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { CatInterface, CatPublicImageService } from '../../cat-api/cat-public-image.service';
import { AutoRefreshService } from '../../interval/auto-refresh.service';
import { CatRandomImageComponent } from './cat-random-image.component';

describe('CatRandomImageComponent', () => {
    let component: CatRandomImageComponent;
    let mockCatPublicImageService: CatPublicImageService;
    const mockCatUrl = 'fdlkjgrdlfkgj';
    const mockCat: CatInterface = { url: mockCatUrl };
    const mockCatImageSubject: Subject<CatInterface> = new Subject<CatInterface>();
    let mockAutoRefreshService: AutoRefreshService;

    beforeEach(() => {
        mockCatPublicImageService = mock(CatPublicImageService);
        mockAutoRefreshService = mock(AutoRefreshService);
        component = new CatRandomImageComponent(
            instance(mockCatPublicImageService),
            instance(mockAutoRefreshService));
        when(mockCatPublicImageService.getOneRandomImage())
            .thenReturn(mockCatImageSubject.asObservable());
    });

    describe('random image', () => {
        it('should define randomCatImage$', (done) => {
            component.loadGetImage();
            component.randomCatImage$.subscribe((url: string) => {
                expect(url).toEqual(mockCatUrl);
                done();
            });
            mockCatImageSubject.next(mockCat);
            verify(mockCatPublicImageService.getOneRandomImage()).once();
        });
    });

    describe('refresh image', () => {
        it('should have a configuration', async () => {
            const config = await component.config$.pipe(take(1)).toPromise();
            expect(config).toBeDefined();
        });

        it('should have autoRefreshActive value be false', async () => {
            const config = await component.config$.pipe(take(1)).toPromise();
            expect(config.autoRefreshActive).toBe(false);
        });

        it('should have a function setAutoRefreshActive', async () => {
            component.setAutoRefreshActive(2);
            const config = await component.config$.pipe(take(1)).toPromise();
            expect(config.autoRefreshActive).toBe(true);
        });

        it('should start the interval', () => {
            component.setAutoRefreshActive(1);
            verify(mockAutoRefreshService.setTime(1, anything())).once();
        });


    });
});
