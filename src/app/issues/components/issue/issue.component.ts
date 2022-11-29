import { Component, Input } from '@angular/core';
import { IssuesModalService } from '../../services/public-api';
import { Issue } from '../../types/public-api';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.less'],
})
export class IssueComponent {
  @Input()
  issue!: Issue;

  constructor(private issuesModalService: IssuesModalService) {}

  openEditDialog(): void {
    this.issuesModalService.openEditDialog(this.issue);
  }

  openDeleteDialog(): void {
    this.issuesModalService.openDeleteDialog(this.issue.id);
  }
}
