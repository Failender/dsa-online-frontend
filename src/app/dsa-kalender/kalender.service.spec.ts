import { TestBed, inject } from '@angular/core/testing';

import { KalenderService } from './kalender.service';

describe('KalenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KalenderService]
    });
  });

  it('should be created', inject([KalenderService], (service: KalenderService) => {
    expect(service).toBeTruthy();
  }));
});
