import { ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should be display error', ()=>{
    component.isLoading = true;
    fixture.detectChanges();
    const errorDebug: DebugElement = fixture.debugElement;
    const div:HTMLElement  = errorDebug.query(By.css('.lds-ellipsis')).nativeElement;
    expect(div).toBeDefined()
  });
  it('should be not display error', ()=>{
    component.isLoading = false;
    fixture.detectChanges();
    const errorDebug: DebugElement = fixture.debugElement;
    const div  = errorDebug.query(By.css('.lds-ellipsis'));
    expect(div).toBeNull()
  });
});
