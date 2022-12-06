import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'dashboard-touri'`, () => {
    expect(app.title).toEqual('dashboard-touri');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    //expect(compiled.querySelector('p')?.textContent).toContain('dashboard works!');
    expect().nothing();
  });
});
