using JITeleHealth.Data.Services;
using JITeleHealth.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;

namespace JITeleHealth.Data.IntegrationTests
{
    [TestClass]
    public class DataServiceTests
    {
        private List<Patient> _patientsInMemory;
        private List<ClinicalNote> _clinicalNoteInMemory;

        [TestMethod]
        public void Can_GetPatients()
        {
            //Arrange
            var builder = new DbContextOptionsBuilder<DataContext>();
            builder.UseInMemoryDatabase("GetPatients");
            SeedInMemoryStore(builder.Options);

            //Act
            using (var dataContext = new DataContext(builder.Options))
            {
                var dataService = new DataService(new Uow(dataContext));
                var result = dataService.GetPatients();

                // Assert
                Assert.AreEqual(_patientsInMemory.Count(), result.Count());
            }
        }

        [TestMethod]
        public void Can_GetPatientById()
        {
            //Arrange
            var builder = new DbContextOptionsBuilder<DataContext>();
            builder.UseInMemoryDatabase("GetPatientById");
            SeedInMemoryStore(builder.Options);

            //Act
            using (var dataContext = new DataContext(builder.Options))
            {
                var dataService = new DataService(new Uow(dataContext));
                var result = dataService.GetPatientById(1);

                // Assert
                Assert.AreEqual(1, result.Id);
            }
        }

        [TestMethod]
        public void Can_AddPatient()
        {
            //Arrange
            var builder = new DbContextOptionsBuilder<DataContext>();
            builder.UseInMemoryDatabase("AddPatient");
            SeedInMemoryStore(builder.Options);

            //Act
            using (var dataContext = new DataContext(builder.Options))
            {
                var dataService = new DataService(new Uow(dataContext));
                var patient = new Patient() { Name = "Test 1", DoB = DateTime.Now, Address = "Perth" };
                dataService.AddPatient(patient);

                // Assert
                Assert.AreEqual(patient.Name, dataContext.Patients.First(x => x.Id == 3).Name);
            }
        }

        [TestMethod]
        public void Can_UpdatePatient()
        {
            //Arrange
            var builder = new DbContextOptionsBuilder<DataContext>();
            builder.UseInMemoryDatabase("UpdatePatient");
            SeedInMemoryStore(builder.Options);

            //Act
            using (var dataContext = new DataContext(builder.Options))
            {
                var dataService = new DataService(new Uow(dataContext));
                var patient1 = new Patient() { Id = 1, Name = "Joe Ipe1", DoB = DateTime.Now, Address = "Melbourne" };
                dataService.UpdatePatient(patient1);

                // Assert
                Assert.AreEqual(patient1.Name, dataContext.Patients.First(x => x.Id == 1).Name);
            }
        }

        [TestMethod]
        public void Can_DeletePatient()
        {
            //Arrange
            var builder = new DbContextOptionsBuilder<DataContext>();
            builder.UseInMemoryDatabase("DeletePatient");
            SeedInMemoryStore(builder.Options);

            //Act
            using (var dataContext = new DataContext(builder.Options))
            {
                var dataService = new DataService(new Uow(dataContext));
                dataService.DeletePatient(1);

                // Assert
                Assert.IsNull(dataContext.Patients.FirstOrDefault(x => x.Id == 1));
            }
        }

        [TestMethod]
        public void Can_GetClinicalNoteById()
        {
            //Arrange
            var builder = new DbContextOptionsBuilder<DataContext>();
            builder.UseInMemoryDatabase("GetClinicalNoteById");
            SeedInMemoryStore(builder.Options);

            //Act
            using (var dataContext = new DataContext(builder.Options))
            {
                var dataService = new DataService(new Uow(dataContext));
                var result = dataService.GetClinicalNoteById(1);

                // Assert
                Assert.AreEqual(1, result.Id);
            }
        }

        [TestMethod]
        public void Can_AddClinicalNote()
        {
            //Arrange
            var builder = new DbContextOptionsBuilder<DataContext>();
            builder.UseInMemoryDatabase("AddClinicalNote");
            SeedInMemoryStore(builder.Options);

            //Act
            using (var dataContext = new DataContext(builder.Options))
            {
                var dataService = new DataService(new Uow(dataContext));
                var clinicalNote = new ClinicalNote();
                dataService.AddClinicalNote(clinicalNote);

                // Assert
                Assert.IsNotNull(dataContext.ClinicalNotes.First(x => x.Id == 4));
            }
        }

        [TestMethod]
        public void Can_UpdateClinicalNote()
        {
            //Arrange
            var builder = new DbContextOptionsBuilder<DataContext>();
            builder.UseInMemoryDatabase("UpdateClinicalNote");
            SeedInMemoryStore(builder.Options);

            //Act
            using (var dataContext = new DataContext(builder.Options))
            {
                var dataService = new DataService(new Uow(dataContext));
                var clinicalNote3 = new ClinicalNote() { Id = 3, Description = "Shoulders_Modified", Details = "injury on left Shoulders", PatientId = 2 };
                dataService.UpdateClinicalNote(clinicalNote3);

                // Assert
                Assert.AreEqual(clinicalNote3.Description, dataContext.ClinicalNotes.First(x => x.Id == 3).Description);
            }  
        }

        [TestMethod]
        public void Can_DeleteClinicalNote()
        {
            //Arrange
            var builder = new DbContextOptionsBuilder<DataContext>();
            builder.UseInMemoryDatabase("DeleteClinicalNote");
            SeedInMemoryStore(builder.Options);

            //Act
            using (var dataContext = new DataContext(builder.Options))
            {
                var dataService = new DataService(new Uow(dataContext));
                dataService.DeleteClinicalNote(1);

                // Assert
                Assert.IsNull(dataContext.ClinicalNotes.FirstOrDefault(x => x.Id == 1));
            }
        }

        private void SeedInMemoryStore(DbContextOptions<DataContext> options)
        {
            var patient1 = new Patient() { Id = 1, Name = "Joe Ipe", DoB = DateTime.Now, Address = "Melbourne" };
            var patient2 = new Patient() { Id = 2, Name = "John Doe", DoB = DateTime.Now, Address = "Sydney" };

            var clinicalNote1 = new ClinicalNote() { Id = 1, Description = "Left knee", Details = "injury on left knee", PatientId = 1, Patient = patient1 };
            var clinicalNote2 = new ClinicalNote() { Id = 2, Description = "Right knee", Details = "injury on left knee", PatientId = 1, Patient = patient1 };
            var clinicalNote3 = new ClinicalNote() { Id = 3, Description = "Shoulders", Details = "injury on left Shoulders", PatientId = 2, Patient = patient2 };

            patient1.ClinicalNotes = new List<ClinicalNote>() { clinicalNote1, clinicalNote2 };
            patient2.ClinicalNotes = new List<ClinicalNote>() { clinicalNote2 };

            _patientsInMemory = new List<Patient>() { patient1, patient1 };
            _clinicalNoteInMemory = new List<ClinicalNote>() { clinicalNote1, clinicalNote2, clinicalNote3 };

            using (var context = new DataContext(options))
            {
                context.Patients.AddRange(
                        _patientsInMemory
                    );

                context.ClinicalNotes.AddRange(
                        _clinicalNoteInMemory
                    );

                context.SaveChanges();
            }
        }
    }
}
