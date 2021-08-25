import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from "@angular/core";
import {Subject} from "rxjs";

import {AppComponent} from './app.component'
import {ErrorComponent} from "./components/error/error.component";
import {ErrorService} from "./service/error/error.service";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let errorService: ErrorService;
  beforeEach(() => {
    const errorSpy = jasmine.createSpyObj('ErrorService', ['error'], []);

    TestBed.configureTestingModule({
      declarations: [ErrorComponent, AppComponent],
      providers: [
        {provide: ErrorService, useValue: errorSpy},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    errorService = fixture.debugElement.injector.get(ErrorService);
    errorService.error = new Subject()

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should create error', () => {
    errorService.error.next("error test");
    fixture.detectChanges();
    expect(component.isError).toBeTruthy();
    expect(component.errorContent).toBe("error test")
  });

  it('should display error', () => {
    errorService.error.next("error test");
    fixture.detectChanges();
    const element: DebugElement = fixture.debugElement;
    const div: HTMLElement = element.query(By.css('.error')).nativeElement;
    expect(div).toBeDefined()
  });

  it('should not display error', () => {
    component.isError = false;
    component.errorContent = '';
    const element: DebugElement = fixture.debugElement;
    const div = element.query(By.css('.error'));
    expect(div).toBeNull()
  });
})
