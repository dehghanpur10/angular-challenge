import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Subject} from "rxjs";

import {AppComponent} from './app.component'
import {LoadingService} from "./shared/loading/loading.service";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loadingService: LoadingService;
  beforeEach(() => {
    const loadingSpy = jasmine.createSpyObj('LoadingService', ['load'], []);

    TestBed.configureTestingModule({
      declarations: [ AppComponent],
      providers: [
        {provide: LoadingService, useValue: loadingSpy},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    loadingService = fixture.debugElement.injector.get(LoadingService);
    loadingService.load = new Subject()
    fixture.detectChanges();
  });


  it('should set isLoading true', () => {
    loadingService.load.next(true);
    fixture.detectChanges();
    expect(component.isLoading).toBeTruthy();
  });

})
