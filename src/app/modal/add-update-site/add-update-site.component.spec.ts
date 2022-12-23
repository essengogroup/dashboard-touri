import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSiteComponent } from './add-update-site.component';

describe('AddUpdateSiteComponent', () => {
  let component: AddUpdateSiteComponent;
  let fixture: ComponentFixture<AddUpdateSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateSiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
