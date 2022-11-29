import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { IssuesModalService } from './issues-modal.service';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import Spy = jasmine.Spy;
import { EditIssueModalComponent } from '../components/edit-issue-modal/edit-issue-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeleteIssueModalComponent } from '../components/delete-issue-modal/delete-issue-modal.component';

interface IssuesModalServiceMock {
  dialog: {
    open: Spy;
  };
}

const mockService = (service: IssuesModalService) =>
  service as unknown as IssuesModalServiceMock;

describe('IssuesModalService', () => {
  let service: IssuesModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: { afterClosed: () => undefined } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { title: 'Issue #1', description: 'test', tags: [] },
        },
      ],
    });
    service = TestBed.inject(IssuesModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('openEditDialog', () => {
    it('should open edit dialog', async () => {
      const issue = {
        id: '1',
        title: 'Issue #1',
        description: 'test',
        tags: [],
      };
      const expected = {
        width: '650px',
        data: issue,
      };

      mockService(service).dialog.open = jasmine
        .createSpy()
        .and.returnValue({ afterClosed: () => of(undefined) });

      service.openEditDialog(issue);

      expect(mockService(service).dialog.open).toHaveBeenCalledOnceWith(
        EditIssueModalComponent,
        expected
      );
    });
  });

  describe('openDeleteDialog', () => {
    it('should open edit dialog', async () => {
      const id = '1';
      const expected = {
        width: '200px',
        data: id,
      };

      mockService(service).dialog.open = jasmine
        .createSpy()
        .and.returnValue({ afterClosed: () => of(undefined) });

      service.openDeleteDialog(id);

      expect(mockService(service).dialog.open).toHaveBeenCalledOnceWith(
        DeleteIssueModalComponent,
        expected
      );
    });
  });
});
