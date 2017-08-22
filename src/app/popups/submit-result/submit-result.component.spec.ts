import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitResultComponent } from './submit-result.component';

describe('SubmitResultComponent', () => {
  let component: SubmitResultComponent;
  let fixture: ComponentFixture<SubmitResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
