using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Echooling.Aplication.DTOs.CourseDTOs;
using Echooling.Aplication.DTOs.EventDTOs;
using Echooling.Aplication.DTOs.StaffDTOs;
using Echooling.Aplication.DTOs.TeacherDetailsDTOs;

namespace Echooling.Aplication.Abstraction.Services
{
    public interface ICourseService
    {
        Task CreateAsync(CourseCreateDto courseCreateDto, Guid TeacherId);
        Task<CourseGetDto> getById(Guid CourseId);
        Task<List<CourseGetDto>> GetAllAsync();
        Task<List<TeacherGetDto>> GetTeachersByCourseId(Guid courseId);
        Task UpdateAsync(CourseCreateDto courseCreateDto, Guid CourseId);
        Task<List<CourseGetDto>> GetLatestWithCategory(int take, Guid? categoryId);
        Task Remove(Guid CourseId);
    }
}
