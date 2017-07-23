import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    MainComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
