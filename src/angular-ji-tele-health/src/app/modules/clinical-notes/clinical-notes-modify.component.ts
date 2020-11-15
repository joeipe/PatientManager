import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import {
  ClinicalNote,
  ValuesService,
} from 'src/app/core/services/values.service';

@Component({
  selector: 'app-clinical-notes-modify',
  templateUrl: './clinical-notes-modify.component.html',
  styleUrls: ['./clinical-notes-modify.component.css'],
})
export class ClinicalNotesModifyComponent implements OnInit {
  id: number;
  patientId: number;
  clinicalNote: ClinicalNote;
  action: string;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private valuesService: ValuesService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.patientId = +this.route.snapshot.paramMap.get('patientId');
    if (this.id !== 0) {
      this.action = 'Edit';
      forkJoin([this.valuesService.getClinicalNoteById(this.id)]).subscribe(
        (results) => {
          this.clinicalNote = results[0];

          this.initForm();
        }
      );
    } else {
      this.action = 'Add';
      this.clinicalNote = {} as ClinicalNote;
      this.initForm();
    }
  }

  onBackClick(): void {
    this.router.navigate([`/notes/${this.patientId}`]);
  }

  onSubmitClick(): void {
    if (this.id !== 0) {
      this.edit();
    } else {
      this.add();
    }
  }

  onDeleteClick(): void {
    this.valuesService.deleteClinicalNote(this.id).subscribe(() => {
      this.router.navigate([`/notes/${this.patientId}`]);
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      Description: [this.clinicalNote?.description, [Validators.required]],
      Details: [this.clinicalNote?.details, [Validators.required]],
    });
  }

  add(): void {
    this.populateModal();
    this.valuesService.addClinicalNote(this.clinicalNote).subscribe((data) => {
      this.onBackClick();
    });
  }

  edit(): void {
    this.populateModal();
    this.valuesService
      .updateClinicalNote(this.clinicalNote)
      .subscribe((data) => {
        this.onBackClick();
      });
  }

  populateModal(): void {
    this.clinicalNote.description = this.form.get('Description').value;
    this.clinicalNote.details = this.form.get('Details').value;
    this.clinicalNote.patientId = this.patientId;
  }
}
