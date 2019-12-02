import { CatBreedService } from './cat-breed.service';

describe('CatBreedService', () => {
    let mockService: CatBreedService;

    beforeEach(() => {
        mockService = new CatBreedService();
    });
    it('should have an observable of breed', () => {
        expect(mockService.breeds$).toBeDefined();
    });

});
