import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";

import {MaterialModule} from '../../../shared/material/material.module'
import {ItemComponent} from './item.component'


describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemComponent],
      imports: [BrowserAnimationsModule, MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('test logic of component', () => {
    describe('getBorder function', () => {
      it('should be return red border', () => {
        component.data = {value1: 0, value2: "MISSING DATA", action: ""}
        const border = component.getBorder()
        expect(border).toBe('5px solid red')
      });

      it('should be return orange border', () => {
        component.data = {value1: 0, value2: 0, action: "multiply"}
        const border = component.getBorder()
        expect(border).toBe('5px solid orange')
      });

      it('should be return green border', () => {
        component.data = {value1: 0, value2: 0, action: "add"}
        const border = component.getBorder()
        expect(border).toBe('5px solid green')
      });
    });

    describe('getResult', () => {
      it('should be return MISSING DATA', () => {
        component.data = {value1: 0, value2: "MISSING DATA", action: ""}
        const result = component.getResult()
        expect(result).toBe('MISSING DATA')
      });

      it('should be return multiply', () => {
        component.data = {value1: 3, value2: 5, action: "multiply"}
        const result = component.getResult()
        expect(result).toBe('3 * 5 = 15')
      });

      it('should be return add', () => {
        component.data = {value1: 3, value2: 5, action: "add"}
        const result = component.getResult()
        expect(result).toBe('3 + 5 = 8');
      });
    });
  });

  describe('test template of component', () => {
    it('should display action type', () => {
      component.data = {value1: 1, value2: 2, action: 'add'}
      fixture.detectChanges();
      const element: DebugElement = fixture.debugElement;
      const title = element.query(By.css('mat-card-title'));
      expect(title.nativeElement.textContent).toContain('add')
    });

    it('should display result', () => {
      component.data = {value1: 1, value2: 2, action: 'add'}
      fixture.detectChanges();
      const element: DebugElement = fixture.debugElement;
      const items = element.queryAll(By.css('.mat-h3'));
      expect(items[items.length - 1].nativeElement.textContent).toContain('1 + 2 = 3')
    });

    it('should display MISSING DATA', () => {
      component.data = {value1: 1, value2: '', action: 'add'}
      fixture.detectChanges();
      const element: DebugElement = fixture.debugElement;
      const items = element.queryAll(By.css('.mat-h3'));
      expect(items[items.length - 1].nativeElement.textContent).toContain('MISSING DATA')
    });
  });

});
