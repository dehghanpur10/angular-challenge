import {ActivatedRoute, Params} from "@angular/router";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {of, Subject,throwError} from "rxjs";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {GetDataService} from "./service/get-data/get-data.service";
import {ErrorService} from '../shared/error/error.service'
import {ListItemsComponent} from "./list-items.component";
import {ItemComponent} from "./item/item.component";
import {SharedModule} from "../shared/shared.module";

describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixture: ComponentFixture<ListItemsComponent>;

  let activatedRoute: ActivatedRoute;
  let getDataService: GetDataService;
  let errorService: ErrorService;

  beforeEach(() => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
    const getDataSpy = jasmine.createSpyObj('GetDataService', ['filterData']);
    const mock = {
      error: new Subject(),
      createError: function (a: string) {
        this.error.next(a)
      }
    }

    TestBed.configureTestingModule({
      declarations: [ListItemsComponent, ItemComponent],
      imports: [BrowserAnimationsModule, SharedModule],
      providers: [
        {provide: ActivatedRoute, useValue: routeSpy},
        {provide: GetDataService, useValue: getDataSpy},
        {provide: ErrorService, useValue: mock},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemsComponent);

    errorService = fixture.debugElement.injector.get(ErrorService);
    getDataService = fixture.debugElement.injector.get(GetDataService);
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.queryParams = of([])

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('test class logic', () => {
    it('should be get operations', () => {
      const operations = [{value1: 1, value2: 2, action: "add"}];
      getDataService.filterData = (type:string) => {
        return of(operations)
      }
      component.ngOnInit();
      expect(component.operations).toEqual(operations)
    });

    it('should be create error', (done: DoneFn) => {
      errorService.error.subscribe((error) => {
        expect(error).toBe("There is a problem on the server")
        done()
      })
      getDataService.filterData = (type:string) => {
        return throwError("error")
      }
      component.ngOnInit();
    });

    it('should be get new operations', () => {
      const operations = [{value1: 1, value2: 2, action: "add"}];
      const subject = new Subject<Params>()
      activatedRoute.queryParams = subject.asObservable()
      getDataService.filterData = (type:string) => {
        return of(operations)
      }
      component.ngOnInit();

      subject.next({filter: ''})
      expect(component.operations).toEqual(operations)
    });
  });
  describe('test template of component', () => {

    it('should display items', () => {
      component.operations = [{value1: 0, value2: 0, action: "add"}, {value1: 0, value2: 0, action: "add"}, {
        value1: 0,
        value2: 0,
        action: "add"
      }, {value1: 0, value2: 0, action: "add"}, {value1: 1, value2: 2, action: "multiply"}]
      fixture.detectChanges();
      const element: DebugElement = fixture.debugElement;
      const items = element.queryAll(By.css('app-item'));
      expect(items.length).toEqual(5);
    });
  });
});
