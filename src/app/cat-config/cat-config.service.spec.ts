import { take } from 'rxjs/operators';
import { CatCategoryInterface } from '../cat-api/cat-category.interface';
import { CatConfigInterface } from '../cat-image/cat-random-image/cat-config-interface';
import { CatConfigService } from './cat-config.service';

describe('CatConfigService', () => {
    let service: CatConfigService;
    const mockConfig: CatConfigInterface = {
        autoRefreshActive: false,
        catCategories: undefined
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
