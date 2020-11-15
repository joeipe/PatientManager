using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using JITeleHealth.API.ViewModels;
using JITeleHealth.Data.Interfaces;
using JITeleHealth.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace JITeleHealth.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController : ApiController
    {
        private readonly ILogger<ValuesController> _logger;
        private readonly IMapper _mapper;
        private readonly IDataService _dataService;

        public ValuesController(ILogger<ValuesController> logger, IMapper mapper, IDataService dataService)
        {
            _logger = logger;
            _mapper = mapper;
            _dataService = dataService;
        }

        [HttpGet]
        public ActionResult GetPatients()
        {
            var data = _dataService.GetPatients();
            var vm = _mapper.Map<IList<PatientVM>>(data);
            return Response(vm);
        }

        [HttpGet("{id}")]
        public ActionResult GetPatientById(int id)
        {
            var data = _dataService.GetPatientById(id);
            if (data == null)
            {
                return ResponseNotFound();
            }
           var vm = _mapper.Map<PatientVM>(data);
            return Response(vm);
        }

        [HttpPost]
        public ActionResult AddPatient([FromBody] PatientVM value)
        {
            var data = _mapper.Map<Patient>(value);
            _dataService.AddPatient(data);

            return Response("", value);
        }

        [HttpPut]
        public ActionResult UpdatePatient([FromBody] PatientVM value)
        {
            var data = _mapper.Map<Patient>(value);
            _dataService.UpdatePatient(data);

            return Response();
        }

        [HttpDelete("{id}")]
        public ActionResult DeletePatient(int id)
        {
            _dataService.DeletePatient(id);

            return Response();
        }

        [HttpGet("{id}")]
        public ActionResult GetClinicalNoteById(int id)
        {
            var data = _dataService.GetClinicalNoteById(id);
            if (data == null)
            {
                return ResponseNotFound();
            }
            var vm = _mapper.Map<ClinicalNoteVM>(data);
            return Response(vm);
        }

        [HttpPost]
        public ActionResult AddClinicalNote([FromBody] ClinicalNoteVM value)
        {
            var data = _mapper.Map<ClinicalNote>(value);
            _dataService.AddClinicalNote(data);

            return Response("", value);
        }

        [HttpPut]
        public ActionResult UpdateClinicalNote([FromBody] ClinicalNoteVM value)
        {
            var data = _mapper.Map<ClinicalNote>(value);
            _dataService.UpdateClinicalNote(data);

            return Response();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteClinicalNote(int id)
        {
            _dataService.DeleteClinicalNote(id);

            return Response();
        }
    }
}
