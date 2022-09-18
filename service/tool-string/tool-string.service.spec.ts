import { TestBed } from '@angular/core/testing';

import { ToolStringService } from './tool-string.service';

describe('ToolStringService', () => {
  let service: ToolStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
