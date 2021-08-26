import {TestBed} from "@angular/core/testing";

import {ErrorService} from './error.service'

describe('ErrorService', () => {
  let errorService: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ErrorService]});
    errorService = TestBed.inject(ErrorService);
  });

  it('should send error', (done: DoneFn) => {
    const errorContent: string = "error"
    errorService.error.subscribe(error => {
      expect(error).toBe(errorContent)
      done()
    });
    errorService.createError(errorContent)
  });

});
