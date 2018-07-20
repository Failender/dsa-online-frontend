import { TestBed, inject } from '@angular/core/testing';

import { AbenteuerService } from './abenteuer.service';

describe('AbenteuerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbenteuerService]
    });
  });

  it('should be created', inject([AbenteuerService], (service: AbenteuerService) => {
    expect(service).toBeTruthy();
  }));
});
