import {ActivatedRoute} from "@angular/router";
import {TestBed} from "@angular/core/testing";

import {GetDataService} from "../../service/get-data/get-data.service";
import {ErrorService} from '../../service/error/error.service'
import {ListItemsComponent} from "./list-items.component";
import {of, Subject} from "rxjs";

describe('ListItemsComponent', () => {
  let activatedRoute: ActivatedRoute;
  let getDataService: GetDataService;
  let errorService: ErrorService;
  let listItemsComponent: ListItemsComponent;
  beforeEach(() => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
    const getDataSpy = jasmine.createSpyObj('GetDataService', ['filterData']);
    const errorSpy = jasmine.createSpyObj('ErrorService', ['createError']);

    TestBed.configureTestingModule({
      providers: [
        ListItemsComponent,
        {provide: ActivatedRoute, useValue: routeSpy},
        {provide: GetDataService, useValue: getDataSpy},
        {provide: ErrorService, useValue: errorSpy},
      ]
    });
    listItemsComponent = TestBed.inject(ListItemsComponent);
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    ;
    getDataService = TestBed.inject(GetDataService);
    errorService = TestBed.inject(ErrorService);
    getDataService.data = new Subject();
    errorService.error = new Subject()

  })
  it('should be get operations', () => {
    const operations = [{value1: 1, value2: 2, action: "add"}];
    activatedRoute.queryParams = of([])
    listItemsComponent.ngOnInit();

    getDataService.data.next(operations);

    expect(listItemsComponent.operations).toEqual(operations)
  })
  it('should be create error', (done:DoneFn) => {
    activatedRoute.queryParams = of([])
    listItemsComponent.ngOnInit();

    errorService.error.subscribe((error) => {
      expect(error).toBe("error content")
      done()
    })
    getDataService.data.error("error content");
  })
  // it('should be create error', () => {
  //   const operations = [{value1: 1, value2: 2, action: "add"}];
  //   activatedRoute.queryParams = of([])
  //   activatedRoute.
  //   getDataService.filterData = () => {
  //     getDataService.data.next(operations)
  //   }
  //   listItemsComponent.ngOnInit();
  //   expect(listItemsComponent.operations).toEqual(operations)
  // })
})
