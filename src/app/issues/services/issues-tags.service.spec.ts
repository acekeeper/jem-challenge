import { TestBed } from '@angular/core/testing';

import { firstValueFrom } from 'rxjs';
import { IssuesTagsService } from './issues-tags.service';

describe('IssuesTagsService', () => {
  let service: IssuesTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuesTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setTags', () => {
    it('should populate tags$ array', async () => {
      const expected = ['tag1'];

      service.setTags(['tag1']);

      const result = await firstValueFrom(service.tags$);

      expect(result).toEqual(expected);
    });
  });
});
