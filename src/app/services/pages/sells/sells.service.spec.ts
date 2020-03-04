import { TestBed } from '@angular/core/testing';

import { SellsService } from './sells.service';

describe('SellsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellsService = TestBed.get(SellsService);
    expect(service).toBeTruthy();
  });
});
