using AutoMapper;
using JITeleHealth.API.AutoMapper;
using JITeleHealth.API.Controllers;
using JITeleHealth.API.ViewModels;
using JITeleHealth.Data;
using JITeleHealth.Data.Services;
using JITeleHealth.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JITeleHealth.API.IntegrationTests
{
    [TestClass]
    public class ValuesControllerTests
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public ValuesControllerTests()
        {
            _factory = new WebApplicationFactory<Startup>();
        }

        [TestMethod]
        public async Task GetEndpointReturnsSuccessAndSomeDataFromTheDatabse()
        {
            // Arrange
            var client = _factory.CreateClient();

            // Act
            var response = await client.GetAsync("/api/Values/GetPatients");
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            var responseString = await response.Content.ReadAsStringAsync();
            var responseObjectList = JsonConvert.DeserializeObject<List<PatientVM>>(responseString);

            // Assert
            Assert.AreNotEqual(0, responseObjectList.Count);
        }
    }
}
