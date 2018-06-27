import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TomatoComponent } from './tomato/tomato.component';
import { StockedTomatoService } from './stocked-tomato.service';
import { SecondsMinutesPipe } from './seconds-minutes.pipe';
import { TaskCategoryPipe } from './task-category.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TomatoComponent,
    SecondsMinutesPipe,
    TaskCategoryPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [StockedTomatoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
