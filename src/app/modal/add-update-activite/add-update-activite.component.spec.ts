import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateActiviteComponent } from './add-update-activite.component';

describe('AddUpdateActiviteComponent', () => {
  let component: AddUpdateActiviteComponent;
  let fixture: ComponentFixture<AddUpdateActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateActiviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
