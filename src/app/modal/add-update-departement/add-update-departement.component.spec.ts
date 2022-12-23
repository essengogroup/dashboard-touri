import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDepartementComponent } from './add-update-departement.component';

describe('AddUpdateDepartementComponent', () => {
  let component: AddUpdateDepartementComponent;
  let fixture: ComponentFixture<AddUpdateDepartementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateDepartementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
