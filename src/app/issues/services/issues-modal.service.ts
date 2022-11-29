import { Injectable } from '@angular/core';
import { withLatestFrom } from 'rxjs';
import { Issue } from '../types/issue.interface';
import { EditIssueModalComponent } from '../components/edit-issue-modal/edit-issue-modal.component';
import { DeleteIssueModalComponent } from '../components/delete-issue-modal/delete-issue-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { IssuesDataService } from './issues-data.service';

@Injectable({ providedIn: 'root' })
export class IssuesModalService {
  constructor(
    private issuesDataService: IssuesDataService,
    private dialog: MatDialog
  ) {}

  openEditDialog(issue: Issue): void {
    const dialogRef = this.dialog.open(EditIssueModalComponent, {
      width: '650px',
      data: { ...issue },
    });

    dialogRef
      .afterClosed()
      .pipe(withLatestFrom(this.issuesDataService.issues$))
      .subscribe(([changedIssue, issues]) => {
        const target = issues.find(({ id }) => id === changedIssue.id);

        if (target) {
          const targetIndex = issues.indexOf(target);
          issues[targetIndex] = changedIssue;
        } else {
          issues.push(changedIssue);
        }

        this.issuesDataService.setIssues(issues);
      });
  }

  openDeleteDialog(entityId: string): void {
    const dialogRef = this.dialog.open(DeleteIssueModalComponent, {
      width: '200px',
      data: entityId,
    });

    dialogRef
      .afterClosed()
      .pipe(withLatestFrom(this.issuesDataService.issues$))
      .subscribe(([confirm, issues]) => {
        if (!confirm) {
          return;
        }
        const target = issues.find(({ id }) => id === entityId);
        if (!target) {
          return;
        }
        const targetIndex = issues.indexOf(target);
        issues.splice(targetIndex, 1);

        this.issuesDataService.setIssues(issues);
      });
  }
}
