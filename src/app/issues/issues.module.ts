import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesComponent } from './issues.component';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { IssuesTableComponent } from './components/issues-table/issues-table.component';
import { EditIssueModalComponent } from './components/edit-issue-modal/edit-issue-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TagsSelectorComponent } from './components/tags-selector/tags-selector.component';
import { DeleteIssueModalComponent } from './components/delete-issue-modal/delete-issue-modal.component';
import { IssueComponent } from './components/issue/issue.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
  ],
  exports: [IssuesComponent],
  declarations: [
    IssuesComponent,
    EditIssueModalComponent,
    DeleteIssueModalComponent,
    IssuesTableComponent,
    TagsSelectorComponent,
    IssueComponent,
  ],
})
export class IssuesModule {}
