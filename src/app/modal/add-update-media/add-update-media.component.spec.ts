import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateMediaComponent } from './add-update-media.component';

describe('AddUpdateMediaComponent', () => {
  let component: AddUpdateMediaComponent;
  let fixture: ComponentFixture<AddUpdateMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateMediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
