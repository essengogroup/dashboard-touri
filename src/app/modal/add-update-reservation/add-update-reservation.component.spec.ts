import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateReservationComponent } from './add-update-reservation.component';

describe('AddUpdateReservationComponent', () => {
  let component: AddUpdateReservationComponent;
  let fixture: ComponentFixture<AddUpdateReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
