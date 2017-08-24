import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz, QuizType } from '../../models/model';
import { QuizSetService } from '../../services/quiz-set.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-solve-quiz',
  templateUrl: './solve-quiz.component.html',
  styleUrls: ['./solve-quiz.component.scss']
})
export class SolveQuizComponent implements OnInit {
  eQuizType = QuizType;
  index: number;
  currentQuiz: Quiz;

  choiceNumber: number;
  chooseNumber: number;
  clearQuiz: boolean;
  isCorrect: boolean;

  //결과
  playtime: number;
  correctCount: number;
  wrongCount: number;

  @ViewChild("sentenceQuizAnswer") sentenceQuizAnswer: ElementRef;

  constructor(private router: Router, private quizset: QuizSetService, private util: UtilService) {
    this.index = 0;

    this.playtime = 0;
    this.correctCount = 0;
    this.wrongCount = 0;

    let quizzes: Quiz[] = [];

    let quiz: Quiz = new Quiz(0, "웹퀴즈 팀의 팀명은?\n가나다라마바사아자차카타파하\n하헤이후에호?");
    quiz.answerList = util.shuffle(['익스퀴즈미', '퀴즈인고양', '티키타카', '문제적사람']);
    quiz.correctAnswer = "익스퀴즈미";
    quiz.type = 1;

    quizzes.push(quiz);
    quizzes.push(quiz);

    this.quizset.set(quizzes);

  }

  ngOnInit() {
    if (!this.quizset.get() || this.quizset.get().length == 0)
      this.gotoHomePage();

    this.currentQuiz = this.quizset.get()[0];
  }

  gotoHomePage() {
    this.router.navigate(['home']);
  }

  choiceAnswer(number: number) {
    if (!this.clearQuiz) {
      this.choiceNumber = number;
    }
  }

  submit() {
    this.clearQuiz = true;
    let chooseAnswer: string;
    if(this.currentQuiz.type == QuizType.CHOICE_QUIZ)
      chooseAnswer = this.currentQuiz.answerList[this.choiceNumber];
    else
      chooseAnswer = (this.sentenceQuizAnswer.nativeElement as HTMLInputElement).value;

    if (chooseAnswer == this.currentQuiz.correctAnswer) {
      console.log("정답입니다!");
      this.isCorrect = true;
      this.correctCount++;
    }
    else {
      console.log("오답입니다!");
      this.isCorrect = false;
      this.chooseNumber = this.choiceNumber;
      this.choiceNumber = this.currentQuiz.answerList.findIndex( (answer) => answer == this.currentQuiz.correctAnswer );

      this.wrongCount++;
    }
  }

  nextQuiz() {

    if (this.quizset.get().length <= this.index + 1) {
      console.log("마지막 문제였음! 결과 이동!!");
      return;
    }

    this.index++;

    this.currentQuiz = this.quizset.get()[this.index];

    this.choiceNumber = undefined;
    this.chooseNumber = undefined;
    this.clearQuiz = false;
    this.isCorrect = false;
  }
}
