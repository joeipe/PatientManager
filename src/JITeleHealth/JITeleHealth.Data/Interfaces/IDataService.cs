using JITeleHealth.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace JITeleHealth.Data.Interfaces
{
    public interface IDataService
    {
        IEnumerable<Patient> GetPatients();

        Patient GetPatientById(int id);

        void AddPatient(Patient data);

        void UpdatePatient(Patient data);

        void DeletePatient(int id);

        ClinicalNote GetClinicalNoteById(int id);

        void AddClinicalNote(ClinicalNote data);

        void UpdateClinicalNote(ClinicalNote data);

        void DeleteClinicalNote(int id);
    }
}
