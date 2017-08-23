import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSolveQuizComponent } from './start-solve-quiz.component';

describe('StartSolveQuizComponent', () => {
  let component: StartSolveQuizComponent;
  let fixture: ComponentFixture<StartSolveQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartSolveQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSolveQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
