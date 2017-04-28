import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer.component';
import { TaskDetailComponent } from './task-detail.component';
import { TimeFormatPipe } from './shared/time.pipe';
import { Logger } from './logger.service';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TaskDetailComponent,
    TimeFormatPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [Logger],
  bootstrap: [AppComponent]
})
export class TimeTrackModule { }