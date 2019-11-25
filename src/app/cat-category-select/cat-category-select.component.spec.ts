import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CatCategoryInterface } from '../cat-api/cat-category.interface';

import { CatCategorySelectComponent } from './cat-category-select.component';

describe('CatCategorySelectComponent', () => {
    let component: CatCategorySelectComponent;
    const mockCategory: CatCategoryInterface = {
        id: 1,
        name: 'box'
    };

    beforeEach(() => {
        component = new CatCategorySelectComponent();
    });

    it('should emit selected category', (done) => {
        component.selected.subscribe(selection => {
            expect(selection).toEqual(mockCategory);
            done();
        });
        component.select(mockCategory);
    });
});
