import { MatSelectChange } from '@angular/material';
import { CommonSelectOptionInterface } from './common-select-option.interface';
import { CommonSelectComponent } from './common-select.component';

describe('CommonSelectComponent', () => {
    let component: CommonSelectComponent;
    const mockSelectOptions: CommonSelectOptionInterface = {
        id: 4,
        name: 'Perser'
    };
    const mockMatSelect: MatSelectChange = {
        value: 4
    } as MatSelectChange;

    beforeEach(() => {
        component = new CommonSelectComponent();
        component.options = [mockSelectOptions];
    });

    describe('selectionChanged()', () => {
        it('should emit the option object', (done) => {
            component.selectedOption.subscribe((selected) => {
                expect(selected).toEqual(mockSelectOptions);
                done();
            });
            component.selectionChanged(mockMatSelect);
        });
    });
});
