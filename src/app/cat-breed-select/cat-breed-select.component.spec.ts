import { CatBreedInterface } from '../cat-api/cat-breed.interface';
import { CommonSelectOptionInterface } from '../UI/common-select/common-select-option.interface';
import { CatBreedSelectComponent } from './cat-breed-select.component';

describe('CatBreedSelectComponent', () => {
    let component: CatBreedSelectComponent;
    const mockBreed: CatBreedInterface = {
        id: 4,
        name: 'Perser'
    };
    const mockMatSelect: CommonSelectOptionInterface = {
        id: 4,
        name: 'Perser'
    };

    beforeEach(() => {
        component = new CatBreedSelectComponent();
        component.breeds = [mockBreed];
    });

    describe('selectionChanged()', () => {
        it('should emit the breed object', (done) => {
            component.selectedBreed.subscribe((selected) => {
                expect(selected).toEqual(mockBreed);
                done();
            });
          component.selectionChanged(mockMatSelect);
        });
    });
});
