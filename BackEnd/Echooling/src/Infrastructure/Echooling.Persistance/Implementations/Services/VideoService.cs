using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.VideoDTOs;

namespace Echooling.Persistance.Implementations.Services
{
    public class VideoService : IVideoContentService
    {
        public Task CreateAsync(CreateVIdeoContentDto categoryCreateDto)
        {
            throw new NotImplementedException();
        }

        public Task<List<GetVideoContentDto>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<GetVideoContentDto> getById(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task Remove(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(CreateVIdeoContentDto categoryUpdateDto, Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
