import {TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';

import {GetDataService} from './get-data.service'
import {FetchDataService} from '../fetch-data/fetch-data.service'
import {Number, Action} from '../../models/app.model'

const numbers: Number[] = [
  {value: 1, action: "add"},
  {value: 1, action: "multiply"},
]
const actionValue = {
  add: 5,
  multiply: 2
}

describe('GetDataService', () => {
  let getData: GetDataService;
  let fetchDataService: jasmine.SpyObj<FetchDataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('FetchDataService', ['getNumber', 'getActionValue']);

    TestBed.configureTestingModule({
      providers: [
        GetDataService,
        {provide: FetchDataService, useValue: spy}
      ]
    });
    getData = TestBed.inject(GetDataService);
    fetchDataService = TestBed.inject(FetchDataService) as jasmine.SpyObj<FetchDataService>;
  });

  it('should be return all operations', (done: DoneFn) => {
    fetchDataService.getNumber.and.returnValue(of(numbers))
    fetchDataService.getActionValue.and.returnValue(of(actionValue))

    getData.filterData('').subscribe((data) => {
      expect(data).toEqual([
        {value1: 1, value2: 5, action: "add"},
        {value1: 1, value2: 2, action: "multiply"}
      ])
      done()
    })

  });

  it('should be return multiply operations', (done: DoneFn) => {
    fetchDataService.getNumber.and.returnValue(of(numbers))
    fetchDataService.getActionValue.and.returnValue(of(actionValue))

    getData.filterData('multiply').subscribe((data) => {
      expect(data).toEqual([
        {value1: 1, value2: 2, action: "multiply"}
      ])
      done()
    })

  });

  it('should be return add operations', (done: DoneFn) => {
    fetchDataService.getNumber.and.returnValue(of(numbers))
    fetchDataService.getActionValue.and.returnValue(of(actionValue))

    getData.filterData('add').subscribe((data) => {
      expect(data).toEqual([
        {value1: 1, value2: 5, action: "add"},
      ])
      done()
    })

  });
});
