import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Issue } from '../../types/public-api';
import {
  IssuesDataService,
  IssuesModalService,
} from '../../services/public-api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-issues-table',
  templateUrl: './issues-table.component.html',
  styleUrls: ['./issues-table.component.less'],
})
export class IssuesTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginatorElement!: MatPaginator;

  public filterTags: string[] = [];
  public dataSource = new MatTableDataSource([] as Issue[]);
  public readonly displayedColumns: string[] = ['issue'];
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(
    private issuesDataService: IssuesDataService,
    private issuesModalService: IssuesModalService
  ) {}

  ngOnInit(): void {
    this.issuesDataSubscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTagsSelectionChange(value: string[]) {
    this.dataSource.filter = value.join(',');
  }

  openCreateDialog(): void {
    const newIssue = {
      id: '' + (this.dataSource.data.length + 1),
      title: '',
      description: '',
      tags: [],
    };
    this.issuesModalService.openEditDialog(newIssue);
  }

  private issuesDataSubscribe(): void {
    this.issuesDataService.issues$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.initializeIssuesTable(data));
  }

  private initializeIssuesTable(data: Issue[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginatorElement;
    this.dataSource.filterPredicate = (entity: Issue, filter: string) =>
      !filter ||
      filter.split(',').every(tag => entity.tags.indexOf(tag) !== -1);
  }
}
