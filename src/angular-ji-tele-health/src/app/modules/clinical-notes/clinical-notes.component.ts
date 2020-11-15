import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient, ValuesService } from 'src/app/core/services/values.service';

@Component({
  selector: 'app-clinical-notes',
  templateUrl: './clinical-notes.component.html',
  styleUrls: ['./clinical-notes.component.css'],
})
export class ClinicalNotesComponent implements OnInit {
  patientId: number;
  patient: Patient;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private valuesService: ValuesService
  ) {}

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id');
    this.getPatientById();
  }

  getPatientById(): void {
    this.valuesService.getPatientById(this.patientId).subscribe((data) => {
      this.patient = data;
    });
  }

  onBackClick(): void {
    this.router.navigate(['/home']);
  }

  onAddClick() {
    this.router.navigate([`/note/modify/${this.patientId}`]);
  }

  onDescClick(id: number) {
    this.router.navigate([`/note/modify/${id}/${this.patientId}`]);
  }
}
