import { fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';
import { CatInterface, CatPublicImageService } from '../../cat-api/cat-public-image.service';
import { CatRandomImageComponent } from './cat-random-image.component';

describe('CatRandomImageComponent', () => {
    let component: CatRandomImageComponent;
    let mockCatPublicImageService: CatPublicImageService;
    const mockCatUrl = 'fdlkjgrdlfkgj';
    const mockCat: CatInterface = { url: mockCatUrl };

    beforeEach(() => {
        mockCatPublicImageService = mock(CatPublicImageService);
        component = new CatRandomImageComponent(instance(mockCatPublicImageService));
    });

    describe('random image', () => {


        it('should define randomCatImage$', (done) => {
            const mockCatImageSubject: Subject<CatInterface> = new Subject<CatInterface>();
            when(mockCatPublicImageService.getOneRandomImage()).thenReturn(mockCatImageSubject.asObservable());

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
            expect(component.config.autoRefreshActive).toBe(false);
        });

        it('should have a function setAutoRefreshActive', () => {
            component.setAutoRefreshActive();
            expect(component.config.autoRefreshActive).toBe(true);
        });
    });
});
