import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { SelectQuizComponent } from './pages/select-quiz/select-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    MainComponent,
    LoginComponent,
    SelectQuizComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
