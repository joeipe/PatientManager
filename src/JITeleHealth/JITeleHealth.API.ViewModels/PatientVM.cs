using System;
using System.Collections.Generic;

namespace JITeleHealth.API.ViewModels
{
    public class PatientVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DoB { get; set; }
        public string Address { get; set; }

        public List<ClinicalNoteVM> ClinicalNotes { get; set; }
    }
}
