import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {FetchDataService} from './fetch-data.service';
import {Number, Action} from '../../models/app.model'

describe('FetchDataService', () => {
  let service: FetchDataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FetchDataService);
  });



  it('should return array of number', () => {
    const numbers: Number[] = [{value: 1, action: "add"}, {value: 2, action: "multiply"}]
    service.getNumber().subscribe(data =>
      expect(data).toEqual(numbers)
    );
    const req = httpTestingController.expectOne(service.numberUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(numbers);
    httpTestingController.verify();
  });

  // it('should return value of add action', () => {
  //   const add: Action= {value: 1}
  //   service.getAdd().subscribe(data =>
  //     expect(data).toEqual(add.value)
  //   );
  //   const req = httpTestingController.expectOne(service.addUrl);
  //   expect(req.request.method).toEqual('GET');
  //   req.flush(add);
  //   httpTestingController.verify();
  // });
  //
  // it('should return value of multiply action', () => {
  //   const multiply: Action= {value: 1}
  //   service.getMultiply().subscribe(data =>
  //     expect(data).toEqual(multiply.value)
  //   );
  //   const req = httpTestingController.expectOne(service.multiplyUrl);
  //   expect(req.request.method).toEqual('GET');
  //   req.flush(multiply);
  //   httpTestingController.verify();
  // });

  it('should return value of actions', () => {
    const multiply: Action= {value: 1}
    const add: Action= {value: 3}
    service.getActionValue().subscribe(data =>
      expect(data).toEqual({add:3,multiply:1})
    );

    const addReq = httpTestingController.expectOne(service.addUrl);
    expect(addReq.request.method).toEqual('GET');
    addReq.flush(add);

    const mulReq = httpTestingController.expectOne(service.multiplyUrl);
    expect(mulReq.request.method).toEqual('GET');
    mulReq.flush(multiply);

    httpTestingController.verify();
  });
  it('should return MISSING DATA for value of actions', () => {
    service.getActionValue().subscribe(data =>
      expect(data).toEqual({add:'MISSING DATA',multiply:'MISSING DATA'})
    );

    const addReq = httpTestingController.expectOne(service.addUrl);
    expect(addReq.request.method).toEqual('GET');
    addReq.flush("",{ status: 404, statusText: 'Not Found' });

    const mulReq = httpTestingController.expectOne(service.multiplyUrl);
    expect(mulReq.request.method).toEqual('GET');
    mulReq.flush("",{ status: 404, statusText: 'Not Found' });

    httpTestingController.verify();
  });
});
