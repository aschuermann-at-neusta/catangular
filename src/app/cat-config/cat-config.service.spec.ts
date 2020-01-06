import { take } from 'rxjs/operators';
import { CatBreedInterface } from '../cat-api/cat-breed.interface';
import { CatCategoryInterface } from '../cat-api/cat-category.interface';
import { CatConfigInterface } from '../cat-image/cat-random-image/cat-config-interface';
import { CatConfigService } from './cat-config.service';

describe('CatConfigService', () => {
    let service: CatConfigService;
    const mockConfig: CatConfigInterface = {
        autoRefreshActive: false,
        catCategories: undefined,
        catBreed: undefined
    };

    beforeEach(() => {
        service = new CatConfigService();
    });

    it('should set autorefresh active to true', async () => {
        service.setAutorefreshActive();
        expect(await service.config$.pipe(take(1)).toPromise()).toEqual({
            ...mockConfig,
            autoRefreshActive: true
        });
    });

    it('should set catCategories', async () => {
        const fakeCategories: CatCategoryInterface[] = [
            {
                id: 3,
                name: 'boxes'
            }
        ];
        service.setCatCategories(fakeCategories);
        expect(await service.config$.pipe(take(1)).toPromise()).toEqual({
            ...mockConfig,
            catCategories: fakeCategories
        });
    });

    it('should set catBreeds', async () => {
        const fakeBreed: CatBreedInterface = {
            id: 3,
            name: 'british short hair'
        };
        service.setCatBreed(fakeBreed);

        expect(await service.config$.pipe(take(1)).toPromise()).toEqual({
            ...mockConfig,
            catBreed: fakeBreed
        });

    });

    it('should return true if config is active', () => {
        service.setAutorefreshActive(true);
        expect(service.isAutorefreshActive()).toBe(true);
    });

    describe('data access', () => {
        it('should return current config', () => {
            expect(service.getConfig()).toEqual(mockConfig);
        });
    });
});
