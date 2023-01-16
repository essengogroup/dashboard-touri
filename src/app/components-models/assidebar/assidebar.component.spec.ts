import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssidebarComponent } from './assidebar.component';

describe('AssidebarComponent', () => {
  let component: AssidebarComponent;
  let fixture: ComponentFixture<AssidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
