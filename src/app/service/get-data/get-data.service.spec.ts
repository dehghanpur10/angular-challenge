import {TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';

import {GetDataService} from './get-data.service'
import {FetchDataService} from '../fetch-data/fetch-data.service'
import {Number, Action} from '../../models/app.model'

describe('GetDataService', () => {
  let getData: GetDataService;
  let fetchDataService: jasmine.SpyObj<FetchDataService>;
  const numbers: Number[] = [
    {value: 1, action: "add"},
    {value: 1, action: "multiply"},
  ]
  const actionValue = {
    add: 5,
    multiply: 2
  }
  beforeEach(() => {
    const spy = jasmine.createSpyObj('FetchDataService', ['getNumber', 'getActionValue']);

    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [
        GetDataService,
        {provide: FetchDataService, useValue: spy}
      ]
    });
    // Inject both the service-to-test and its (spy) dependency
    getData = TestBed.inject(GetDataService);
    fetchDataService = TestBed.inject(FetchDataService) as jasmine.SpyObj<FetchDataService>;
  });

  it('should be return all operations', (done: DoneFn) => {
    fetchDataService.getNumber.and.returnValue(of(numbers))
    fetchDataService.getActionValue.and.returnValue(of(actionValue))
    getData.data.subscribe((data) => {
     expect(data).toEqual([
       {value1: 1, value2: 5, action: "add"},
       {value1: 1, value2: 2, action: "multiply"}
     ])
      done()
    })

    getData.filterData('')

  })
  it('should be return multiply operations', (done: DoneFn) => {
    fetchDataService.getNumber.and.returnValue(of(numbers))
    fetchDataService.getActionValue.and.returnValue(of(actionValue))
    getData.data.subscribe((data) => {
      expect(data).toEqual([
        {value1: 1, value2: 2, action: "multiply"}
      ])
      done()
    })

    getData.filterData('multiply')

  })
  it('should be return add operations', (done: DoneFn) => {
    fetchDataService.getNumber.and.returnValue(of(numbers))
    fetchDataService.getActionValue.and.returnValue(of(actionValue))
    getData.data.subscribe((data) => {
      expect(data).toEqual([
        {value1: 1, value2: 5, action: "add"},
      ])
      done()
    })

    getData.filterData('add')

  })
  it('should be return error', (done: DoneFn) => {
    fetchDataService.getNumber.and.returnValue(throwError(() => {
      return new Error("error");
    }))
    getData.data.subscribe(() => {
    }, (error) => {
      expect(error).toBe("error in number file")
      done()
    })
    getData.filterData('')
  })
});
