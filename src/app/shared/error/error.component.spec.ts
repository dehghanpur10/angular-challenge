import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

import {ErrorComponent} from './error.component'

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [ErrorComponent]}).compileComponents();
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should be display error', ()=>{
    component.error = "test error";
    fixture.detectChanges();
    const errorDebug: DebugElement = fixture.debugElement;
    const div:HTMLElement  = errorDebug.query(By.css('.error')).nativeElement;
    expect(div.textContent).toContain("test error")
  });

});
