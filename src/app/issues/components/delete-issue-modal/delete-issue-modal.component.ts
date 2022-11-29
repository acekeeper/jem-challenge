import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IssuesTagsService } from '../../services/issues-tags.service';

@Component({
  selector: 'app-delete-issue-modal',
  templateUrl: './delete-issue-modal.component.html',
  styleUrls: ['./delete-issue-modal.component.less'],
})
export class DeleteIssueModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteIssueModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private issuesTagService: IssuesTagsService
  ) {}
}
