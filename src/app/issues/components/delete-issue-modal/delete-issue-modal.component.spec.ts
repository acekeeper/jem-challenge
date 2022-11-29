import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIssueModalComponent } from './delete-issue-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DeleteIssueModalComponent', () => {
  let component: DeleteIssueModalComponent;
  let fixture: ComponentFixture<DeleteIssueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteIssueModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteIssueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
