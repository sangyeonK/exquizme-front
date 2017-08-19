import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareQuizCompleteComponent } from './share-quiz-complete.component';

describe('ShareQuizCompleteComponent', () => {
  let component: ShareQuizCompleteComponent;
  let fixture: ComponentFixture<ShareQuizCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareQuizCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareQuizCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
