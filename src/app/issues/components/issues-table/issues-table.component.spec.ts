import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesTableComponent } from './issues-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import Spy = jasmine.Spy;
import { MatTableDataSource } from '@angular/material/table';
import { Issue } from '../../types/issue.interface';

interface IssuesTableComponentMock {
  issuesDataSubscribe: Spy;
  issuesModalService: {
    openEditDialog: Spy;
  };
}

const mockComponent = (component: IssuesTableComponent) =>
  component as unknown as IssuesTableComponentMock;

describe('IssuesTableComponent', () => {
  let component: IssuesTableComponent;
  let fixture: ComponentFixture<IssuesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuesTableComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatMenuModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IssuesTableComponent);
    component = fixture.componentInstance;
    component.dataSource = new MatTableDataSource([] as Issue[]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should trigger issuesDataSubscribe()', () => {
      mockComponent(component).issuesDataSubscribe = jasmine.createSpy();

      component.ngOnInit();

      expect(mockComponent(component).issuesDataSubscribe).toHaveBeenCalled();
    });
  });

  describe('onTagsSelectionChange', () => {
    it('should set dataSource filter', () => {
      const tags = ['tag1', 'tag2'];
      const expected = 'tag1,tag2';

      component.onTagsSelectionChange(tags);

      expect(component.dataSource.filter).toEqual(expected);
    });
  });

  describe('openCreateDialog', () => {
    it('should trigger issuesModalService.openEditDialog() with empty issue', () => {
      const expected = {
        id: '1',
        title: '',
        description: '',
        tags: [],
      };

      mockComponent(component).issuesModalService.openEditDialog =
        jasmine.createSpy();

      component.openCreateDialog();

      expect(
        mockComponent(component).issuesModalService.openEditDialog
      ).toHaveBeenCalledOnceWith(expected);
    });
  });
});
