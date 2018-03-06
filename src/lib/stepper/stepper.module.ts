import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtStepperComponent } from './stepper.component';
import { GtStepComponent } from './step.component';
import { GtStepBodyComponent, GtStepBodyHost } from './step-body.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GtStepperComponent,
    GtStepComponent,
    GtStepBodyComponent,
    GtStepBodyHost
  ],
  exports: [
    GtStepperComponent,
    GtStepComponent,
    GtStepBodyComponent,
    GtStepBodyHost
  ]
})
export class GtStepperModule { }
