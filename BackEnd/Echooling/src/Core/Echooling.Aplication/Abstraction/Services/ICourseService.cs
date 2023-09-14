using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Echooling.Aplication.DTOs.CourseDTOs;
using Echooling.Aplication.DTOs.EventDTOs;

namespace Echooling.Aplication.Abstraction.Services
{
    public interface ICourseService
    {
        Task CreateAsync(CourseCreateDto courseCreateDto, Guid TeacherId);
        Task<EventGetDto> getById(Guid CourseId);
        Task<List<EventGetDto>> GetAllAsync();
        Task UpdateAsync(CourseCreateDto courseCreateDto, Guid CourseId);
        Task Remove(Guid CourseId);
    }
}
