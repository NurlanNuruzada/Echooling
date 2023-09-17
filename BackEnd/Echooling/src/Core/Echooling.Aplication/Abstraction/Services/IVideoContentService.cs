using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Echooling.Aplication.DTOs.SliderDTOs;
using Echooling.Aplication.DTOs.VideoDTOs;

namespace Echooling.Aplication.Abstraction.Services
{
    public interface IVideoContentService
    {
        Task CreateAsync(CreateVIdeoContentDto categoryCreateDto);
        Task<GetVideoContentDto> getById(Guid id);
        Task<List<GetVideoContentDto>> GetAllAsync();
        Task UpdateAsync(CreateVIdeoContentDto categoryUpdateDto, Guid id);
        Task Remove(Guid id);
    }
}
