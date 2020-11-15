using AutoMapper;
using JITeleHealth.API.ExtensionMethods;
using JITeleHealth.API.ViewModels;
using JITeleHealth.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JITeleHealth.API.AutoMapper
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            CreateMap<PatientVM, Patient>()
                .ForMember(dest => dest.DoB, opt => opt.MapFrom(src => src.DoB.ParseDate())); ;
            CreateMap<ClinicalNoteVM, ClinicalNote>();
        }
    }
}
