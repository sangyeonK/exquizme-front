import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagQuiztypeComponent } from './tag-quiztype.component';

describe('TagQuiztypeComponent', () => {
  let component: TagQuiztypeComponent;
  let fixture: ComponentFixture<TagQuiztypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagQuiztypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagQuiztypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
