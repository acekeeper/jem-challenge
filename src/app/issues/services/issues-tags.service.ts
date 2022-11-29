import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IssuesTagsService {
  private _tagsSubject: BehaviorSubject<string[]> = new BehaviorSubject(
    [] as string[]
  );

  setTags(tags: string[]) {
    this._tagsSubject.next(tags);
  }

  get tags$() {
    return this._tagsSubject as Observable<string[]>;
  }
}
