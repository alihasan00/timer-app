import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer/timer.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    TimerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    TimerComponent
  ]
})
export class ComponentsModule { }
