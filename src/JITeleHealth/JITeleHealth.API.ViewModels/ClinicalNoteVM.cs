using System;
using System.Collections.Generic;
using System.Text;

namespace JITeleHealth.API.ViewModels
{
    public class ClinicalNoteVM
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Details { get; set; }
        public int PatientId { get; set; }
    }
}
