import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { NavigationEnd, Router, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  titleString: string | undefined;

  @Output()
  darkModeChange = new EventEmitter<boolean>();

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private titleStrategy: TitleStrategy,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.routerEventsSubscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleDarkMode({ checked }: MatSlideToggleChange) {
    this.darkModeChange.emit(checked);
  }

  private routerEventsSubscribe(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => (this.titleString = this.getFullTitleString()));
  }

  private getFullTitleString(): string {
    return `${this.title.getTitle()} | ${this.titleStrategy.buildTitle(
      this.router.routerState.snapshot
    )}`;
  }
}
