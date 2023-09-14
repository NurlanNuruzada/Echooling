using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.EventRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs;
using Echooling.Aplication.DTOs.EventDTOs;
using Echooling.Persistance.Exceptions;
using Echooling.Persistance.Helper;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;

namespace Echooling.Persistance.Implementations.Services
{
    public class EventService : IEventService
    {
        private readonly IWebHostEnvironment _env;
        private readonly IEventWriteRepository _writeRepository;
        private readonly IEventReadRepository _readRepository;
        private readonly IMapper _mapper;
        private readonly IStringLocalizer<ErrorMessages> _localizer;
        public readonly IStaffEventsService _staffEventsService;
        private readonly IAppUserEventService _AppuserEventService;
        public readonly IAppUserEventService _appUserEventService;

        public EventService(IEventWriteRepository writeRepository,
                            IEventReadRepository readRepository,
                            IMapper mapper,
                            IStringLocalizer<ErrorMessages> localizer,
                            IStaffEventsService staffEventsService,
                            IAppUserEventService appuserEventService,
                            IAppUserEventService appUserEventService,
                            IWebHostEnvironment env)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
            _mapper = mapper;
            _localizer = localizer;
            _staffEventsService = staffEventsService;
            _AppuserEventService = appuserEventService;
            _appUserEventService = appUserEventService;
            _env = env;
        }

        public async Task CreateAsync(EventCreateDto CreateEventDto, Guid UserId)
        {
            events events = _mapper.Map<events>(CreateEventDto);
            if (CreateEventDto.image is not null)
            {
                events.ImageRoutue = await CreateEventDto.image.GetBytes();
            }
            else
            {
                throw new Exception("imgae not fuond");
            }
            await _writeRepository.addAsync(events);
            //AppUserEventDto appUserEventDto = new(events.GuId.to, UserId);
            //await _AppuserEventService.CreateAsync(appUserEventDto);
            await _writeRepository.SaveChangesAsync();
            await _staffEventsService.AddStaffToEventAsync(events.GuId, UserId);
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
            FoundEvent.image = Convert.ToBase64String(Event.ImageRoutue);
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
