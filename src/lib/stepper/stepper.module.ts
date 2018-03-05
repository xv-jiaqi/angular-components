import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtStepperComponent } from './stepper.component';
import { GtStepComponent } from './step.component';
import { GtStepBodyComponent } from './step-body.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GtStepperComponent,
    GtStepComponent
  ],
  exports: [
    GtStepperComponent,
    GtStepComponent,
    GtStepBodyComponent
  ]
})
export class GtStepperModule { }
