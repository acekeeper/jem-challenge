import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIssueModalComponent } from './edit-issue-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('EditIssueModalComponent', () => {
  let component: EditIssueModalComponent;
  let fixture: ComponentFixture<EditIssueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditIssueModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { title: 'Issue #1', description: 'test', tags: [] },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditIssueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
