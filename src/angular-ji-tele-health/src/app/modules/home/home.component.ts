import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient, ValuesService } from 'src/app/core/services/values.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  patients: Patient[];

  constructor(private router: Router, private valuesService: ValuesService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.valuesService.getPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  onNameClick(productId: number) {
    this.router.navigate([`/patient/${productId}`]);
  }

  onAddClick() {
    this.router.navigate([`/patient`]);
  }

  onClinicalNotesClick(productId: number) {
    this.router.navigate([`/notes/${productId}`]);
  }
}
