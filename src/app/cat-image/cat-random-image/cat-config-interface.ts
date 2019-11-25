import { CatCategoryInterface } from '../../cat-api/cat-category.interface';

export interface CatConfigInterface {
    autoRefreshActive: boolean;
    catCategories: CatCategoryInterface[];
}
