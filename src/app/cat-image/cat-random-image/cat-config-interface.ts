import { CatBreedInterface } from '../../cat-api/cat-breed.interface';
import { CatCategoryInterface } from '../../cat-api/cat-category.interface';

export interface CatConfigInterface {
    autoRefreshActive: boolean;
    catCategories: CatCategoryInterface[];
    catBreed: CatBreedInterface;
}
