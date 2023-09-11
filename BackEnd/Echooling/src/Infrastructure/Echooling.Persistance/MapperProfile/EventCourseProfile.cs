using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Echooling.Aplication.DTOs.CategoryDTOs;
using Ecooling.Domain.Entites;

namespace Echooling.Persistance.MapperProfile
{
    public class EventCourseProfile : Profile
    {
        public EventCourseProfile()
        {
            CreateMap<EventCategoryies, EventCategoryDto>().ReverseMap();
        }
    }
}
