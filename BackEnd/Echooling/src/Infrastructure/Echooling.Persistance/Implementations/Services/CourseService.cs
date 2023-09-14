using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.Couse;
using Echooling.Aplication.Abstraction.Repository.EventRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs.CourseDTOs;
using Echooling.Aplication.DTOs.EventDTOs;
using Echooling.Persistance.Resources;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Localization;

namespace Echooling.Persistance.Implementations.Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseWriteRepository _writeRepository;
        private readonly ICourseReadRepository _readRepository;
        private readonly IMapper _mapper;
        private readonly IStringLocalizer<ErrorMessages> _localizer;
        public readonly ITeacherService _teacherService;

        public CourseService(ICourseWriteRepository writeRepository,
                             ICourseReadRepository readRepository,
                             IMapper mapper,
                             IStringLocalizer<ErrorMessages> localizer,
                             ITeacherService teacherService)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
            _mapper = mapper;
            _localizer = localizer;
            _teacherService = teacherService;
        }

        public Task CreateAsync(CourseCreateDto courseCreateDto, Guid TeacherId)
        {
            throw new NotImplementedException();
        }

        public Task<List<EventGetDto>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<EventGetDto> getById(Guid CourseId)
        {
            throw new NotImplementedException();
        }

        public Task Remove(Guid CourseId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(CourseCreateDto courseCreateDto, Guid CourseId)
        {
            throw new NotImplementedException();
        }
    }
}
