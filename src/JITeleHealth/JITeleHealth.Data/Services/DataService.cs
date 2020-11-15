using JITeleHealth.Data.Interfaces;
using JITeleHealth.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace JITeleHealth.Data.Services
{
    public class DataService : IDataService
    {
        private readonly Uow _uow;

        public DataService(Uow uow)
        {
            _uow = uow;
        }

        public IEnumerable<Patient> GetPatients()
        {
            var data = _uow.PatientsRepo.GetAll();
            return data;
        }

        public Patient GetPatientById(int id)
        {
            var data = _uow.PatientsRepo.SearchForInclude
                (
                    p => p.Id == id,
                    source => source
                        .Include(x => x.ClinicalNotes)
                ).FirstOrDefault();
            return data;
        }

        public void AddPatient(Patient data)
        {
            _uow.PatientsRepo.Create(data);
            _uow.Save();
        }

        public void UpdatePatient(Patient data)
        {
            _uow.PatientsRepo.Update(data);
            _uow.Save();
        }

        public void DeletePatient(int id)
        {
            _uow.PatientsRepo.Delete(id);
            _uow.Save();
        }

        public ClinicalNote GetClinicalNoteById(int id)
        {
            var data = _uow.ClinicalNotesRepo.GetById(id);
            return data;
        }

        public void AddClinicalNote(ClinicalNote data)
        {
            _uow.ClinicalNotesRepo.Create(data);
            _uow.Save();
        }

        public void UpdateClinicalNote(ClinicalNote data)
        {
            _uow.ClinicalNotesRepo.Update(data);
            _uow.Save();
        }

        public void DeleteClinicalNote(int id)
        {
            _uow.ClinicalNotesRepo.Delete(id);
            _uow.Save();
        }
    }
}
