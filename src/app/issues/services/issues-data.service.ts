import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';
import { Issue } from '../types/issue.interface';
import { IssuesTagsService } from './issues-tags.service';

@Injectable({ providedIn: 'root' })
export class IssuesDataService implements OnDestroy {
  constructor(
    private httpClient: HttpClient,
    private issuesTagsService: IssuesTagsService
  ) {
    this.loadData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.setIssues(data);
        this.initializeTags(data);
      });
  }

  private readonly _issuesSubject: BehaviorSubject<Issue[]> =
    new BehaviorSubject([] as Issue[]);

  private readonly destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setIssues(data: Issue[]): void {
    this._issuesSubject.next(data);
  }

  get issues$(): Observable<Issue[]> {
    return this._issuesSubject as Observable<Issue[]>;
  }

  loadData(): Observable<Issue[]> {
    return this.httpClient
      .get('/assets/mock/issues/data.json')
      .pipe(map(data => data as Array<Issue>));
  }

  private initializeTags(data: Issue[]): void {
    this.issuesTagsService.setTags(
      data.reduce(
        (prev, current) =>
          prev.concat(current.tags.filter(tag => prev.indexOf(tag) === -1)),
        [] as string[]
      )
    );
  }
}
