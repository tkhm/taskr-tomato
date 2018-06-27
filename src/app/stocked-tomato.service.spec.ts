import { TestBed, inject } from '@angular/core/testing';

import { StockedTomatoService } from './stocked-tomato.service';

describe('StockedTomatoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockedTomatoService]
    });
  });

  it('should be created', inject([StockedTomatoService], (service: StockedTomatoService) => {
    expect(service).toBeTruthy();
  }));
});
