import { TestBed, inject } from '@angular/core/testing';

import { SkriptService } from './skript.service';

describe('SkriptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkriptService]
    });
  });

  it('should be created', inject([SkriptService], (service: SkriptService) => {
    expect(service).toBeTruthy();
  }));
});
