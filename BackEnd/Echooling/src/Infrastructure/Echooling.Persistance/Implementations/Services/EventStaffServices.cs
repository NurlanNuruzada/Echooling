﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.EventRepositories;
using Echooling.Aplication.Abstraction.Repository.EventsStaff;
using Echooling.Aplication.Abstraction.Repository.SliderRepositories;
using Echooling.Aplication.Abstraction.Repository.StaffRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Microsoft.Extensions.Localization;

namespace Echooling.Persistance.Implementations.Services
{
    public class EventStaffServices : IStaffEventsService
    {
        private readonly IEventStaffWriteRepository _writeRepository;
        private readonly IEventStaffReadRepository _readRepository;
        private readonly IMapper _mapper;
        private readonly IStringLocalizer<ErrorMessages> _localizer;
        private readonly IEventWriteRepository _EventwriteRepository;
        private readonly IEventReadRepository _EventreadRepository;
        private readonly IStaffReadRepository _StaffreadRepository;
        private readonly IStaffWriteRepository _StaffwriteRepository;

        public EventStaffServices(IEventStaffWriteRepository writeRepository,
                                  IEventStaffReadRepository readRepository,
                                  IMapper mapper,
                                  IStringLocalizer<ErrorMessages> localizer,
                                  IEventReadRepository eventreadRepository,
                                  IStaffReadRepository staffreadRepository)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
            _mapper = mapper;
            _localizer = localizer;
            _EventreadRepository = eventreadRepository;
            _StaffreadRepository = staffreadRepository;
        }

        public async Task AddStaffToEventAsync(Guid eventId, Guid staffId)
        {
            var eventEntity = await _EventreadRepository.GetByExpressionAsync(u => u.GuId == eventId);
            string message = _localizer.GetString("NotFoundExceptionMsg");
            if (eventEntity == null)
            {
                throw new notFoundException("Event " + message);
            }

            var Staff = await _StaffreadRepository.GetByIdAsync(staffId);
            if (Staff == null)
            {
                throw new notFoundException("Staff " + message);
            }
            if (eventEntity.StaffEvents == null)
            {
                eventEntity.StaffEvents = new List<StaffEvents>();
            }

            var staffEvent = new StaffEvents
            {
                StaffId = staffId, 
                eventsId = eventId,
                events = _mapper.Map<events>(eventEntity),
                staff = _mapper.Map<Staff>(Staff)
            };

            eventEntity.StaffEvents.Add(staffEvent);

            await _writeRepository.SaveChangesAsync();
        }



        public Task<List<StaffEvents>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
        public Task<StaffEvents> GetByEventOrStaffId(Guid id)
        {
            throw new NotImplementedException();
        }
        public Task UpdateAsync(StaffEvents StaffEvents, Guid id)
        {
            throw new NotImplementedException();
        }
    }
}