import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './parts/top-menu/top-menu.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { SelectQuizComponent } from './pages/select-quiz/select-quiz.component';
import { MiniconComponent } from './parts/minicon/minicon.component';
import { AddQuizComponent } from './popups/add-quiz/add-quiz.component';
import { DelQuizComponent } from './popups/del-quiz/del-quiz.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'select_quiz', component: SelectQuizComponent },
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
    DelQuizComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
