using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Echooling.Aplication.Abstraction.Repository.LoggerRepositories;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs;
using Echooling.Persistance.Resources;
using Ecooling.Domain.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace Echooling.Persistance.Implementations.Services
{
    public class LoggerService : ILoggerService
    {
        private readonly ILoggerReadRepository _readRepository;
        private readonly ILoggerWriteRepository _writeRepository;
        private readonly IStringLocalizer<ErrorMessages> _localizer;
        private readonly IMapper _mapper;

        public LoggerService(ILoggerReadRepository readRepository,
                             ILoggerWriteRepository writeRepository,
                             IStringLocalizer<ErrorMessages> localizer,
                             IMapper mapper)
        {
            _readRepository = readRepository;
            _writeRepository = writeRepository;
            _localizer = localizer;
            _mapper = mapper;
        }

        public async Task CreateLog(CreateLogDto log)
        {
            var CreateLog = _mapper.Map<Logger>(log);
            CreateLog.DateCreated = DateTime.UtcNow;
            await _writeRepository.addAsync(CreateLog);
            await _writeRepository.SaveChangesAsync();
        }
        public async Task<List<Logger>> getAllAsync()
        {
            var Logs =await _readRepository.GetAll().ToListAsync();
            return Logs;
        }
    }
}
