import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelQuizComponent } from './del-quiz.component';

describe('DelQuizComponent', () => {
  let component: DelQuizComponent;
  let fixture: ComponentFixture<DelQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
