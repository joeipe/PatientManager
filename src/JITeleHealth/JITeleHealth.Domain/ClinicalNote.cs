using System;
using System.Collections.Generic;
using System.Text;

namespace JITeleHealth.Domain
{
    public class ClinicalNote : IEntity
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Details { get; set; }
        public int PatientId { get; set; }

        public Patient Patient { get; set; }
    }
}
