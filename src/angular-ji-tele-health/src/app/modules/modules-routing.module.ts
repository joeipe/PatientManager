import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicalNotesModifyComponent } from './clinical-notes/clinical-notes-modify.component';
import { ClinicalNotesComponent } from './clinical-notes/clinical-notes.component';
import { HomeComponent } from './home/home.component';
import { PatientModifyComponent } from './patient/patient-modify.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'notes/:id', component: ClinicalNotesComponent },
  {
    path: 'note/modify/:id/:patientId',
    component: ClinicalNotesModifyComponent,
  },
  { path: 'note/modify/:patientId', component: ClinicalNotesModifyComponent },
  { path: 'patient/:id', component: PatientModifyComponent },
  { path: 'patient', component: PatientModifyComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
