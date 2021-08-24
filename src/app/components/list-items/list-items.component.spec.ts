import {ActivatedRoute, Params} from "@angular/router";
import {fakeAsync, TestBed} from "@angular/core/testing";

import {GetDataService} from "../../service/get-data/get-data.service";
import {ErrorService} from '../../service/error/error.service'
import {ListItemsComponent} from "./list-items.component";
import {of, Subject} from "rxjs";
import {FetchDataService} from "../../service/fetch-data/fetch-data.service";

describe('ListItemsComponent', () => {
  let activatedRoute: ActivatedRoute;
  let getDataService: GetDataService;
  let errorService: ErrorService;
  let listItemsComponent: ListItemsComponent;
  beforeEach(() => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
    const getDataSpy = jasmine.createSpyObj('GetDataService', ['filterData']);
    const errorSpy = jasmine.createSpyObj('ErrorService', ['createError']);
    const mock = {
      error :new Subject(),
      createError : function (a:string){
        this.error.next(a)
      }
    }
    TestBed.configureTestingModule({
      providers: [
        ListItemsComponent,
        {provide: ActivatedRoute, useValue: routeSpy},
        {provide: GetDataService, useValue: getDataSpy},
        {provide: ErrorService, useValue: mock},
      ]
    });
    listItemsComponent = TestBed.inject(ListItemsComponent);
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    getDataService = TestBed.inject(GetDataService) as jasmine.SpyObj<GetDataService>;
    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;

    getDataService.data = new Subject();
    // errorService.error = new Subject()

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
    errorService.error.subscribe((error) => {
      expect(error).toBe("There is a problem on the server")

      done()
    })
    listItemsComponent.ngOnInit();
    getDataService.data.error("error content");
  })
  it('should be get new operations', () => {
    const operations = [{value1: 1, value2: 2, action: "add"}];
    const subject = new Subject<Params>()
    activatedRoute.queryParams = subject.asObservable()
    getDataService.filterData = () => {
      getDataService.data.next(operations)
    }
    listItemsComponent.ngOnInit();

    subject.next({filter:''})
    expect(listItemsComponent.operations).toEqual(operations)
  })
})
