using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Echooling.Aplication.Abstraction.Services;
using Echooling.Aplication.DTOs;
using Ecooling.Domain.Entites;

namespace Echooling.Persistance.Implementations.Services
{
    public class LoggerService : ILoggerService
    {
        public Task CreateLog(CreateLogDto log)
        {
            throw new NotImplementedException();
        }

        public Task<List<Logger>> getAllAsyc()
        {
            throw new NotImplementedException();
        }
    }
}
