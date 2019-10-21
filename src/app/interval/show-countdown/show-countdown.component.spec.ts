import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCountdownComponent } from './show-countdown.component';

describe('ShowCountdownComponent', () => {
  let component: ShowCountdownComponent;
  let fixture: ComponentFixture<ShowCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
