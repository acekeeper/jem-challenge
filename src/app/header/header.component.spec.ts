import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import Spy = jasmine.Spy;
import { Subject } from 'rxjs';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';

interface HeaderComponentMock {
  routerEventsSubscribe: Spy;
}

const mockComponent = (component: HeaderComponent) =>
  component as unknown as HeaderComponentMock;

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should trigger routerEventsSubscribe()', () => {
      mockComponent(component).routerEventsSubscribe = jasmine.createSpy();

      component.ngOnInit();

      expect(mockComponent(component).routerEventsSubscribe).toHaveBeenCalled();
    });
  });

  describe('toggleDarkMode', () => {
    it('should emit darkModeChange event', () => {
      const toggleEvent = new MatSlideToggleChange(
        undefined as unknown as MatSlideToggle,
        true
      );
      component.darkModeChange.emit = jasmine.createSpy();

      component.toggleDarkMode(toggleEvent);

      expect(component.darkModeChange.emit).toHaveBeenCalled();
    });
  });
});
