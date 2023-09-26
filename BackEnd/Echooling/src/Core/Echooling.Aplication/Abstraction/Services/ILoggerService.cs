using Echooling.Aplication.DTOs;
using Ecooling.Domain.Entites;

namespace Echooling.Aplication.Abstraction.Services;

public interface ILoggerService
{
    Task<List<Logger>> getAllAsyc();
    Task CreateLog(CreateLogDto log);
}
