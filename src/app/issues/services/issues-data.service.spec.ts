import { TestBed } from '@angular/core/testing';

import { IssuesDataService } from './issues-data.service';
import { firstValueFrom } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('IssuesDataService', () => {
  let service: IssuesDataService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(IssuesDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setIssues', () => {
    it('should populate issues$ array', async () => {
      const issue = {
        id: '1',
        title: 'Issue #1',
        description: 'Description',
        tags: [],
      };
      const expected = [issue];

      service.setIssues([issue]);

      const result = await firstValueFrom(service.issues$);

      expect(result).toEqual(expected);
    });
  });

  describe('loadData', () => {
    it('should make HttpClient get', async () => {
      const expectedUrl = '/assets/mock/issues/data.json';

      service.loadData();

      expect(httpMock.expectOne(expectedUrl)).toBeTruthy();
    });
  });
});
