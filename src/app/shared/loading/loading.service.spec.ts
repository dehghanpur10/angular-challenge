import {TestBed} from '@angular/core/testing';

import {LoadingService} from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadingService
      ]
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be True', (done: DoneFn) => {
    service.load.subscribe(state => {
      expect(state).toBeTruthy();
      done();
    })
    service.turnOnLoading();
  });

  it('should be False', (done: DoneFn) => {
    service.load.subscribe(state => {
      expect(state).toBeFalsy();
      done();
    })
    service.turnOffLoading()
  });
});
