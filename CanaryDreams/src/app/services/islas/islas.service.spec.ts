import { TestBed } from '@angular/core/testing';

import { IslasService } from './islas.service';

describe('IslasService', () => {
  let service: IslasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IslasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
