import { TestBed } from '@angular/core/testing';

import { ImageOverlayService } from './image-overlay.service';

describe('ImageOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageOverlayService = TestBed.get(ImageOverlayService);
    expect(service).toBeTruthy();
  });
});
