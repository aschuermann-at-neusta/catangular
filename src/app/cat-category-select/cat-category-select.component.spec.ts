import { CatCategoryInterface } from '../cat-api/cat-category.interface';
import { CommonSelectOptionInterface } from '../UI/common-select/common-select-option.interface';
import { CatCategorySelectComponent } from './cat-category-select.component';

describe('CatCategorySelectComponent', () => {
    let component: CatCategorySelectComponent;
    const mockCategory: CatCategoryInterface = {
        id: 4,
        name: 'Boxes'
    };
    const option: CommonSelectOptionInterface = {
        id: 4,
        name: 'Boxes'
    };

    beforeEach(() => {
        component = new CatCategorySelectComponent();
        component.catCategories = [mockCategory];
    });

    describe('selectionChanged()', () => {
        it('should emit the category object', (done) => {
            component.selectedCategory.subscribe((selected) => {
                expect(selected).toEqual(mockCategory);
                done();
            });
            component.selectionChanged(option);
        });
    });
});
