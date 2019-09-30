import { fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';
import { CatInterface, CatPublicImageService } from '../../cat-api/cat-public-image.service';
import { IntervalService } from '../../interval/interval.service';
import { CatRandomImageComponent } from './cat-random-image.component';

describe('CatRandomImageComponent', () => {
    let component: CatRandomImageComponent;
    let mockCatPublicImageService: CatPublicImageService;
    const mockCatUrl = 'fdlkjgrdlfkgj';
    const mockCat: CatInterface = { url: mockCatUrl };
    const mockCatImageSubject: Subject<CatInterface> = new Subject<CatInterface>();
    let mockIntervalService: IntervalService;

    beforeEach(() => {
        mockCatPublicImageService = mock(CatPublicImageService);
        mockIntervalService = mock(IntervalService);
        component = new CatRandomImageComponent(instance(mockCatPublicImageService), instance(mockIntervalService));
        when(mockCatPublicImageService.getOneRandomImage()).thenReturn(mockCatImageSubject.asObservable());
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
        it('should have a configuration', () => {
            expect(component.config).toBeDefined();
        });

        it('should have autoRefreshActive value be false', () => {
            expect(component.config.value.autoRefreshActive).toBe(false);
        });

        it('should have a function setAutoRefreshActive', () => {
            component.setAutoRefreshActive(2);
            expect(component.config.value.autoRefreshActive).toBe(true);
        });

        it('should start the interval', () => {
            component.setAutoRefreshActive(1);
            verify(mockIntervalService.setTime(1)).once();
        });

        it('should refresh image after interval timeout', () => {
            const controlSubject: Subject<boolean> = new Subject<boolean>();
            when(mockIntervalService.interval$).thenReturn(controlSubject.asObservable());

            component.ngOnInit();
            component.setAutoRefreshActive(1);
            controlSubject.next(true);
            verify(mockCatPublicImageService.getOneRandomImage()).twice();
        });
    });
});
