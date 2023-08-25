using Echooling.Aplication.DTOs.SliderDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Echooling.Aplication.Abstraction.Services
{
    public interface ISliderService
    {
        Task CreateAsync(SliderCreateDto categoryCreateDto);
        Task<SliderGetDto> getById(Guid id);
        Task<List<SliderGetDto>> GetAllAsync();
        Task UpdateAsync(SldierUpdateDto categoryUpdateDto, Guid id);
        Task Remove(Guid id);
    }
}
