import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule } from 'ngx-logger';

import { environment } from '../environments/environment';
import { UtilService } from './services/util.service';
import { QuizSetService } from './services/quiz-set.service';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './parts/top-menu/top-menu.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { SelectQuizComponent } from './pages/select-quiz/select-quiz.component';
import { MiniconComponent } from './parts/minicon/minicon.component';
import { AddQuizComponent } from './popups/add-quiz/add-quiz.component';
import { DelQuizComponent } from './popups/del-quiz/del-quiz.component';
import { ShareQuizComponent } from './popups/share-quiz/share-quiz.component';
import { TagQuiztypeComponent } from './parts/tag-quiztype/tag-quiztype.component';
import { ShareQuizCompleteComponent } from './popups/share-quiz-complete/share-quiz-complete.component';
import { SolveQuizComponent } from './pages/solve-quiz/solve-quiz.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { SubmitResultComponent } from './popups/submit-result/submit-result.component';
import { StartSolveQuizComponent } from './pages/start-solve-quiz/start-solve-quiz.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'select_quiz', component: SelectQuizComponent },
  { path: 'start_solve_quiz/:quizsetId', component: StartSolveQuizComponent },
  { path: 'solve_quiz', component: SolveQuizComponent },
  { path: 'ranking/:quizsetId', component: RankingComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    MainComponent,
    LoginComponent,
    SelectQuizComponent,
    MiniconComponent,
    AddQuizComponent,
    DelQuizComponent,
    ShareQuizComponent,
    TagQuiztypeComponent,
    ShareQuizCompleteComponent,
    SolveQuizComponent,
    RankingComponent,
    SubmitResultComponent,
    StartSolveQuizComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    LoggerModule.forRoot({ level: environment.logLevel })
  ],
  providers: [
    UtilService,
    QuizSetService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
