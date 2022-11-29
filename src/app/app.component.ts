import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Renderer2,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, TitleStrategy } from '@angular/router';
import { filter } from 'rxjs';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private router: Router, private renderer: Renderer2) {}

  onDarkModeChange(isDarkMode: boolean) {
    isDarkMode
      ? this.renderer.addClass(document.body, 'theme-dark')
      : this.renderer.removeClass(document.body, 'theme-dark');
  }
}
