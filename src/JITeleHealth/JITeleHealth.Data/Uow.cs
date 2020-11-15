using JITeleHealth.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace JITeleHealth.Data
{
    public class Uow : IDisposable
    {
        private DataContext _context;

        public Uow(DataContext context)
        {
            _context = context;
        }

        public GenericRepository<Patient> PatientsRepo { get { return new GenericRepository<Patient>(_context); } }
        public GenericRepository<ClinicalNote> ClinicalNotesRepo { get { return new GenericRepository<ClinicalNote>(_context); } }

        public void Save()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

    }
}
