import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Issue } from '../../types/public-api';
import { FormControl } from '@angular/forms';
import {
  IssuesTagsService,
  EvaluateMathExpressionService,
} from '../../services/public-api';

@Component({
  selector: 'app-edit-issue-modal',
  templateUrl: './edit-issue-modal.component.html',
  styleUrls: ['./edit-issue-modal.component.less'],
})
export class EditIssueModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditIssueModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Issue,
    private issuesTagService: IssuesTagsService,
    private mathService: EvaluateMathExpressionService
  ) {}

  private initialData!: Issue;

  public readonly titleControl = new FormControl('');
  public readonly descriptionControl = new FormControl('');
  public readonly tagsControl = new FormControl([] as string[]);

  ngOnInit(): void {
    this.initialData = { ...this.data };
    this.initializeForm();
  }

  get hasChanges(): boolean {
    return (
      this.titleControl.value !== this.initialData.title ||
      this.descriptionControl.value !== this.initialData.description ||
      this.tagsControl.value?.join(',') !== this.initialData.tags.join(',')
    );
  }

  resetChanges(): void {
    this.data = { ...this.initialData };
    this.initializeForm();
  }

  saveChanges(): void {
    if (!this.titleControl.valid) {
      return;
    }
    const result = {
      id: this.data.id,
      title: this.titleControl.value,
      description: this.mathService.replaceMathExpression(
        this.descriptionControl.value || ''
      ),
      tags: this.tagsControl.value,
    };

    this.dialogRef.close(result);
  }

  onTagsSelectionChange(selection: string[]): void {
    this.tagsControl.setValue(selection);
  }

  private initializeForm(): void {
    this.titleControl.setValue(this.data.title);
    this.descriptionControl.setValue(this.data.description);
    this.tagsControl.setValue([...this.data.tags]);
  }
}
