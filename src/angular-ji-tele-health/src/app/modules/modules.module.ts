import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ModulesRoutingModule } from './modules-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClinicalNotesComponent } from './clinical-notes/clinical-notes.component';
import { PatientModifyComponent } from './patient/patient-modify.component';
import { ClinicalNotesModifyComponent } from './clinical-notes/clinical-notes-modify.component';



@NgModule({
  declarations: [
    HomeComponent,
    ClinicalNotesComponent,
    PatientModifyComponent,
    ClinicalNotesModifyComponent,
  ],
  imports: [
    ModulesRoutingModule,
    SharedModule
  ]
})
export class ModulesModule { }
