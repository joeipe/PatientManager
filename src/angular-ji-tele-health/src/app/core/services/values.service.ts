import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValuesService {
  apiRoot: string;
  constructor(private _http: HttpClient) {
    this.apiRoot = 'https://localhost:44357/' + 'api/Values';
  }

  getPatients(): Observable<Patient[]> {
    return this._http.get<Patient[]>(`${this.apiRoot}/GetPatients`);
  }

  getPatientById(id: number): Observable<Patient> {
    return this._http.get<Patient>(`${this.apiRoot}/GetPatientById/${id}`);
  }

  addPatient(value: Patient): Observable<any> {
    return this._http.post(`${this.apiRoot}/AddPatient`, value);
  }

  updatePatient(value: Patient): Observable<any> {
    return this._http.put(`${this.apiRoot}/UpdatePatient`, value);
  }

  deletePatient(id: number): Observable<any> {
    return this._http.delete(`${this.apiRoot}/DeletePatient/${id}`);
  }

  getClinicalNoteById(id: number): Observable<ClinicalNote> {
    return this._http.get<ClinicalNote>(
      `${this.apiRoot}/GetClinicalNoteById/${id}`
    );
  }

  addClinicalNote(value: ClinicalNote): Observable<any> {
    return this._http.post(`${this.apiRoot}/AddClinicalNote`, value);
  }

  updateClinicalNote(value: ClinicalNote): Observable<any> {
    return this._http.put(`${this.apiRoot}/UpdateClinicalNote`, value);
  }

  deleteClinicalNote(id: number): Observable<any> {
    return this._http.delete(`${this.apiRoot}/DeleteClinicalNote/${id}`);
  }
}

export interface Patient {
  id: number;
  name: string;
  doB: string;
  address: string;

  clinicalNotes: ClinicalNote[];
}

export interface ClinicalNote {
  id: number;
  description: string;
  details: string;
  patientId: number;
}
