import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsSelectorComponent } from './tags-selector.component';
import {
  _MatAutocompleteBase,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import Spy = jasmine.Spy;
import { _MatOptionBase } from '@angular/material/core';

interface TagsSelectorComponentMock {
  tagsSubscribe: Spy;
  issuesTagsService: {
    setTags: Spy;
  };
}

const mockComponent = (component: TagsSelectorComponent) =>
  component as unknown as TagsSelectorComponentMock;

describe('TagsSelectorComponent', () => {
  let component: TagsSelectorComponent;
  let fixture: ComponentFixture<TagsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagsSelectorComponent],
      imports: [MatAutocompleteModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should trigger tagsSubscribe()', () => {
      mockComponent(component).tagsSubscribe = jasmine.createSpy();

      component.ngOnInit();

      expect(mockComponent(component).tagsSubscribe).toHaveBeenCalled();
    });
  });

  describe('onRemove', () => {
    it('should remove tag from entityTags array', () => {
      const expected = ['tag2'];
      component.entityTags = ['tag1', 'tag2'];

      component.onRemove('tag1');

      expect(component.entityTags).toEqual(expected);
    });

    it('should not remove tag from entityTags array if does not there', () => {
      const expected = ['tag1', 'tag2'];
      component.entityTags = ['tag1', 'tag2'];

      component.onRemove('tag3');

      expect(component.entityTags).toEqual(expected);
    });

    it('should trigger changeSelection emit() with entity tags', () => {
      component.changeSelection.emit = jasmine.createSpy();

      const expected = ['tag2'];
      component.entityTags = ['tag1', 'tag2'];

      component.onRemove('tag1');

      expect(component.changeSelection.emit).toHaveBeenCalledOnceWith(expected);
    });

    it('should not trigger changeSelection emit() if global tags provided', () => {
      component.allTags = ['tag1', 'tag2'];
      component.changeSelection.emit = jasmine.createSpy();

      component.onRemove('tag1', component.allTags);

      expect(component.changeSelection.emit).not.toHaveBeenCalled();
    });
  });

  describe('onSelect', () => {
    let event: MatAutocompleteSelectedEvent;

    beforeEach(
      () =>
        (event = new MatAutocompleteSelectedEvent(
          undefined as unknown as _MatAutocompleteBase,
          { value: 'tag2' } as unknown as _MatOptionBase
        ))
    );

    it('should trigger onRemove()', () => {
      component.onRemove = jasmine.createSpy();

      component.onSelect(event);

      expect(component.onRemove).toHaveBeenCalled();
    });

    it('should push event option to entityTags', () => {
      const expected = ['tag1', 'tag2'];

      component.entityTags = ['tag1'];
      component.onSelect(event);

      expect(component.entityTags).toEqual(expected);
    });

    it('should reset tagInputControl value', () => {
      component.tagInputControl.setValue('some value');
      component.onSelect(event);

      expect(component.tagInputControl.value).toEqual('');
    });

    it('should trigger changeSelection emit() with entity tags', () => {
      component.changeSelection.emit = jasmine.createSpy();

      const expected = ['tag2'];
      component.onSelect(event);

      expect(component.changeSelection.emit).toHaveBeenCalledOnceWith(expected);
    });

    it('should populate trigger issuesTagsService.setTags() if not inside allTags', () => {
      const expected = ['tag1', 'tag2'];
      mockComponent(component).issuesTagsService.setTags = jasmine.createSpy();

      component.allTags = ['tag1'];
      component.onSelect(event);

      expect(
        mockComponent(component).issuesTagsService.setTags
      ).toHaveBeenCalledOnceWith(expected);
    });
  });
});
