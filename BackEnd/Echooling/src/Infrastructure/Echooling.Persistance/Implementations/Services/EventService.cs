﻿using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.EventRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.EventDTOs;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace Echooling.Persistance.Implementations.Services
{
    public class EventService : IEventService
    {
        private readonly IEventWriteRepository _writeRepository;
        private readonly IEventReadRepository _readRepository;
        private readonly IMapper _mapper;
        private readonly IStringLocalizer<ErrorMessages> _localizer;

        public EventService(IEventWriteRepository writeRepository,
                            IEventReadRepository readRepository,
                            IStringLocalizer<ErrorMessages> localizer,
                            IMapper mapper)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
            _localizer = localizer;
            _mapper = mapper;
        }

        public async Task CreateAsync(EventCreateDto CreateStaffDto)
        {
            events events = _mapper.Map<events>(CreateStaffDto);
            await _writeRepository.addAsync(events);
            await _writeRepository.SaveChangesAsync();
        }

        public async Task<List<EventGetDto>> GetAllAsync()
        {
            var Events = await _readRepository.GetAll().ToListAsync();
            List<EventGetDto> List = _mapper.Map<List<EventGetDto>>(Events);
            return List;
        }

        public async Task<EventGetDto> getById(Guid id)
        {
            var Event = await _readRepository.GetByIdAsync(id);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (Event is null)
            {
                throw new notFoundException("user" + " " + message);
            }
            EventGetDto FoundEvent = _mapper.Map<EventGetDto>(Event);
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