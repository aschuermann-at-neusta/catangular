import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CatBreed } from '../../../cat-api/breed/cat-breed';

import { BreedSelectionComponent } from './breed-selection.component';

describe('BreedSelectionComponent', () => {
    let component: BreedSelectionComponent;
    let fixture: ComponentFixture<BreedSelectionComponent>;
    const mockAllBreeds: CatBreed = { id: null, name: null };
    const mockAbys: CatBreed = { id: 'abys', name: 'Abyssiner' };
    const breeds: CatBreed[] = [mockAllBreeds, mockAbys];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BreedSelectionComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BreedSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    describe('getBreeds', () => {
        it('should return an array of breeds', () => {
          component.breeds = breeds;
            expect(component.getBreeds()).toEqual(breeds);
        });
    });

    describe('click', () => {
        it('should return clicked breed_id', fakeAsync(() => {
            let hasSubscription = false;
            component.clickedBreed.subscribe(breed => {
                hasSubscription = true;
                expect(breed).toEqual(mockAbys.id);
            });
            tick();
            component.click(mockAbys);
            expect(hasSubscription).toBeTruthy();
        }));
    });
});
