import { TestBed, inject } from '@angular/core/testing';

import { QuizSetService } from './quiz-set.service';

describe('QuizSetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizSetService]
    });
  });

  it('should be created', inject([QuizSetService], (service: QuizSetService) => {
    expect(service).toBeTruthy();
  }));
});
