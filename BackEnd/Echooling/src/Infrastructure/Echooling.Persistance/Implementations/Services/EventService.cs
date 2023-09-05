using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.EventRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.EventDTOs;
using Echooling.Aplication.DTOs.SliderDTOs;
using Echooling.Aplication.DTOs.TeacherDetailsDTOs;
using Echooling.Persistance.Contexts;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace Echooling.Persistance.Implementations.Services
{
    public class EventService : IEventService
    {
        private readonly IEventWriteRepository _writeRepository;
        private readonly IEventReadRepository _readRepository;
        private readonly Mapper _mapper;
        private readonly IStringLocalizer<ErrorMessages> _localizer;
        public readonly AppDbContext _context;
        public async Task CreateAsync(EventCreateDto CreateStaffDto)
        {
            events events = _mapper.Map<events>(CreateStaffDto);
            await _writeRepository.addAsync(events);
            await _writeRepository.SaveChangesAsync();
        }

        public async Task<List<EventCreateDto>> GetAllAsync()
        {
            var Events = await _readRepository.GetAll().ToListAsync();
            List<EventCreateDto> List = _mapper.Map<List<EventCreateDto>>(Events);
            return List;
        }

        public async Task<EventCreateDto> getById(Guid id)
        {
            var Event = await _readRepository.GetByIdAsync(id);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Event is null)
            {
                throw new notFoundException("user" + " " + message);
            }
            EventCreateDto FoundEvent = _mapper.Map<EventCreateDto>(Event);
            return FoundEvent;
        }

        public async Task Remove(Guid id)
        {
            var Event = await _readRepository.GetByIdAsync(id);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Event is null)
            {
                throw new notFoundException(message);
            }
            _writeRepository.remove(Event);
            await _writeRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(EventCreateDto StaffUpdateDto, Guid id)
        {
            var Event = await _readRepository.GetByIdAsync(id);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Event is null)
            {
                throw new notFoundException("user" + " " + message);
            }
            _mapper.Map(StaffUpdateDto, Event);
            await _writeRepository.SaveChangesAsync();
        }
    }
}
