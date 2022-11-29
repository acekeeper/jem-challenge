import { Injectable, NgModule } from '@angular/core';
import {
  RouterModule,
  RouterStateSnapshot,
  Routes,
  TitleStrategy,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IssuesComponent } from './issues/public-api';

const routes: Routes = [
  { path: 'issues', title: 'Issues List', component: IssuesComponent },
  { path: '', redirectTo: 'issues', pathMatch: 'full' }, // redirect to `JemIssueListComponent`
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const partial = this.buildTitle(routerState);
    if (partial !== undefined) {
      this.title.setTitle(`${this.title.getTitle()} | ${partial}`);
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
})
export class AppRoutingModule {}
