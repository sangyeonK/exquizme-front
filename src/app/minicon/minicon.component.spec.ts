import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniconComponent } from './minicon.component';

describe('MiniconComponent', () => {
  let component: MiniconComponent;
  let fixture: ComponentFixture<MiniconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
