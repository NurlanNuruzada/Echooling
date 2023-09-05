using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Echooling.Aplication.DTOs.SliderDTOs;
using Echooling.Aplication.DTOs.TeacherDetailsDTOs;
using Ecooling.Domain.Entites;

namespace Echooling.Aplication.Abstraction.Services
{
    public interface  ITeacherService
    {
        Task CreateAsync(TeacherCreateDto teacherCreateDto);
        Task<List<TeacherGetDto>> GetAllAsync();
        //Task<SliderGetDto> getById(Guid id);
        //Task UpdateAsync(SldierUpdateDto categoryUpdateDto, Guid id);
        //Task Remove(Guid id);
    }
}
