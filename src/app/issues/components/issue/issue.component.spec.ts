import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueComponent } from './issue.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import Spy = jasmine.Spy;

interface IssueComponentMock {
  issuesModalService: {
    openEditDialog: Spy;
    openDeleteDialog: Spy;
  };
}

const mockComponent = (component: IssueComponent) =>
  component as unknown as IssueComponentMock;

const issueMock = {
  id: '1',
  title: 'Test issue',
  description: 'Issue description',
  tags: [],
};

describe('IssueComponent', () => {
  let component: IssueComponent;
  let fixture: ComponentFixture<IssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssueComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatMenuModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: issueMock.title,
            description: issueMock.description,
            tags: issueMock.tags,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueComponent);
    component = fixture.componentInstance;
    component.issue = issueMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openEditDialog', () => {
    it('should trigger issuesModalService.openEditDialog()', () => {
      mockComponent(component).issuesModalService.openEditDialog =
        jasmine.createSpy();

      component.openEditDialog();

      expect(
        mockComponent(component).issuesModalService.openEditDialog
      ).toHaveBeenCalledOnceWith(component.issue);
    });
  });

  describe('openDeleteDialog', () => {
    it('should trigger issuesModalService.openDeleteDialog()', () => {
      mockComponent(component).issuesModalService.openDeleteDialog =
        jasmine.createSpy();

      component.openDeleteDialog();

      expect(
        mockComponent(component).issuesModalService.openDeleteDialog
      ).toHaveBeenCalledOnceWith(component.issue.id);
    });
  });
});
