import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient, ValuesService } from 'src/app/core/services/values.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-patient-modify',
  templateUrl: './patient-modify.component.html',
  styleUrls: ['./patient-modify.component.css'],
})
export class PatientModifyComponent implements OnInit {
  patientId: number;
  patient: Patient;
  action: string;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private valuesService: ValuesService
  ) {}

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id');
    if (this.patientId !== 0) {
      this.action = 'Edit';
      forkJoin([this.valuesService.getPatientById(this.patientId)]).subscribe(
        (results) => {
          this.patient = results[0];

          this.initForm();
        }
      );
    } else {
      this.action = 'Add';
      this.patient = {} as Patient;
      this.initForm();
    }
  }

  onBackClick(): void {
    this.router.navigate(['/home']);
  }

  onSubmitClick(): void {
    if (this.patientId !== 0) {
      this.edit();
    } else {
      this.add();
    }
  }

  onDeleteClick(): void {
    this.valuesService.deletePatient(this.patientId).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      Name: [this.patient?.name, [Validators.required]],
      DoB: [this.patient?.doB, [Validators.required]],
      Address: [this.patient?.address, [Validators.required]],
    });
  }

  getPatientById(): void {
    this.valuesService.getPatientById(this.patientId).subscribe((data) => {
      this.patient = data;
    });
  }

  add(): void {
    this.populateModal();
    this.valuesService.addPatient(this.patient).subscribe((data) => {
      this.onBackClick();
    });
  }

  edit(): void {
    this.populateModal();
    this.valuesService.updatePatient(this.patient).subscribe((data) => {
      this.onBackClick();
    });
  }

  populateModal(): void {
    this.patient.name = this.form.get('Name').value;
    this.patient.doB = this.form.get('DoB').value;
    this.patient.address = this.form.get('Address').value;
  }
}
