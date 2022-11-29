import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { IssuesTagsService } from '../../services/public-api';

@Component({
  selector: 'app-tags-selector',
  templateUrl: './tags-selector.component.html',
  styleUrls: ['./tags-selector.component.less'],
})
export class TagsSelectorComponent implements OnInit, OnDestroy {
  @Input()
  entityTags: string[] = [];

  @Output()
  changeSelection = new EventEmitter<string[]>();

  public allTags: string[] = [];
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public readonly tagInputControl = new FormControl('');
  private readonly destroy$: Subject<void> = new Subject();

  public readonly filteredTags$ = this.tagInputControl.valueChanges.pipe(
    map((inputValue: string | null) => {
      return inputValue
        ? this.filterTagsByInput(inputValue)
        : this.allTags.slice();
    })
  );

  constructor(private issuesTagsService: IssuesTagsService) {}

  ngOnInit(): void {
    this.tagsSubscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRemove(tag: string, tags: string[] = this.entityTags): void {
    const index = tags.indexOf(tag);

    if (index >= 0) {
      tags.splice(index, 1);
    }

    if (tags !== this.allTags) {
      this.changeSelection.emit(this.entityTags);
    }
  }

  onSelect(event: MatAutocompleteSelectedEvent): void {
    this.onRemove(event.option.value, this.allTags);
    this.entityTags.push(event.option.value);
    this.tagInputControl.setValue('');
    this.changeSelection.emit(this.entityTags);

    if (!this.allTags.includes(event.option.value)) {
      this.issuesTagsService.setTags([...this.allTags, event.option.value]);
    }
  }

  private filterTagsByInput(inputValue: string): string[] {
    return this.allTags.filter(
      tag =>
        tag.toLowerCase().includes(inputValue.toLowerCase()) &&
        !this.entityTags.includes(tag)
    );
  }

  private tagsSubscribe(): void {
    this.issuesTagsService.tags$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tags => (this.allTags = tags));
  }
}
