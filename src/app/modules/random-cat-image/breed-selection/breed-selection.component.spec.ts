import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BreedSelectionComponent } from './breed-selection.component';

describe('BreedSelectionComponent', () => {
    let component: BreedSelectionComponent;
    let fixture: ComponentFixture<BreedSelectionComponent>;
    let breeds: string[] = ["foo","boo"];

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
                expect(breed).toEqual('Siamesisches Kurzhaar')
            });
            tick();
            component.click('Siamesisches Kurzhaar');
            expect(hasSubscription).toBeTruthy();
        }));
    });
});
