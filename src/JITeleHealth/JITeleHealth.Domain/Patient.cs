using System;
using System.Collections.Generic;

namespace JITeleHealth.Domain
{
    public class Patient : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DoB { get; set; }
        public string Address { get; set; }

        public List<ClinicalNote> ClinicalNotes { get; set; }
    }
}
