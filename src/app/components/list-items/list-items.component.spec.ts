// import {ListItemsComponent} from './list-items.component'
// import {ComponentFixture, TestBed} from "@angular/core/testing";
// import {GetDataService} from "../../service/get-data/get-data.service";
// import {ErrorService} from '../../service/error/error.service'
// import {ActivatedRoute, RouterModule} from "@angular/router";
// import {Subject} from 'rxjs';
// import {FetchDataService} from '../../service/fetch-data/fetch-data.service'
//
//
// describe('ListItemsComponent', () => {
//   let component: ListItemsComponent;
//   let fixture: ComponentFixture<ListItemsComponent>;
//   // let listItemsComponent: ListItemsComponent
//   let getData: GetDataService
//   let activatedRoute: ActivatedRoute
//   let errorService: ErrorService
//   beforeEach(() => {
//     const spy1 = jasmine.createSpyObj('GetDataService', ['filterData']);
//     const spy2 = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
//     TestBed.configureTestingModule({
//       declarations: [ListItemsComponent],
//       imports:[
//         RouterModule
//       ],
//       providers: [
//         FetchDataService,
//         ErrorService,
//         ActivatedRoute,
//         {provide: GetDataService, useValue: spy1},
//         // {provide: ActivatedRoute, useValue: spy2}
//       ]
//     }).compileComponents();
//
//     // listItemsComponent = TestBed.inject(ListItemsComponent)
//     activatedRoute = TestBed.inject(ActivatedRoute)
//     getData = TestBed.inject(GetDataService)
//     errorService = TestBed.inject((ErrorService))
//     fixture = TestBed.createComponent(ListItemsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   })
//   it('should be get operations', (done: DoneFn) => {
//     const operations = [{value1: 1, value2: 2, action: "add"}]
//     // getData.data = new Subject()
//     getData.data.next(operations)
//     expect(component.operations).toEqual([{value1: 2, value2: 2, action: "add"}])
//   });
// })
